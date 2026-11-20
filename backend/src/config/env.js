// Single place where environment variables are read. Nothing else touches process.env.
const path = require('path');

// Local runs read the project-root .env. In Docker, Compose injects the values and this does nothing.
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env'), quiet: true });

const nodeEnv = process.env.NODE_ENV || 'development';

const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  appName: process.env.APP_NAME || 'Website',
  port: Number(process.env.PORT || process.env.BACKEND_PORT || 3000),

  // How many proxies sit in front of the API. On the VPS that is 2
  // (VPS Nginx -> frontend Nginx -> here). Needed so rate limiting sees
  // each visitor's real IP instead of treating everyone as one person.
  trustProxy: Number(process.env.TRUST_PROXY || 2),

  // Email for form notifications. Optional: without SMTP_HOST, submissions are saved but nobody is emailed.
  mail: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'Muse Restaurant <no-reply@muserestaurant.co.za>',
    to: process.env.MAIL_TO || '',
    phone: process.env.RESTAURANT_PHONE || '+27 (0)41 582 1937',
  },

  // Google rating shown on the site. With GOOGLE_PLACES_API_KEY set, the live rating and review count are
  // read from Google (cached for REVIEWS_CACHE_HOURS). Without it, or if Google is unreachable, the
  // fallback values below are used, so the numbers are maintained here, never in the website code.
  reviews: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
    placeId: process.env.GOOGLE_PLACE_ID || 'ChIJx2vwI1nSeh4RIAKtMlOtSYY',
    cacheHours: Number(process.env.REVIEWS_CACHE_HOURS || 12),
    fallbackRating: Number(process.env.REVIEWS_RATING || 4.8),
    fallbackCount: Number(process.env.REVIEWS_COUNT || 920),
  },

  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    name: process.env.DB_NAME || process.env.MYSQL_DATABASE,
    user: process.env.DB_USER || process.env.MYSQL_USER,
    password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD,
  },
};

const missing = Object.entries({
  'DB_NAME / MYSQL_DATABASE': env.db.name,
  'DB_USER / MYSQL_USER': env.db.user,
  'DB_PASSWORD / MYSQL_PASSWORD': env.db.password,
})
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}. Copy .env.example to .env and fill it in.`);
}

module.exports = env;
