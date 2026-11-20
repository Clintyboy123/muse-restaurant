import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Photo from './Photo';
import { blurIn, floatUp, withDelay } from '../../utils/motion';
import { photo as getPhoto } from '../../content/photos';
import useParallax from '../../hooks/useParallax';

// A photograph presented like a work on a gallery wall. As it scrolls into view the framed card floats up
// into place and the photo blurs into focus (Easy Ease). Two layers of parallax: the photo drifts inside its
// frame, and (with `speed`) the whole card moves at its own pace against the page. Optional wall label underneath.
//   <Figure id="palette" ratio="4/5" speed={60} label="No. 02" caption="From the winter collection" />
// `matClassName` styles the floating layer itself (e.g. an ivory mat around the frame), so it arrives with the card.
// `drift="gentle"` for photos of people: far less enlargement and movement inside the frame, so nobody gets cropped.
//
// Layers, outside in (each transform on its own element so they never fight):
//   figure   - parallax speed (scroll-linked y) + the in-view trigger
//   div      - float up (entrance y + opacity), carries the caption with it
//   .frame   - bronze frame, shadow, hover zoom
//   div      - blur into focus
//   div      - photo drift inside the frame
export default function Figure({ id, ratio, sizes, className = '', matClassName = '', imgClassName = '', label, caption, tone = 'light', parallax = true, drift: driftAmount = 'normal', speed = 0, priority, position, delay = 0 }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const cardY = useParallax(cardRef, speed);
  const reduce = useReducedMotion();
  const p = getPhoto(id);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const gentle = driftAmount === 'gentle';
  const y = useTransform(scrollYProgress, [0, 1], gentle ? ['-2.5%', '2.5%'] : ['-9%', '9%']);
  const drift = parallax && !reduce;
  const oversize = gentle ? 1.06 : drift ? 1.2 : 1.08;

  return (
    <motion.figure ref={cardRef} className={className} style={speed ? { y: cardY } : undefined} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
      <motion.div className={matClassName} variants={withDelay(floatUp, delay)}>
        <div ref={ref} className="frame relative" style={{ aspectRatio: ratio || `${p.width}/${p.height}`, backgroundColor: p.tone }}>
          <motion.div className="absolute inset-0" variants={withDelay(blurIn, delay)}>
            {/* Slightly oversized even without drift, so the blurred edges never show the frame behind. */}
            <motion.div className="absolute inset-0" style={drift ? { y, scale: oversize } : { scale: oversize }}>
              <Photo image={p} sizes={sizes} priority={priority} className={`h-full w-full object-cover ${imgClassName}`} style={position ? { objectPosition: position } : undefined} />
            </motion.div>
          </motion.div>
        </div>
        {(label || caption) && (
          <figcaption className={`mt-4 flex items-baseline gap-3 text-small ${tone === 'dark' ? 'text-mist' : 'text-stone'} justify-center md:justify-start`}>
            {label && <span className={`label ${tone === 'dark' ? 'text-bronze-light' : 'text-bronze-ink'}`}>{label}</span>}
            {caption && <span className="font-display text-[1.0625rem] italic">{caption}</span>}
          </figcaption>
        )}
      </motion.div>
    </motion.figure>
  );
}
