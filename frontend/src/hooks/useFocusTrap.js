import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Keeps keyboard focus inside `ref` while `active`, focuses the first element, and returns focus afterwards.
export default function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const node = ref.current;
    const previous = document.activeElement;
    const items = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);
    const first = items()[0];
    requestAnimationFrame(() => first?.focus({ preventScroll: true }));

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const [start, end] = [list[0], list[list.length - 1]];
      if (e.shiftKey && document.activeElement === start) {
        e.preventDefault();
        end.focus();
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault();
        start.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      if (previous && typeof previous.focus === 'function') previous.focus({ preventScroll: true });
    };
  }, [ref, active]);
}
