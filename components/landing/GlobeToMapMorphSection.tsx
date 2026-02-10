"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";
import { motion } from "framer-motion";

type LatLng = { lat: number; lng: number };
type CityPoint = LatLng & { city?: string };
type Arc = { from: LatLng; to: LatLng };

export function GlobeToMapMorphSection({
  globeImageUrl = "/Images/earth-night.jpg",
  mapImageUrl = "/Images/earth-night.jpg",
  mapPoints,
  arcs = [],
}: {
  globeImageUrl?: string;
  mapImageUrl?: string;
  mapPoints: CityPoint[];
  arcs?: Arc[];
}) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [cameraDistance, setCameraDistance] = useState(290);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Responsive camera distance based on screen size
  useEffect(() => {
    const updateDistance = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCameraDistance(450); // Mobile: weiter weg
      } else if (width < 1024) {
        setCameraDistance(360); // Tablet: mittel
      } else {
        setCameraDistance(290); // Desktop: näher
      }
    };
    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  // Keep globe spinning and prevent zoom
  useEffect(() => {
    const interval = setInterval(() => {
      const g = globeRef.current;
      if (!g) return;
      const c = g.controls() as any;
      if (c) {
        c.autoRotate = true;
        c.autoRotateSpeed = 3;
        c.enableZoom = false;
        c.enablePan = false;
        c.minDistance = cameraDistance;
        c.maxDistance = cameraDistance;
        c.update();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [cameraDistance]);

  // Punkte für Globe vorbereiten
  const globePoints = useMemo(() => {
    return mapPoints.map(point => ({
      lat: point.lat,
      lng: point.lng,
      size: 0.8,
      color: '#B43632',
      label: point.city || '',
    }));
  }, [mapPoints]);

  // Funktion zur Berechnung der Distanz zwischen zwei Koordinaten (Haversine-Formel vereinfacht)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c; // Normalisierte Distanz (0-π)
  };

  // Arcs für Globe vorbereiten mit dynamischer Höhe
  const globeArcs = useMemo(() => {
    return arcs.map(arc => {
      const distance = calculateDistance(
        arc.from.lat, arc.from.lng,
        arc.to.lat, arc.to.lng
      );
      // Höhe basierend auf Distanz: kurze Distanzen = 0.1, lange Distanzen = 0.35
      const altitude = Math.max(0.1, Math.min(0.35, distance * 0.2));
      
      return {
        startLat: arc.from.lat,
        startLng: arc.from.lng,
        endLat: arc.to.lat,
        endLng: arc.to.lng,
        color: '#B43632',
        stroke: 0.8,
        altitude: altitude,
      };
    });
  }, [arcs]);

  return (
    <section className="w-full bg-black py-6 sm:py-10 md:py-16 overflow-visible" id="global-map">
      <div className="w-full max-w-7xl mx-auto px-4 overflow-visible">
        {/* Centered Text Above Both Elements */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2" style={{ fontFamily: "'Eurostile', Arial, Helvetica, sans-serif" }}>
            Our ambition is to provide the fastest manufacturing engine for rapid transition of AI into the physical worlds of biology and medicine
          </p>
        </motion.div>

        {/* Globe and Chart Side by Side */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 overflow-visible">
          {/* Left: Globe */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center overflow-visible"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative overflow-hidden rounded-full w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] pointer-events-none"
            >
              {!webGLSupported ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <img 
                    src="/Images/earth-night.jpg" 
                    alt="Globe" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Globe
                ref={globeRef}
                width={500}
                height={500}
                waitForGlobeReady={false}
                onGlobeReady={() => {
                  const g = globeRef.current;
                  if (!g) return;
                  setGlobeLoaded(true);
                  const c = g.controls() as any;
                  if (c) {
                    c.autoRotate = true;
                    c.autoRotateSpeed = 3;
                    c.enableZoom = false;
                    c.enablePan = false;
                    c.enableRotate = true;
                    c.minDistance = cameraDistance;
                    c.maxDistance = cameraDistance;
                  }
                  
                  const camera = g.camera();
                  if (camera) {
                    camera.position.z = cameraDistance;
                  }
                }}
                globeImageUrl={globeImageUrl}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor="#ffffff"
                atmosphereAltitude={0.15}
                enablePointerInteraction={false}
                pointsData={globePoints}
                pointAltitude={0}
                pointRadius="size"
                pointColor="color"
                pointLabel="label"
                arcsData={globeArcs}
                arcColor={() => "#B43632"}
                arcStroke="stroke"
                arcDashLength={0}
                arcDashGap={0}
                arcAltitude="altitude"
                arcDashAnimateTime={0}
                arcCircularResolution={64}
              />
              </div>
              )}
            </div>
          </motion.div>

          {/* Right: Chart */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center px-2 sm:px-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <svg viewBox="0 0 800 500" className="w-full h-auto max-w-full" preserveAspectRatio="xMidYMid meet"
              style={{ maxHeight: '500px', minHeight: '300px' }}
            >
              {/* Definitions for gradients and filters */}
              <defs>
                <linearGradient id="redLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B43632" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#B43632" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FF5A54" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="grayLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B43632" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#B43632" stopOpacity="0.35" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Subtle grid background */}
              <g opacity="0.15">
                {[100, 180, 260, 340].map((y) => (
                  <line key={`h-${y}`} x1="100" y1={y} x2="750" y2={y} stroke="#4B5563" strokeWidth="1" strokeDasharray="4 8" />
                ))}
                {[250, 400, 550, 700].map((x) => (
                  <line key={`v-${x}`} x1={x} y1="50" x2={x} y2="420" stroke="#4B5563" strokeWidth="1" strokeDasharray="4 8" />
                ))}
              </g>
              
              {/* Axes with modern styling */}
              <line x1="100" y1="50" x2="100" y2="420" stroke="#6B7280" strokeWidth="2" opacity="0.5" />
              <line x1="100" y1="420" x2="750" y2="420" stroke="#6B7280" strokeWidth="2" opacity="0.5" />
              
              {/* Legend - modernized */}
              <g transform="translate(130, 75)">
                <rect x="-10" y="-20" width="320" height="80" rx="12" fill="rgba(17, 24, 39, 0.7)" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="1" />
                <circle cx="12" cy="8" r="6" fill="#B43632" filter="url(#glow)" />
                <text x="30" y="13" fill="white" fontSize="14" fontWeight="500" opacity="0.95">GenAI designs</text>
                
                <circle cx="12" cy="40" r="6" fill="#9CA3AF" />
                <text x="30" y="45" fill="white" fontSize="14" fontWeight="500" opacity="0.95">Manufactured molecules</text>
              </g>
              
              {/* Synthesis gap area - animated glow effect */}
              <motion.path
                d="M 450 204 L 550 141 L 600 109 L 700 45 L 700 340 L 600 350 L 550 355 L 450 365 Z"
                fill="url(#gapGradient)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, delay: 1.5 }}
              />
              <motion.path
                d="M 450 204 L 550 141 L 600 109 L 700 45 L 700 340 L 600 350 L 550 355 L 450 365 Z"
                fill="none"
                stroke="#B43632"
                strokeWidth="1"
                strokeDasharray="8 4"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, delay: 2 }}
              />
              
              {/* Manufactured molecules line (slow growth) - smooth curve */}
              <motion.path
                d="M 150 395 C 250 390, 350 380, 450 365 S 600 350, 700 340"
                stroke="url(#grayLineGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
              />
              
              {/* GenAI designs line (linear growth) - straight line with glow */}
              <motion.path
                d="M 150 395 L 300 300 L 450 204 L 550 141 L 600 109 L 700 45"
                stroke="#B43632"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#softGlow)"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M 150 395 L 300 300 L 450 204 L 550 141 L 600 109 L 700 45"
                stroke="url(#redLineGradient)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
              />
              
              {/* Synthesis gap label - centered and styled */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 2.3 }}
              >
                <rect x="555" y="185" width="180" height="60" rx="10" fill="rgba(180, 54, 50, 0.25)" stroke="#B43632" strokeWidth="2" strokeOpacity="0.7" />
                <text x="645" y="222" fill="white" fontSize="24" fontWeight="700" textAnchor="middle" filter="url(#glow)">
                  Synthesis Gap
                </text>
              </motion.g>
              
              {/* Year labels - modern style */}
              {[
                { x: 150, year: "2015" },
                { x: 300, year: "2018" },
                { x: 450, year: "2022" },
                { x: 600, year: "2026" },
                { x: 700, year: "2030" },
              ].map((item, i) => (
                <motion.text 
                  key={item.year}
                  x={item.x} 
                  y="450" 
                  fill="#9CA3AF" 
                  fontSize="14" 
                  fontWeight="500" 
                  textAnchor="middle"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
                >
                  {item.year}
                </motion.text>
              ))}
              
              {/* Data points - GenAI line with animation */}
              {[
                { cx: 150, cy: 395 },
                { cx: 300, cy: 300 },
                { cx: 450, cy: 204 },
                { cx: 550, cy: 141 },
                { cx: 600, cy: 109 },
                { cx: 700, cy: 45 },
              ].map((point, i) => (
                <motion.g key={`red-${i}`}>
                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="8"
                    fill="#B43632"
                    opacity="0.3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
                  />
                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="5"
                    fill="#B43632"
                    filter="url(#glow)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                  />
                </motion.g>
              ))}
              
              {/* Data points - Manufactured line */}
              {[
                { cx: 150, cy: 395 },
                { cx: 300, cy: 385 },
                { cx: 450, cy: 365 },
                { cx: 600, cy: 350 },
                { cx: 700, cy: 340 },
              ].map((point, i) => (
                <motion.circle
                  key={`gray-${i}`}
                  cx={point.cx}
                  cy={point.cy}
                  r="5"
                  fill="#9CA3AF"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
