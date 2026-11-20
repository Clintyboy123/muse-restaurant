import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';
import { Download } from 'lucide-react';
import useSeo from '../hooks/useSeo';
import PageHero from '../components/sections/PageHero';
import FinalCta from '../components/sections/FinalCta';
import Eyebrow from '../components/ui/Eyebrow';
import SplitHeading from '../components/ui/SplitHeading';
import Button from '../components/ui/Button';
import Figure from '../components/media/Figure';
import Reveal from '../components/Reveal';
import MenuItem, { Price } from '../components/menu/MenuItem';
import { corkage, downloads, drinksMenu, season, seasonalMenu, wineList } from '../content/menu';
import { site } from '../content/site';
import { ease } from '../utils/motion';

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const tabs = [
  { id: 'seasonal', label: 'Seasonal menu', short: 'Menu' },
  { id: 'drinks', label: 'Drinks', short: 'Drinks' },
  { id: 'wine', label: 'Wine list', short: 'Wine' },
];

// A course: numeral and title on the left, dishes in two columns on the right (one on phones).
function Course({ group, index, children }) {
  return (
    <Reveal as="section" id={`menu-${group.id}`} className="scroll-mt-48 border-t border-line-light py-band first:border-t-0 first:pt-0" aria-labelledby={`h-${group.id}`}>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-8">
        <div className="flex flex-col items-center text-center md:col-span-3 md:items-start md:text-left">
          <span className="font-display text-h4 font-medium tracking-[0.08em] text-bronze-ink">{roman[index]}</span>
          <h3 id={`h-${group.id}`} className="display mt-2 text-h3 text-charcoal">
            {group.title}
          </h3>
          {group.note && <p className="mt-3 max-w-[24ch] text-small italic text-stone">{group.note}</p>}
        </div>
        <div className="grid grid-cols-1 content-start gap-x-12 md:col-span-9 lg:grid-cols-2">{children}</div>
      </div>
    </Reveal>
  );
}

function SeasonalMenu() {
  return (
    <div>
      <nav aria-label="Menu sections" className="no-scrollbar -mx-gutter mb-band flex gap-2 overflow-x-auto px-gutter md:mx-0 md:flex-wrap md:px-0">
        {seasonalMenu.map((g) => (
          <a
            key={g.id}
            href={`#menu-${g.id}`}
            className="label flex min-h-11 shrink-0 items-center rounded-btn border border-charcoal/20 px-4 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
          >
            {g.title}
          </a>
        ))}
      </nav>
      {seasonalMenu.map((g, i) => (
        <Course key={g.id} group={g} index={i}>
          {g.items.map((item) => (
            <div key={item.name} className="border-b border-line-light">
              <MenuItem item={item} centred />
            </div>
          ))}
        </Course>
      ))}
      <p className="mt-band border-t border-line-light pt-8 text-center text-small text-stone md:text-left">
        Prices in Rand. <abbr title="Vegetarian">V</abbr> vegetarian · <abbr title="Vegan">VG</abbr> vegan. Our menu changes with the seasons, so dishes may
        change. Please let us know about any allergies or dietary requirements.
      </p>
    </div>
  );
}

function DrinksMenu() {
  return (
    <div>
      {drinksMenu.map((g, i) => (
        <Course key={g.id} group={g} index={i}>
          {g.items.map((item) => (
            <div key={item.name} className="flex items-baseline justify-between gap-6 border-b border-line-light py-4">
              <div>
                <p className="font-display text-h4">{item.name}</p>
                {item.description && <p className="mt-0.5 text-small text-stone">{item.description}</p>}
              </div>
              <Price value={item.price} />
            </div>
          ))}
        </Course>
      ))}
      <p className="mt-band border-t border-line-light pt-8 text-center text-small text-stone md:text-left">Prices in Rand. Where two prices are shown, they follow the two options named.</p>
    </div>
  );
}

