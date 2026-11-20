// The Google rating and review count shown on the site.
// With GOOGLE_PLACES_API_KEY set, the live numbers come from the Google Places API (New) and are cached in memory,
// so Google is asked at most once every REVIEWS_CACHE_HOURS. Without a key, or if Google fails, the fallback
// values from .env are used. Either way the site always gets an answer.
const env = require('../config/env');

const PROFILE_URL = 'https://maps.google.com/?cid=9676455847226311200';
const WRITE_URL = `https://search.google.com/local/writereview?placeid=${env.reviews.placeId}`;

let cache = null; // { value, expires }

const fallback = () => ({
  rating: env.reviews.fallbackRating,
  count: env.reviews.fallbackCount,
  source: 'configured',
  url: PROFILE_URL,
  writeUrl: WRITE_URL,
});

const fetchFromGoogle = async () => {
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(env.reviews.placeId)}`, {
    headers: { 'X-Goog-Api-Key': env.reviews.apiKey, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri' },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Google Places answered ${response.status}`);
  const data = await response.json();
  if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') throw new Error('Google Places returned no rating');
  return { rating: data.rating, count: data.userRatingCount, source: 'google', url: data.googleMapsUri || PROFILE_URL, writeUrl: WRITE_URL };
};

exports.summary = async () => {
  if (!env.reviews.apiKey) return fallback();
  if (cache && cache.expires > Date.now()) return cache.value;
  try {
    const value = await fetchFromGoogle();
    cache = { value, expires: Date.now() + env.reviews.cacheHours * 3600 * 1000 };
    return value;
  } catch (error) {
    console.error('[reviews] Using the configured rating, because Google failed:', error.message);
    // Keep the last good Google value if there is one; retry in 15 minutes.
    const value = cache?.value || fallback();
    cache = { value, expires: Date.now() + 15 * 60 * 1000 };
    return value;
  }
};
