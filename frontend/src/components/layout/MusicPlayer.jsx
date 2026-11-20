import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp, Music, Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { tracks } from '../../content/music';
import { useIntro } from '../../context/IntroContext';
import { ease, easyEase } from '../../utils/motion';

// The Muse soundtrack: a round "Sound" control fixed bottom left.
// Music starts by itself, fading in, on every page load as soon as the intro hands over to the page. Browsers don't
// allow sound before the visitor has interacted with a page, so if that first attempt is blocked, it starts on their
// first click, tap or key press anywhere (the "Skip intro" button counts). Switching it off holds for the rest of
// the visit; the next load starts the music again. Play and pause fade in and out; the volume is remembered.
const VOLUME = 'muse-volume';
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: preferences simply aren't remembered */
  }
};
const initialVolume = () => {
  const v = parseFloat(read(VOLUME));
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.4;
};
const time = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');

// Four hairline bars that breathe while music plays.
// The round button's icon: a music note. Playing, it turns bronze and bobs gently; off, it is struck through.
function NoteIcon({ playing }) {
  return (
    <span className="relative flex size-5 items-center justify-center" aria-hidden="true">
      <motion.span
        className={`flex transition-colors duration-500 ${playing ? 'text-bronze-light' : 'text-ivory/80'}`}
        animate={playing ? { y: [0, -2.5, 0], rotate: [0, -6, 0] } : { y: 0, rotate: 0 }}
        transition={playing ? { duration: 2.4, repeat: Infinity, ease: easyEase } : { duration: 0.5, ease: easyEase }}
      >
        <Music className="size-[1.125rem]" strokeWidth={1.5} />
      </motion.span>
      <motion.span
        className="absolute h-px w-6 origin-center -rotate-45 bg-ivory"
        initial={false}
        animate={{ scaleX: playing ? 0 : 1, opacity: playing ? 0 : 0.85 }}
        transition={{ duration: 0.5, ease: easyEase }}
      />
    </span>
  );
}

function Bars({ playing }) {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0.55, 0.9, 0.4, 0.7].map((h, i) => (
        <motion.span
          key={i}
          className="w-px bg-current"
          initial={false}
          animate={playing ? { height: ['25%', '100%', '45%', '85%', '25%'] } : { height: `${h * 35}%` }}
          transition={playing ? { duration: 1.3 + i * 0.27, repeat: Infinity, ease: easyEase } : { duration: 0.5, ease: easyEase }}
        />
      ))}
    </span>
  );
}