function WineList() {
  return (
    <div>
      <Reveal className="mb-band grid grid-cols-1 gap-8 border-b border-line-light pb-band lg:grid-cols-12">
        <p className="statement text-center text-h3 text-charcoal lg:col-span-7 md:text-left">
          A wine list carefully selected to complement the food we love to share with you.
        </p>
        <div className="flex flex-col items-center gap-2 text-small text-stone lg:col-span-4 lg:col-start-9 md:items-start">
          <p className="text-center md:text-left">Ask your server about these exclusive wines and our pairing suggestions.</p>
          <p>
            <span className="label text-bronze-ink">Glass | Bottle</span> where two prices are shown
          </p>
          <p>
            <span className="label text-bronze-ink">Corkage</span> R{corkage}
          </p>
        </div>
      </Reveal>
      {wineList.map((g, i) => (
        <Course key={g.id} group={g} index={i}>
          {g.items.map((w) => (
            <article key={w.name} className="border-b border-line-light py-5 text-center md:text-left">
              <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <h4 className="font-display text-h4">{w.name}</h4>
                <Price value={w.glass ? `${w.glass} | ${w.price}` : w.price} />
              </div>
              <p className="label mt-1 text-bronze-ink">{w.region}</p>
              <p className="mx-auto mt-2 max-w-[48ch] text-small text-stone md:mx-0">{w.notes}</p>
            </article>
          ))}
        </Course>
      ))}
    </div>
  );
}

