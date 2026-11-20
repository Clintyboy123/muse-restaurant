import useSeo from '../hooks/useSeo';
import HomeHero from '../components/sections/HomeHero';
import Philosophy from '../components/sections/Philosophy';
import Experience from '../components/sections/Experience';
import SignatureGallery from '../components/sections/SignatureGallery';
import ChefsTeaser from '../components/sections/ChefsTeaser';
import MenuPreview from '../components/sections/MenuPreview';
import EventsTeaser from '../components/sections/EventsTeaser';
import Reviews from '../components/sections/Reviews';
import FinalCta from '../components/sections/FinalCta';

export default function Home() {
  useSeo({
    description:
      'Muse is a fine-dining restaurant in Walmer, Gqeberha, run by chefs Allan and Simone Bezuidenhout: seasonal Nouvelle cuisine, beautifully presented, in an intimate dining room. Reserve a table.',
    path: '/',
  });
  return (
    <>
      <HomeHero />
      <Philosophy />
      <Experience />
      <SignatureGallery />
      <ChefsTeaser />
      <MenuPreview />
      <EventsTeaser />
      <Reviews />
      <FinalCta />
    </>
  );
}
