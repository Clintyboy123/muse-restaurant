import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ease } from '../../utils/motion';

// Back to top, bottom right. Appears after the first screen; its ring traces how far down the page you are.
export default function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const ring = scrollYProgress; // follows the scroll exactly (no spring)
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.9));

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          className="group fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-charcoal/80 text-ivory shadow-lg shadow-black/20 backdrop-blur-md md:right-6 md:bottom-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.6, ease } }}
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="23" fill="none" stroke="rgb(242 238 230 / 0.18)" strokeWidth="1" />
            <motion.circle cx="24" cy="24" r="23" fill="none" stroke="var(--color-bronze-light)" strokeWidth="1" style={{ pathLength: ring }} />
          </svg>
          <ArrowUp className="size-4 transition-transform duration-500 ease-site group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
