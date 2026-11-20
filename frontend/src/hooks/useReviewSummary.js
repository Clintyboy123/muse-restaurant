import useApi from './useApi';
import { getReviewSummary } from '../services/reviews';

// The Google rating and review count from the API. While it loads (or if the API is down) the rating block
// shows nothing rather than an invented number.
export default function useReviewSummary() {
  const { data, loading, error } = useApi(() => getReviewSummary().then((d) => ({ data: d })), []);
  return { summary: data, loading, error };
}
