import { motion } from 'motion/react';
import { inViewOnce, lineUp, stagger } from '../../utils/motion';

// A heading whose words rise out of their own masks, one after another.
// `parts`: a string, or an array of { text, em } where em renders as italic serif.
// The full sentence is read by screen readers once; the animated words are hidden from them.
export default function SplitHeading({ as = 'h2', parts, className = '', delay = 0, play, gap = 0.06 }) {
  const Tag = motion[as];
  const list = typeof parts === 'string' ? [{ text: parts }] : parts;
  const label = list.map((p) => p.text).join(' ');
  const trigger = play === undefined ? { whileInView: 'visible', viewport: inViewOnce } : { animate: play ? 'visible' : 'hidden' };

  return (
    <Tag className={`text-balance ${className}`} aria-label={label} initial="hidden" variants={stagger(gap, delay)} {...trigger}>
      {list.map((part, p) => (
        <span key={p} className={part.em ? 'statement' : undefined} aria-hidden="true">
          {part.text.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span className="inline-block will-change-transform" variants={lineUp}>
                {word}
              </motion.span>
              {' '}
            </span>
          ))}
          {part.break && <br />}
        </span>
      ))}
    </Tag>
  );
}
