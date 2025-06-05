"use client"

import { useRef, useState, MouseEvent, TouchEvent } from "react"

interface DraggableScrollProps {
  children: React.ReactNode
  className?: string
}

export function DraggableScroll({ children, className = "" }: DraggableScrollProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const startDragging = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX - (sliderRef.current?.offsetLeft || 0))
    setScrollLeft(sliderRef.current?.scrollLeft || 0)
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const x = clientX - (sliderRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <div
      ref={sliderRef}
      className={`overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing bg-black ${className}`}
      onMouseDown={startDragging}
      onMouseMove={move}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={startDragging}
      onTouchMove={move}
      onTouchEnd={stopDragging}
    >
      {children}
    </div>
  )
}

