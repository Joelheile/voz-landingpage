# Launch video

The Voz launch video for X, built with Remotion. It reuses the landing page's colors, fonts, text wave, pipeline and panels.

## Commands

```console
npm ci
npm run dev                                          # open Remotion Studio
npx remotion render Launch out/voz-launch.mp4 --crf=14 --jpeg-quality=100
```

The app's README shows the launch film as a silent animated WebP at 30 fps, which needs `brew install webp`:

```console
npx remotion render Launch out/readme --sequence --image-format=png --scale=0.5 --muted
cd out/readme && img2webp -loop 0 -lossy -q 80 -m 6 -d 33 $(ls | awk 'NR%2==1') -o ../readme.webp
```

Copy `out/readme.webp` to `.github/images/demo.webp` in the app repo.

Scenes live in `src/scenes`, in the order set by `src/Launch.tsx`. App icons in `public/apps` are copies of the landing page's `public/apps`.
