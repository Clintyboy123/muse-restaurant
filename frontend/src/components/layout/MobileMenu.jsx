import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import Photo from '../media/Photo';
import useFocusTrap from '../../hooks/useFocusTrap';
import useScrollLock from '../../hooks/useScrollLock';
import { nav, RESERVE_PATH, site } from '../../content/site';
import { curtain, ease } from '../../utils/motion';

// Full-screen navigation for phones, tablets and small laptops.
// A charcoal curtain drops, the numbered links rise one by one, and the dining room appears alongside on larger screens.
export default function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-dark fixed inset-0 z-40 overflow-y-auto bg-charcoal text-ivory xl:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: curtain } }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: curtain, delay: 0.1 } }}
        >
          {/* The close button lives in the header, which stays above this overlay. Escape also closes. */}
          <div className="shell grid min-h-full grid-cols-1 gap-12 pt-28 pb-10 md:grid-cols-12 md:pt-36">
            <nav aria-label="Main" className="flex flex-col md:col-span-7">
              <ol className="flex flex-col items-center gap-1 md:items-start">
                {nav.map((item, i) => (
                  <li key={item.to} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%', transition: { duration: 4, ease, delay: 0.25 + i * 0.06 } }}
                      exit={{ y: '110%', transition: { duration: 0.6, ease: curtain } }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-[1.1] font-light transition-colors duration-300 ${
                            isActive ? 'text-ivory' : 'text-ivory/60 hover:text-ivory'
                          }`
                        }
                      >
                        <span className="label hidden w-6 text-bronze-light md:inline">{String(i + 1).padStart(2, '0')}</span>
                        <span className="group-hover:italic">{item.label}</span>
                      </NavLink>
                    </motion.div>
                  </li>
                ))}
              </ol>

              <motion.div
                className="mt-12 flex flex-col items-center gap-8 md:items-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 4, ease, delay: 0.7 } }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
              >
                <Button to={RESERVE_PATH} variant="ivory" onClick={onClose} className="w-full max-w-xs md:w-auto">
                  Reserve a table
                </Button>
                <div className="flex flex-col items-center gap-1 text-small text-mist md:items-start">
                  <a href={site.phone.href} className="link-line text-ivory">
                    {site.phone.display}
                  </a>
                  <span>
                    {site.hours[0].short} · {site.hours[0].time}
                  </span>
                </div>
                <SocialLinks className="-ml-3" />
              </motion.div>
            </nav>

            <motion.div
              className="frame relative hidden md:col-span-5 md:block"
              initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 4, ease, delay: 0.35 } }}
              exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
            >
              <Photo id="interior" sizes="40vw" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6 pt-24">
                <p className="label text-ivory/80">{site.address.lines[0]}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
