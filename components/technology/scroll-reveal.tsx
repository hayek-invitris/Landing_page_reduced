"use client"

import { useEffect, useRef, useState } from "react"

interface TechSection {
  title: string
  description: string
  id: string
}

export function ScrollReveal({
  sections
}: {
  sections: TechSection[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasScrolledPastAll, setHasScrolledPastAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Setup IntersectionObserver for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the index of the section that is currently in view
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10)
            setActiveIndex(index)
          }
        })
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    )

    // Get all section elements
    const sectionElements = document.querySelectorAll('.tech-section')
    sectionElements.forEach(el => observer.observe(el))

    return () => {
      sectionElements.forEach(el => observer.unobserve(el))
    }
  }, [])

  // Setup scroll observer for end of container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const containerBottom = containerRef.current.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight
      
      // If we've scrolled past the container bottom
      // Increased threshold to make sections disappear later
      if (containerBottom < windowHeight * 0.5) {
        setHasScrolledPastAll(true)
      } else {
        setHasScrolledPastAll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Custom vertical positions for each section to align with diagram
  const getVerticalPosition = (index: number) => {
    switch(index) {
      case 0: return 'pt-[150px]'; // Cell-Free System
      case 1: return 'pt-[120px]'; // Modular Composition
      case 2: return 'pt-[180px]'; // Phage Assembly
      case 3: return 'pt-[160px]'; // Quality Control
      case 4: return 'pt-[180px]'; // Encapsulation
      default: return '';
    }
  };

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      {/* Scrollable sections */}
      <div className="space-y-48 pb-60">
        {sections.map((section, index) => (
          <div
            key={section.id}
            data-index={index}
            id={section.id}
            className={`tech-section space-y-4 transition-all duration-500 ${
              index === activeIndex && !hasScrolledPastAll
                ? "opacity-100 transform translate-y-0" 
                : index < activeIndex || hasScrolledPastAll
                  ? "opacity-0 transform -translate-y-10 pointer-events-none" 
                  : "opacity-20 transform translate-y-0"
            } ${getVerticalPosition(index)}`}
          >
            <h3 className="text-2xl font-bold text-white">{section.title}</h3>
            <p className="text-gray-300 text-lg">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 