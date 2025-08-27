"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function SectionNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (pathname === '/') {
      // We're on the home page, scroll directly
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      // We're on a different page, navigate to home with hash
      router.push(`/#${sectionId}`)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: "Technology", id: "cell-free" },
    { label: "Features", id: "features" },
    { label: "Markets", id: "markets" },
    { label: "News", id: "news" },
    { label: "About Us", href: "/about/company" }
  ]

  return (
    <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-700/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link className="flex items-center" href="/">
            <Image
              src="/Images/21-1__2_-removebg-preview.png"
              alt="Invitris Logo"
              width={180}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center space-x-12 flex-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors text-xl font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id!)}
                    className="text-gray-200 hover:text-white transition-colors text-xl font-medium"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right side - Contact button for desktop */}
          <div className="hidden md:flex">
            <Link href="/about/contact">
              <button className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-full text-lg font-medium transition-colors">
                Contact
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link 
                      href={item.href}
                      className="text-gray-200 hover:text-white transition-colors text-lg font-medium block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id!)}
                      className="text-gray-200 hover:text-white transition-colors text-lg font-medium text-left py-2 w-full"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <Link href="/about/contact">
                  <button 
                    className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-full text-lg font-medium transition-colors w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
