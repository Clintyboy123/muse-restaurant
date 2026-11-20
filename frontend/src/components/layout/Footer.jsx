import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import Wordmark from '../brand/Wordmark';
import Emblem from '../brand/Emblem';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import Reveal from '../Reveal';
import { nav, RESERVE_PATH, site } from '../../content/site';

// Footer: the definition of "muse" as a closing line, then the practical details in one grid.
export default function Footer() {
  const year = new Date().getFullYear();
  const heading = 'label mb-6 text-bronze-light';

  return (
    <footer className="on-dark relative border-t border-line-dark bg-charcoal text-ivory">
      <div className="shell">
        {/* Closing statement + reservation */}
        <Reveal className="flex flex-col items-center gap-10 border-b border-line-dark py-band text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="label text-bronze-light">Muse · noun</p>
            <p className="statement mt-6 max-w-[18ch] text-h3 text-ivory">the source of inspiration for an artist.</p>
          </div>
          <Button to={RESERVE_PATH} variant="ivory">
            Reserve a table
          </Button>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 py-band text-center sm:grid-cols-2 md:text-left lg:grid-cols-12">
          <div className="flex flex-col items-center gap-6 sm:col-span-2 md:items-start lg:col-span-4">
            <Wordmark className="w-36" title="Muse Restaurant" />
            <p className="max-w-[30ch] text-small text-mist">
              Seasonal Nouvelle cuisine by husband-and-wife chefs {site.owners}. In Walmer since {site.opened}.
            </p>
            <SocialLinks className="-mx-3" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={heading}>Explore</h2>
            <ul className="flex flex-col gap-2 text-small">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-line text-ivory/80 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={heading}>Visit</h2>
            <address className="text-small not-italic text-ivory/80">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="link-line mt-4 inline-flex items-center gap-1 text-small text-ivory">
              Get directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
            <ul className="mt-6 flex flex-col gap-1 text-small text-ivory/80">
              <li>
                <a href={site.phone.href} className="link-line">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.mobile.href} className="link-line">
                  {site.mobile.display}
                </a>
              </li>
              <li>
                <a href={site.email.href} className="link-line">
                  {site.email.display}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>Trading hours</h2>
            <dl className="flex flex-col gap-3 text-small">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-ivory">{h.days}</dt>
                  <dd className="text-mist">{h.time}</dd>
                </div>
              ))}
            </dl>
            <a href={site.social[0].href} target="_blank" rel="noopener noreferrer" className="link-line mt-6 inline-flex items-center gap-1 text-small text-ivory">
              Follow {site.social[0].handle} <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-line-dark py-8 text-[0.75rem] text-mist md:flex-row md:justify-between">
          <p>© {year} Muse Restaurant. All rights reserved.</p>
          <Emblem className="size-12 text-ivory/50" />
          <p>
            <a href={site.maps.place} target="_blank" rel="noopener noreferrer" className="link-line">
              Muse on Google
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
