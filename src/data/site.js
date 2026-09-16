/**
 * site.js — Single source of truth for brand + contact details.
 * ---------------------------------------------------------------
 * Change these once and the navbar, footer, contact page and
 * metadata all update together.
 */

export const brand = {
  name: 'Vraj Interior',
  shortName: 'Vraj',
  tagline: 'Interior Design Studio',
  established: 2012,
  city: 'Ahmedabad',
  region: 'Gujarat',
  description:
    'A quietly luxurious interior design studio in Ahmedabad, shaping warm, livable spaces in natural material and soft light — from first sketch to turnkey handover.'
}

export const contact = {
  address: {
    line1: '301, Silver Oaks Commerce Hub',
    line2: 'Opp. Girish Cold Drinks, C.G. Road',
    city: 'Ahmedabad',
    region: 'Gujarat',
    pincode: '380009',
    country: 'India'
  },
  phone: '+91 98250 41728',
  phoneHref: 'tel:+919825041728',
  altPhone: '+91 79 4002 1188',
  altPhoneHref: 'tel:+917940021188',
  email: 'studio@vrajinterior.in',
  emailHref: 'mailto:studio@vrajinterior.in',
  careersEmail: 'careers@vrajinterior.in',
  hours: [
    { day: 'Monday — Friday', time: '10:00 — 19:00' },
    { day: 'Saturday', time: '10:00 — 17:00' },
    { day: 'Sunday', time: 'By appointment' }
  ],
  mapLink: 'https://maps.google.com/?q=C.G.+Road+Ahmedabad+Gujarat+380009'
}

export const socials = [
  { label: 'Instagram', short: 'IG', href: 'https://instagram.com' },
  { label: 'Pinterest', short: 'PN', href: 'https://pinterest.com' },
  { label: 'Facebook', short: 'FB', href: 'https://facebook.com' },
  { label: 'WhatsApp', short: 'WA', href: 'https://wa.me/919825041728' }
]

/** Primary navigation — consumed by Navbar, Footer & mobile drawer. */
export const navLinks = [
  { label: 'Home', to: '/', index: '01' },
  { label: 'Services', to: '/services', index: '02' },
  { label: 'About', to: '/about', index: '03' },
  { label: 'Projects', to: '/projects', index: '04' },
  { label: 'Contact', to: '/contact', index: '05' }
]

export const seo = {
  titleTemplate: '%s — Vraj Interior',
  description:
    'Vraj Interior is an Ahmedabad interior design studio crafting calm, warm, timeless residential and commercial spaces.'
}
