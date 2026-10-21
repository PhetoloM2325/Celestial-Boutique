# Celestial Boutique

A responsive luxury fashion storefront built with React, TypeScript, Vite, Tailwind CSS, and Lucide React. Its editorial homepage pairs an inclusive product edit with fit, fabric, and styling demos. The fit preview uses a responsive CSS-rendered avatar, so the experience stays lightweight without a 3D model download.

## Features

- Country selector with illustrative exchange rates for USD, GBP, EUR, JPY, ZAR, and AUD.
- Searchable, filterable product collection with per-item size availability, quick view, wishlist controls, and a working bag drawer.
- Fit Studio with height, weight, body-shape, skin-tone, and style controls; BMI is presented only as a fit reference.
- Interactive fabric library with drape, weight, care notes, and daylight, studio, and evening previews.
- Image upload and drag-and-drop inspiration matcher with a simulated in-browser analysis.
- Community review filters for body shape, height, and skin tone. Sample reviews are illustrative demo content.
- Destination-aware delivery estimate, duties messaging, and lower-impact packaging preference.
- Responsive layouts, reduced-motion support, newsletter confirmation, and keyboard-accessible form controls.

## Run locally

Install Node.js 20 or newer, then from this folder run:

```sh
npm install
npm run dev
```

To create a production build:

```sh
npm run build
npm run preview
```

## Deploy on Render

The included `render.yaml` configures the site as a Render Static Site, including
the production build, `dist` publish directory, and SPA fallback for direct links.

1. In Render, create a new **Blueprint** and connect the
   `PhetoloM2325/Celestial-Boutique` GitHub repository.
2. Review the `celestial-boutique` static site configuration and deploy.
3. Render builds each deployment with `npm ci && npm run build` and publishes
   `dist`. Future pushes to the connected branch trigger a new deployment.

The project pins its Vite toolchain with a lockfile and uses Node.js 22 or newer.

Exchange rates, delivery estimates, checkout, newsletter subscription, image analysis, product details, ratings, and customer stories are demo content/behaviors; connect them to production services and verify product data before taking orders. Product, editorial, and customer imagery is loaded from Unsplash and requires an internet connection.
