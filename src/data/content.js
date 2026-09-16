/**
 * content.js — Editorial copy for About, Home and Contact pages.
 * All long-form text lives here so views stay clean and presentational.
 */

export const heroSlides = [
  {
    src: '/img/hero-01.jpg',
    eyebrow: 'Living — Sandalwood House',
    line1: 'Spaces that',
    line2: 'breathe with',
    line3: 'you.',
    place: 'Ahmedabad'
  },
  {
    src: '/img/hero-02.jpg',
    eyebrow: 'Bedroom — The Ivory Apartment',
    line1: 'Quiet rooms,',
    line2: 'made for',
    line3: 'slow mornings.',
    place: 'Ahmedabad'
  },
  {
    src: '/img/hero-03.jpg',
    eyebrow: 'Kitchen — Oakline',
    line1: 'Warm material,',
    line2: 'honest craft,',
    line3: 'no noise.',
    place: 'Gujarat'
  },
  {
    src: '/img/gallery/p-31.jpg',
    eyebrow: 'Interior — Meridian Workspace',
    line1: 'Designed once,',
    line2: 'lived in for',
    line3: 'decades.',
    place: 'Ahmedabad'
  }
]

export const manifesto = {
  eyebrow: 'The Studio',
  lead: 'We design interiors that feel settled the day you move in — warm, unhurried and built to age well.',
  body: [
    'Vraj Interior began in a small Ahmedabad studio with a simple conviction: a home should not look styled, it should look lived in and loved. That means fewer gestures, better materials and details you only notice after a month.',
    'We work in natural finishes — lime plaster, oak, travertine, unglazed ceramic, brushed brass — and we let light do most of the decorating. Our drawings are precise; our spaces are soft.'
  ],
  signature: 'Vraj Interior',
  role: 'Founders & Principal Designers'
}

export const processSteps = [
  {
    id: '01',
    title: 'Discovery',
    duration: 'Week 1',
    copy:
      'We visit the site, measure everything, and spend an hour asking how you actually live — light, routine, storage, the things that annoy you today.',
    output: 'Site survey + brief'
  },
  {
    id: '02',
    title: 'Concept',
    duration: 'Weeks 2 – 3',
    copy:
      'Space plans, mood boards and a material palette you can touch. We present two clear directions rather than ten confused ones.',
    output: 'Layouts + 3D views'
  },
  {
    id: '03',
    title: 'Detailing',
    duration: 'Weeks 4 – 5',
    copy:
      'Joinery drawings, electrical and lighting layouts, finishes and an itemised BOQ. Nothing goes to site undecided.',
    output: 'GFC drawings + BOQ'
  },
  {
    id: '04',
    title: 'Execution',
    duration: 'Weeks 6 onwards',
    copy:
      'Our own site team builds it, with weekly progress reports and a single project manager you can call any day.',
    output: 'Weekly site reports'
  },
  {
    id: '05',
    title: 'Handover',
    duration: 'Final week',
    copy:
      'Deep clean, styling, a walkthrough snag list closed, and a care guide for every surface we installed.',
    output: 'Styled handover + warranty'
  }
]

export const stats = [
  { value: 240, suffix: '+', label: 'Projects delivered' },
  { value: 13, suffix: '', label: 'Years in practice' },
  { value: 38, suffix: '', label: 'Cities & towns reached' },
  { value: 96, suffix: '%', label: 'Clients who refer us' }
]

