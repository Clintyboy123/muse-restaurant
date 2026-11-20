import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { RESERVE_PATH } from '../../content/site';
import { ease } from '../../utils/motion';

// Phones only: once past the first screen, a "Reserve" button sits between the sound and back-to-top controls,
// so booking is always one tap away. Hidden on the contact page, where the form already is.
export default function MobileReserve() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && pathname !== '/contact' && (
        <motion.div
          className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-[7.25rem] md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.6, ease } }}
        >
          <Link to={RESERVE_PATH} className="btn btn-ivory h-12 min-h-12 w-full max-w-[14rem] shadow-lg shadow-black/25">
            Reserve
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
