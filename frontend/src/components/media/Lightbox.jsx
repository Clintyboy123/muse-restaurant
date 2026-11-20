import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Photo from './Photo';
import useFocusTrap from '../../hooks/useFocusTrap';
import useScrollLock from '../../hooks/useScrollLock';
import { ease } from '../../utils/motion';

// Full-screen viewer. Arrow keys, swipe, or the buttons move between photographs; Escape or the close button exits.
//   <Lightbox images={photos} index={i} onClose={() => setI(null)} onIndex={setI} />
export default function Lightbox({ images, index, onClose, onIndex }) {
  const ref = useRef(null);
  const open = index !== null && index !== undefined;
  const [direction, setDirection] = useState(1);
  useFocusTrap(ref, open);
  useScrollLock(open);

  const go = useCallback(
    (step) => {
      setDirection(step);
      onIndex((i) => (i + step + images.length) % images.length);
    },
    [images.length, onIndex]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, go]);

  const image = open ? images[index] : null;
  const control = 'flex size-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-charcoal';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="on-dark fixed inset-0 z-[70] flex flex-col bg-charcoal/97 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.2, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
        >
          <div className="shell flex h-20 shrink-0 items-center justify-between">
            <p className="label text-mist tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
            <button type="button" onClick={onClose} className={control} aria-label="Close viewer">
              <X className="size-5" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={image.id}
                custom={direction}
                className="flex h-full max-h-full w-full flex-col items-center justify-center"
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1.2, ease } }}
                exit={{ opacity: 0, x: direction * -60, transition: { duration: 0.6, ease } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              >
                <Photo image={image} sizes="90vw" priority draggable={false} className="frame max-h-[calc(100svh-12rem)] w-auto max-w-full object-contain select-none" />
                <figcaption className="mt-5 max-w-[60ch] text-center text-small text-mist">{image.alt}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="shell flex h-24 shrink-0 items-center justify-center gap-4">
            <button type="button" onClick={() => go(-1)} className={control} aria-label="Previous photograph">
              <ArrowLeft className="size-5" strokeWidth={1.25} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} className={control} aria-label="Next photograph">
              <ArrowRight className="size-5" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
