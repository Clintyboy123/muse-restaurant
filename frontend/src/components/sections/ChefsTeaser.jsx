import { motion } from 'motion/react';
import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import Emblem from '../brand/Emblem';
import Figure from '../media/Figure';
import Reveal from '../Reveal';
import Parallax from '../motion/Parallax';
import { ease, inViewOnce } from '../../utils/motion';

// IV. The Chefs. The two names set large, the chefs' own emblem (crossed knives, from their menus) as the seal,
// and the kitchen beside it. Both met their craft at the opening of the Boardwalk Hotel before opening Muse together.
export default function ChefsTeaser() {
  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="shell grid grid-cols-1 items-center gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="relative md:max-w-[40rem] lg:max-w-none lg:col-span-7">
          <Figure id="chefs-prep" ratio="3/2" drift="gentle" position="42% 40%" speed={-16} sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" label="No. 10" caption="In the Muse kitchen" />
          <Parallax speed={55} className="absolute -top-12 -left-3 z-10 md:-top-14 md:-left-10">
          <motion.div
            className="flex size-28 items-center justify-center rounded-full bg-ivory text-charcoal md:size-36"
            initial={{ rotate: -30, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1, transition: { duration: 5, ease, delay: 0.5 } }}
            viewport={inViewOnce}
          >
            <Emblem className="size-20 md:size-28" />
          </motion.div>
          </Parallax>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-5 lg:col-start-8">
          <Eyebrow numeral="IV">The chefs</Eyebrow>
          <SplitHeading className="mt-6 text-h1 display text-charcoal" parts={[{ text: 'Allan', break: true }, { text: '& Simone', em: true }]} />
          <Reveal group className="prose-measure mt-8 flex flex-col gap-6 text-stone">
            <Reveal.Item as="p" className="text-lead text-charcoal">
              A husband-and-wife kitchen. Allan fell for cooking while working extra shifts in a hotel kitchen in the UK; Simone trained in pastry and chocolate, and pastry is still her first love.
            </Reveal.Item>
            <Reveal.Item as="p">
              Both were part of the opening team of the five-star Boardwalk Hotel, Allan rising to executive sous chef and Simone to pastry sous chef, before they left to open a restaurant of their own.
            </Reveal.Item>
          </Reveal>
          <Reveal className="mt-10">
            <Button to="/our-story" variant="charcoal">
              Discover our story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
