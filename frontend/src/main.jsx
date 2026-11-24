import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { BASE } from './utils/asset';
import './styles/index.css';

// Reloading the site always starts again on the home page, at the top (the intro plays, then the hero).
// A fresh visit to a specific page (a shared or bookmarked link) still opens that page.
// The browser's own "restore my old scroll position" is switched off, so every load starts at the top.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
const navigation = performance.getEntriesByType?.('navigation')?.[0];
if (navigation?.type === 'reload' && (window.location.pathname !== BASE || window.location.search || window.location.hash)) {
  window.history.replaceState(null, '', BASE);
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
