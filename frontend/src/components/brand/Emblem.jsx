import emblem from '../../assets/brand/emblem.png';

// The chefs' emblem from the Muse menus: crossed knives, a toque, "Allan and Simoné Bezuidenhout".
// Drawn as a mask so it takes any colour from `currentColor`.
export default function Emblem({ className = 'size-24', label = 'Allan and Simoné Bezuidenhout emblem' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block bg-current ${className}`}
      style={{
        WebkitMaskImage: `url(${emblem})`,
        maskImage: `url(${emblem})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
