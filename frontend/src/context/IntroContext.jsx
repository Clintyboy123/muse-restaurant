import { createContext, useContext } from 'react';

// Tells the page whether the opening MUSE loader has finished, so the hero can start its entrance
// the moment the curtain lifts (and not behind it).
export const IntroContext = createContext({ introDone: true });
export const useIntro = () => useContext(IntroContext);
