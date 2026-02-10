'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

export function ParallaxBackground() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset)
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-[#B43632]/15 via-[#8B2C28]/10 to-black/60" />
      <div 
        className="absolute inset-0 transform"
        style={{ 
          transform: `translate3d(0, ${offset * 0.3}px, 0)`,
          top: '-20%',
          height: '140%'
        }}
      >
        <Image
          src="/Images/dna-gc30aada1a_1280.jpg"
          alt="DNA Background"
          fill
          className="object-cover blur-md brightness-[1.5] opacity-30"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  )
} 