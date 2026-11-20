import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import useSeo from '../hooks/useSeo';
import PageHero from '../components/sections/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SplitHeading from '../components/ui/SplitHeading';
import Button from '../components/ui/Button';
import SocialIcon from '../components/ui/SocialIcon';
import Photo from '../components/media/Photo';
import Lightbox from '../components/media/Lightbox';
import Reveal from '../components/Reveal';
import { galleryCategories, galleryPhotos, photo } from '../content/photos';
import { site } from '../content/site';
import { ease } from '../utils/motion';

const instagram = site.social.find((s) => s.id === 'instagram');
const instagramPicks = ['plate-colour', 'bread-stones', 'smoke', 'wine-table', 'plate-moon', 'exterior'];

export default function Gallery() {
  useSeo({
    title: 'Gallery',
    description: 'Photographs of Muse Restaurant in Walmer, Gqeberha: plated food, the dining room, the chefs, events and life behind the scenes in the kitchen.',
    path: '/gallery',
  });
  const all = useMemo(() => galleryPhotos(), []);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const shown = filter === 'all' ? all : all.filter((p) => p.category === filter);
  const filters = [{ id: 'all', label: 'All' }, ...galleryCategories];
  const count = (id) => (id === 'all' ? all.length : all.filter((p) => p.category === id).length);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={[{ text: 'The Muse' }, { text: 'collection.', em: true }]}
        photo="palette-wide"
        intro="Plates, the dining room, the people in the kitchen and the occasions we have hosted. Select any photograph to see it full screen."
      />

      <section className="section bg-ivory" aria-label="Photographs">
        <div className="shell">
          {/* Filters */}
          <div className="sticky z-20 -mx-gutter mb-band border-b border-line-light bg-ivory/95 px-gutter backdrop-blur-md transition-[top] duration-700 ease-site" style={{ top: 'var(--header-h, 0px)' }}>
            <div role="group" aria-label="Filter photographs" className="no-scrollbar flex gap-2 overflow-x-auto py-4 md:gap-8">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  aria-label={`${f.label}, ${count(f.id)} photographs`}
                  className={`label relative flex min-h-11 shrink-0 items-center gap-2 px-3 transition-colors duration-300 md:px-0 ${filter === f.id ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
                >
                  {f.label}
                  <span className="font-display text-[0.875rem] font-normal tracking-normal text-bronze-ink">{count(f.id)}</span>
                  {filter === f.id && <motion.span layoutId="gallery-filter" className="absolute inset-x-3 bottom-0 h-px bg-charcoal md:inset-x-0" transition={{ duration: 1.2, ease }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry */}
          <motion.ul layout className="columns-2 gap-3 md:columns-3 md:gap-6 xl:columns-4" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  className="mb-3 break-inside-avoid md:mb-6"
                  initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 4, ease, delay: (i % 4) * 0.08 } }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25, ease } }}
                >
                  <button type="button" onClick={() => setOpen(i)} className="frame group relative block w-full cursor-zoom-in" aria-label={`View full screen: ${p.alt}`}>
                    <Photo image={p} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="block h-auto w-full" />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="text-left text-[0.8125rem] leading-snug text-ivory">{p.alt}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      {/* Instagram */}
      <section className="section on-dark bg-charcoal text-ivory" aria-labelledby="instagram-title">
        <div className="shell">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Eyebrow numeral="—" tone="dark">
                On Instagram
              </Eyebrow>
              <SplitHeading as="h2" className="mt-6 text-h2 display" parts={[{ text: 'Watch us' }, { text: 'plate up.', em: true }]} />
              <span id="instagram-title" className="sr-only">
                Muse on Instagram
              </span>
            </div>
            <Reveal>
              <Button href={instagram.href} variant="ghost-light">
                <SocialIcon id="instagram" className="size-4" /> Follow {instagram.handle}
              </Button>
            </Reveal>
          </div>
          <Reveal group gap={0.06} as="ul" className="mt-band grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
            {instagramPicks.map((id) => {
              const p = photo(id);
              return (
                <Reveal.Item as="li" key={id}>
                  <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="frame group relative block aspect-square" aria-label={`${p.alt}. Opens Muse on Instagram`}>
                    <Photo image={p} sizes="(min-width: 768px) 16vw, 33vw" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-charcoal/40 group-hover:opacity-100">
                      <ArrowUpRight className="size-5" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                  </a>
                </Reveal.Item>
              );
            })}
          </Reveal>
        </div>
      </section>

      <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
