import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router';
import Wordmark from '../brand/Wordmark';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { nav, RESERVE_PATH } from '../../content/site';
import { ease } from '../../utils/motion';
import { useIntro } from '../../context/IntroContext';

// Navigation. Transparent over each page's dark hero; once the visitor scrolls it becomes a slim charcoal bar.
// It tucks away while scrolling down a long page and returns on the way back up.
// On the home page the logo stays hidden while the hero's large wordmark is on screen, then takes over.
export default function Header() {
  const { pathname } = useLocation();
  const { introDone } = useIntro();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setPastHero(y > window.innerHeight * 0.55);
    setHidden(y > 480 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Publish the header's current height so sticky bars (e.g. the menu tabs) can sit just below it.
  useEffect(() => {
    const h = hidden || !introDone ? '0px' : solid ? '4.5rem' : '6rem';
    document.documentElement.style.setProperty('--header-h', h);
  }, [hidden, solid, introDone]);

  const isHome = pathname === '/';
  const showLogo = !isHome || pastHero || open;

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-site ${
          solid && !open ? 'border-b border-line-dark bg-charcoal/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
        initial={{ y: '-100%' }}
        animate={{ y: introDone && !hidden ? '0%' : '-100%' }}
        transition={{ duration: 1.2, ease, delay: introDone && !solid ? 0.6 : 0 }}
      >
        <div className={`shell flex items-center justify-between gap-8 transition-[height] duration-500 ease-site ${solid ? 'h-[4.5rem]' : 'h-20 md:h-24'}`}>
          <Link
            to="/"
            className={`relative z-10 -my-2 py-2 text-ivory transition-opacity duration-500 ease-site ${showLogo ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-label="Muse Restaurant, home"
            tabIndex={showLogo ? 0 : -1}
          >
            <Wordmark className="h-auto w-[6.25rem] md:w-[7rem]" title="Muse Restaurant" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `label link-line py-2 text-ivory transition-opacity duration-300 ${isActive ? '' : 'opacity-75 hover:opacity-100'}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Button to={RESERVE_PATH} variant="ghost-light" size="sm" className="hidden md:inline-flex">
              Reserve a table
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="group -mr-3 flex size-12 items-center justify-center text-ivory xl:hidden"
            >
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-site ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ease-site ${open ? 'top-1.5 w-full -rotate-45' : 'top-3 w-4 group-hover:w-full'}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
