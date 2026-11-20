import { site } from '../../content/site';
import SocialIcon from './SocialIcon';

// Instagram, Facebook and Tripadvisor as icon buttons (44px tap targets).
export default function SocialLinks({ className = '', itemClassName = 'text-ivory/70 hover:text-ivory', vertical = false }) {
  return (
    <ul className={`flex ${vertical ? 'flex-col' : ''} items-center gap-1 ${className}`} aria-label="Muse on social media">
      {site.social.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            title={s.label}
            className={`flex size-11 items-center justify-center transition-colors duration-300 ${itemClassName}`}
          >
            <SocialIcon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
