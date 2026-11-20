// A field people never see or fill in; bots usually do, and the API then rejects the submission.
export default function Honeypot({ value, onChange }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
