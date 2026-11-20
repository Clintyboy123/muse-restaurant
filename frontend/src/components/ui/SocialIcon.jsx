// Brand marks drawn as line icons on a 24px grid, to match Lucide's weight.
const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M16.5 3h-2.4A4.1 4.1 0 0 0 10 7.1V10H7.5v3.4H10V21h3.5v-7.6h2.6l.5-3.4h-3.1V7.6c0-.6.4-1 1-1h2z" />,
  tripadvisor: (
    <>
      <circle cx="7" cy="13.5" r="3.6" />
      <circle cx="17" cy="13.5" r="3.6" />
      <circle cx="7" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M2.2 9.2h3.1A12.6 12.6 0 0 1 12 7.2c2.5 0 4.8.7 6.7 2h3.1l-1.6 2M12 17.6l-1.6-2.2M12 17.6l1.6-2.2M3.8 11.2 2.2 9.2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.2a8.6 8.6 0 1 1 3.3 3.1z" />
      <path d="M9.2 8.6c.2-.5.6-.6.9-.6h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4-.2.7-.6.9-.6.3-1.6.4-2.9-.2a8.7 8.7 0 0 1-3.6-3.6c-.6-1.3-.5-2.3-.2-2.9z" />
    </>
  ),
};

export default function SocialIcon({ id, className = 'size-[1.125rem]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[id]}
    </svg>
  );
}
