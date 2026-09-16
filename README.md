# Vraj Interior — Website

A premium, multi-page interior design studio site built with **Vue 3 + Vite**, styled with
**Tailwind CSS**, using **PrimeVue** for form controls, the accordion and the lightbox, and
**GSAP + ScrollTrigger + Lenis** for scrolling and text animation.

---

## Quick start

You need [Node.js](https://nodejs.org) **18 or newer** (this was built on Node 20).

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open **http://localhost:5173**

```bash
# production build (outputs to /dist)
npm run build

# preview the production build locally
npm run preview     # http://localhost:4173
```

To deploy the built site, upload the contents of `dist/` to any static host
(Netlify, Vercel, Cloudflare Pages, cPanel, S3…). It is a pure static SPA — no server needed.

> If you deploy to a sub-folder rather than a domain root, set `base` in `vite.config.js`.

---

## What's included

| Page | Route | Contents |
|---|---|---|
| **Home** | `/` | Hero carousel (4 frames, auto-advance every 3s), manifesto with scroll-scrubbed text, services index, selected work, process timeline, counters, testimonials, CTA band |
| **Services** | `/services` | 6 detailed service sections, studio promise, process, FAQ accordion |
| **About** | `/about` | Studio story, 3 philosophy pillars, parallax band, milestones timeline, team, counters |
| **Projects** | `/projects` | Filterable archive of all 38 photographs + keyboard-navigable lightbox |
| **Contact** | `/contact` | Validated enquiry form (PrimeVue), studio directory, hours, illustrated location card, FAQ |

### Feature list

- **Preloader** — counts to 100 while hero images preload, then five curtains lift to reveal the page. Scroll is locked until it finishes (with a 6.5s safety release).
- **Custom cursor** — a brass dot that tracks exactly plus a ring that trails behind it; grows and shows a "View" label over imagery. Auto-disabled on touch devices and for reduced-motion users.
- **Smooth scrolling** — Lenis, wired into the GSAP ticker so scroll-linked animation never jitters.
- **Text animation** — lines mask-reveal on scroll; a long statement's words fade from linen to walnut as you scroll past them.
- **Image reveals** — clip-mask wipes, parallax, and blur-up placeholders (each photo ships with a tiny inline preview).
- **Hero carousel** — cross-dissolves every 3 seconds with a slow Ken Burns push, plus clickable slide rail.
- **Responsive** — tested at 390px, 768px, 1024px and 1440px with no horizontal overflow.
- **Accessible** — reduced-motion support throughout, focus rings, ARIA labels, keyboard-navigable lightbox.
- **Self-hosted fonts** — Cormorant Garamond (display) + Jost (UI), bundled in `public/fonts`. No CDN, works offline.

---

## Project structure

```
vraj-interior/
├── index.html
├── vite.config.js          # dev server + build config
├── tailwind.config.js      # colour tokens, type scale, eases
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── fonts/              # self-hosted woff2 (Cormorant Garamond, Jost)
│   └── img/
│       ├── hero-01..03.jpg # wide hero renders
│       └── gallery/        # p-01 … p-38  ← your project photographs
├── src/
│   ├── main.js             # app bootstrap (PrimeVue theme, router, directives)
│   ├── App.vue             # shell: preloader, cursor, nav, routes, footer
│   ├── assets/styles/
│   │   ├── main.css        # Tailwind layers, component classes, transitions
│   │   └── fonts.css       # @font-face declarations
│   ├── router/index.js
│   ├── theme/
│   │   ├── prime-preset.js # PrimeVue re-skinned in the studio palette
│   │   └── prime-overrides.css
│   ├── plugins/gsap.js     # single GSAP + ScrollTrigger registration
│   ├── composables/
│   │   ├── useSmoothScroll.js  # Lenis + lock/unlock/scrollTo helpers
│   │   ├── useCursor.js        # reactive cursor state
│   │   └── useAppReady.js      # set when the preloader lifts
│   ├── directives/
│   │   ├── reveal.js       # v-reveal (fade/clip/scale/stagger) + v-parallax
│   │   └── cursor.js       # v-cursor="'view'"
│   ├── data/               # ← ALL EDITABLE CONTENT LIVES HERE
│   │   ├── site.js         # brand, contact details, nav, socials
│   │   ├── services.js     # the six services
│   │   ├── content.js      # hero slides, copy, process, team, testimonials, FAQ
│   │   └── gallery.js      # all 38 photos + categories
│   ├── components/
│   │   ├── Preloader.vue  CustomCursor.vue  Navbar.vue  Footer.vue
│   │   ├── ScrollProgress.vue  PageHero.vue
│   │   ├── ui/            # RevealText, ScrubText, ImageFrame, MarqueeBand,
│   │   │                  # SectionHeading, MagneticButton, ArrowLink, StatCounter…
│   │   └── home/          # HeroCarousel, ManifestoSection, ServicesPreview,
│   │                      # FeaturedWork, ProcessSection, StatsSection,
│   │                      # TestimonialsSection, CtaBand
│   └── views/             # HomeView, ServicesView, AboutView,
│                          # ProjectsView, ContactView
└── README.md
```

---

## Editing content

Almost everything is data-driven. You rarely need to touch a `.vue` file.

| I want to change… | Edit |
|---|---|
| Phone, email, address, hours, socials | `src/data/site.js` |
| Nav links / footer links | `src/data/site.js` → `navLinks` |
| Services text & images | `src/data/services.js` |
| Hero slides, story copy, process steps, team, testimonials, FAQ | `src/data/content.js` |
| Project photo titles & categories | `src/data/gallery.js` |
| Colours | `tailwind.config.js` → `colors` (and the CSS variables in `src/assets/styles/main.css`) |
| Fonts | `src/assets/styles/fonts.css` + `tailwind.config.js` → `fontFamily` |

### ⚠️ Two things to review before going live

1. **Project names in `src/data/gallery.js` are placeholders.** Each of your 38 photos has
   been given a working title (`Sandalwood House`, `Meridian Workspace`, …) and a category.
   Re-tag them with the real project names — the grid, the filters and the lightbox all read
   from that one file.

2. **The contact form is front-end only.** It validates and shows a success toast, but does
   not send anything yet. Wire it up in `src/views/ContactView.vue` → `submit()`. The quickest
   no-backend options are [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com)
   or a Google Apps Script endpoint — just replace the `setTimeout` block with a `fetch()`.

---

## Design system

Colours were sampled from your own photographs — warm sand, taupe, walnut and brass, with no
dark backgrounds anywhere.

| Token | Hex | Used for |
|---|---|---|
| `ivory` | `#FAF7F1` | page background |
| `porcelain` | `#F3EDE3` | alternating sections, footer |
| `sand` | `#E9E0D1` | bands, counters |
| `linen` | `#DBCFBC` | hairlines, borders |
| `taupe` | `#A89C8E` | muted text |
| `stone` | `#8B7F71` | body copy |
| `umber` | `#6E5B45` | emphasis |
| `walnut` | `#4A3B2C` | headlines, buttons |
| `espresso` | `#33291F` | deepest text accent |
| `brass` | `#B08D57` | accent, links, active states |

Type: **Cormorant Garamond** for display, **Jost** for interface and body copy.

---

## Animation API reference

`v-reveal` is registered globally — drop it on any element:

```html
<div v-reveal>                                      <!-- fade + rise -->
<div v-reveal="{ delay: 0.2 }">                     <!-- delayed -->
<img v-reveal="{ type: 'clip' }" />                 <!-- mask wipe up -->
<img v-reveal="{ type: 'clip-x' }" />               <!-- mask wipe from left -->
<img v-reveal="{ type: 'scale' }" />                <!-- scale-out reveal -->
<ul v-reveal="{ child: 'li', stagger: 0.08 }">      <!-- stagger children -->
<div v-parallax="{ speed: 0.12 }">                  <!-- depth on scroll -->
<a v-cursor="{ variant: 'view', label: 'View' }">   <!-- cursor state -->
```

Wrap copy in `<RevealText>` for the line-mask entrance, or `<ScrubText>` for words that
brighten as you scroll past.

---

## Browser support

Evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS `aspect-ratio`, `backdrop-filter`
and `clamp()` — all widely supported. `prefers-reduced-motion` is honoured everywhere: with it
enabled, smooth scrolling, the preloader animation and all scroll reveals are disabled and
content renders immediately.

---

Built for Vraj Interior, Ahmedabad.
