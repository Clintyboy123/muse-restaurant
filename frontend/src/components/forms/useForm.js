import { useState } from 'react';

// Shared form state: values, field errors from the API, sending state and the result.
//   const form = useForm({ name: '' }, sendReservation);
//   <form onSubmit={form.submit}> <Field {...form.field('name')} /> …
export default function useForm(initial, send, { validate } = {}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const field = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (e) => set(name, e.target.value),
  });

  const submit = async (e) => {
    e.preventDefault();
    const local = validate?.(values) || {};
    if (Object.keys(local).length) {
      setErrors(local);
      setStatus('error');
      setMessage('Please check the highlighted fields.');
      focusFirstError(e.currentTarget);
      return;
    }
    setStatus('sending');
    setMessage('');
    const form = e.currentTarget;
    try {
      const data = await send(values);
      setResult(data);
      setStatus('sent');
      setMessage(data.message);
    } catch (error) {
      setErrors(error.fields || {});
      setStatus('error');
      setMessage(error.message);
      focusFirstError(form);
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus('idle');
    setMessage('');
    setResult(null);
  };

  return { values, errors, status, message, result, set, field, submit, reset };
}

function focusFirstError(form) {
  requestAnimationFrame(() => form?.querySelector('[aria-invalid="true"]')?.focus());
}
