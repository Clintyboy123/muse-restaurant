import { motion } from 'motion/react';
import useSeo from '../hooks/useSeo';
import PageHero from '../components/sections/PageHero';
import FinalCta from '../components/sections/FinalCta';
import Eyebrow from '../components/ui/Eyebrow';
import SplitHeading from '../components/ui/SplitHeading';
import TextLink from '../components/ui/TextLink';
import Figure from '../components/media/Figure';
import Emblem from '../components/brand/Emblem';
import Reveal from '../components/Reveal';
import Parallax from '../components/motion/Parallax';
import { chefs, milestones } from '../content/story';
import { press } from '../content/reviews';
import { drawLine, ease, inViewOnce } from '../utils/motion';

// One chef's chapter. Alternates sides on desktop; on phones, image first, then the story, all centred.
function ChefChapter({ chef, index }) {
  const flip = index % 2 === 1;
  return (
    <section id={chef.id} className={`section ${flip ? 'bg-sand' : 'bg-ivory'}`} aria-labelledby={`chef-${chef.id}`}>
      <div className="shell grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className={`md:max-w-[30rem] lg:max-w-none lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
          <div className="lg:sticky lg:top-28">
            <Figure id={chef.photo} ratio="4/5" drift="gentle" sizes="(min-width: 768px) 40vw, 100vw" label={`No. 0${index + 2}`} caption="In the Muse kitchen" />
          </div>
        </div>

        <div className={`flex flex-col items-center text-center md:items-start md:text-left ${flip ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'}`}>
          <Eyebrow numeral={index === 0 ? 'II' : 'III'}>{chef.role}</Eyebrow>
          <SplitHeading as="h2" className="mt-6 text-h1 display text-charcoal" parts={[{ text: chef.first, break: true }, { text: 'Bezuidenhout', em: true }]} />
          <span id={`chef-${chef.id}`} className="sr-only">
            {chef.name}
          </span>

          <Reveal as="blockquote" className="mt-10 max-w-[30ch] border-l border-bronze pl-6 text-left">
            <p className="statement text-h4 text-charcoal">“{chef.pull}”</p>
          </Reveal>

          <Reveal group className="prose-measure mt-10 flex flex-col gap-6 text-stone">
            {chef.paragraphs.map((p, i) => (
              <Reveal.Item as="p" key={i} className={i === 0 ? 'text-lead text-charcoal' : undefined}>
                {p}
              </Reveal.Item>
            ))}
          </Reveal>

          {/* Path: a quiet line of stations */}
          <Reveal className="mt-band w-full max-w-[34rem]">
            <p className="label text-bronze-ink">The path to Muse</p>
            <ol className="mt-6 flex flex-col gap-0 text-left">
              {chef.path.map((step, i) => (
                <li key={step} className="relative flex items-center gap-5 py-2.5 pl-1">
                  <span className={`relative z-10 block size-2 shrink-0 rounded-full ${i === chef.path.length - 1 ? 'bg-bronze' : 'border border-bronze bg-transparent'}`} aria-hidden="true" />
                  {i < chef.path.length - 1 && <span className="absolute top-1/2 left-[0.5625rem] h-full w-px bg-bronze/40" aria-hidden="true" />}
                  <span className={i === chef.path.length - 1 ? 'statement text-h4 text-charcoal' : 'text-small text-charcoal'}>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function OurStory() {
  useSeo({
    title: 'Our Story',
    description:
      'Muse opened in November 2015, run by husband-and-wife chefs Allan and Simone Bezuidenhout. Their story, from the Angel Hotel in the UK and the Boardwalk Hotel to their own restaurant in Walmer, Gqeberha.',
    path: '/our-story',
  });

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={[{ text: 'Inspiration' }, { text: 'to an artist.', em: true }]}
        photo="sign"
        position="50% 40%"
        intro="Muse opened in November 2015, owned and run by married couple Allan and Simone Bezuidenhout. Two chefs, one kitchen, and a menu that changes with every season."
      />

      {/* The name */}
      <section className="section bg-ivory">
        <div className="shell grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-center text-center lg:col-span-7 md:items-start md:text-left">
            <Eyebrow numeral="I">The name</Eyebrow>
            <Reveal className="mt-10">
              <Parallax speed={-30}>
                <p className="display text-display text-charcoal">Muse</p>
              </Parallax>
              <p className="mt-4 font-display text-h4 text-stone">
                /mjuːz/ <span className="statement">noun</span>
              </p>
            </Reveal>
            <motion.span className="mt-8 block h-px w-24 origin-left bg-bronze" variants={drawLine} initial="hidden" whileInView="visible" viewport={inViewOnce} aria-hidden="true" />
            <SplitHeading as="p" className="mt-8 max-w-[22ch] text-h2 text-charcoal" parts={[{ text: 'the source of inspiration for an artist.', em: true }]} />
          </div>
          <Reveal group className="prose-measure flex flex-col items-center gap-6 text-center text-stone lg:col-span-4 lg:col-start-9 md:items-start md:text-left">
            <Reveal.Item as="p" className="text-lead text-charcoal">
              We see food as an art form, and chefs as the artist.
            </Reveal.Item>
            <Reveal.Item as="p">
              Muse offers Nouvelle cuisine, which means the aim is to serve the best and freshest ingredients available, with the emphasis on presentation. We stay
              inspired by changing our menu seasonally, which keeps it fun and fresh for both our guests and our chefs.
            </Reveal.Item>
            <Reveal.Item as="p">
              We make everything in house, from pasta and sauces to bread and cakes, and we strive to leave a green footprint as far as possible, using local, seasonal and
              sustainable produce.
            </Reveal.Item>
            <Reveal.Item>
              <Parallax speed={60}>
                <Emblem className="mt-4 size-24 text-charcoal" />
              </Parallax>
            </Reveal.Item>
          </Reveal>
        </div>
      </section>

      {chefs.map((chef, i) => (
        <ChefChapter key={chef.id} chef={chef} index={i} />
      ))}

      {/* Milestones */}
      <section className="section on-dark bg-charcoal text-ivory">
        <div className="shell">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Eyebrow numeral="IV" tone="dark">
              Since 2015
            </Eyebrow>
            <SplitHeading className="mt-6 max-w-[16ch] text-h2 display" parts={[{ text: 'Ten years of' }, { text: 'evenings at Muse.', em: true }]} />
          </div>

          <ol className="relative mt-band grid grid-cols-1 gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                className="flex flex-col items-center gap-4 bg-charcoal p-8 text-center md:items-start md:p-10 md:text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 4, ease, delay: (i % 3) * 0.1 } }}
                viewport={inViewOnce}
              >
                <span className="display text-h1 text-bronze-light">{m.year}</span>
                <span className="max-w-[28ch] text-ivory/85">{m.text}</span>
              </motion.li>
            ))}
          </ol>

          <Reveal className="mt-band flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-baseline lg:gap-10">
            <span className="label text-bronze-light">Read about Muse</span>
            {press.map((p) => (
              <TextLink key={p.outlet} href={p.href} className="text-ivory">
                {p.outlet}: {p.title}
              </TextLink>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta title="Come and taste the season." image="interior" />
    </>
  );
}
