"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export const CITY_POINTS = [
  { id: "san-francisco", name: "San Francisco",  lat: 37.7749, lng: -122.4194 },
  { id: "new-york",      name: "New York",       lat: 40.7128, lng:  -74.0060 },
  { id: "boston",        name: "Boston",         lat: 42.3601, lng:  -71.0589 },
  { id: "toronto",       name: "Toronto",        lat: 43.6532, lng:  -79.3832 },

  { id: "london",        name: "London",         lat: 51.5074, lng:   -0.1278 },
  { id: "paris",         name: "Paris",          lat: 48.8566, lng:    2.3522 },
  { id: "amsterdam",     name: "Amsterdam",      lat: 52.3676, lng:    4.9041 },
  { id: "stockholm",     name: "Stockholm",      lat: 59.3293, lng:   18.0686 },
  { id: "berlin",        name: "Berlin",         lat: 52.5200, lng:   13.4050 },
  { id: "munich",        name: "Munich",         lat: 48.1351, lng:   11.5820 },
  { id: "zurich",        name: "Zurich",         lat: 47.3769, lng:    8.5417 },

  { id: "tel-aviv",      name: "Tel Aviv",       lat: 32.0853, lng:   34.7818 },
  { id: "bangalore",     name: "Bangalore",      lat: 12.9716, lng:   77.5946 },
  { id: "singapore",     name: "Singapore",      lat:  1.3521, lng:  103.8198 },
  { id: "tokyo",         name: "Tokyo",          lat: 35.6762, lng:  139.6503 },
  { id: "nairobi", name: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { id: "sydney", name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { id: "sao-paulo", name: "São Paulo", lat: -23.5505, lng: -46.6333 },



] as const;

// 1) Lookup
const cityById = Object.fromEntries(CITY_POINTS.map(c => [c.id, c]));

// 2) Kontrollierte Kantenliste (22 Kanten, gut lesbar)
const EDGES: Array<[typeof CITY_POINTS[number]["id"], typeof CITY_POINTS[number]["id"]]> = [
  // Global backbone / main axes
  ["san-francisco", "new-york"],
  ["new-york", "london"],
  ["london", "berlin"],
  ["berlin", "tokyo"],
  ["tokyo", "san-francisco"],

  // Second backbone via SEA
  ["london", "singapore"],
  ["singapore", "tokyo"],
  ["singapore", "san-francisco"],

  // North America cluster
  ["san-francisco", "boston"],
  ["boston", "new-york"],
  ["new-york", "toronto"],

  // Europe cluster
  ["london", "paris"],
  ["paris", "amsterdam"],
  ["amsterdam", "stockholm"],
  ["berlin", "munich"],
  ["munich", "zurich"],
  ["zurich", "london"],
  ["zurich", "berlin"],

  // Middle East / India bridge
  ["london", "tel-aviv"],
  ["tel-aviv", "bangalore"],
  ["bangalore", "singapore"],
  ["tel-aviv", "zurich"],
  ["london", "nairobi"],
  ["nairobi", "bangalore"],
  ["singapore", "sydney"],
["tokyo", "sydney"],  
["new-york", "sao-paulo"],
["san-francisco", "sao-paulo"],
["sydney", "sao-paulo"],
["tokyo", "sao-paulo"],
["nairobi", "sao-paulo"]

];

// 3) arcsData erzeugen (rot, solide)
export const arcsData = EDGES
  .map(([a, b]) => {
    const A = cityById[a];
    const B = cityById[b];
    if (!A || !B) return null;
    return {
      startLat: A.lat,
      startLng: A.lng,
      endLat: B.lat,
      endLng: B.lng,
      color: "#B43632"
    };
  })
  .filter(Boolean);

export default function GlobeCanvas({
  points,
  arcsData,
  freeze = false,
}: {
  points: any[];
  arcsData: any[];
  freeze?: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const globeRef = React.useRef<GlobeMethods | undefined>(undefined);
  const [diameter, setDiameter] = React.useState(0);

  // responsive sizing via ResizeObserver
  React.useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => {
      const r = containerRef.current!.getBoundingClientRect();
      const d = Math.min(r.width, r.height) * 0.55; // 55% der kleineren Kante
      setDiameter(Math.round(Math.min(d, 560)));
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // setup once globe is ready
  const onReady = React.useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    const c: any = g.controls();
    if (!c) return;

    c.enableZoom = false;
    c.enablePan = false;
    c.enableDamping = true;
    c.dampingFactor = 0.08;

    c.autoRotate = !freeze;
    c.autoRotateSpeed = 2;
  }, [freeze]);

  // freeze/unfreeze rotation on demand
  React.useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const c: any = g.controls();
    if (!c) return;

    c.autoRotate = !freeze;
  }, [freeze]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      {diameter > 0 && (
        <Globe
          ref={globeRef}
          width={diameter}
          height={diameter}
          waitForGlobeReady={false}
          onGlobeReady={onReady}
          globeImageUrl="/images/earth-night.jpg"  // lokal ablegen!
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={false}
          enablePointerInteraction={false}
          pointsData={points}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={() => "#B43632"}
          pointAltitude={0.02}
          pointRadius={1.5}
          pointsMerge={true}
          arcsData={arcsData}
          arcColor={() => "#B43632"}
          arcStroke={0.8}
          arcDashLength={0}
          arcDashGap={0}
          arcAltitude={0.18} // stabil
        />
      )}
    </div>
  );
}