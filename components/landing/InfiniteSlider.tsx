"use client"

import React from "react";
import Image from "next/image";
import "./InfiniteSlider.css";

function InfiniteSlider() {
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

  return (
    <div className="slider">
      {/* The "track" that moves from right to left */}
      <div className="slider-track">
        {/* First copy of the logos */}
        {logos.map((logo, index) => (
          <div className="slide" key={index}>
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={200}
              height={80}
              style={{objectFit: "contain"}}
              className="logo-image"
            />
          </div>
        ))}
        {/* Second copy of the logos (for the infinite effect) */}
        {logos.map((logo, index) => (
          <div className="slide" key={index + logos.length}>
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={200}
              height={80}
              style={{objectFit: "contain"}}
              className="logo-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteSlider;
