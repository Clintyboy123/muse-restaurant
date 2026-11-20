// Background music for the site player. Files live in public/music (AAC 160 kbps, encoded from the WAV masters in
// assets-source/music). Licensed tracks supplied by Clint (Envato AudioJungle / Elements): make sure each licence
// is registered to this website. Played in this order; the playlist loops.
// To change the music: put the new file in public/music, list it here, and bump MUSIC_VERSION so browsers
// fetch the new file instead of a cached one.
export const MUSIC_VERSION = '2026-11-20';

export const tracks = [
  { title: 'Restaurant', note: 'Korolkov Production', src: `/music/restaurant.m4a?v=${MUSIC_VERSION}` },
  { title: 'The Restaurant', note: 'Jazz for the dining room', src: `/music/the-restaurant.m4a?v=${MUSIC_VERSION}` },
  { title: 'Jazz Piano Trio', note: 'Jazz for the dining room', src: `/music/jazz-piano-trio.m4a?v=${MUSIC_VERSION}` },
];
