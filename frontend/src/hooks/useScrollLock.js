import { useEffect } from 'react';

// Stops the page behind an overlay (menu, lightbox) from scrolling, without the layout jumping.
export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const { style } = document.documentElement;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const before = { overflow: style.overflow, paddingRight: style.paddingRight };
    style.overflow = 'hidden';
    if (gap > 0) style.paddingRight = `${gap}px`;
    return () => {
      style.overflow = before.overflow;
      style.paddingRight = before.paddingRight;
    };
  }, [active]);
}
