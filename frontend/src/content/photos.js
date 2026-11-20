// Photography. Every image is the restaurant's own (from muserestaurant.co.za), exported by tools/photos.py
// as WebP at two widths. photos.json lists each one's size, alt text, gallery category and placeholder tone.
// To add or replace a photo, see tools/photos.py.
import manifest from './photos.json';

const files = import.meta.glob('../assets/photos/*.webp', { eager: true, import: 'default' });
const url = (name) => files[`../assets/photos/${name}`];

export const photo = (key) => {
  const entry = manifest[key];
  if (!entry) throw new Error(`Unknown photo: ${key}`);
  const small = url(`${entry.file}-800.webp`);
  const large = (entry.large && url(`${entry.file}-1600.webp`)) || small;
  return {
    id: key,
    src: large,
    srcSet: entry.large ? `${small} 800w, ${large} ${Math.min(entry.width, 1600)}w` : `${small} ${entry.width}w`,
    width: entry.width,
    height: entry.height,
    alt: entry.alt,
    category: entry.category,
    tone: entry.tone,
  };
};

// Gallery categories, in display order. Keys match "category" in tools/photos.py.
export const galleryCategories = [
  { id: 'food', label: 'Food' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'chefs', label: 'Chefs' },
  { id: 'events', label: 'Events' },
  { id: 'kitchen', label: 'Behind the scenes' },
];

export const galleryPhotos = () => Object.keys(manifest).filter((k) => manifest[k].category).map(photo);
