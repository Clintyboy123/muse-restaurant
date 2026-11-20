import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Wordmark from '../brand/Wordmark';
import { curtain, ease } from '../../utils/motion';

// The opening moment, once per visit: the MUSE bars draw out from the centre, the letters rise between them,
// and the charcoal curtain lifts to reveal the page. It waits for the fonts (never longer than 3.2s in total)
// so the hero never appears in a fallback typeface. Visitors who prefer reduced motion get a short fade.
const KEY = 'muse-intro-seen';

export const introAlreadySeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

export default function Loader({ onDone }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minimum = new Promise((r) => setTimeout(r, reduce ? 300 : 2600));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise((r) => setTimeout(r, 3200));
    let cancelled = false;
    Promise.race([Promise.all([minimum, fonts]), cap]).then(() => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* storage unavailable: the intro simply plays again next time */
      }
      setVisible(false);
      // Hand over to the page as the curtain starts to lift, so the hero animates in underneath it.
      onDone?.();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-ivory"
          initial={{ y: '0%' }}
          exit={reduce ? { opacity: 0, pointerEvents: 'none', transition: { duration: 0.4, ease } } : { y: '-100%', pointerEvents: 'none', transition: { duration: 4, ease: curtain } }}
          aria-hidden="true"
        >
          <motion.div exit={{ y: '-30%', opacity: 0, transition: { duration: 3, ease: curtain } }} className="flex flex-col items-center">
            <Wordmark animate={!reduce} play className="w-[min(62vw,22rem)]" />
            <motion.p
              className="label mt-8 text-bronze-light"
              initial={{ opacity: 0, letterSpacing: '0.18em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em', transition: { duration: 4, ease, delay: 0.9 } }}
            >
              Fine dining · Gqeberha
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
