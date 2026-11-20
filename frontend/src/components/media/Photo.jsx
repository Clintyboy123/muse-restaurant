import { useState } from 'react';
import { photo as getPhoto } from '../../content/photos';

// One photograph: responsive sizes, lazy loading, and its own average colour as the placeholder,
// so the page never flashes white while images arrive.
//   <Photo id="interior" sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
export default function Photo({ id, image, sizes = '100vw', className = '', priority = false, alt, style, ...props }) {
  const p = image || getPhoto(id);
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      ref={(node) => node?.complete && !loaded && setLoaded(true)}
      className={`transition-opacity duration-700 ease-site ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ backgroundColor: p.tone, ...style }}
      {...props}
    />
  );
}
