import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Photo from '../media/Photo';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../Reveal';
import { RESERVE_PATH, site } from '../../content/site';
import { ease } from '../../utils/motion';

// Closing scene: the Muse sign lit up on Main Road at night, and the invitation.
export default function FinalCta({ title = 'Let us inspire your next dining experience.', image = 'exterior' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const words = title.split(' ');
  const cut = Math.ceil(words.length / 2);

  return (
    <section ref={ref} className="on-dark relative isolate flex min-h-[85svh] items-center overflow-hidden bg-charcoal py-section text-ivory">
      <motion.div
        className="grain absolute inset-[-12%_0] -z-10"
        style={reduce ? undefined : { y }}
        initial={{ opacity: 0, filter: 'blur(24px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 5, ease } }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Photo id={image} sizes="100vw" alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-charcoal/65" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(23_24_22/0.65)_75%)]" />

      <div className="shell flex flex-col items-center text-center">
        <Reveal as="p" className="label text-bronze-light">
          {site.hours[0].days} · {site.hours[0].time}
        </Reveal>
        <SplitHeading
          className="mt-6 max-w-[18ch] text-h1 display"
          parts={[{ text: words.slice(0, cut).join(' ') }, { text: words.slice(cut).join(' '), em: true }]}
        />
        <Reveal className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to={RESERVE_PATH} variant="ivory" className="w-full sm:w-auto">
            Reserve a table
          </Button>
          <Button to="/contact" variant="ghost-light" className="w-full sm:w-auto">
            Get in touch
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
