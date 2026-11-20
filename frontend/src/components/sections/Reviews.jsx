import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Stars from '../ui/Stars';
import TextLink from '../ui/TextLink';
import Reveal from '../Reveal';
import useReviewSummary from '../../hooks/useReviewSummary';
import { press, recognition, testimonials } from '../../content/reviews';
import { ease } from '../../utils/motion';

// VII. Guests. The Google rating (live from the API, never typed into the page), one guest's words at a time
// in large italic serif, and the restaurant's recognition as a quiet typographic list.
// The slider advances on its own every 8 seconds, pauses while hovered or focused, and has its own controls.
const INTERVAL = 8000;

export default function Reviews() {
  const reduce = useReducedMotion();
  const { summary } = useReviewSummary();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const go = useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go]);

  const t = testimonials[index];
  const control = 'flex size-12 items-center justify-center rounded-full border border-charcoal/25 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory';

  return (
    <section className="section bg-ivory" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8">
          {/* Rating */}
          <div className="flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left">
            <Eyebrow numeral="VII">Our guests</Eyebrow>
            <h2 id="reviews-title" className="sr-only">
              What our guests say
            </h2>
            <Reveal className="mt-8 flex flex-col items-center md:items-start">
              {summary ? (
                <>
                  <p className="display text-[clamp(5rem,3rem+7vw,9rem)] leading-[0.85] text-charcoal">
                    {summary.rating.toFixed(1)}
                    <span className="ml-1 align-top font-display text-h3 text-stone">/5</span>
                  </p>
                  <Stars rating={summary.rating} className="mt-6 h-5" />
                  <p className="mt-4 text-small text-stone">
                    Based on {summary.count.toLocaleString('en-ZA')} Google reviews
                  </p>
                </>
              ) : (
                <p className="display text-[clamp(5rem,3rem+7vw,9rem)] leading-[0.85] text-charcoal/15" aria-hidden="true">
                  ·
                </p>
              )}
              <TextLink href={summary?.url || 'https://maps.google.com/?cid=9676455847226311200'} className="mt-8 text-charcoal">
                Read more reviews
              </TextLink>
            </Reveal>
          </div>

          {/* Testimonial slider */}
          <div
            className="flex flex-col items-center text-center md:col-span-7 md:col-start-6 md:items-start md:text-left"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Guest reviews"
          >
            <span className="statement -mb-8 block text-[8rem] leading-none text-bronze/40 select-none" aria-hidden="true">
              “
            </span>
            <div className="relative min-h-[17rem] w-full sm:min-h-[14rem] md:min-h-[15rem]" aria-live={paused ? 'polite' : 'off'}>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 4, ease } }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.8, ease } }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                >
                  <blockquote className="statement text-h3 text-charcoal">{t.quote}</blockquote>
                  <figcaption className="label mt-8 text-bronze-ink">
                    {t.name} <span className="text-stone">· Google review</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex w-full items-center justify-center gap-6 md:justify-start">
              <button type="button" onClick={() => go(-1)} className={control} aria-label="Previous review">
                <ArrowLeft className="size-4" strokeWidth={1.25} aria-hidden="true" />
              </button>
              <div className="flex items-center gap-2" aria-hidden="true">
                {testimonials.map((_, i) => (
                  <span key={i} className="relative h-px w-8 overflow-hidden bg-charcoal/15">
                    {i === index && (
                      <motion.span
                        className="absolute inset-0 origin-left bg-charcoal"
                        initial={{ scaleX: paused || reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <button type="button" onClick={() => go(1)} className={control} aria-label="Next review">
                <ArrowRight className="size-4" strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Recognition and press */}
        <Reveal group className="mt-band grid grid-cols-1 border-t border-line-light sm:grid-cols-2 lg:grid-cols-4">
          {recognition.map((r) => (
            <Reveal.Item key={r.title} className="flex flex-col items-center gap-2 border-b border-line-light py-8 text-center sm:items-start sm:pr-8 sm:text-left lg:border-b-0">
              <span className="label text-bronze-ink">{r.year}</span>
              <span className="font-display text-h4 text-charcoal">{r.title}</span>
              <span className="text-small text-stone">{r.by}</span>
            </Reveal.Item>
          ))}
        </Reveal>
        <Reveal className="flex flex-col items-center gap-4 border-t border-line-light pt-8 text-center text-small text-stone md:flex-row md:gap-10 md:text-left">
          <span className="label text-bronze-ink">In the press</span>
          {press.map((p) => (
            <a key={p.outlet} href={p.href} target="_blank" rel="noopener noreferrer" className="link-line text-charcoal">
              <span className="statement text-[1.0625rem]">{p.outlet}</span> · {p.by}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
