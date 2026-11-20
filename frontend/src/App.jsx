import { lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { duration, luxEase } from './utils/motion';
import Home from './pages/Home';

// The home page ships in the main bundle; every other page loads on demand.
const Restaurant = lazy(() => import('./pages/Restaurant'));
const OurStory = lazy(() => import('./pages/OurStory'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();

  return (
    // reducedMotion="user": visitors who ask their device for less motion get fades without movement.
    // transition: any animation that doesn't set its own timing uses the site's ease-out curve.
    <MotionConfig reducedMotion="user" transition={{ duration: duration.ui, ease: luxEase }}>
      <MainLayout>
        <Suspense fallback={<div className="min-h-dvh bg-charcoal" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/the-restaurant" element={<Restaurant />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/events-and-catering" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </MotionConfig>
  );
}
