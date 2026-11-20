import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Photo from '../media/Photo';
import SplitHeading from '../ui/SplitHeading';
import { useIntro } from '../../context/IntroContext';
import { curtain, ease } from '../../utils/motion';

// Opening scene for inner pages: a dark photograph, the page's label, a large title with one italic phrase,
// and a short introduction. Same structure on every page so the site reads as one publication.
//   <PageHero eyebrow="Menu & wine" title={[{ text: 'The' }, { text: 'Restaurant', em: true }]} photo="interior" intro="…" />
export default function PageHero({ eyebrow, title, intro, photo, position = '50% 50%', children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { introDone } = useIntro();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden bg-charcoal text-ivory md:min-h-[86svh]">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y }}>
        <motion.div
          className="grain absolute inset-0"
          initial={{ opacity: 0, filter: 'blur(24px)' }}
          animate={introDone ? { opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 6, ease } } : {}}
        >
          <Photo id={photo} priority sizes="100vw" alt="" className="h-full w-full object-cover" style={{ objectPosition: position }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
      </motion.div>

      <motion.div className="shell pt-40 pb-16 md:pb-24" style={reduce ? undefined : { opacity: fadeOut }}>
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            className="label flex items-center gap-4 text-bronze-light"
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0, transition: { duration: 4, ease, delay: 0.5 } } : {}}
          >
            <motion.span
              className="hidden h-px w-10 origin-left bg-current opacity-60 md:block"
              initial={{ scaleX: 0 }}
              animate={introDone ? { scaleX: 1, transition: { duration: 4, ease: curtain, delay: 0.6 } } : {}}
              aria-hidden="true"
            />
            {eyebrow}
          </motion.p>
          <SplitHeading as="h1" parts={title} play={introDone} delay={0.65} className="mt-6 max-w-[14ch] text-h1 display" />
          {intro && (
            <motion.p
              className="mt-8 max-w-[36rem] text-lead text-ivory/80"
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0, transition: { duration: 5, ease, delay: 1.1 } } : {}}
            >
              {intro}
            </motion.p>
          )}
          {children && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={introDone ? { opacity: 1, y: 0, transition: { duration: 5, ease, delay: 1.25 } } : {}}
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
