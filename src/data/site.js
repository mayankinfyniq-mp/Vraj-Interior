/**
 * Single source of truth for every piece of site content.
 * Keeping copy here keeps the components clean and makes edits one-line easy.
 */

export const site = {
  name: 'Vraj Interior',
  monogram: 'V',
  tagline: 'Interior Design Studio',
  city: 'Ahmedabad',
  phone: '+91 98240 12345',
  phoneHref: 'tel:+919824012345',
  whatsapp: 'https://wa.me/919824012345',
  email: 'studio@vrajinterior.in',
  address: 'Sterling Tower, S.G. Highway, Ahmedabad, Gujarat 380054',
  hours: 'Mon – Sat · 10:00 – 19:00',
  instagram: 'https://instagram.com',
  pinterest: 'https://pinterest.com',
  established: '2013',
}

export const nav = [
  { index: '01', label: 'Home', to: '/' },
  { index: '02', label: 'Services', to: '/services' },
  { index: '03', label: 'Projects', to: '/projects' },
  { index: '04', label: 'Studio', to: '/about' },
  { index: '05', label: 'Contact', to: '/contact' },
]

/* ---------------------------------------------------------------- services */
export const services = [
  {
    id: 'kitchens',
    index: '01',
    title: 'Modular Kitchen',
    kicker: 'Island · Parallel · L-shape',
    blurb: 'Hard-working kitchens with soft-closing detail and a calm finish palette.',
    points: ['Island & peninsula', 'Stone counters', 'Tall units', 'Task lighting'],
    images: ['/images/kitchen-01.jpg', '/images/kitchen-02.jpg', '/images/kitchen-03.jpg', '/images/kitchen-04.jpg'],
  },
  {
    id: 'drawing-room',
    index: '02',
    title: 'Drawing Room',
    kicker: 'Living · Lounge · Seating',
    blurb: 'Generous seating, honest materials and light that lasts the whole evening.',
    points: ['Sofa planning', 'TV & panelling', 'Cove lighting', 'Art walls'],
    images: ['/images/living-01.jpg', '/images/living-02.jpg', '/images/living-03.jpg', '/images/living-04.jpg'],
  },
  {
    id: 'hall-dining',
    index: '03',
    title: 'Hall & Dining',
    kicker: 'Double height · Foyer',
    blurb: 'The spine of the home — arrival, movement and the table everything gathers around.',
    points: ['Foyer art', 'Dining seating 6–8', 'Ceiling features', 'Storage walls'],
    images: ['/images/dining-01.jpg', '/images/dining-02.jpg', '/images/dining-03.jpg', '/images/lounge-01.jpg'],
  },
  {
    id: 'bedrooms',
    index: '04',
    title: 'Bedrooms & Wardrobes',
    kicker: 'Master · Guest · Kids',
    blurb: 'Quiet rooms with deep wardrobes, layered light and a bed you want to fall into.',
    points: ['Headboard walls', 'Walk-in storage', 'Reading light', 'Blackout layers'],
    images: ['/images/bedroom-01.jpg', '/images/suite-green-01.jpg', '/images/suite-pink-01.jpg', '/images/bedroom-04.jpg'],
  },
  {
    id: 'pooja',
    index: '05',
    title: 'Pooja & Mandir',
    kicker: 'Mandir · Jali · Brass',
    blurb: 'Carved jali shutters, warm back light and a place kept deliberately apart.',
    points: ['Jali shutters', 'Back-lit niche', 'Brass detail', 'Concealed storage'],
    images: ['/images/pooja-01.jpg', '/images/pooja-02.jpg', '/images/pooja-03.jpg', '/images/pooja-04.jpg'],
  },
  {
    id: 'study',
    index: '06',
    title: 'Study & Kids',
    kicker: 'Work nook · Bunk · Shelving',
    blurb: 'Small rooms that do more — desks, shelves and beds folded into one wall.',
    points: ['Wall desks', 'Display shelves', 'Bunk & pull-out', 'Soft pin-up walls'],
    images: ['/images/study-01.jpg', '/images/study-02.jpg', '/images/kids-01.jpg', '/images/kids-02.jpg'],
  },
  {
    id: 'turnkey',
    index: '07',
    title: 'Turnkey Interiors',
    kicker: 'Full home · Handover',
    blurb: 'One contract, one team, one date. We hand over the keys with the beds made.',
    points: ['Drawings & 3D', 'Site supervision', 'Vendor coordination', 'Styling kit'],
    images: ['/images/lounge-02.jpg', '/images/living-02.jpg', '/images/suite-wood-01.jpg', '/images/dining-02.jpg'],
  },
]

