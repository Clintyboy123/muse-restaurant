// Our Story content, from the chef biographies on the restaurant's current website.
// Portraits: the current site has no individual portraits of Allan and Simone. The images below are kitchen
// photography and are deliberately NOT captioned with their names. Replace `photo` with a real portrait key
// (see tools/photos.py) when one is supplied.
export const chefs = [
  {
    id: 'allan',
    name: 'Allan Bezuidenhout',
    first: 'Allan',
    role: 'Chef & co-owner',
    photo: 'chef-plating',
    pull: 'I fell in love with the craziness. From there on out I wanted to be a chef.',
    paragraphs: [
      'After school, Allan had a very short stint studying accounting and quickly realised it was not for him. He travelled to the UK and started working at the Angel Hotel as a barman, picking up extra shifts as a scullery hand in the kitchen.',
      'From scullery he became a commis chef. Back in South Africa he worked at small properties and worked his way up to head chef, studying part time at Capsicum Culinary Studio for his diploma in food preparation.',
      'Allan was part of the opening team of the Boardwalk Hotel, starting as sous chef and rising to executive sous chef before he and Simone decided to open their own restaurant.',
      'He believes that a chef and restaurateur has a responsibility towards nature, and should leave a green footprint as far as possible.',
    ],
    path: ['Angel Hotel, UK', 'Head chef', 'Capsicum Culinary Studio', 'Boardwalk Hotel', 'Muse, 2015'],
  },
  {
    id: 'simone',
    name: 'Simone Bezuidenhout',
    first: 'Simone',
    role: 'Chef & co-owner',
    photo: 'pastry-work',
    pull: 'Her passion is definitely pastry, but Muse has taught her the importance of being a good all-round chef.',
    paragraphs: [
      'Simone studied at Capsicum Culinary Studio in Port Elizabeth, earning her diploma in food preparation, pastry and management, and furthered her knowledge with chocolate courses at the Lindt studio in Cape Town.',
      'She joined the opening team of the five-star Boardwalk Hotel as a commis chef and, in three years, worked her way up to pastry sous chef.',
      'Pastry is her first love, but Muse has taught her the importance of being a good all-round chef, and she loves how much she has grown since they opened the restaurant.',
    ],
    path: ['Capsicum Culinary Studio', 'Lindt studio, Cape Town', 'Boardwalk Hotel', 'Pastry sous chef', 'Muse, 2015'],
  },
];

export const milestones = [
  { year: '2015', text: 'Muse opens its doors in November.' },
  { year: '2017', text: 'Winner at the Luxury Travel Guide Africa & Middle East Awards.' },
  { year: '2020', text: 'Restaurant Guru: Best Romantic Restaurant and Best Service in Port Elizabeth.' },
  { year: '2021', text: 'Tripadvisor Travellers’ Choice.' },
  { year: '2024', text: 'Daily Maverick: “a lockdown survivor that thrives”.' },
  { year: '2026', text: 'Named one of Eat Out’s Neighbourhood Gems.' },
];
