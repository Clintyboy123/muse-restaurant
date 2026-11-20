import { dietLabels } from '../../content/menu';

// One dish (or drink) set like a printed menu: name and price on one line, ingredients beneath in the text face.
// tone: 'light' on ivory/sand, 'dark' on charcoal.
export function Price({ value, tone = 'light' }) {
  return <span className={`shrink-0 font-display text-h4 tabular-nums ${tone === 'dark' ? 'text-bronze-light' : 'text-bronze-ink'}`}>{value}</span>;
}

export function Diet({ code, tone = 'light' }) {
  if (!code) return null;
  return (
    <abbr
      title={dietLabels[code]}
      className={`label ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 align-middle text-[0.625rem] tracking-[0.12em] no-underline ${
        tone === 'dark' ? 'border-bronze-light/60 text-bronze-light' : 'border-bronze-ink/50 text-bronze-ink'
      }`}
    >
      {code}
    </abbr>
  );
}

export default function MenuItem({ item, tone = 'light', centred = false }) {
  const muted = tone === 'dark' ? 'text-mist' : 'text-stone';
  return (
    <div className={`py-5 ${centred ? 'text-center md:text-left' : ''}`}>
      <div className={`flex items-baseline gap-4 ${centred ? 'justify-center md:justify-between' : 'justify-between'}`}>
        <h4 className="font-display text-h4 font-normal">
          {item.name}
          <Diet code={item.diet} tone={tone} />
        </h4>
        <span className={centred ? 'hidden md:inline' : undefined}>
          <Price value={item.price} tone={tone} />
        </span>
      </div>
      {item.description && <p className={`mt-1 max-w-[46ch] text-small ${muted} ${centred ? 'mx-auto md:mx-0' : ''}`}>{item.description}</p>}
      {centred && (
        <p className="mt-2 md:hidden">
          <Price value={item.price} tone={tone} />
        </p>
      )}
      {item.extra && <p className={`mt-1 text-small italic ${muted}`}>{item.extra}</p>}
    </div>
  );
}
