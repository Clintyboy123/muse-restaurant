import { Link } from 'react-router';
import { LoaderCircle } from 'lucide-react';

// Buttons. Pick the variant for the ground it sits on:
//   dark grounds:  ivory (primary), ghost-light (secondary)
//   light grounds: charcoal (primary), ghost-dark (secondary)
// `to` makes it a router link, `href` an external/file link, otherwise a <button>.
const variants = {
  ivory: 'btn-ivory',
  'ghost-light': 'btn-ghost-light',
  charcoal: 'btn-charcoal',
  'ghost-dark': 'btn-ghost-dark',
};

export default function Button({ variant = 'charcoal', size, to, href, loading = false, disabled = false, className = '', children, ...props }) {
  const classes = `btn ${variants[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...props} className={classes} disabled={loading || disabled} aria-busy={loading || undefined}>
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
