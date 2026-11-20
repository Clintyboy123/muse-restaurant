// Contact details, hours and links, from the restaurant's current website (muserestaurant.co.za).
// Change them here and every page updates. Keep trading hours in step with backend/src/config/hours.js.
export const site = {
  name: 'Muse Restaurant',
  url: 'https://muserestaurant.co.za',
  owners: 'Allan and Simone Bezuidenhout',
  opened: 'November 2015',
  address: {
    street: '182 Main Road',
    suburb: 'Walmer',
    city: 'Gqeberha',
    postalCode: '6001',
    country: 'South Africa',
    lines: ['182 Main Road, Walmer', 'Gqeberha, 6001', 'South Africa'],
    directions:
      'Travel down Main Road from Walmer Park Shopping Centre towards 6th Avenue, Walmer. You will find Muse on your right-hand side between 11th and 10th Avenue.',
    lat: -33.981604,
    lng: 25.57775,
  },
  phone: { display: '+27 (0)41 582 1937', href: 'tel:+27415821937' },
  mobile: { display: '+27 (0)73 991 5011', href: 'tel:+27739915011' },
  email: { display: 'info@muserestaurant.co.za', href: 'mailto:info@muserestaurant.co.za' },
  // WhatsApp uses the restaurant's mobile number.
  whatsapp: {
    display: '+27 (0)73 991 5011',
    href: `https://wa.me/27739915011?text=${encodeURIComponent('Hello Muse, I would like to enquire about ')}`,
  },
  hours: [
    { days: 'Tuesday – Saturday', short: 'Tue – Sat', time: '12:00 – 22:00' },
    { days: 'Sunday – Monday', short: 'Sun – Mon', time: 'Closed' },
  ],
  // 0 = Sunday ... 6 = Saturday, for the reservation form. null = closed.
  openingDays: { 0: null, 1: null, 2: ['12:00', '22:00'], 3: ['12:00', '22:00'], 4: ['12:00', '22:00'], 5: ['12:00', '22:00'], 6: ['12:00', '22:00'] },
  lastBookingBeforeClose: 60, // minutes
  maps: {
    directions: 'https://www.google.com/maps/dir/?api=1&destination=-33.981604,25.57775',
    place: 'https://maps.google.com/?cid=9676455847226311200',
    embed: 'https://maps.google.com/maps?q=Muse%20Restaurant%2C%20182%20Main%20Road%2C%20Walmer%2C%20Gqeberha&ll=-33.981604,25.57775&z=16&output=embed',
  },
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@muse_restaurant', href: 'https://www.instagram.com/muse_restaurant/' },
    { id: 'facebook', label: 'Facebook', handle: 'Restaurant.muse', href: 'https://www.facebook.com/Restaurant.muse/' },
    {
      id: 'tripadvisor',
      label: 'Tripadvisor',
      handle: 'Muse Restaurant',
      href: 'https://www.tripadvisor.co.za/Restaurant_Review-g24182396-d10191892-Reviews-Muse_Restaurant-Gqeberha_Eastern_Cape.html',
    },
  ],
  facilities: ['Free off-street parking', 'Wheelchair accessible', 'Full bar and wine list', 'Free Wi-Fi', 'Visa and Mastercard accepted', 'Non-smoking'],
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/the-restaurant', label: 'The Restaurant' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/events-and-catering', label: 'Events & Catering' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export const RESERVE_PATH = '/contact#reserve';

// Keep in step with backend/src/routes/enquiry.routes.js
export const enquirySubjects = ['General enquiry', 'Menu & dietary question', 'Feedback', 'Press & media', 'Something else'];