/* ---------------------------------------------------------------- projects */
export const projectFilters = ['All', 'Residence', 'Kitchen', 'Bedroom', 'Pooja', 'Study']

export const projects = [
  {
    id: 'nandan',
    title: 'Nandan Residence',
    category: 'Residence',
    meta: '4BHK · Ahmedabad · 2025',
    cover: '/images/living-01.jpg',
    images: [
      '/images/living-01.jpg',
      '/images/living-02.jpg',
      '/images/dining-01.jpg',
      '/images/kitchen-01.jpg',
      '/images/pooja-02.jpg',
    ],
  },
  {
    id: 'vaikunth',
    title: 'Villa Vaikunth',
    category: 'Residence',
    meta: 'Villa · Gandhinagar · 2025',
    cover: '/images/lounge-02.jpg',
    images: ['/images/lounge-02.jpg', '/images/lounge-01.jpg', '/images/living-03.jpg', '/images/suite-green-01.jpg'],
  },
  {
    id: 'kesar',
    title: 'Kesar Kitchen',
    category: 'Kitchen',
    meta: 'Modular · Ahmedabad · 2024',
    cover: '/images/kitchen-01.jpg',
    images: ['/images/kitchen-01.jpg', '/images/kitchen-02.jpg', '/images/kitchen-03.jpg', '/images/kitchen-04.jpg'],
  },
  {
    id: 'quiet-master',
    title: 'Quiet Master',
    category: 'Bedroom',
    meta: 'Master suite · Ahmedabad · 2024',
    cover: '/images/bedroom-01.jpg',
    images: ['/images/bedroom-01.jpg', '/images/bedroom-02.jpg', '/images/bedroom-04.jpg', '/images/suite-green-01.jpg'],
  },
  {
    id: 'blush',
    title: 'Blush Suite',
    category: 'Bedroom',
    meta: 'Daughter’s room · Ahmedabad · 2025',
    cover: '/images/suite-pink-01.jpg',
    images: ['/images/suite-pink-01.jpg', '/images/suite-pink-02.jpg', '/images/suite-pink-03.jpg', '/images/study-02.jpg'],
  },
  {
    id: 'mandir',
    title: 'Mandir House',
    category: 'Pooja',
    meta: 'Pooja room · Ahmedabad · 2024',
    cover: '/images/pooja-03.jpg',
    images: ['/images/pooja-03.jpg', '/images/pooja-01.jpg', '/images/pooja-02.jpg', '/images/pooja-04.jpg'],
  },
  {
    id: 'study-nook',
    title: 'Study Nook',
    category: 'Study',
    meta: 'Two bedrooms · Ahmedabad · 2025',
    cover: '/images/study-01.jpg',
    images: ['/images/study-01.jpg', '/images/study-02.jpg', '/images/kids-01.jpg', '/images/kids-02.jpg'],
  },
  {
    id: 'hall-dining',
    title: 'Atrium Hall',
    category: 'Residence',
    meta: 'Double height · Ahmedabad · 2023',
    cover: '/images/living-02.jpg',
    images: ['/images/living-02.jpg', '/images/dining-01.jpg', '/images/living-04.jpg', '/images/dining-03.jpg'],
  },
]

