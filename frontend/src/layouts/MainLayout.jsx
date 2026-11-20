import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Intro from '../components/layout/Intro';
import MusicPlayer from '../components/layout/MusicPlayer';
import ScrollTop from '../components/layout/ScrollTop';
import MobileReserve from '../components/layout/MobileReserve';
import SocialRail from '../components/layout/SocialRail';
import { IntroContext } from '../context/IntroContext';
import { curtain, ease } from '../utils/motion';

// Scroll to an anchor (e.g. /contact#reserve) once the new page has arrived.
function useHashScroll(pathname, hash) {
  useEffect(() => {
    if (!hash) return undefined;
    let tries = 0;
    let timer;
    // Wait for the curtain to lift, then for the (lazily loaded) page to contain the anchor.
    const go = () => {
      const el = document.getElementById(hash.slice(1));
      if (!el) {
        if (tries++ < 60) timer = setTimeout(go, 100);
        return;
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    timer = setTimeout(go, 900);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
}

// Page change: a charcoal curtain rises over the old page, the new page loads beneath it at the top,
// and the curtain carries on upwards to reveal it.
function Curtain({ reveal }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] origin-bottom bg-charcoal"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.9, ease: curtain } }}
        aria-hidden="true"
      />
      {reveal && (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-charcoal"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 4, ease: curtain, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
        aria-hidden="true"
      />
      )}
    </>
  );
}

export default function MainLayout({ children }) {
  const location = useLocation();
  // The intro (logo animation) plays on every full page load; the page's own entrances wait for it.
  const [introDone, setIntroDone] = useState(false);
  const revealPage = useCallback(() => setIntroDone(true), []);
  const [firstPage, setFirstPage] = useState(true);
  useHashScroll(location.pathname, location.hash);

  return (
    <IntroContext.Provider value={{ introDone }}>
      <Intro onReveal={revealPage} />

      <a href="#main" className="label sr-only z-[110] bg-ivory px-4 py-3 text-charcoal focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        Skip to content
      </a>

      <Header />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setFirstPage(false);
          // Always start the new page at the top (hidden by the curtain); anchors then glide into place.
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        <motion.div key={location.pathname} className="flex min-h-dvh flex-col" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1, transition: { duration: 0.9, ease } }}>
          {/* The first page arrives through the intro, so it doesn't need the reveal curtain too. */}
          <Curtain reveal={!firstPage} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>

      <SocialRail />
      <MusicPlayer />
      <MobileReserve />
      <ScrollTop />
    </IntroContext.Provider>
  );
}
