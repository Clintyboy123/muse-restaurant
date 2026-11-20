import { useRef } from 'react';
import { motion } from 'motion/react';
import useSeo from '../hooks/useSeo';
import PageHero from '../components/sections/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SplitHeading from '../components/ui/SplitHeading';
import Button from '../components/ui/Button';
import Figure from '../components/media/Figure';
import Photo from '../components/media/Photo';
import Reveal from '../components/Reveal';
import EventEnquiryForm from '../components/forms/EventEnquiryForm';
import { occasions } from '../content/events';
import { site } from '../content/site';
import { ease } from '../utils/motion';

const strip = ['high-tea', 'macarons-painted', 'tartlets', 'champagne', 'doughnut-tower', 'canape-croquette', 'panna-cotta', 'slices', 'wedding-cake-roses', 'canape-ribs', 'macarons', 'celebration-table'];

// A draggable ribbon of event photography. Scrolls natively (trackpad, touch, keyboard); mouse users can also drag.
function Ribbon() {
  const ref = useRef(null);
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    ref.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    drag.current = null;
  };
  return (
    <div
      ref={ref}
      className="no-scrollbar flex cursor-grab snap-x gap-4 overflow-x-auto px-gutter pt-2 pb-10 select-none active:cursor-grabbing md:gap-6"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      tabIndex={0}
      role="region"
      aria-label="Event and catering photographs (scroll sideways)"
    >
      {strip.map((id, i) => (
        <motion.div
          key={id}
          className={`frame relative shrink-0 snap-start ${i % 3 === 1 ? 'aspect-[4/5] w-[62vw] sm:w-[34vw] lg:w-[22vw]' : 'aspect-[3/4] w-[56vw] sm:w-[28vw] lg:w-[18vw]'} ${i % 2 ? 'mt-12' : ''}`}
          initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 4, ease, delay: Math.min(i, 5) * 0.08 } }}
          viewport={{ once: true }}
        >
          <Photo id={id} sizes="(min-width: 1024px) 22vw, 60vw" draggable={false} className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

export default function Events() {
  useSeo({
    title: 'Events & Catering',
    description:
      'Host your baby shower, high tea, private celebration or corporate function at Muse in Walmer, Gqeberha, or book Muse to cater your event. Send an event enquiry.',
    path: '/events-and-catering',
  });

  return (
    <>
      <PageHero
        eyebrow="Events & catering"
        title={[{ text: 'Occasions,' }, { text: 'made by hand.', em: true }]}
        photo="high-tea"
        position="50% 55%"
        intro="Muse is an event and function venue for baby showers, high teas, special events and more, and we cater for events beyond our own walls."
      >
        <Button href="#enquire" variant="ivory">
          Enquire about your event
        </Button>
      </PageHero>

      {/* Introduction */}
      <section className="section bg-ivory">
        <div className="shell grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-center text-center lg:col-span-6 md:items-start md:text-left">
            <Eyebrow numeral="I">The venue</Eyebrow>
            <SplitHeading className="mt-6 text-h2 display text-charcoal" parts={[{ text: 'Your occasion,' }, { text: 'our kitchen.', em: true }]} />
          </div>
          <Reveal group className="prose-measure flex flex-col items-center gap-6 text-center text-stone lg:col-span-5 lg:col-start-8 md:items-start lg:pt-16 md:text-left">
            <Reveal.Item as="p" className="text-lead text-charcoal">
              Contact us for your next function. We are able to host baby showers, high teas, special events and more.
            </Reveal.Item>
            <Reveal.Item as="p">
              We also welcome enquiries about external catering, and love to work with the organisers of functions and events to bring that special element to the
              table. Everything comes from our own kitchen, including the cakes and pastries.
            </Reveal.Item>
          </Reveal>
        </div>
      </section>

      {/* Occasions: alternating editorial rows */}
      <section className="bg-ivory pb-section" aria-label="Occasions we host">
        <div className="shell flex flex-col gap-band">
          {occasions.map((o, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={o.title} className="grid grid-cols-1 items-center gap-y-8 border-t border-line-light pt-band lg:grid-cols-12 lg:gap-x-8">
                <div className={`md:max-w-[34rem] lg:max-w-none lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <Figure id={o.photo} ratio={i % 3 === 0 ? '4/5' : '5/4'} sizes="(min-width: 1024px) 45vw, (min-width: 768px) 34rem, 100vw" />
                </div>
                <div className={`flex flex-col items-center text-center md:items-start md:text-left ${flip ? 'lg:order-1 lg:col-span-5 lg:col-start-1' : 'lg:col-span-5 lg:col-start-8'}`}>
                  <Reveal as="span" className="statement text-h3 text-bronze-ink">
                    {String(i + 1).padStart(2, '0')}
                  </Reveal>
                  <SplitHeading as="h3" className="mt-4 text-h2 display text-charcoal" parts={o.title} />
                  <Reveal as="p" className="mt-8 max-w-[34ch] text-stone">
                    {o.text}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Photo ribbon */}
      <section className="overflow-hidden bg-sand py-band" aria-label="From past events">
        <div className="shell mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <Eyebrow numeral="II">From our tables</Eyebrow>
          <p className="label text-stone">Drag or scroll →</p>
        </div>
        <Ribbon />
      </section>

      {/* Enquiry */}
      <section id="enquire" className="section on-dark scroll-mt-16 bg-charcoal text-ivory">
        <div className="shell grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-center text-center lg:col-span-4 md:items-start md:text-left">
            <Eyebrow numeral="III" tone="dark">
              Enquire
            </Eyebrow>
            <SplitHeading className="mt-6 text-h2 display" parts={[{ text: 'Tell us about' }, { text: 'your occasion.', em: true }]} />
            <Reveal as="p" className="mt-8 max-w-[32ch] text-ivory/75">
              Share a few details and we will be in touch to talk through menus, numbers and timing.
            </Reveal>
            <Reveal className="mt-10 flex flex-col items-center gap-2 text-small text-mist md:items-start">
              <span className="label text-bronze-light">Prefer to talk?</span>
              <a href={site.phone.href} className="link-line text-ivory">
                {site.phone.display}
              </a>
              <a href={site.email.href} className="link-line text-ivory">
                {site.email.display}
              </a>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <EventEnquiryForm tone="dark" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
