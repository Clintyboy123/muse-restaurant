// Trading hours, from the restaurant's current website: Tuesday to Saturday 12:00-22:00, Sunday and Monday closed.
// 0 = Sunday ... 6 = Saturday. null = closed. Keep in step with frontend/src/content/site.js.
// Table requests are taken from opening time until LAST_BOOKING_BEFORE_CLOSE minutes before closing.
const hours = {
  0: null,
  1: null,
  2: { open: '12:00', close: '22:00' },
  3: { open: '12:00', close: '22:00' },
  4: { open: '12:00', close: '22:00' },
  5: { open: '12:00', close: '22:00' },
  6: { open: '12:00', close: '22:00' },
};

const LAST_BOOKING_BEFORE_CLOSE = 60;

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const isOpenOn = (date) => Boolean(hours[new Date(`${date}T12:00:00Z`).getUTCDay()]);

// Is this time on this date (YYYY-MM-DD) one we take requests for? Returns an error message or null.
const checkSlot = (date, time) => {
  const today = hours[new Date(`${date}T12:00:00Z`).getUTCDay()];
  if (!today) return 'We are closed on Sundays and Mondays. Please choose another day.';
  const t = toMinutes(time);
  if (t < toMinutes(today.open) || t > toMinutes(today.close) - LAST_BOOKING_BEFORE_CLOSE) {
    return 'Please choose a time between 12:00 and 21:00';
  }
  return null;
};

// Today's date in South Africa, as YYYY-MM-DD, so "today" is right whatever the server's timezone.
const todayInSA = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Johannesburg' });

const addDays = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

module.exports = { hours, checkSlot, isOpenOn, todayInSA, addDays };
