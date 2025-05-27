"use client";
import Image, { ImageProps } from "next/image";
import { memo, useState } from "react";

const LazyImage = memo(
  ({ className, alt, ...props }: ImageProps) => {
    const [error, setError] = useState(false);
    const errorImage = "/placeholder.svg";

    return (
      <Image
        className={className}
        alt={alt}
        sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8//8/AwAI/wH+9Q4AAAAASUVORK5CYII="
        onError={(e) => {
          if (error) return;
          e.currentTarget.src = errorImage;
          e.currentTarget.srcset = errorImage;
          setError(true);
        }}
        {...props}
      />
    );
  },
  (prevProps, nextProps) => {
    // Prevent re-render if the src and alt props haven't changed
    return (
      prevProps.src === nextProps.src &&
      prevProps.alt === nextProps.alt &&
      prevProps.className === nextProps.className
    );
  }
);
LazyImage.displayName = "LazyImage";

export default LazyImage;