const iconButton = 'flex size-11 items-center justify-center text-ivory/75 transition-colors duration-300 hover:text-ivory';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const offThisVisit = useRef(false); // the visitor switched it off during this visit
  const fadeRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const target = muted ? 0 : volume;

  const fadeTo = useCallback((level, ms, done) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      audio.volume = from + (level - from) * (t * t * (3 - 2 * t));
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(target, 1800);
        return true;
      })
      .catch(() => {
        setPlaying(false);
        return false;
      });
  }, [fadeTo, target]);

  const pause = useCallback(() => {
    setPlaying(false);
    fadeTo(0, 500, () => audioRef.current?.pause());
  }, [fadeTo]);

  const toggle = () => {
    if (playing) {
      offThisVisit.current = true;
      return pause();
    }
    offThisVisit.current = false;
    return play();
  };

  // Autoplay. Listen for the visitor's first interaction from the start (that is when browsers allow sound),
  // and also try as soon as the intro hands over, which works where the browser already allows it.
  // Clicks on the player itself are left to the player's own buttons.
  const { introDone } = useIntro();
  const rootRef = useRef(null);
  const autoTried = useRef(false);
  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchend'];
    const remove = () => events.forEach((e) => window.removeEventListener(e, start, true));
    function start(e) {
      if (rootRef.current?.contains(e.target)) return;
      remove();
      if (audioRef.current?.paused && !offThisVisit.current) play();
    }
    events.forEach((e) => window.addEventListener(e, start, true));
    return remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!introDone || autoTried.current || offThisVisit.current) return;
    autoTried.current = true;
    if (audioRef.current?.paused) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone]);

  const go = (step) => setIndex((i) => (i + step + tracks.length) % tracks.length);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    audioRef.current?.load();
    if (playing) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playing) {
      cancelAnimationFrame(fadeRef.current);
      audio.volume = target;
    }
    write(VOLUME, String(volume));
  }, [target, volume, playing]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!tracks.length) return null;

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const track = tracks[index];
  const pct = progress.duration ? (progress.current / progress.duration) * 100 : 0;

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-40 md:bottom-6 md:left-6">
      <audio
        ref={audioRef}
        src={track.src}
        preload="auto"
        onEnded={() => go(1)}
        onTimeUpdate={(e) => setProgress({ current: e.currentTarget.currentTime, duration: e.currentTarget.duration })}
        onLoadedMetadata={(e) => setProgress({ current: 0, duration: e.currentTarget.duration })}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="music-panel"
            role="region"
            aria-label="Music player"
            className="absolute bottom-full left-0 mb-3 w-[min(19rem,calc(100vw-2rem))] rounded-btn border border-line-dark bg-charcoal/95 p-5 text-ivory shadow-2xl shadow-black/40 backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.6, ease } }}
          >
            <p className="label text-bronze-light">Now playing</p>
            <p className="statement mt-2 truncate text-h4" aria-live="polite">
              {track.title}
            </p>
            <p className="mt-1 text-[0.75rem] text-mist">{track.note}</p>

            <div className="mt-5 h-px w-full bg-ivory/15">
              <div className="h-px bg-bronze-light transition-[width] duration-300 ease-site" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[0.6875rem] tabular-nums text-mist">
              <span>{time(progress.current)}</span>
              <span>{time(progress.duration)}</span>
            </div>

            <div className="mt-1 flex items-center justify-center gap-3">
              <button type="button" onClick={() => go(-1)} className={iconButton} aria-label="Previous track">
                <SkipBack className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggle}
                className="flex size-12 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-colors duration-300 hover:border-bronze-light hover:bg-bronze-light hover:text-charcoal"
                aria-label={playing ? 'Pause music' : 'Play music'}
              >
                {playing ? <Pause className="size-4" strokeWidth={1.5} aria-hidden="true" /> : <Play className="ml-0.5 size-4" strokeWidth={1.5} aria-hidden="true" />}
              </button>
              <button type="button" onClick={() => go(1)} className={iconButton} aria-label="Next track">
                <SkipForward className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={() => setMuted((m) => !m)} className={`${iconButton} -ml-3`} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>
                <VolumeIcon className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <label htmlFor="music-volume" className="sr-only">
                Volume
              </label>
              <input
                id="music-volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setMuted(false);
                }}
                className="range flex-1"
                style={{ '--fill': `${(muted ? 0 : volume) * 100}%` }}
              />
            </div>

            {tracks.length > 1 && (
              <ol className="mt-4 border-t border-line-dark pt-2">
                {tracks.map((t, i) => (
                  <li key={t.src}>
                    <button
                      type="button"
                      onClick={() => {
                        if (i === index) return toggle();
                        offThisVisit.current = false;
                        setIndex(i);
                        if (!playing) setTimeout(play, 0);
                        return undefined;
                      }}
                      className={`flex min-h-11 w-full items-center justify-between gap-3 text-left text-small transition-colors duration-300 ${i === index ? 'text-ivory' : 'text-mist hover:text-ivory'}`}
                      aria-current={i === index ? 'true' : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-5 text-[0.6875rem] tabular-nums text-bronze-light">{String(i + 1).padStart(2, '0')}</span>
                        {t.title}
                      </span>
                      {i === index && <Bars playing={playing} />}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Round icon button. On hover, keyboard focus or tap it expands into a pill showing the label and the
          player toggle; it stays expanded while the player panel is open. Widths ease open with Easy Ease. */}
      <div
        data-open={open || undefined}
        className="group flex h-12 items-stretch overflow-hidden rounded-full border border-ivory/20 bg-charcoal/80 text-ivory shadow-lg shadow-black/20 backdrop-blur-md transition-[border-color] duration-500 hover:border-ivory/40 data-[open]:border-ivory/40"
      >
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Turn music off' : 'Turn music on'}
          title={playing ? 'Sound on' : 'Sound off'}
          className="flex min-w-[2.875rem] items-center justify-center px-[0.8125rem] transition-colors duration-300 hover:text-bronze-light"
        >
          <NoteIcon playing={playing} />
          <span
            className="label hidden max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-500 sm:inline-block sm:group-hover:ml-3 sm:group-hover:max-w-[7rem] sm:group-hover:opacity-100 sm:group-has-[:focus-visible]:ml-3 sm:[@media(hover:none)]:group-focus-within:ml-3 sm:group-has-[:focus-visible]:max-w-[7rem] sm:[@media(hover:none)]:group-focus-within:max-w-[7rem] sm:group-has-[:focus-visible]:opacity-100 sm:[@media(hover:none)]:group-focus-within:opacity-100 sm:group-data-[open]:ml-3 sm:group-data-[open]:max-w-[7rem] sm:group-data-[open]:opacity-100"
            aria-hidden="true"
          >
            {playing ? 'Sound on' : 'Sound off'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="music-panel"
          aria-label={open ? 'Close music player' : 'Open music player'}
          className="flex w-0 items-center justify-center overflow-hidden border-ivory/15 text-ivory/70 opacity-0 transition-[width,opacity] duration-500 group-hover:w-10 group-hover:border-l group-hover:opacity-100 group-has-[:focus-visible]:w-10 [@media(hover:none)]:group-focus-within:w-10 group-has-[:focus-visible]:border-l [@media(hover:none)]:group-focus-within:border-l group-has-[:focus-visible]:opacity-100 [@media(hover:none)]:group-focus-within:opacity-100 group-data-[open]:w-10 group-data-[open]:border-l group-data-[open]:opacity-100 hover:text-ivory"
        >
          <ChevronUp className={`size-4 shrink-0 transition-transform duration-500 ease-site ${open ? 'rotate-180' : ''}`} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
