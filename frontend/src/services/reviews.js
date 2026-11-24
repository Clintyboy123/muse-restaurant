import api from './api';
import { BASE, IS_PREVIEW } from '../utils/asset';

// The GitHub Pages preview has no API: its build saves the same summary as a file (scripts/snapshot-preview-data.js).
export const getReviewSummary = () =>
  IS_PREVIEW
    ? fetch(`${BASE}preview-data/reviews-summary.json`).then((r) => {
        if (!r.ok) throw new Error('Reviews unavailable');
        return r.json();
      })
    : api.get('/reviews/summary').then((r) => r.data.data);
