"use client";

import { useState } from "react";
import LazyLoad from "react-lazy-load";

interface IProps {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function RespondScrollImage(props: IProps) {
  const { alt, src, width, height, className = "" } = props;
  const [hasError, setHasError] = useState(false);

  const onLoadError = () => {
    if (src) {
      setHasError(true);
      console.log("Image load error : ", src);
    }
  };

  return (
    <LazyLoad
      width={width}
      height={height}
      threshold={0.95}
      className={className}
    >
      <img src={src} alt={alt} onError={onLoadError} />
    </LazyLoad>
  );
}
