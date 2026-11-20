import { motion } from 'motion/react';
import wordmark from './wordmark.json';
import { curtain, ease } from '../../utils/motion';

// The MUSE wordmark, traced from the restaurant's own vector artwork (wine list cover):
// a bar above, a bar below, and the geometric letters between. Colour comes from `currentColor`.
//   <Wordmark className="w-28" />                 static
//   <Wordmark animate play={ready} />             bars draw out from the centre, then the letters rise
const LETTERS = ['M', 'U', 'S', 'E'];

export default function Wordmark({ className = '', title = 'Muse', animate = false, play = true, delay = 0 }) {
  if (!animate) {
    return (
      <svg viewBox={wordmark.viewBox} className={className} role="img" aria-label={title} fill="currentColor">
        {wordmark.bars.map((d, i) => (
          <path key={`b${i}`} d={d} />
        ))}
        {LETTERS.map((l) => (
          <path key={l} d={wordmark.letters[l]} fillRule="evenodd" />
        ))}
      </svg>
    );
  }

  const state = play ? 'visible' : 'hidden';
  const bar = {
    hidden: { scaleX: 0 },
    visible: (i) => ({ scaleX: 1, transition: { duration: 4, ease: curtain, delay: delay + i * 0.08 } }),
  };
  const letter = {
    hidden: { y: 70, opacity: 0 },
    visible: (i) => ({ y: 0, opacity: 1, transition: { duration: 4, ease, delay: delay + 0.45 + i * 0.09 } }),
  };

  return (
    <svg viewBox={wordmark.viewBox} className={className} role="img" aria-label={title} fill="currentColor" overflow="hidden">
      <defs>
        {/* Letters rise inside the space between the two bars. */}
        <clipPath id="muse-letter-window">
          <rect x="0" y="9" width="400" height="71.5" />
        </clipPath>
      </defs>
      {wordmark.bars.map((d, i) => (
        <motion.path key={`b${i}`} d={d} custom={i} variants={bar} initial="hidden" animate={state} style={{ transformBox: 'fill-box', originX: 0.5 }} />
      ))}
      <g clipPath="url(#muse-letter-window)">
        {LETTERS.map((l, i) => (
          <motion.path key={l} d={wordmark.letters[l]} fillRule="evenodd" custom={i} variants={letter} initial="hidden" animate={state} />
        ))}
      </g>
    </svg>
  );
}