export const testimonials = [
  {
    quote:
      'They re-planned our three-bedroom flat and somehow found storage we did not know existed. Nine months in, it still feels calm every time I walk in.',
    author: 'Meera & Jay Shah',
    meta: 'Bodhi Villa, Ahmedabad',
    year: '2024'
  },
  {
    quote:
      'The kitchen is the first thing guests comment on. What I appreciate more is that the drawings matched what was built, and the site was cleaned every evening.',
    author: 'Ankit Desai',
    meta: 'Oakline Kitchen, Ahmedabad',
    year: '2025'
  },
  {
    quote:
      'We handed them a bare shell for our café with a tight deadline. They delivered on the day they promised, and the space photographs as well as it functions.',
    author: 'Rhea Kapadia',
    meta: 'Casa Café, Ahmedabad',
    year: '2023'
  },
  {
    quote:
      'What stood out was restraint. They talked us out of three things we wanted, and they were right about every one of them.',
    author: 'Dr. Sameer Vohra',
    meta: 'Meridian Clinic, Gandhinagar',
    year: '2024'
  }
]

export const pillars = [
  {
    id: '01',
    title: 'Material honesty',
    copy:
      'We specify what a surface really is — lime, oak, stone, brass — and let it age. Nothing here is pretending to be something else.'
  },
  {
    id: '02',
    title: 'Light before decor',
    copy:
      'Layouts are planned around where the sun enters at 8am and 5pm. If a room is lit properly, it needs very little else.'
  },
  {
    id: '03',
    title: 'Built by our own team',
    copy:
      'No sub-contracted labour roulette. Our carpenters, polishers and supervisors are on our payroll and on your site.'
  }
]

export const team = [
  { name: 'Vraj Patel', role: 'Founder & Principal Designer', image: '/img/gallery/p-33.jpg', bio: 'Thirteen years, 240 projects, and a stubborn belief that restraint is the hardest skill in this industry.' },
  { name: 'Nisha Raval', role: 'Head of Interiors', image: '/img/gallery/p-36.jpg', bio: 'Leads concept and material research. Trained in Ahmedabad, with a decade of residential and hospitality work.' },
  { name: 'Dev Mehta', role: 'Head of Projects', image: '/img/gallery/p-29.jpg', bio: 'Runs site execution, vendor coordination and the weekly tracker that keeps every handover on date.' }
]

export const timeline = [
  { year: '2012', title: 'The first studio', copy: 'Started with two draftsmen and a single carpentry unit in Navrangpura.' },
  { year: '2016', title: 'In-house execution', copy: 'Brought site work in-house so the drawings and the build finally matched.' },
  { year: '2019', title: 'Beyond the city', copy: 'First projects in Gandhinagar, Vadodara and Surat.' },
  { year: '2022', title: 'Commercial practice', copy: 'Opened a dedicated commercial studio for offices, clinics and hospitality.' },
  { year: '2025', title: '240 homes', copy: 'Crossed 240 delivered projects with a 96% referral rate.' }
]

export const faqs = [
  {
    q: 'How does the fee structure work?',
    a: 'Design fees are quoted as a fixed lump sum per phase after the first site visit — never a percentage that inflates with your spend. Execution is billed against an itemised BOQ you approve line by line before we start.'
  },
  {
    q: 'Can you work with a contractor we already have?',
    a: 'Yes. Many clients keep their own civil contractor and bring us in for design, joinery and supervision. We will coordinate drawings and site checks with them directly.'
  },
  {
    q: 'What is the smallest project you take on?',
    a: 'A single-room styling or a modular kitchen is comfortably within scope. For full-home interior work we typically start at around 900 square feet.'
  },
  {
    q: 'Do you work outside Ahmedabad?',
    a: 'Regularly — Gandhinagar, Vadodara, Surat, Rajkot and Anand. Sites beyond a two-hour drive carry a modest travel allowance, disclosed upfront.'
  },
  {
    q: 'What happens after handover?',
    a: 'Every project carries a 12-month workmanship warranty, plus a care guide for each surface. Most of our clients simply call us when they are ready for the next room.'
  }
]

export const marqueeWords = [
  'Bespoke Interiors',
  'Turnkey Execution',
  'Natural Material',
  'Timeless Design',
  'Ahmedabad Studio'
]

export const contactReasons = [
  'Full home interiors',
  'Modular kitchen',
  'Wardrobes & joinery',
  'Office or retail space',
  'Styling only',
  'Something else'
]
