import { Link } from 'react-router';
import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import Figure from '../media/Figure';
import Reveal from '../Reveal';
import { occasions } from '../../content/events';

// VI. Occasions. Muse as a venue: a tall styled high-tea photograph and the list of occasions set as type.
export default function EventsTeaser() {
  return (
    <section className="section on-dark relative overflow-hidden bg-charcoal text-ivory">
      <div className="shell grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="order-2 md:max-w-[36rem] lg:max-w-none lg:order-1 lg:col-span-5">
          <div className="grid grid-cols-5 gap-3 md:gap-4">
            <Figure id="high-tea-flowers" ratio="2/3" speed={-16} sizes="(min-width: 768px) 25vw, 60vw" className="col-span-3" tone="dark" />
            <Figure id="bubbles" ratio="2/3" speed={80} sizes="(min-width: 768px) 16vw, 40vw" className="col-span-2 mt-16 md:mt-28" tone="dark" delay={0.2} />
          </div>
        </div>

        <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:col-span-6 lg:col-start-7 md:items-start md:text-left">
          <Eyebrow numeral="VI" tone="dark">
            Events & catering
          </Eyebrow>
          <SplitHeading className="mt-6 text-h2 display" parts={[{ text: 'For the days' }, { text: 'worth gathering for.', em: true }]} />
          <Reveal as="p" className="prose-measure mt-8 text-lead text-ivory/80">
            Muse hosts baby showers, high teas, special events and more, and caters for functions beyond our own walls.
          </Reveal>

          <Reveal as="ul" group gap={0.07} className="mt-10 w-full border-t border-line-dark">
            {occasions.map((o, i) => (
              <Reveal.Item as="li" key={o.title} className="border-b border-line-dark">
                <Link
                  to="/events-and-catering"
                  className="group flex items-baseline justify-center gap-5 py-4 transition-colors duration-300 md:justify-start"
                >
                  <span className="label w-6 text-bronze-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-h4 font-light text-ivory/85 transition-all duration-500 ease-site group-hover:translate-x-2 group-hover:text-ivory group-hover:italic">
                    {o.title}
                  </span>
                </Link>
              </Reveal.Item>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <Button to="/events-and-catering#enquire" variant="ivory">
              Enquire about your event
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
