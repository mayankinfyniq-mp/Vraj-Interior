/**
 * services.js — Studio service offering.
 * Hover previews on the homepage read `image` from here.
 */

export const services = [
  {
    id: '01',
    slug: 'residential-interiors',
    title: 'Residential Interiors',
    excerpt:
      'Whole-home design for apartments, villas and bungalows — planned around how your family actually moves through a day.',
    body:
      'We begin with the way you live: morning light in the kitchen, where shoes land, which corner becomes quiet. Floor plans are reworked for flow, then layered with a restrained material palette — lime plaster, oak, travertine, unglazed ceramic — so the home feels settled rather than decorated.',
    image: '/img/gallery/p-06.jpg',
    deliverables: [
      'Space planning & furniture layout',
      'Concept boards & 3D visualisation',
      'Material, finish & colour specification',
      'Custom joinery drawings',
      'Turnkey execution & site supervision'
    ],
    duration: '10 – 16 weeks'
  },
  {
    id: '02',
    slug: 'modular-kitchen',
    title: 'Modular Kitchens',
    excerpt:
      'Kitchens built around the way you cook — durable carcases, soft-close hardware and storage that finally makes sense.',
    body:
      'A kitchen is joinery engineering before it is decoration. We design to the millimetre around your workflow, specify BWR / HDHMR carcases for Indian humidity, and pair them with honed stone, fluted shutters and warm brass hardware that ages gracefully.',
    image: '/img/gallery/p-15.jpg',
    deliverables: [
      'Workflow & ergonomic planning',
      'Carcase + shutter material specification',
      'Hardware & accessory selection',
      'Appliance integration drawings',
      'Factory-built install & handover'
    ],
    duration: '5 – 8 weeks'
  },
  {
    id: '03',
    slug: 'wardrobes-joinery',
    title: 'Wardrobes & Joinery',
    excerpt:
      'Bespoke storage that reads as architecture — fluted shutters, cane inlays, integrated lighting and quiet detailing.',
    body:
      'Storage should disappear into the wall and reappear only when needed. Every wardrobe, crockery unit, study and vanity we build is drawn for your exact niche, then finished by our own carpentry team in Ahmedabad.',
    image: '/img/gallery/p-22.jpg',
    deliverables: [
      'Site measurement & niche drawings',
      'Internal configuration planning',
      'Shutter finish & profile samples',
      'Integrated lighting & loft planning',
      'On-site installation'
    ],
    duration: '4 – 7 weeks'
  },
  {
    id: '04',
    slug: 'commercial-interiors',
    title: 'Commercial Interiors',
    excerpt:
      'Offices, cafés, clinics and retail that feel considered — designed for your staff, your customers and your brand.',
    body:
      'Commercial work has to survive traffic and still feel calm. We plan circulation, acoustics and task lighting first, then build a material story that photographs beautifully and cleans easily — so the space works as hard as your team does.',
    image: '/img/gallery/p-31.jpg',
    deliverables: [
      'Brand & spatial brief',
      'Zoning, circulation & acoustic plan',
      'MEP and lighting coordination',
      'Bespoke reception & worktop joinery',
      'Phased execution to fit your schedule'
    ],
    duration: '8 – 20 weeks'
  },
  {
    id: '05',
    slug: 'turnkey-execution',
    title: 'Turnkey Execution',
    excerpt:
      'One team, one contract, one point of contact — we build what we draw, on schedule and on budget.',
    body:
      'Design that never gets built is only a drawing. Our in-house execution team handles civil work, electrical, plumbing, carpentry, polishing and painting, with a shared project tracker so you always know what is happening on site this week.',
    image: '/img/gallery/p-11.jpg',
    deliverables: [
      'Detailed BOQ & transparent costing',
      'Dedicated project manager',
      'Weekly site progress reports',
      'Vendor & material procurement',
      'Snag-free handover with warranty'
    ],
    duration: 'Project dependent'
  },
  {
    id: '06',
    slug: 'styling-consultation',
    title: 'Styling & Consultation',
    excerpt:
      'Already have a space? A focused consultation and a styling pass can change how it feels in a single week.',
    body:
      'Not every project needs a renovation. We offer a two-hour on-site consultation, a written recommendation, and — if you wish — a full styling day where we re-hang art, re-layer textiles, add lighting and bring in plants and objects to finish the room.',
    image: '/img/gallery/p-27.jpg',
    deliverables: [
      'On-site design consultation',
      'Written recommendation report',
      'Furniture & art placement plan',
      'Soft furnishing & decor sourcing',
      'Half or full-day styling session'
    ],
    duration: '1 – 3 weeks'
  }
]

export const serviceHighlights = [
  { k: 'Design-led', v: 'Every plan starts with how you live' },
  { k: 'In-house build', v: 'Our own carpentry & site team' },
  { k: 'Transparent', v: 'Itemised BOQ, no hidden margins' },
  { k: 'On schedule', v: 'Weekly tracker, agreed handover date' }
]
