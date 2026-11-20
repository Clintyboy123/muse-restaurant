// The site's motion language, defined once so every animation shares the same timing and easing.
// Keep in step with --ease-site / --ease-curtain / --default-transition-timing-function in styles/index.css.
//
// Spec (Muse animation timing): every animation uses one sophisticated ease-out, cubic-bezier(0.16, 1, 0.3, 1):
// a quicker, noticeable start that decelerates and glides gently into place, never stopping abruptly.
// Major animations (entrances, image reveals, text transitions, heroes, page reveals) run 4–6 seconds; because the
// curve front-loads the movement, they land quickly and spend the rest settling. Direct UI feedback (hover, menu
// open, tabs, panels) uses the same curve but stays short, so the site always feels responsive.
export const luxEase = [0.16, 1, 0.3, 1];
// Older names, kept so every import uses the same curve.
export const easyEase = luxEase;
export const ease = luxEase;
export const curtain = luxEase;

export const duration = {
  micro: 0.6, // hover, tap and small state feedback
  ui: 1.2, // menus, panels, tabs, header show/hide
  major: 4, // scroll entrances, image reveals, text transitions
  prominent: 5, // hero type, section-defining moments
  cinematic: 6, // hero photographs
};

// Fade up into place: the default entrance for blocks of text.
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.major, ease } },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.major, ease } },
};

// Put on a parent so its children arrive one after another.
export const stagger = (gap = 0.1, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

// A word of a heading rising out of its own mask.
export const lineUp = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: duration.major, ease } },
};

// A card (framed photo, tile) floating up into place as it scrolls into view.
export const floatUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.major, ease } },
};

// A photograph blurring into focus. The filter is removed afterwards so it costs nothing at rest.
export const blurIn = {
  hidden: { filter: 'blur(20px)' },
  visible: { filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 4.5, ease } },
};

// Delay helper for variants: withDelay(floatUp, 0.2)
export const withDelay = (variants, delay = 0) => ({
  ...variants,
  visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } },
});

// A hairline drawing across.
export const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: duration.major, ease } },
};

export const inViewOnce = { once: true, amount: 0.25 };
