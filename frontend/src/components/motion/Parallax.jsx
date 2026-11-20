import { useRef } from 'react';
import { motion } from 'motion/react';
import useParallax from '../../hooks/useParallax';

// Wrap anything to give it its own scroll speed. See hooks/useParallax.js.
//   <Parallax speed={70}><Emblem /></Parallax>
export default function Parallax({ speed = 40, as = 'div', className = '', children, ...props }) {
  const ref = useRef(null);
  const y = useParallax(ref, speed);
  const Tag = motion[as];
  return (
    <Tag ref={ref} className={className} style={{ y }} {...props}>
      {children}
    </Tag>
  );
}
