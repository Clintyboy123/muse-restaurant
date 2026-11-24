// GitHub Pages preview only: saves the Google rating summary as static JSON, using the backend's own reviews
// code, so the preview shows the same rating block as the live site without an API.
//   node scripts/snapshot-preview-data.js <output folder>
// Run by .github/workflows/pages.yml after the frontend build. With no GOOGLE_PLACES_API_KEY it uses the
// configured rating (REVIEWS_RATING / REVIEWS_COUNT, defaults in backend/src/config/env.js).
const fs = require('fs');
const path = require('path');

// env.js insists on database settings; the reviews code never touches the database, so placeholders are fine.
process.env.MYSQL_DATABASE ||= 'preview';
process.env.MYSQL_USER ||= 'preview';
process.env.MYSQL_PASSWORD ||= 'preview';

const reviews = require('../backend/src/services/reviews.service');

(async () => {
  const out = path.resolve(process.argv[2] || 'frontend/dist/preview-data');
  fs.mkdirSync(out, { recursive: true });
  const summary = await reviews.summary();
  fs.writeFileSync(path.join(out, 'reviews-summary.json'), JSON.stringify(summary));
  console.log(`Reviews snapshot: ${summary.rating} from ${summary.count} reviews (${summary.source}) -> ${out}`);
})().catch((error) => {
  console.error('Preview data snapshot failed:', error.message);
  process.exit(1);
});
