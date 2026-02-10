"use client";

import React, { useRef } from "react";

export function MapLayer({
  mapUrl,
}: {
  mapUrl: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(${mapUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
