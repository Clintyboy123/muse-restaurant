import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';
import { ArrowUpRight, Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import useSeo from '../hooks/useSeo';
import PageHero from '../components/sections/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SplitHeading from '../components/ui/SplitHeading';
import Button from '../components/ui/Button';
import SocialIcon from '../components/ui/SocialIcon';
import SocialLinks from '../components/ui/SocialLinks';
import Reveal from '../components/Reveal';
import ReservationForm from '../components/forms/ReservationForm';
import EnquiryForm from '../components/forms/EnquiryForm';
import { site } from '../content/site';
import { ease } from '../utils/motion';

const forms = [
  { id: 'reserve', label: 'Reservation enquiry' },
  { id: 'message', label: 'General message' },
];

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
      <Icon className="mt-1 size-5 shrink-0 text-bronze-light" strokeWidth={1.25} aria-hidden="true" />
      <div>
        <p className="label text-mist">{label}</p>
        <div className="mt-2 text-ivory">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  useSeo({
    title: 'Contact & Reservations',
    description:
      'Reserve a table at Muse Restaurant, 182 Main Road, Walmer, Gqeberha. Call +27 (0)41 582 1937, WhatsApp or email info@muserestaurant.co.za. Open Tuesday to Saturday, 12:00 to 22:00.',
    path: '/contact',
  });
  const { hash } = useLocation();
  const [form, setForm] = useState(hash === '#message' ? 'message' : 'reserve');
  useEffect(() => {
    if (hash === '#message') setForm('message');
    if (hash === '#reserve') setForm('reserve');
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow="Contact & reservations"
        title={[{ text: 'Join us' }, { text: 'at the table.', em: true }]}
        photo="exterior"
        position="50% 55%"
        intro="Tuesday to Saturday, from midday until ten. Send a reservation enquiry below, call us, or message us on WhatsApp."
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href="#reserve" variant="ivory" className="w-full sm:w-auto">
            Reserve a table
          </Button>
          <Button href={site.phone.href} variant="ghost-light" className="w-full sm:w-auto">
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" /> {site.phone.display}
          </Button>
        </div>
      </PageHero>

      {/* Details + form */}
      <section className="on-dark bg-charcoal text-ivory">
        <div className="shell grid grid-cols-1 gap-y-16 py-section lg:grid-cols-12 lg:gap-x-8">
          <aside className="flex flex-col gap-10 lg:col-span-4" aria-label="Contact details">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Eyebrow numeral="I" tone="dark">
                Muse Restaurant
              </Eyebrow>
            </div>
            <Reveal group className="flex flex-col gap-8">
              <Reveal.Item>
                <Detail icon={MapPin} label="Address">
                  <address className="not-italic">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-flex items-center gap-1 text-small text-bronze-light">
                    Get directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </Detail>
              </Reveal.Item>
              <Reveal.Item>
                <Detail icon={Phone} label="Telephone">
                  <a href={site.phone.href} className="link-line">
                    {site.phone.display}
                  </a>
                </Detail>
              </Reveal.Item>
              <Reveal.Item>
                <Detail icon={Smartphone} label="Mobile">
                  <a href={site.mobile.href} className="link-line">
                    {site.mobile.display}
                  </a>
                </Detail>
              </Reveal.Item>
              <Reveal.Item>
                <Detail icon={Mail} label="Email">
                  <a href={site.email.href} className="link-line">
                    {site.email.display}
                  </a>
                </Detail>
              </Reveal.Item>
              <Reveal.Item className="flex justify-center sm:justify-start sm:pl-10">
                <Button href={site.whatsapp.href} variant="ghost-light" size="sm">
                  <SocialIcon id="whatsapp" className="size-4" /> Enquire on WhatsApp
                </Button>
              </Reveal.Item>
            </Reveal>

            <Reveal className="border-t border-line-dark pt-8 text-center sm:text-left">
              <h2 className="label text-bronze-light">Trading hours</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt className="font-display text-h4">{h.days}</dt>
                    <dd className="text-small text-mist">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <SocialLinks className="-mx-3 mt-6 justify-center sm:justify-start" />
            </Reveal>
          </aside>

          <div id="reserve" className="scroll-mt-24 lg:col-span-7 lg:col-start-6">
            <span id="message" className="sr-only" />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Eyebrow numeral="II" tone="dark">
                {form === 'reserve' ? 'Reservations' : 'Write to us'}
              </Eyebrow>
              <SplitHeading
                key={form}
                className="mt-6 text-h2 display"
                parts={form === 'reserve' ? [{ text: 'Reserve' }, { text: 'a table.', em: true }] : [{ text: 'Send us' }, { text: 'a message.', em: true }]}
              />
            </div>

            <div role="tablist" aria-label="Choose a form" className="mt-10 flex border-b border-line-dark">
              {forms.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`form-tab-${f.id}`}
                  aria-selected={form === f.id}
                  aria-controls={`form-panel-${f.id}`}
                  onClick={() => setForm(f.id)}
                  className={`label relative flex-1 py-5 transition-colors duration-300 sm:flex-none sm:pr-10 sm:text-left ${form === f.id ? 'text-ivory' : 'text-mist hover:text-ivory'}`}
                >
                  {f.label}
                  {form === f.id && <motion.span layoutId="contact-tab" className="absolute inset-x-0 bottom-[-1px] h-px bg-ivory sm:right-10" transition={{ duration: 1.2, ease }} />}
                </button>
              ))}
            </div>

            <div className="mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={form}
                  id={`form-panel-${form}`}
                  role="tabpanel"
                  aria-labelledby={`form-tab-${form}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
                >
                  {form === 'reserve' ? <ReservationForm tone="dark" /> : <EnquiryForm tone="dark" />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ivory" aria-label="Map and directions">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center gap-6 px-gutter py-band text-center lg:col-span-4 md:items-start md:text-left">
            <Eyebrow numeral="III">Finding us</Eyebrow>
            <p className="statement text-h3 text-charcoal">Between 10th and 11th Avenue.</p>
            <p className="max-w-[36ch] text-stone">{site.address.directions}</p>
            <ul className="flex flex-col gap-1 text-small text-stone">
              {site.facilities.slice(0, 2).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button href={site.maps.directions} variant="charcoal">
              Open in Google Maps
            </Button>
          </div>
          <div className="relative min-h-[26rem] lg:col-span-8 md:min-h-[38rem]">
            <iframe
              title="Map showing Muse Restaurant at 182 Main Road, Walmer, Gqeberha"
              src={site.maps.embed}
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)_brightness(0.98)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
