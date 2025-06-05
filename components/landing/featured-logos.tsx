"use client"
import { useEffect, useRef } from "react"

interface Logo {
  src: string
  alt: string
  width: number
}

export function FeaturedLogos({ logos }: { logos: Logo[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createLogo = (logo: Logo) => {
      const div = document.createElement("div")
      div.className = "slide-animation absolute top-1/2 -translate-y-1/2"
      div.style.minWidth = `${logo.width}px`

      const img = document.createElement("img")
      img.src = logo.src
      img.alt = logo.alt
      img.width = logo.width
      img.height = 60
      img.className = "opacity-70 hover:opacity-100 transition-opacity"

      div.appendChild(img)
      return div
    }

    const addLogo = (logo: Logo) => {
      const logoElement = createLogo(logo)
      container.appendChild(logoElement)

      logoElement.addEventListener("animationend", () => {
        container.removeChild(logoElement)
        addLogo(logo)
      })
    }

    // Start logos with shorter delay between them
    logos.forEach((logo, index) => {
      setTimeout(() => {
        addLogo(logo)
      }, index * 3000)
    })
  }, [logos])

  return <div ref={containerRef} className="relative h-32 bg-[#1a3d5c] rounded-lg overflow-hidden mx-auto max-w-6xl" />
}

