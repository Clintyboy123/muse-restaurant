import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Loader from './Loader';
import { easyEase } from '../../utils/motion';
import { asset } from '../../utils/asset';

// The page-load intro: the MUSE logo animation (public/intro/muse-intro.mp4, exported from After Effects as Logo.mp4)
// plays full screen, then dissolves into the page. The page is revealed as the dissolve starts, so the hero animates
// in underneath. The stage is black to match the video's own background, so it blends edge to edge on any screen.
//
// - Plays on every full page load (not when moving between pages inside the site).
// - "Skip intro" ends it straight away.
// - If the video is missing or can't play, or the visitor prefers reduced motion, the drawn MUSE loader runs instead.
// - A safety cap ends it even if the video stalls on a slow connection.
// 4K for large screens, a 1080p copy (made with macOS avconvert) for phones, tablets and laptops up to 1280px.
// INTRO_VERSION: change it whenever the video files are replaced, so every browser fetches the new version
// instead of a copy it cached earlier (the file names stay the same).
const INTRO_VERSION = '2026-11-20';
const pickSource = () =>
  `${typeof window !== 'undefined' && window.matchMedia('(min-width: 1281px)').matches ? asset('intro/muse-intro.mp4') : asset('intro/muse-intro-1080.mp4')}?v=${INTRO_VERSION}`;
export const INTRO_SOURCES = [{ src: pickSource(), type: 'video/mp4' }];
const SAFETY_CAP_MS = 14000;

// Automated test browsers (navigator.webdriver) can skip the intro; real visitors always see it.
const testSkip = () => {
  try {
    return navigator.webdriver && sessionStorage.getItem('muse-intro-seen') === '1';
  } catch {
    return false;
  }
};

export default function Intro({ onReveal }) {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);
  const [mode, setMode] = useState(() => (testSkip() ? 'none' : reduce ? 'loader' : 'video'));
  const [visible, setVisible] = useState(true);
  const revealed = useRef(false);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
  }, [onReveal]);

  const finish = useCallback(() => {
    setVisible(false);
    reveal();
  }, [reveal]);

  useEffect(() => {
    if (mode === 'none') reveal();
  }, [mode, reveal]);

  // Start the video (muted, so browsers allow it). If it can't start, use the drawn loader.
  useEffect(() => {
    if (mode !== 'video') return undefined;
    const v = videoRef.current;
    v?.play().catch(() => setMode('loader'));
    const cap = setTimeout(finish, SAFETY_CAP_MS);
    return () => clearTimeout(cap);
  }, [mode, finish]);

  if (mode === 'none') return null;
  if (mode === 'loader') return <Loader onDone={reveal} />;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 4, ease: easyEase } }}
          role="presentation"
        >
          <video
            ref={videoRef}
            // Landscape: the whole frame. Portrait: enlarged so the wordmark spans about 70% of the screen width.
            className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain portrait:h-auto portrait:w-[240vw] portrait:max-w-none"
            muted
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            onEnded={finish}
            aria-hidden="true"
          >
            {INTRO_SOURCES.map((source, i) => (
              // When the last source fails too, none of them could play: fall back to the drawn loader.
              <source key={source.src} src={source.src} type={source.type} onError={i === INTRO_SOURCES.length - 1 ? () => setMode('loader') : undefined} />
            ))}
          </video>
          <button
            type="button"
            onClick={finish}
            className="label absolute right-6 bottom-6 flex min-h-11 items-center gap-3 rounded-full border border-ivory/25 px-5 text-ivory/70 transition-colors duration-300 hover:border-ivory hover:text-ivory md:right-10 md:bottom-10"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
