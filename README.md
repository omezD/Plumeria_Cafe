# Plumeria — Kitchen • Espresso

Website for Plumeria Cafe & Bistro, Jessore Road, Habra. A single page built with
Vite, React, Tailwind CSS and GSAP: a scroll-driven image-sequence hero followed
by story, menu, gallery, hours, reviews, contact and location sections.

## Run it locally

```bash
npm install
```

```bash
npm run serve
```

Then open http://localhost:5173. (`npm run dev` also works, as long as no folder
in the project's path contains a `#` character.)

## Change the content

- **Text, menu, prices, hours, reviews, phone, WhatsApp, map** — `src/content.js`
- **Hero frames** — images in `public/frames`, played in filename order
- **Photos, logo, menu cards** — `public/images`
- **Colours and fonts** — the `@theme` block at the top of `src/index.css`

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to the `gh-pages` branch for GitHub Pages.
