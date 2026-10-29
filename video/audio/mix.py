"""Mix public/soundtrack.wav: one sound per on-screen action over a quiet lofi bed.

Run with earshot's Python after `earshot kit render audio/kit.json --out audio/kit`:
    python -I audio/mix.py
Kit roles are earshot takes; recorded roles are real recordings in audio/recorded.
The bed is "Sleepy Cat" by Alejandro Magana (Mixkit Stock Music Free License), kept out of git in audio/music.
Cue frames mirror the scene constants in src/scenes; global frame = scene start + local frame.
The action-to-sound map and its reasons: docs/research/launch-video-sound-map.md.
"""

import json
import os

import numpy as np
import pyloudnorm
import soundfile
import soxr
from scipy.ndimage import minimum_filter1d
from scipy.signal import lfilter
from earshot.forge import kit

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 48000
FPS = 30
DURATION = 692 / FPS
TARGET_LUFS = -20.0  # earshot's effects-only reference film sits at -22 LUFS; the bed adds a little body
MUSIC = "music/sleepy-cat.mp3"  # 68 BPM lofi hip hop, steady level, taken from its start
MUSIC_UNDER_LU = 9.0  # the bed sits this far below the effects so it stays in the background
MUSIC_FADE_IN_S = 0.3
MUSIC_FADE_OUT_S = 2.5  # rings out under the end card
CEILING = 10 ** (-1.5 / 20)  # sample peak; leaves room for the true peak and AAC overshoot

# name: (file, peak dBFS, max seconds, semitone steps per take, onset threshold as a share of the peak)
# Targets from earshot docs/motion-sfx-study.md: a UI click lasts 30-60 ms; a ding sits at 1.8-2.2 kHz and stops in 0.2-0.4 s.
RECORDED = {
    "click": ("mouse-click.wav", -10.0, 0.06, [0], 0.5),  # the louder of its two clicks only
    "ding": ("ding.wav", -10.0, 0.4, [6], 0.05),  # 1.32 kHz raised 6 semitones to 1.87 kHz
    "strike": ("page-turn.wav", -13.0, 0.3, [0, -1, 1], 0.05),
}

RACE, HOOK, PROBLEMS, DICTATION, MONTAGE, AGENT, CTA = 0, 84, 150, 246, 366, 432, 602
CUES = [
    ("pop", [RACE, *(RACE + 10 + i * 9 for i in range(4))]),  # header, then a check per row; losers stay silent
    ("whoosh.long", [HOOK]),  # section change
    ("land", [HOOK + 4]),  # app icon on the plate
    ("pop", [PROBLEMS + i * 6 for i in range(3)]),  # problem cards
    ("strike", [PROBLEMS + 22 + i * 6 for i in range(3)]),  # line struck through each card
    ("click", [DICTATION + 7, DICTATION + 82]),  # hotkey press starts, release stops recording
    ("ding", [DICTATION + 106]),  # cleaned text inserted
    ("whoosh.short", [MONTAGE]),  # scene cut
    ("pop", [MONTAGE + 6 + i * 14 for i in range(3)]),  # app cards
    ("key", [AGENT + 10 + i * 3 for i in range(9)]),  # you type the request
    ("key", [AGENT + 84 + i * 3 for i in range(4)]),  # "Ship it." draft
    ("pop", [AGENT + 110]),  # "send it" pill
    ("key.return", [AGENT + 132]),  # message sent
    ("pop", [AGENT + 140]),  # status pill
    ("whoosh.long", [CTA]),  # into the logo
    ("land", [CTA]),  # logo lands
    ("pop", [CTA + 10]),  # button
]


def load_recorded(name):
    file, peak_db, max_s, steps, onset = RECORDED[name]
    y, sr = soundfile.read(os.path.join(HERE, "recorded", file), always_2d=True)
    y = y.mean(axis=1)  # objects are mono, centered
    a = np.abs(y)
    y = y[max(0, int(np.argmax(a > a.max() * onset)) - int(0.003 * sr)) :]  # start at the onset
    takes = []
    for step in steps:
        z = soxr.resample(y, sr * 2 ** (step / 12), SR)  # resampling up a semitone plays it a semitone higher
        z = z[: int(max_s * SR)]
        fade = min(len(z), int(0.03 * SR))
        z[-fade:] *= np.linspace(1, 0, fade)
        takes.append(z / np.abs(z).max() * 10 ** (peak_db / 20))
    return takes


def load_music(effects_lufs):
    y, sr = soundfile.read(os.path.join(HERE, MUSIC), always_2d=True)
    y = soxr.resample(y, sr, SR)[: int(DURATION * SR)]
    y = y * 10 ** ((effects_lufs - MUSIC_UNDER_LU - pyloudnorm.Meter(SR).integrated_loudness(y)) / 20)
    fade_in, fade_out = int(MUSIC_FADE_IN_S * SR), int(MUSIC_FADE_OUT_S * SR)
    y[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    y[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 2
    return y


def limit(x, lookahead_s=0.005, release_s=0.08):
    need = np.minimum(1.0, CEILING / np.maximum(np.abs(x).max(axis=1), 1e-9))
    n = int(lookahead_s * SR)
    gain = minimum_filter1d(need, 2 * n + 1)
    gain = lfilter([1 - np.exp(-1 / (release_s * SR))], [1, -np.exp(-1 / (release_s * SR))], gain - 1) + 1
    gain = np.minimum(gain, minimum_filter1d(need, 2 * n + 1))
    return x * gain[:, None]


def master(x):
    meter = pyloudnorm.Meter(SR)
    for _ in range(3):
        x = limit(x * 10 ** ((TARGET_LUFS - meter.integrated_loudness(x)) / 20))
    return x


def add(effects, y, start):
    if y.ndim == 1:
        y = np.repeat(y[:, None], 2, axis=1)
    i = int(round(start * SR))
    if i < 0:
        y, i = y[-i:], 0
    y = y[: len(effects) - i]
    effects[i : i + len(y)] += y


def main():
    lock = kit.render(os.path.join(HERE, "kit.json"), os.path.join(HERE, "kit"))
    recorded = {name: load_recorded(name) for name in RECORDED}
    effects = np.zeros((int(DURATION * SR), 2))
    used = {}
    report = []
    for name, frames in CUES:
        for frame in frames:
            n = used.get(name, 0)
            used[name] = n + 1
            t = frame / FPS
            if name in recorded:
                takes = recorded[name]
                add(effects, takes[n % len(takes)], t)
                report.append((round(t, 3), name, RECORDED[name][0], RECORDED[name][1]))
                continue
            role = lock["roles"][name]
            take = role["takes"][n % len(role["takes"])]
            gain = kit.gain_db(take, role)
            y, _ = soundfile.read(os.path.join(HERE, "kit", take["file"]), always_2d=True)
            add(effects, y * 10 ** (gain / 20), kit.place(take, role, t))
            report.append((round(t, 3), name, take["file"], gain))

    mix = master(effects + load_music(pyloudnorm.Meter(SR).integrated_loudness(effects)))
    soundfile.write(os.path.join(HERE, "..", "public", "soundtrack.wav"), mix.astype(np.float32), SR, subtype="PCM_24")
    with open(os.path.join(HERE, "cues.json"), "w") as f:
        json.dump([dict(zip(["t", "role", "file", "gain_db"], r)) for r in sorted(report)], f, indent=1)
    lufs = pyloudnorm.Meter(SR).integrated_loudness(mix)
    print(f"{len(report)} cues, {lufs:.1f} LUFS, peak {20 * np.log10(np.abs(mix).max()):.1f} dBFS")


main()
