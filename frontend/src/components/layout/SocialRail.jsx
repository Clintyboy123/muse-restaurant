import SocialLinks from '../ui/SocialLinks';

// Wide screens: the social links sit quietly in the left margin, mid-height, with a hairline above.
// mix-blend-difference keeps them visible over both dark and light sections.
export default function SocialRail() {
  return (
    <div className="pointer-events-none fixed top-1/2 left-3 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 text-ivory mix-blend-difference 2xl:flex">
      <span className="h-16 w-px bg-current opacity-40" aria-hidden="true" />
      <div className="pointer-events-auto">
        <SocialLinks vertical itemClassName="text-ivory/70 hover:text-ivory" />
      </div>
    </div>
  );
}
