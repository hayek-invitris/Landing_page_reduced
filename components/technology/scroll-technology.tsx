"use client"

import { useEffect, useRef, useState } from "react"

interface TechPoint {
  title: string
  description: string
}

export function ScrollTechnology({ points }: { points: TechPoint[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementTop = rect.top

      // Calculate progress through the section (0 to 1)
      const progress = Math.max(0, Math.min(1, 1 - (elementTop - viewportHeight * 0.2) / (viewportHeight * 0.6)))

      // Map progress to point index
      const newIndex = Math.min(points.length - 1, Math.floor(progress * points.length))

      setActiveIndex(newIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [points.length])

  return (
    <div ref={containerRef} className="relative min-h-[150vh]">
      <div className="sticky top-[20vh] h-[60vh] flex items-center">
        <div className="relative w-full max-w-6xl mx-auto flex">
          {/* Semicircle with points */}
          <div className="relative w-[400px] h-[600px] flex items-center">
            <svg
              viewBox="0 0 200 400"
              className="absolute left-0 h-full w-full stroke-white/20"
              fill="none"
              strokeWidth="2"
            >
              <path d="M0,0 A200,200 0 0,1 0,400" />
            </svg>

            {points.map((point, index) => {
              // Calculate angle from 0 to 180 degrees (π radians)
              const angle = (Math.PI * index) / (points.length - 1)
              // Calculate x and y coordinates on the semicircle
              const x = 200 * Math.sin(angle)
              const y = 200 * (1 - Math.cos(angle))

              return (
                <div
                  key={index}
                  className={`absolute w-4 h-4 -ml-2 rounded-full transition-all duration-500 ${
                    index <= activeIndex ? "bg-[#1a3d5c]" : "bg-white/20"
                  }`}
                  style={{
                    top: `${(y / 400) * 100}%`,
                    left: `${x}px`,
                    transform: `translate(-50%, -50%)`,
                  }}
                />
              )
            })}
          </div>

          {/* Content */}
          <div className="flex-1 pl-12">
            <div className="h-[600px] flex items-center">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white">{points[activeIndex].title}</h3>
                <p className="text-xl text-gray-300">{points[activeIndex].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

