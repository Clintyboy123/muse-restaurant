import { useEffect } from 'react';
import { site } from '../content/site';

const setMeta = (attr, key, value) => {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
};

// Per-page title, description and social preview. index.html carries the home page defaults
// for crawlers that do not run JavaScript.
export default function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} | Muse Restaurant, Gqeberha` : 'Muse Restaurant | Fine Dining in Walmer, Gqeberha';
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `${site.url}${path}`);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${site.url}${path}`;
  }, [title, description, path]);
}