export default function Restaurant() {
  useSeo({
    title: 'The Restaurant & Menu',
    description: `The Muse seasonal menu (${season}), drinks and wine list: Nouvelle cuisine by chefs Allan and Simone Bezuidenhout in Walmer, Gqeberha. Download the menus as PDF.`,
    path: '/the-restaurant',
  });
  const { hash } = useLocation();
  const [tab, setTab] = useState(() => tabs.find((t) => hash === `#${t.id}`)?.id || 'seasonal');
  const tabRefs = useRef({});
  const menuRef = useRef(null);

  useEffect(() => {
    const match = tabs.find((t) => hash === `#${t.id}`);
    if (match) setTab(match.id);
  }, [hash]);

  const choose = (id) => {
    setTab(id);
    const top = menuRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onKey = (e) => {
    const i = tabs.findIndex((t) => t.id === tab);
    const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : null;
    if (next === null) return;
    e.preventDefault();
    choose(tabs[next].id);
    tabRefs.current[tabs[next].id]?.focus();
  };

  const download = downloads.find((d) => d.id === tab);

  return (
    <>
      <PageHero
        eyebrow="Menu & wine list"
        title={[{ text: 'The' }, { text: 'Restaurant', em: true }]}
        photo="interior"
        position="50% 60%"
        intro="Nouvelle cuisine from a menu that changes with the seasons, with a bar and a wine list chosen to go with it, in an intimate dining room on Main Road, Walmer."
      >
        <Button href="#menu" variant="ivory">
          View the menu
        </Button>
      </PageHero>

      {/* The dining experience */}
      <section className="section bg-ivory">
        <div className="shell grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-center text-center lg:col-span-6 md:items-start md:text-left">
            <Eyebrow numeral="I">The dining experience</Eyebrow>
            <SplitHeading className="mt-6 text-h2 display text-charcoal" parts={[{ text: 'Make an' }, { text: 'evening of it.', em: true }]} />
            <Reveal group className="prose-measure mt-8 flex flex-col gap-6 text-stone">
              <Reveal.Item as="p" className="text-lead text-charcoal">
                Muse offers Nouvelle cuisine: the aim is to serve the best and freshest ingredients available, with the emphasis on presentation.
              </Reveal.Item>
              <Reveal.Item as="p">
                Everything we serve is made in house, from pasta and sauces to bread and cakes, with local, seasonal and sustainable produce wherever we can. The
                menu changes with the seasons to keep it fresh for our guests and our chefs.
              </Reveal.Item>
              <Reveal.Item as="p">The atmosphere is relaxed, and our food takes time and care to prepare. Settle in.</Reveal.Item>
            </Reveal>

            <Reveal className="mt-band grid w-full max-w-[34rem] grid-cols-1 gap-8 border-t border-line-light pt-8 sm:grid-cols-2">
              <div className="text-center sm:text-left">
                <h3 className="label text-bronze-ink">Trading hours</h3>
                <dl className="mt-4 flex flex-col gap-2 text-small">
                  {site.hours.map((h) => (
                    <div key={h.days}>
                      <dt className="text-charcoal">{h.days}</dt>
                      <dd className="text-stone">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="label text-bronze-ink">At Muse</h3>
                <ul className="mt-4 flex flex-col gap-1 text-small text-stone">
                  {site.facilities.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-5 gap-4 self-start lg:col-span-6">
            <Figure id="wine-wall" ratio="3/4" sizes="(min-width: 768px) 28vw, 60vw" className="col-span-3" label="No. 01" caption="The wine wall" />
            <Figure id="bread-stones" ratio="3/4" speed={70} sizes="(min-width: 768px) 18vw, 40vw" className="col-span-2 mt-24" delay={0.2} />
            <Figure id="date-night" ratio="4/5" speed={30} sizes="(min-width: 768px) 18vw, 40vw" className="col-span-2" delay={0.1} />
            <Figure id="art-wall" ratio="4/3" speed={50} sizes="(min-width: 768px) 28vw, 60vw" className="col-span-3 mt-12" label="No. 02" caption="Art on the brick" delay={0.25} />
          </div>
        </div>
      </section>

      {/* The menus */}
      <section id="menu" ref={menuRef} className="bg-ivory pb-section" aria-label="Menus">
        <div className="sticky z-20 border-y border-line-light bg-ivory/95 backdrop-blur-md transition-[top] duration-700 ease-site" style={{ top: 'var(--header-h, 0px)' }}>
          <div className="shell flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Choose a menu" className="flex w-full md:w-auto md:gap-10" onKeyDown={onKey}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  ref={(n) => {
                    tabRefs.current[t.id] = n;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => choose(t.id)}
                  className={`label relative flex-1 py-6 text-center transition-colors duration-300 md:flex-none ${tab === t.id ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
                >
                  <span className="sm:hidden">{t.short}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  {tab === t.id && <motion.span layoutId="menu-tab" className="absolute inset-x-0 bottom-[-1px] h-px bg-charcoal" transition={{ duration: 1.2, ease }} />}
                </button>
              ))}
            </div>
            {download && (
              <a href={download.href} download className="label hidden min-h-11 shrink-0 items-center gap-2 text-bronze-ink transition-colors hover:text-charcoal md:inline-flex">
                <Download className="size-4" strokeWidth={1.5} aria-hidden="true" /> Download {download.label.toLowerCase()}
              </a>
            )}
          </div>
        </div>

        <div className="shell pt-band">
          <div className="mb-band flex flex-col items-center text-center md:items-start md:text-left">
            <Eyebrow numeral="II">{tab === 'seasonal' ? `Seasonal menu · ${season}` : tab === 'drinks' ? 'Drinks menu · 2026' : 'Wine list · 2026'}</Eyebrow>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
            >
              {tab === 'seasonal' && <SeasonalMenu />}
              {tab === 'drinks' && <DrinksMenu />}
              {tab === 'wine' && <WineList />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-sand py-band">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-12 md:items-center">
          <div className="text-center lg:col-span-4 md:text-left">
            <p className="label text-bronze-ink">Take the menus with you</p>
            <p className="statement mt-3 text-h3 text-charcoal">Download as PDF</p>
          </div>
          <ul className="grid grid-cols-1 gap-px bg-charcoal/15 sm:grid-cols-3 lg:col-span-8">
            {downloads.map((d) => (
              <li key={d.id} className="bg-sand">
                <a href={d.href} download className="group flex h-full items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory">
                  <span>
                    <span className="block font-display text-h4">{d.label}</span>
                    <span className="mt-1 block text-[0.75rem] text-stone transition-colors group-hover:text-mist">{d.detail}</span>
                  </span>
                  <Download className="size-5 shrink-0 text-bronze-ink transition-transform duration-500 group-hover:translate-y-0.5 group-hover:text-bronze-light" strokeWidth={1.25} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title="A table is waiting. Reserve yours." image="table-set" />
    </>
  );
}
