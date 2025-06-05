"use client";

import Image from "next/image";
import styles from "./LogoSlider.module.css";

const logos = [
  "/Images/slider/Black.png",
  "/Images/slider/meta-1.png",
  "/Images/slider/INCATE.png",
];

export default function LogoSlider() {
  return (
    <div className={styles.logosContainer}>
      {logos.map((logo, index) => (
        <Image 
          key={index}
          src={logo}
          alt={`Logo ${index + 1}`}
          width={240}
          height={120}
          className={styles.logo}
        />
      ))}
    </div>
  );
}