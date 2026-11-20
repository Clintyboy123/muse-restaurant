import Field from './Field';
import FormStatus from './FormStatus';
import FormSuccess from './FormSuccess';
import Honeypot from './Honeypot';
import useForm from './useForm';
import Button from '../ui/Button';
import { sendEnquiry } from '../../services/forms';
import { enquirySubjects } from '../../content/site';

const initial = { name: '', email: '', phone: '', subject: enquirySubjects[0], message: '', website: '' };

// General message (replaces the "General Enquiry" form on the current site).
export default function EnquiryForm({ tone = 'light' }) {
  const form = useForm(initial, sendEnquiry);

  if (form.status === 'sent') {
    return (
      <FormSuccess tone={tone} title="Thank you. Your message is with us." onReset={form.reset} resetLabel="Send another message">
        <p>We will reply as soon as we can. Reference #{form.result?.data?.reference}.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={form.submit} noValidate className="relative grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2" aria-label="General enquiry">
      <Field tone={tone} label="Name" required autoComplete="name" {...form.field('name')} className="sm:col-span-2" />
      <Field tone={tone} label="Email" type="email" required autoComplete="email" {...form.field('email')} />
      <Field tone={tone} label="Contact number" type="tel" autoComplete="tel" {...form.field('phone')} />
      <Field tone={tone} label="Subject" as="select" required {...form.field('subject')} className="sm:col-span-2">
        {enquirySubjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Field>
      <Field tone={tone} label="Message" as="textarea" rows={5} required {...form.field('message')} className="sm:col-span-2" />
      <Honeypot value={form.values.website} onChange={(e) => form.set('website', e.target.value)} />
      <div className="flex flex-col items-center gap-4 sm:col-span-2 sm:flex-row">
        <Button type="submit" variant={tone === 'dark' ? 'ivory' : 'charcoal'} loading={form.status === 'sending'} className="w-full sm:w-auto">
          {form.status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        <FormStatus status={form.status} message={form.message} tone={tone} />
      </div>
    </form>
  );
}
