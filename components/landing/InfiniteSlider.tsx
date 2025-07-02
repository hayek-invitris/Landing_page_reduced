"use client"

import React, { useEffect, useRef } from "react";
import Image from "next/image";
//import "./InfiniteSlider.css";

function InfiniteSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  // Example array of your logos
  const logos = [
    { src: "/Images/Slider/Black.png", alt: "Logo 1" },
    { src: "/Images/Slider/ESF.png", alt: "Logo 2" },
    { src: "/Images/Slider/EU.png", alt: "Logo 3" },
    { src: "/Images/Slider/FMEA.png", alt: "Logo 4" },
    { src: "/Images/Slider/meta-1.png", alt: "Logo 5" },
    { src: "/Images/Slider/INCATE.png", alt: "Logo 6" },
    { src: "/Images/Slider/Preview-Img-10x-Founders.jpg", alt: "Logo 7" },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideWidth = 256; // w-64 = 256px
    const totalSlides = logos.length;
    const halfWidth = slideWidth * totalSlides;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      positionRef.current -= speed;
      
      // Reset position when we've moved exactly one full set width
      if (Math.abs(positionRef.current) >= halfWidth) {
        positionRef.current = 0;
      }
      
      slider.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logos.length]);

  return (
    <div className="relative overflow-hidden w-full h-24 bg-transparent">
      {/* The sliding track */}
      <div 
        ref={sliderRef}
        className="flex"
        style={{
          width: `${logos.length * 256 * 2}px`, // Double width for seamless loop
        }}
      >
        {/* First copy of the logos */}
        {logos.map((logo, index) => (
          <div className="w-64 flex-shrink-0 flex items-center justify-center px-4" key={`first-${index}`}>
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={200}
              height={80}
              style={{objectFit: "contain"}}
              className="max-w-full max-h-20"
            />
          </div>
        ))}
        {/* Second copy of the logos (for seamless infinite effect) */}
        {logos.map((logo, index) => (
          <div className="w-64 flex-shrink-0 flex items-center justify-center px-4" key={`second-${index}`}>
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={200}
              height={80}
              style={{objectFit: "contain"}}
              className="max-w-full max-h-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteSlider;
