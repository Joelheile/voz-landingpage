# Voz website

The site at [voz.joels.tech](https://voz.joels.tech). The app lives in [Joelheile/voz](https://github.com/Joelheile/voz).

Vite and React, served as static assets by Cloudflare Workers.

## Develop

```
npm install
npm run dev
```

`npm run lint` runs oxlint. `npm run build` type-checks and builds to `dist/`.

## Pages

| Path                | Source                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `/`                 | `index.html`, `src/App.tsx`                                                                       |
| `/build-extension/` | `content/extensions.md`, a copy of the app's `EXTENSIONS.md`. Refresh it with `npm run sync-docs` |
| `/extensions/`      | `src/components/Browse.tsx`. The browser lists npm packages with the `voz-package` keyword        |
| `/install`          | `public/_redirects` sends it to the app's `install.sh`                                            |

Security headers live in `public/_headers`.

## Deploy

```
npm run deploy
```

This builds and runs `wrangler deploy`. You need `wrangler login` once. Pushing to `main` does not deploy.

## Analytics

Until a visitor clicks Allow, PostHog runs in cookieless mode: it stores nothing in the browser and counts visits with a daily server-side hash. Allow adds a browser ID so repeat visits count once. The choice persists and can be changed under Website analytics in the footer. Data is stored in the EU. There are no session recordings or person profiles, and Do Not Track is respected. Page errors are reported to PostHog error tracking.

## License

[MIT](LICENSE)
