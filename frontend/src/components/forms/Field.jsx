import { useId } from 'react';

// Form fields: label above, underlined control, hint or error beneath (announced to screen readers).
// tone: 'light' on ivory/sand, 'dark' on charcoal/olive.
const tones = {
  light: { label: 'text-charcoal', control: 'border-charcoal/30 text-charcoal hover:border-charcoal/60 focus:border-charcoal', hint: 'text-stone', error: 'text-danger' },
  dark: { label: 'text-ivory', control: 'border-ivory/30 text-ivory hover:border-ivory/60 focus:border-ivory', hint: 'text-mist', error: 'text-danger-light' },
};

export default function Field({ label, name, as = 'input', error, hint, required, tone = 'light', className = '', children, ...props }) {
  const id = useId();
  const t = tones[tone];
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  const Control = as;
  return (
    <div className={`flex flex-col text-left ${className}`}>
      <label htmlFor={id} className={`label ${t.label}`}>
        {label}
        {required ? (
          <span className="text-bronze" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal normal-case tracking-normal opacity-60"> (optional)</span>
        )}
      </label>
      <Control
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`field-control mt-2 ${t.control} ${error ? '!border-danger' : ''} ${as === 'textarea' ? 'min-h-32 resize-y' : ''}`}
        {...props}
      >
        {children}
      </Control>
      {hint && !error && (
        <p id={`${id}-hint`} className={`mt-2 text-[0.8125rem] ${t.hint}`}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={`mt-2 text-[0.8125rem] ${t.error}`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
