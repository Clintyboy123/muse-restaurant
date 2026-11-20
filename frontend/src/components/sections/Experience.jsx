import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import Photo from '../media/Photo';
import Figure from '../media/Figure';
import Reveal from '../Reveal';
import { ease } from '../../utils/motion';

// II. The Experience. Five numbered lines on charcoal, like a list of works in a catalogue.
// On desktop, hovering or focusing a line changes the large photograph beside it (a mask wipes the new one in).
// On phones each line carries its own photograph, so nothing depends on hover.
const pillars = [
  {
    title: 'Seasonal Nouvelle cuisine',
    text: 'A menu that changes with the seasons, built on the best and freshest ingredients available.',
    photo: 'plate-colour',
  },
  {
    title: 'Local and sustainable',
    text: 'Local, seasonal and sustainable produce, from a kitchen that tries to leave a green footprint.',
    photo: 'samphire',
  },
  {
    title: 'Made in house',
    text: 'Pasta, sauces, bread and cakes. Everything we serve is made in our own kitchen.',
    photo: 'bread-stones',
  },
  {
    title: 'Presentation first',
    text: 'The emphasis is on presentation: every plate is composed with an artist’s eye before it leaves the pass.',
    photo: 'plate-carpaccio',
  },
  {
    title: 'An intimate evening',
    text: 'A relaxed atmosphere and unhurried service. Our food takes time and care, so make an evening of it.',
    photo: 'interior',
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section className="section on-dark relative bg-charcoal text-ivory">
      <div className="shell">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Eyebrow numeral="II" tone="dark">
            The experience
          </Eyebrow>
          <SplitHeading className="mt-6 max-w-[16ch] text-h2 display" parts={[{ text: 'Made slowly,', break: true }, { text: 'by hand, for the evening.', em: true }]} />
        </div>

        <div className="mt-band grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <ol className="flex flex-col lg:col-span-6">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} className="border-t border-line-dark last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-1 gap-3 py-8 text-center md:grid-cols-[3.5rem_1fr] md:gap-6 md:text-left"
                >
                  <span className={`label pt-2 transition-colors duration-500 ${active === i ? 'text-bronze-light' : 'text-mist'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex flex-col items-center gap-3 md:items-start">
                    <span className={`font-display text-h3 font-light transition-all duration-500 ease-site ${active === i ? 'text-ivory md:italic md:translate-x-2' : 'text-ivory/70 group-hover:text-ivory'}`}>
                      {p.title}
                    </span>
                    <span className="max-w-[34ch] text-small text-mist lg:hidden">{p.text}</span>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.span
                          className="hidden max-w-[40ch] overflow-hidden text-small text-mist lg:block lg:translate-x-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, transition: { duration: 1.2, ease } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.6, ease } }}
                        >
                          {p.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
                {/* Phones: each line shows its photograph */}
                <Figure id={p.photo} ratio="4/3" sizes="100vw" className="mb-8 md:max-w-[30rem] lg:hidden" parallax={false} />
              </Reveal>
            ))}
          </ol>

          {/* Desktop: one large photograph that follows the active line */}
          <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
            <div className="sticky top-28">
              <div className="frame relative aspect-[4/5] bg-olive">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={pillars[active].photo}
                    className="absolute inset-0"
                    initial={{ opacity: 0, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 4, ease } }}
                    exit={{ opacity: 1, transition: { duration: 4, ease } }}
                  >
                    <motion.div className="h-full w-full scale-[1.06]">
                      <Photo id={pillars[active].photo} sizes="40vw" className="h-full w-full object-cover" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-4 flex items-baseline gap-3 text-small text-mist">
                <span className="label text-bronze-light">No. {String(active + 3).padStart(2, '0')}</span>
                <span className="statement text-[1.0625rem]">{pillars[active].title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
