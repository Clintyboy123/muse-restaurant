// Five stars filled to the rating (e.g. 4.8 fills four and four-fifths), drawn as hairline outlines.
const STAR = 'M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z';

export default function Stars({ rating, className = 'h-4', tone = 'light' }) {
  const pct = Math.max(0, Math.min(1, rating / 5)) * 100;
  const colour = tone === 'dark' ? 'text-bronze-light' : 'text-bronze';
  return (
    <span className={`relative inline-flex ${colour} ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      <svg viewBox="0 0 120 24" className="h-full w-auto" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={STAR} transform={`translate(${i * 24} 0)`} />
        ))}
      </svg>
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }} aria-hidden="true">
        <svg viewBox="0 0 120 24" className="h-full w-auto max-w-none" fill="currentColor" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={STAR} transform={`translate(${i * 24} 0)`} />
          ))}
        </svg>
      </span>
    </span>
  );
}