/* ------------------------------------------------------------------ rotator */
export const heroSlides = [
  { image: '/images/living-01.jpg', label: 'Double height living' },
  { image: '/images/kitchen-01.jpg', label: 'Modular kitchen' },
  { image: '/images/bedroom-01.jpg', label: 'Master bedroom' },
  { image: '/images/pooja-02.jpg', label: 'Pooja room' },
]

export const rotatorBand = [
  { image: '/images/dining-01.jpg', label: 'Hall & dining' },
  { image: '/images/suite-green-01.jpg', label: 'Green suite' },
  { image: '/images/lounge-01.jpg', label: 'Lounge' },
  { image: '/images/kitchen-02.jpg', label: 'Tall units' },
  { image: '/images/study-01.jpg', label: 'Study nook' },
  { image: '/images/suite-pink-02.jpg', label: 'Kids bedroom' },
]

/* ------------------------------------------------------------------- studio */
export const stats = [
  { value: 12, suffix: '+', label: 'Years in practice' },
  { value: 260, suffix: '+', label: 'Homes delivered' },
  { value: 38, suffix: '', label: 'Modular kitchens a year' },
  { value: 45, suffix: ' days', label: 'Average build time' },
]

export const process = [
  { index: '01', title: 'Measure', note: 'Site visit, sizes, light.' },
  { index: '02', title: 'Draw', note: 'Layouts, 3D, materials.' },
  { index: '03', title: 'Build', note: 'Factory, site, supervision.' },
  { index: '04', title: 'Hand over', note: 'Styling and the last screw.' },
]

export const values = [
  { index: '01', title: 'Detail first', note: 'Joints, reveals, edge bands — the things you touch daily.' },
  { index: '02', title: 'Quiet palettes', note: 'Two or three colours, used with discipline.' },
  { index: '03', title: 'One team', note: 'Design, factory and site under the same roof.' },
]

export const testimonials = [
  {
    quote: 'They finished ahead of date and the kitchen still looks new after two years.',
    name: 'Hiral & Manan Patel',
    meta: '4BHK · Satellite',
  },
  {
    quote: 'Every measurement was drawn before a single board was cut. No surprises.',
    name: 'Rutvik Shah',
    meta: 'Villa · Gandhinagar',
  },
  {
    quote: 'Our pooja room is the calmest corner of the house. Exactly what we asked for.',
    name: 'Bhumi Desai',
    meta: '3BHK · Bopal',
  },
]

export const faqs = [
  {
    q: 'How long does a full home take?',
    a: 'Six to nine weeks on site, for most 3BHK homes.',
  },
  {
    q: 'Do you handle only interiors?',
    a: 'We handle interiors, civil changes, false ceiling, electrical and painting.',
  },
  {
    q: 'Can we keep our own vendors?',
    a: 'Yes. We coordinate with your vendors from one drawing set.',
  },
  {
    q: 'Where do you work?',
    a: 'Ahmedabad, Gandhinagar and nearby — plus remote design across Gujarat.',
  },
]

export const imageBank = {
  living: ['/images/living-01.jpg', '/images/living-02.jpg', '/images/living-03.jpg', '/images/living-04.jpg'],
  kitchen: ['/images/kitchen-01.jpg', '/images/kitchen-02.jpg', '/images/kitchen-03.jpg', '/images/kitchen-04.jpg', '/images/kitchen-05.jpg'],
  dining: ['/images/dining-01.jpg', '/images/dining-02.jpg', '/images/dining-03.jpg'],
  bedrooms: ['/images/bedroom-01.jpg', '/images/suite-green-01.jpg', '/images/suite-pink-01.jpg', '/images/suite-wood-01.jpg'],
  detail: ['/images/detail-art.jpg', '/images/study-01.jpg', '/images/pooja-01.jpg'],
}
