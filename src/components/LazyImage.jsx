import { useState, useEffect, useRef } from "react";

/**
 * LazyImage Component
 * Loads images only when they enter the viewport using IntersectionObserver
 * Reduces initial page load and improves Core Web Vitals (LCP)
 */
export default function LazyImage({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  className,
  style,
  srcSet,
  sizes,
  onLoad,
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();

          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            onLoad?.();
          };

          img.onerror = () => {
            setImageSrc(placeholder);
            console.warn(`Failed to load image: ${src}`);
          };

          if (srcSet) {
            img.srcset = srcSet;
          }
          img.src = src;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, srcSet, placeholder, onLoad]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.7,
        transition: "opacity 0.3s ease-in-out",
      }}
      loading="lazy"
    />
  );
}
