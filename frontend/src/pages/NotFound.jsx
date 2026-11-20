import useSeo from '../hooks/useSeo';
import Button from '../components/ui/Button';
import Emblem from '../components/brand/Emblem';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'This page could not be found. Return to Muse Restaurant, fine dining in Walmer, Gqeberha.', path: '/' });
  return (
    <section className="on-dark flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-charcoal px-gutter text-center text-ivory">
      <Emblem className="size-20 text-bronze-light" label="" />
      <p className="label text-bronze-light">404</p>
      <h1 className="statement max-w-[16ch] text-h1">This plate isn’t on the menu.</h1>
      <p className="max-w-[34ch] text-ivory/75">The page you were looking for has moved or no longer exists.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button to="/" variant="ivory">
          Back to home
        </Button>
        <Button to="/the-restaurant" variant="ghost-light">
          View the menu
        </Button>
      </div>
    </section>
  );
}
