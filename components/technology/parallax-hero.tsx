"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ParallaxHeroProps {
  title: string;
  description: string;
  imageSrc: string;
}

export function ParallaxHero({ title, description, imageSrc }: ParallaxHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.scrollY;
        const translateY = scrollPosition * 0.4; // Adjust speed as needed
        imageRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 transform scale-[1.15]">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={imageSrc}
            alt="Background"
            fill
            className="object-cover brightness-40"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl/none">
              {title}
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-300 text-xl md:text-2xl/relaxed">
              {description}
            </p>
            <div className="mt-8">
              <Link href="/about/contact">
                <Button 
                  className="bg-transparent backdrop-blur-sm text-white hover:bg-white/10 border border-white/30 px-8 py-6 text-lg font-medium rounded-full transition-all"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 