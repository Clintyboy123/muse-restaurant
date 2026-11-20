import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Photo from '../media/Photo';
import Wordmark from '../brand/Wordmark';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';
import { useIntro } from '../../context/IntroContext';
import { RESERVE_PATH } from '../../content/site';
import { curtain, ease } from '../../utils/motion';

// Home hero. One plate, lit like a painting, fills the screen; the MUSE wordmark and the line
// "An Artful Expression of Food." sit in the dark of the timber beside it.
// Entrance (after the loader): the photograph settles from a slow zoom while its mask opens, then the words rise.
// On scroll the photograph drifts slower than the page and the type lifts away.
export default function HomeHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { introDone } = useIntro();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const play = introDone;

  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: play ? { opacity: 1, y: 0, transition: { duration: 5, ease, delay } } : {},
  });

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory" aria-label="Welcome to Muse">
      {/* Photograph */}
      {/* Phones: full bleed. Desktop: the plate hangs on the right two-thirds and feathers into the dark,
          like a painting under a single light, leaving true charcoal for the type. */}
      <motion.div className="absolute inset-0 -z-10 lg:left-[42%] xl:left-[36%]" style={reduce ? undefined : { y: imageY }}>
        <motion.div
          className="grain absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_32%,black_100%)]"
          initial={{ opacity: 0, filter: 'blur(24px)' }}
          animate={play ? { opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 6, ease } } : {}}
        >
          <Photo id="hero" priority sizes="(min-width: 1024px) 64vw, 100vw" alt="" className="h-full w-full object-cover object-[60%_50%] lg:object-[38%_50%]" />
        </motion.div>
        {/* Gentle vignette so the photograph's edges sit back */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,transparent_35%,rgb(23_24_22/0.55)_100%)]" />
      </motion.div>
      {/* Phones: darken the lower half where the type sits */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/10 lg:hidden" />

      <motion.div className="shell flex flex-1 flex-col justify-end pt-32 pb-28 lg:justify-center lg:pb-24" style={reduce ? undefined : { y: textY, opacity: fadeOut }}>
        <div className="flex max-w-[42rem] flex-col items-center text-center md:items-start md:text-left">
          <motion.p className="label flex items-center gap-4 text-bronze-light" {...rise(0.2)}>
            <span className="hidden h-px w-10 bg-current opacity-60 md:block" aria-hidden="true" />
            Fine dining · Gqeberha
          </motion.p>

          <h1 className="mt-8">
            <span className="sr-only">Muse Restaurant. An Artful Expression of Food.</span>
            <Wordmark animate play={play} delay={0.25} title="Muse" className="w-[min(78vw,30rem)] text-ivory" />
          </h1>

          <SplitHeading
            as="p"
            parts={[{ text: 'An Artful Expression of Food.', em: true }]}
            play={play}
            delay={0.95}
            className="mt-10 text-h2 text-ivory lg:max-w-[24rem] xl:max-w-none"
          />

          <motion.p className="mt-8 max-w-[28rem] text-lead text-ivory/80" {...rise(1.35)}>
            Where seasonal ingredients, creative expression and thoughtful craftsmanship come together.
          </motion.p>

          <motion.div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row md:items-start" {...rise(1.55)}>
            <Button to="/the-restaurant" variant="ivory" className="w-full sm:w-auto">
              Explore our menu
            </Button>
            <Button to={RESERVE_PATH} variant="ghost-light" className="w-full sm:w-auto">
              Reserve a table
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom rail: scroll cue and the wall label for the plate */}
      <motion.div
        className="shell pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 md:justify-between"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1, transition: { duration: 4, ease: curtain, delay: 1.9 } } : {}}
      >
        <a
          href="#philosophy"
          className="pointer-events-auto absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/70 transition-colors hover:text-ivory md:flex"
          aria-label="Scroll to the next section"
        >
          <span className="label">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/20" aria-hidden="true">
            <span className="absolute inset-0 animate-scroll-cue bg-ivory motion-reduce:animate-none" />
          </span>
        </a>
        <span className="hidden md:block" aria-hidden="true" />
        <p className="hidden text-right text-small text-ivory/65 md:block">
          <span className="label mr-3 text-bronze-light">Plate No. 01</span>
          <span className="statement text-[1.0625rem]">From the Muse kitchen, Walmer</span>
        </p>
      </motion.div>
    </section>
  );
}
