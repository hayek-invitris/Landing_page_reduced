"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface SubmenuProps {
  label: string
  items: {
    label: string
    href: string
  }[]
}

export function Submenu({ label, items }: SubmenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="text-gray-200 hover:text-white transition-colors text-xl font-medium flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-48 rounded-md bg-black py-2 shadow-xl z-50 border border-white/10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-lg text-gray-200 hover:bg-white/10 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

