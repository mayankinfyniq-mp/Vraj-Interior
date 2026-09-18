# Vraj Interior — Website

Premium, animated, fully responsive multi-page website for **Vraj Interior**, an interior design
studio in Ahmedabad. Built with **Vue 3 (JavaScript only — no TypeScript)**, Vite, Tailwind CSS,
PrimeVue and GSAP.

---

## Run it on your machine

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
```

Production build:

```bash
npm run build    # outputs to /dist
npm run preview  # serve the production build → http://localhost:4173
```

Requires Node 18+ (tested on Node 20).

---

## Pages

| Route        | What it holds                                                                 |
| ------------ | ----------------------------------------------------------------------------- |
| `/`          | Preloader, hero slideshow (changes every 3s), figures, manifesto, services preview, rotating band, pinned horizontal gallery, project teasers, process rail, testimonials, closing band |
| `/services`  | Hover-to-preview service index + one full band per discipline (Kitchen, Drawing Room, Hall & Dining, Bedrooms & Wardrobes, Pooja, Study, Turnkey) with image lightbox |
| `/projects`  | Filterable portfolio grid (PrimeVue SelectButton) with galleria lightbox      |
| `/about`     | Studio story, figures, standards, process, founder note, testimonials         |
| `/contact`   | Enquiry form (PrimeVue inputs + toast), studio card, map plate, FAQ accordion  |
| `*`          | 404 page                                                                      |

Also on every page: sticky **header island**, **emerald footer**, full-screen mobile menu,
gold scroll-progress rule, custom two-part cursor and a full-screen preloader.

---

## Folder structure

```
vraj-interior/
├─ index.html                  # document shell, meta tags, favicon
├─ package.json
├─ vite.config.js              # aliases: @ → src, ~ → public
├─ tailwind.config.js          # palette, fonts, keyframes (marquee / breathe / slow-zoom)
├─ postcss.config.js
├─ public/
│  └─ images/                  # 38 project photographs (renamed by room type)
│     ├─ living-01…04.jpg
│     ├─ lounge-01…02.jpg
│     ├─ dining-01…03.jpg
│     ├─ kitchen-01…05.jpg
│     ├─ bedroom-01…06.jpg
│     ├─ suite-green-01…04.jpg
│     ├─ suite-pink-01…03.jpg
│     ├─ suite-wood-01…02.jpg
│     ├─ kids-01…02.jpg
│     ├─ study-01…02.jpg
│     ├─ pooja-01…04.jpg
│     └─ detail-art.jpg
└─ src/
   ├─ main.js                  # app bootstrap (PrimeVue theme, router, directives)
   ├─ App.vue                  # preloader + cursor + toast + layout
   ├─ router/index.js          # routes, titles, smooth scroll reset, hash handling
   ├─ theme/preset.js          # PrimeVue preset (Aura base, emerald + gold tuning)
   ├─ styles/main.css          # design tokens, type scale, buttons, motion, PrimeVue tweaks
   ├─ directives/reveal.js     # v-reveal scroll animation directive
   ├─ composables/
   │  ├─ useSmoothScroll.js    # Lenis instance, scroll lock, programmatic scroll
   │  └─ useAppState.js        # tiny shared state (preloader, menu, cursor)
   ├─ data/site.js             # all copy: services, projects, stats, process, FAQs…
   ├─ components/
   │  ├─ layout/               # SiteLayout, SiteHeader, SiteFooter, MenuOverlay,
   │  │                        # Preloader, CursorRing, ScrollProgress
   │  ├─ sections/             # HomeHero, StatsRow, IntroStatement, ServicesPreview,
   │  │                        # RotatorBand, ProcessStrip, TestimonialRow
   │  └─ ui/                   # RevealText, ImageRotator, ImageRail, MarqueeBand,
   │                           # SectionHeading, CountUp, ProjectCard, ServiceRow,
   │                           # PageHero, CtaBand, ImageLightbox
   └─ views/                   # HomeView, ServicesView, ProjectsView, AboutView,
                               # ContactView, NotFoundView
```

---

## How to edit content

Almost everything lives in **`src/data/site.js`** — studio name, phone, WhatsApp, email, address,
service list (with the images each one shows), projects, statistics, process steps, testimonials
and FAQs. Change it there and every page updates.

**Colours & type** are in `tailwind.config.js` + the `:root` tokens at the top of
`src/styles/main.css` (porcelain `#F7F8F5`, deep emerald `#06231E` / `#0F4A3E`, brass gold
`#C3A15A`, headings in Marcellus, body in Jost).

**Photographs** — drop new files into `public/images/` and reference them as `/images/name.jpg`.

---

## Notes

- Animations are 2D only (translate, scale, clip-path, opacity) — no 3D or WebGL.
- Smooth scrolling via Lenis; scroll reveals via GSAP ScrollTrigger.
- The pinned horizontal gallery on the home page falls back to a swipeable row on mobile and when
  `prefers-reduced-motion` is set.
- The enquiry form posts nowhere by default — it validates, shows a toast and resets. Wire
  `submit()` in `src/views/ContactView.vue` to your backend, Formspree, or WhatsApp API.
- Fonts are bundled locally (no CDN), so the site works offline.
