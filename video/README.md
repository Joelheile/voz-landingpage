# Launch video

The Voz launch video for X, built with Remotion. It reuses the landing page's colors, fonts, text wave, pipeline and panels.

## Commands

```console
npm ci
npm run dev                                          # open Remotion Studio
npx remotion render Launch out/voz-launch.mp4 --crf=14 --jpeg-quality=100
```

Scenes live in `src/scenes`, in the order set by `src/Launch.tsx`. App icons in `public/apps` are copies of the landing page's `public/apps`.
