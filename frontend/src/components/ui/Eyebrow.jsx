import { motion } from 'motion/react';
import { drawLine, fade, inViewOnce } from '../../utils/motion';

// Section label in the style of a gallery room number: "IV —— THE CHEFS".
// tone: 'light' on light grounds, 'dark' on dark grounds.
export default function Eyebrow({ numeral, children, tone = 'light', className = '', animate = true }) {
  const colour = tone === 'dark' ? 'text-bronze-light' : 'text-bronze-ink';
  const props = animate ? { initial: 'hidden', whileInView: 'visible', viewport: inViewOnce } : {};
  return (
    <motion.p className={`label flex items-center gap-4 ${colour} ${className}`} {...props}>
      {numeral && (
        <motion.span variants={fade} className="font-display text-[1.0625rem] font-medium normal-case tracking-[0.08em]">
          {numeral}
        </motion.span>
      )}
      {numeral && <motion.span variants={drawLine} className="block h-px w-10 origin-left bg-current opacity-60" aria-hidden="true" />}
      <motion.span variants={fade}>{children}</motion.span>
    </motion.p>
  );
}
