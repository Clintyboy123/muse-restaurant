import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import useMediaQuery from './useMediaQuery';

// Layered parallax: returns a `y` motion value that moves an element at a different speed from the page.
// `distance` (px) is how far it travels either side of its resting place while crossing the screen:
// positive = rises faster than the page (feels closer), negative = lags behind (feels further away).
// Phones get half the distance; visitors who prefer reduced motion get none.
//   const ref = useRef(null); const y = useParallax(ref, 60); <motion.div ref={ref} style={{ y }} />
// One knob for the whole site: raise or lower every parallax layer at once.
export const PARALLAX_STRENGTH = 1.5;

export default function useParallax(ref, distance = 0) {
  const reduce = useReducedMotion();
  const small = useMediaQuery('(max-width: 767px)');
  const d = reduce ? 0 : (small ? distance / 2 : distance) * PARALLAX_STRENGTH;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return useTransform(scrollYProgress, [0, 1], [d, -d]);
}
