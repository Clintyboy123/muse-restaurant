import { Info } from 'lucide-react';
import Field from './Field';
import FormStatus from './FormStatus';
import FormSuccess from './FormSuccess';
import Honeypot from './Honeypot';
import useForm from './useForm';
import Button from '../ui/Button';
import { sendReservation } from '../../services/forms';
import { site } from '../../content/site';
import { addDays, formatDate, isOpenOn, timeSlots, todayInSA } from './dates';

// Reservation enquiry. Saved to the database and emailed to the restaurant. It does NOT confirm a booking:
// the notice above the button says so, and so does the thank-you message and the guest's email.
const initial = { name: '', email: '', phone: '', guests: '2', date: '', time: '19:00', requests: '', website: '' };

const validate = (v) => {
  const e = {};
  if (v.date && !isOpenOn(v.date)) e.date = 'We are closed on Sundays and Mondays. Please choose another day.';
  if (v.date && v.date < todayInSA()) e.date = 'Please choose a date from today onwards';
  return e;
};

export default function ReservationForm({ tone = 'light' }) {
  const form = useForm(initial, sendReservation, { validate });
  const today = todayInSA();

  if (form.status === 'sent') {
    const r = form.result?.data;
    return (
      <FormSuccess tone={tone} title="Thank you. Your enquiry is with us." onReset={form.reset} resetLabel="Make another enquiry">
        <p>
          A table for {r?.guests} on {r?.date && formatDate(r.date)} at {r?.time}. Reference #{r?.reference}.
        </p>
        <p className={tone === 'dark' ? 'text-ivory' : 'text-charcoal'}>
          This is not yet a confirmed booking. We will contact you to confirm, or you are welcome to call us on{' '}
          <a href={site.phone.href} className="link-line underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={form.submit} noValidate className="relative grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2" aria-label="Reservation enquiry">
      <Field tone={tone} label="Full name" required autoComplete="name" {...form.field('name')} className="sm:col-span-2" />
      <Field tone={tone} label="Email" type="email" required autoComplete="email" {...form.field('email')} />
      <Field tone={tone} label="Contact number" type="tel" required autoComplete="tel" {...form.field('phone')} />
      <Field tone={tone} label="Number of guests" as="select" required {...form.field('guests')}>
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={String(i + 1)}>
            {i + 1} {i === 0 ? 'guest' : 'guests'}
          </option>
        ))}
      </Field>
      <Field tone={tone} label="Preferred date" type="date" required min={today} max={addDays(today, 180)} hint="Tuesday to Saturday" {...form.field('date')} />
      <Field tone={tone} label="Preferred time" as="select" required {...form.field('time')} className="sm:col-span-2">
        {timeSlots().map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Field>
      <Field
        tone={tone}
        label="Special requests"
        as="textarea"
        rows={4}
        placeholder="Dietary requirements, allergies, a celebration…"
        {...form.field('requests')}
        className="sm:col-span-2"
      />
      <Honeypot value={form.values.website} onChange={(e) => form.set('website', e.target.value)} />

      <div className={`flex gap-4 border-l-2 border-bronze py-1 pl-5 text-small sm:col-span-2 ${tone === 'dark' ? 'text-ivory/85' : 'text-charcoal'}`}>
        <Info className="mt-1 size-4 shrink-0 text-bronze" strokeWidth={1.5} aria-hidden="true" />
        <p>
          <strong className="font-semibold">Please note:</strong> submitting a reservation enquiry does not confirm a booking. We will contact you to confirm, or
          call us on{' '}
          <a href={site.phone.href} className="link-line whitespace-nowrap">
            {site.phone.display}
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:col-span-2 sm:flex-row md:items-center">
        <Button type="submit" variant={tone === 'dark' ? 'ivory' : 'charcoal'} loading={form.status === 'sending'} className="w-full sm:w-auto">
          {form.status === 'sending' ? 'Sending…' : 'Send reservation enquiry'}
        </Button>
        <FormStatus status={form.status} message={form.message} tone={tone} />
      </div>
    </form>
  );
}
