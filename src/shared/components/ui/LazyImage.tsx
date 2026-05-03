import { useState, useEffect, useRef, memo } from "react";
import type { CSSProperties } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  srcSet?: string;
  sizes?: string;
  onLoad?: () => void;
}

const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E';

function LazyImage({
  src,
  alt,
  placeholder = DEFAULT_PLACEHOLDER,
  className,
  style,
  srcSet,
  sizes,
  onLoad,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

export default memo(LazyImage);
