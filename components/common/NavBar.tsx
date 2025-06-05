"use client"

import Link from "next/link"
import Image from "next/image"
import { Submenu } from "@/components/common/submenu"
import { useRef, useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function NavBar() {
  // Commented out dynamic background color functionality
  /*
  const [isOverLightBackground, setIsOverLightBackground] = useState(false)
  useEffect(() => {
    const checkBackgrounds = () => {
      // Create an array of elements with light backgrounds, excluding images
      const lightBackgroundElements = Array.from(
        document.querySelectorAll('.bg-white, .bg-gray-50, .bg-white\\/80')
      ).filter(el => {
        // Check if this element is or contains an image
        const isOrContainsImage = 
          el.tagName === 'IMG' || 
          el.querySelector('img') !== null ||
          (el instanceof HTMLElement && el.style.backgroundImage !== '') ||
          window.getComputedStyle(el).backgroundImage !== 'none';
        
        // Filter out elements with images
        return !isOrContainsImage;
      });

      // If no light backgrounds found, set state to false
      if (lightBackgroundElements.length === 0) {
        setIsOverLightBackground(false);
        return;
      }

      // Get the navbar position
      if (!headerRef.current) return;
      
      const navbarRect = headerRef.current.getBoundingClientRect();
      const navbarTop = navbarRect.top;
      const navbarBottom = navbarRect.bottom;
      const navbarHeight = navbarRect.height;
      
      // Check if any light background element is currently under the navbar
      const isOverLight = lightBackgroundElements.some(el => {
        const rect = el.getBoundingClientRect();
        
        // Check for significant overlap - element must be large enough
        const overlapHeight = Math.min(navbarBottom, rect.bottom) - Math.max(navbarTop, rect.top);
        
        // Require at least 40% of navbar height overlap and element must be visible
        // Also check that element is wide enough
        return (
          overlapHeight > navbarHeight * 0.4 && 
          rect.width > window.innerWidth * 0.5 &&
          rect.height > 100 // Must be reasonably tall
        );
      });
      
      setIsOverLightBackground(isOverLight);
    };
    
    // Run check initially and on scroll
    checkBackgrounds();
    
    // Use a debounced scroll handler to improve performance
    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(checkBackgrounds);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkBackgrounds);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkBackgrounds);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);
  */
  
  const headerRef = useRef<HTMLElement>(null)
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  return (
    <>
      <header 
        ref={headerRef}
        className="sticky top-0 h-28 backdrop-blur-sm border-b border-white/10 z-[100] bg-black">
        <div className="container mx-auto px-4 h-full flex items-center">
          <Link className="flex items-center" href="/">
            <Image
              src="/Images/21-1__2_-removebg-preview.png"
              alt="Invitris Logo"
              width={180}
              height={48}
              className="object-contain"
            />
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-12">
            <Link className="text-gray-200 hover:text-white transition-colors text-base font-medium" href="/technology">
              Technology
            </Link>
            <Submenu
              label="Industries"
              items={[
                { label: "Biopharmaceuticals", href: "/industries/biopharmaceuticals" },
                { label: "AMR and Phages", href: "/industries/amr-phages" },
                { label: "Industrial Biotechnology", href: "/industries/industrial" },
                { label: "Agriculture", href: "/industries/agriculture" },
              ]}
            />
            <Submenu
              label="About"
              items={[
                { label: "Company", href: "/about/company" },
                { label: "Careers", href: "/about/careers" },
                
              ]}
            />
          </nav>
          
          {/* Desktop Right Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-gray-200 hover:text-white transition-colors text-base font-medium" href="/about/contact">
              Contact
            </Link>
            <Link className="text-gray-200 hover:text-white transition-colors text-base font-medium" href="/#news">
              News
            </Link>
          </div>

          {/* Mobile Hamburger Button - Only visible on mobile */}
          <button
            className="md:hidden ml-auto p-2 text-gray-200 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Only visible on mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] md:hidden" />
      )}

      {/* Mobile Navigation Menu - Only visible on mobile */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-black border-l border-white/10 z-[120] md:hidden
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-24 px-6">
          <nav className="flex flex-col space-y-6">
            <Link 
              className="text-gray-200 hover:text-white transition-colors text-lg font-medium py-2"
              href="/technology"
              onClick={closeMobileMenu}
            >
              Technology
            </Link>
            
            {/* Mobile Industries Submenu */}
            <div className="space-y-3">
              <h3 className="text-gray-200 text-lg font-medium">Industries</h3>
              <div className="pl-4 space-y-3">
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/industries/biopharmaceuticals"
                  onClick={closeMobileMenu}
                >
                  Biopharmaceuticals
                </Link>
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/industries/amr-phages"
                  onClick={closeMobileMenu}
                >
                  AMR and Phages
                </Link>
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/industries/industrial"
                  onClick={closeMobileMenu}
                >
                  Industrial Biotechnology
                </Link>
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/industries/agriculture"
                  onClick={closeMobileMenu}
                >
                  Agriculture
                </Link>
              </div>
            </div>

            {/* Mobile About Submenu */}
            <div className="space-y-3">
              <h3 className="text-gray-200 text-lg font-medium">About</h3>
              <div className="pl-4 space-y-3">
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/about/company"
                  onClick={closeMobileMenu}
                >
                  Company
                </Link>
                <Link 
                  className="block text-gray-300 hover:text-white transition-colors text-base"
                  href="/about/careers"
                  onClick={closeMobileMenu}
                >
                  Careers
                </Link>
              </div>
            </div>

            <hr className="border-white/10 my-6" />

            <Link 
              className="text-gray-200 hover:text-white transition-colors text-lg font-medium py-2"
              href="/about/contact"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link 
              className="text-gray-200 hover:text-white transition-colors text-lg font-medium py-2"
              href="/#news"
              onClick={closeMobileMenu}
            >
              News
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}