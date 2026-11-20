import { site } from '../../content/site';

// Today in South Africa as YYYY-MM-DD (the restaurant's timezone, whatever the visitor's).
export const todayInSA = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Johannesburg' });

export const addDays = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const isOpenOn = (iso) => Boolean(site.openingDays[new Date(`${iso}T12:00:00Z`).getUTCDay()]);

// Half-hourly times from opening until the last booking (one hour before closing).
export const timeSlots = () => {
  const [open, close] = ['12:00', '22:00'].map((t) => t.split(':').map(Number)).map(([h, m]) => h * 60 + m);
  const last = close - site.lastBookingBeforeClose;
  const slots = [];
  for (let t = open; t <= last; t += 30) slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
  return slots;
};

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
