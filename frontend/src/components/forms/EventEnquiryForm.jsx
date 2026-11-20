import Field from './Field';
import FormStatus from './FormStatus';
import FormSuccess from './FormSuccess';
import Honeypot from './Honeypot';
import useForm from './useForm';
import Button from '../ui/Button';
import { sendEventEnquiry } from '../../services/forms';
import { eventTypes } from '../../content/events';
import { addDays, todayInSA } from './dates';

const initial = { name: '', email: '', phone: '', eventType: '', preferredDate: '', guests: '', requirements: '', website: '' };

export default function EventEnquiryForm({ tone = 'dark' }) {
  const form = useForm(initial, sendEventEnquiry);
  const today = todayInSA();

  if (form.status === 'sent') {
    return (
      <FormSuccess tone={tone} title="Thank you for thinking of Muse." onReset={form.reset} resetLabel="Send another enquiry">
        <p>We have your enquiry (reference #{form.result?.data?.reference}) and will be in touch to talk through the details: menus, numbers and timing.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={form.submit} noValidate className="relative grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2" aria-label="Event enquiry">
      <Field tone={tone} label="Name" required autoComplete="name" {...form.field('name')} className="sm:col-span-2" />
      <Field tone={tone} label="Email" type="email" required autoComplete="email" {...form.field('email')} />
      <Field tone={tone} label="Contact number" type="tel" required autoComplete="tel" {...form.field('phone')} />
      <Field tone={tone} label="Event type" as="select" required {...form.field('eventType')}>
        <option value="" disabled>
          Choose an occasion
        </option>
        {eventTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Field>
      <Field tone={tone} label="Preferred date" type="date" min={today} max={addDays(today, 730)} {...form.field('preferredDate')} />
      <Field tone={tone} label="Number of guests" type="number" inputMode="numeric" min="1" max="500" {...form.field('guests')} className="sm:col-span-2" />
      <Field
        tone={tone}
        label="Additional requirements"
        as="textarea"
        rows={5}
        placeholder="Tell us about the occasion: the style, the menu you have in mind, dietary needs, venue (for catering)…"
        {...form.field('requirements')}
        className="sm:col-span-2"
      />
      <Honeypot value={form.values.website} onChange={(e) => form.set('website', e.target.value)} />
      <div className="flex flex-col items-center gap-4 sm:col-span-2 sm:flex-row">
        <Button type="submit" variant={tone === 'dark' ? 'ivory' : 'charcoal'} loading={form.status === 'sending'} className="w-full sm:w-auto">
          {form.status === 'sending' ? 'Sending…' : 'Enquire about your event'}
        </Button>
        <FormStatus status={form.status} message={form.message} tone={tone} />
      </div>
    </form>
  );
}
