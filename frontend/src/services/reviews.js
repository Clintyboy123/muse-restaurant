import api from './api';

// Google rating and review count, maintained by the backend (live from Google, or the configured values).
export const getReviewSummary = () => api.get('/reviews/summary').then((r) => r.data.data);
