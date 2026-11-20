import { useState } from 'react';
import { motion } from 'motion/react';
import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import Photo from '../media/Photo';
import Lightbox from '../media/Lightbox';
import Reveal from '../Reveal';
import Parallax from '../motion/Parallax';
import { photo } from '../../content/photos';
import { blurIn, ease, floatUp, withDelay } from '../../utils/motion';

// III. The Collection. Plates hung like a small exhibition on a warm sand wall:
// an editorial grid of different proportions, each with a wall-label number. Click to view full screen.
const works = [
  { id: 'plate-carpaccio', speed: 0, title: 'Study in flowers', span: 'md:col-span-5 md:row-span-2', ratio: 'aspect-[3/4] md:aspect-auto md:min-h-0 md:flex-1' },
  { id: 'palette-wide', speed: 34, title: 'Seven plates, one season', span: 'md:col-span-7', ratio: 'aspect-[4/3]' },
  { id: 'plate-dark', speed: 56, title: 'Amber on black', span: 'md:col-span-3', ratio: 'aspect-[3/4]' },
  { id: 'plate-green', speed: 18, title: 'Green and gold', span: 'md:col-span-4', ratio: 'aspect-[3/4]' },
  { id: 'plate-tin', speed: 44, title: 'Tin and timber', span: 'md:col-span-4', ratio: 'aspect-[4/5]' },
  { id: 'table-evening', speed: 12, title: 'An evening at Muse', span: 'md:col-span-8', ratio: 'aspect-[16/10]' },
];

export default function SignatureGallery() {
  const [open, setOpen] = useState(null);
  const images = works.map((w) => photo(w.id));

  return (
    <section className="section bg-sand">
      <div className="shell">
        <div className="grid grid-cols-1 items-end gap-8 text-center md:grid-cols-12 md:text-left">
          <div className="flex flex-col items-center md:col-span-7 md:items-start">
            <Eyebrow numeral="III">The collection</Eyebrow>
            <SplitHeading className="mt-6 text-h2 display text-charcoal" parts={[{ text: 'Plates, hung like' }, { text: 'a small exhibition.', em: true }]} />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="mx-auto max-w-[34ch] text-stone md:mx-0">Colour, texture, height and space. Each dish is composed to be looked at before it is tasted.</p>
          </Reveal>
        </div>

        <div className="mt-band grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6">
          {works.map((w, i) => {
            const p = images[i];
            return (
              <Parallax
                as="figure"
                speed={w.speed}
                key={w.id}
                className={`group relative flex flex-col ${[0, 1, 4, 5].includes(i) ? 'col-span-2' : 'col-span-1'} ${w.span}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {/* The card floats up into place; the photo blurs into focus. */}
                <motion.div className="flex flex-1 flex-col" variants={withDelay(floatUp, (i % 3) * 0.12)}>
                  <div className={`frame relative w-full ${w.ratio}`}>
                    <button type="button" onClick={() => setOpen(i)} className="absolute inset-0 block h-full w-full cursor-zoom-in" aria-label={`View photograph: ${p.alt}`}>
                      <motion.span className="absolute -inset-[4%] block" variants={withDelay(blurIn, (i % 3) * 0.12)}>
                        <Photo image={p} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
                      </motion.span>
                      <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 ease-site group-hover:bg-charcoal/15" aria-hidden="true" />
                    </button>
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-[0.75rem] text-stone">
                    <span className="label text-bronze-ink">No. {String(i + 4).padStart(2, '0')}</span>
                    <motion.span className="truncate statement text-[1rem]" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 4, ease, delay: 0.6 } } }}>
                      {w.title}
                    </motion.span>
                  </figcaption>
                </motion.div>
              </Parallax>
            );
          })}
        </div>

        <Reveal className="mt-band flex justify-center">
          <Button to="/gallery" variant="ghost-dark">
            View the gallery
          </Button>
        </Reveal>
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
