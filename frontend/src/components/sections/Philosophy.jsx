import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import TextLink from '../ui/TextLink';
import Figure from '../media/Figure';
import Reveal from '../Reveal';

// I. The Philosophy. Asymmetric editorial spread on ivory: the overhead "palette" of plates on the left
// (a painter's palette, made of food), a second smaller plate offset below it, and the words on the right.
export default function Philosophy() {
  return (
    <section id="philosophy" className="section relative overflow-hidden bg-ivory">
      <div className="shell grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        {/* Images */}
        <div className="relative pb-16 md:max-w-[36rem] md:pb-28 lg:max-w-none lg:col-span-6 lg:pb-24 xl:col-span-7">
          <Figure id="palette" ratio="4/5" speed={-24} sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" className="lg:mr-[12%]" label="No. 02" caption="The season, from above" position="50% 50%" />
          <Figure
            id="plate-moon"
            speed={90}
            ratio="3/4"
            sizes="(min-width: 768px) 22vw, 50vw"
            className="relative z-10 mx-auto mt-8 w-[60%] md:-mt-24 md:mr-0 md:ml-auto md:w-[46%] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:ml-0 lg:w-[42%]"
            matClassName="md:rounded-[calc(var(--radius-card)+14px)] md:border-[14px] md:border-ivory md:bg-ivory"
            delay={0.25}
          />
        </div>

        {/* Words */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-6 lg:pt-24 xl:col-span-5">
          <Eyebrow numeral="I">The philosophy</Eyebrow>
          <SplitHeading
            className="mt-6 text-h2 display text-charcoal"
            parts={[{ text: 'Food is an art form.', break: true }, { text: 'Every plate tells a story.', em: true }]}
          />
          <Reveal group className="prose-measure mt-8 flex flex-col gap-6 text-stone">
            <Reveal.Item as="p" className="text-lead text-charcoal">
              Muse opened in November 2015, owned and run by husband-and-wife chefs Allan and Simone Bezuidenhout.
            </Reveal.Item>
            <Reveal.Item as="p">
              Their cooking is Nouvelle cuisine: the best and freshest ingredients available, with the emphasis on presentation. The menu changes with
              every season, which keeps it fun and fresh for guests and chefs alike.
            </Reveal.Item>
            <Reveal.Item as="p">Our food takes time and care to prepare, so we suggest making an evening of it.</Reveal.Item>
          </Reveal>

          <Reveal className="mt-10 w-full max-w-[34rem] border-t border-line-light pt-8">
            <blockquote className="statement text-h4 text-charcoal">“We see food as an art form, and chefs as the artist.”</blockquote>
            <p className="label mt-4 text-bronze-ink">Allan & Simone Bezuidenhout</p>
          </Reveal>

          <Reveal className="mt-10">
            <TextLink to="/our-story" className="text-charcoal">
              Discover our story
            </TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
