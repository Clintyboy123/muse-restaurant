import { Link } from 'react-router';

// Quiet link: label + a rule that extends on hover. Colour comes from the parent.
export default function TextLink({ to, href, children, className = '', ...props }) {
  const content = (
    <>
      <span className="rule" aria-hidden="true" />
      <span>{children}</span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={`text-link ${className}`} {...props}>
        {content}
      </Link>
    );
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={`text-link ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {content}
    </a>
  );
}
