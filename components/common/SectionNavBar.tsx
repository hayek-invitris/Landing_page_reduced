"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"


// --- helper for hover underline ---
function HoverUnderline({
  className = "",
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <span
        className="
          pointer-events-none absolute left-0 -bottom-1 h-0.5 w-0
          bg-white transition-all duration-300 group-hover:w-full
        "
      />
    </span>
  )
}


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

  type NavItem = { label: string; id?: string; href?: string }

  const navItems: NavItem[] = [
    { label: "Technology", id: "cell-free" },
    { label: "Features", id: "features" },
    { label: "Markets", id: "markets" },
    { label: "News", id: "news" },
    { label: "Careers", href: "http://careers.invitris.com" },
    //{ label: "About Us", href: "/about/company" }
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
                    className="text-xl font-medium text-gray-200 hover:text-white"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <HoverUnderline>{item.label}</HoverUnderline>
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id!)}
                    className="text-xl font-medium text-gray-200 hover:text-white"
                  >
                    <HoverUnderline>{item.label}</HoverUnderline>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right side - Contact button for desktop */}
          <div className="hidden md:flex md:ml-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-xl font-medium text-gray-200 hover:text-white transition-colors"
            >
              <HoverUnderline>Contact</HoverUnderline>
            </button>
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
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                <Link href="mailto:contact@invitris.com">
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
