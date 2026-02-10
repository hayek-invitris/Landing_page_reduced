"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Syringe, Waves, Zap, Cog, Send, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const GlobeToMapMorphSection = dynamic(
  () => import("@/components/landing/GlobeToMapMorphSection").then(mod => ({ default: mod.GlobeToMapMorphSection })),
  { ssr: false }
)

import { SectionNavBar } from "@/components/common/SectionNavBar"
import { Footer } from "@/components/common/Footer"
import { Modal } from "@/components/ui/modal"
import { AmrPhagesModal } from "@/components/landing/AmrPhagesModal"
import { NewsModal } from "@/components/landing/NewsModal"
import { AnimatedSection, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/AnimatedSection"
import { useState, useEffect, useRef } from "react"
import { Infinity } from "lucide-react";
import { sanitizeContactForm } from "@/lib/sanitization"



export default function LandingPage() {
  const [isAmrModalOpen, setIsAmrModalOpen] = useState(false)
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  })
  const [honeypot, setHoneypot] = useState("") // Anti-spam honeypot
  const [formLoadTime] = useState(Date.now()) // Anti-spam timing check
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple mailto solution - opens user's email client
    const subject = encodeURIComponent(`Contact from ${contactForm.firstName} ${contactForm.lastName} - ${contactForm.company}`)
    const body = encodeURIComponent(
      `Name: ${contactForm.firstName} ${contactForm.lastName}\n` +
      `Email: ${contactForm.email}\n` +
      `Company: ${contactForm.company}\n\n` +
      `Message:\n${contactForm.message}`
    )
    
    window.location.href = `mailto:contact@invitris.com?subject=${subject}&body=${body}`
    
    // Reset form after opening email client
    setContactForm({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    })
    setSubmitStatus("success")
  }

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroImageRef.current) {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3;
            heroImageRef.current.style.transform = `translateY(${translateY}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scrolling to section when coming from another page with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    // Handle initial hash on page load
    handleHashScroll();
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  const newsItems = [
    {
      title: "Buchtipp aus der Community",
      image: "/Images/DSC_9486.jpg",
      link: "https://mybook.to/HonorableEntrepreneur",
      hasExternalLink: true,
      date: "Oktober 22, 2025",
      content: " The Honorable Entrepreneur – die NanoTemper‑Gründerstory ohne VC, mit Haltung. Praktische Learnings & sieben Prinzipien für verantwortungsvolles Wachstum. Launch am 23.10.",
      linkText: "Get the Book"
    },
    {
      title: "You shall not pass: Wie zellfreie Moleküle das Böse bekämpfen",
      image: "/Images/dna-g1adaf9d6b_1920.jpg",
      link: "https://www.im-io.de/you-shall-not-pass-wie-zellfreie-molekuele-das-boese-bekaempfen/",
      hasExternalLink: true,
      date: "August 15, 2025",
      content: "In this IM+io interview, our CEO Patrick Grossmann describes how their cell-free system synthetically produces bacteriophages, antibodies and even vaccines directly from DNA templates—eliminating the need for traditional cell cultures and enabling precise, rapid manufacturing of targeted therapeutics. Leveraging AI-driven optimization of reaction conditions and an automated phage printer developed with EIC Accelerator support, they aim to generate personalized treatments against antibiotic-resistant infections in under eight hours. Beyond healthcare, Invitris' versatile platform can also be licensed for nanobody production, vaccine development and applications in agriculture or environmental biotechnology.",
      linkText: "Read the Interview"
    },
    {
      title: "Invitris wins EIC grant",
      image: "/Images/EIC.png",
      link: "#",
      hasExternalLink: false,
      date: "July 10, 2025",
      content: "Invitris has been awarded a prestigious European Innovation Council grant to accelerate our groundbreaking biotechnology research and development initiatives."
    },
    {
      title: "Invitris receives 250,000 euros for complete spin-off from TUM",
      image: "/Images/News Section/Invitris_TUM_2000x1098-1536x843.webp",
      link: "https://www.izb-online.de/izb-biotech-news/invitris-erhaelt-250-000-euro-fuer-vollstaendige-ausgruendung-aus-der-tum-innovations-und-gruenderzentrum-biotechnologie-izb/",
      hasExternalLink: true,
      date: "May 15, 2023",
      content: "In May 2023, Invitris was selected by INCATE as the first company to receive a €250 000 Phase II grant—enabling the completion of its spin-out from the TUM's Chair of Synthetic Biological Systems and the scale-up of antimicrobial protein production to combat antibiotic resistance. The funding will support the transition of Invitris' cell-free platform into a GMP-compliant process for manufacturing bacteriophages, phage-derived endolysins and other antimicrobial proteins at scale. Having proven its technology and business model during INCATE Phase I (January 2022) and secured a place in Y Combinator's Winter '23 cohort, Invitris is now poised to accelerate next-generation phage therapies toward broad clinical and industrial applications.",
      linkText: "Read Full Article"
    },
    {
      title: "Invitris in one of the largest daily newspapers in 🇩🇪 !",
      image: "/Images/dna-g1adaf9d6b_1920.jpg",
      link: "https://www.sueddeutsche.de/muenchen/landkreismuenchen/martinsried-start-up-invitris-bakteriophagen-multiresistente-keime-lux.VcRC4iR2mWkateTgvQQW3a?reduced=true",
      hasExternalLink: true,
      date: "March 8, 2023",
      content: "Discover how our cutting-edge biotechnology platforms are enabling researchers to push the boundaries of what's possible in multiple scientific disciplines."
    },
  ]

  return (
    <div className="flex flex-col min-h-screen relative bg-black text-white overflow-x-clip">
      <SectionNavBar />
      
      <main className="flex-1">
    
        {/* Combined Hero and Supported By Section with shared background */}
        <div className="relative w-full bg-black overflow-hidden">
          <div className="absolute inset-0">
            <div ref={heroImageRef} className="absolute inset-0">
              <video
                src="/Images/l,koiuyt.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            {/* Red overlay to match the image style */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B43632]/20 via-[#8B2C28]/15 to-black/40" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          </div>
          
          {/* Hero Section Content */}
          <section className="relative min-h-screen w-full flex items-center justify-center">
            <div className="relative z-10 container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-white tracking-wide"></span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight"
                >
                  <span className="text-white whitespace-nowrap inline-block">
                    Breaking Biology Free
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4"
                >
                  Invitris is the manufacturing engine to enable instant access to AI medicine
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Link href= "/#cell-free" >
                    <Button 
                      className="bg-transparent backdrop-blur-sm text-white hover:bg-white/10 border border-white/30 px-8 py-6 text-lg font-medium rounded-full transition-all hover:scale-105 hover:border-white/50"
                    >
                      Explore Our Technology
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Simple Supported By Section - Black Background */}
        <section className="w-full py-6 md:py-12 bg-black">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-28">
                <div className="flex items-center justify-center">
                  <Image 
                    src="/Images/Slider/Black.png"
                    alt="Y Combinator"
                    width={320}
                    height={130}
                    className="w-[160px] md:w-[280px] lg:w-[320px] h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image 
                    src="/Images/Slider/meta-1.png"
                    alt="Nucleate"
                    width={320}
                    height={130}
                    className="w-[160px] md:w-[280px] lg:w-[320px] h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <GlobeToMapMorphSection
          globeImageUrl="/Images/earth-night.jpg"
          mapImageUrl="/Images/earth-night-shaded.png"
          mapPoints={[
            { lat: 37.7749, lng: -122.4194, city: "San Francisco" },
            { lat: 40.7128, lng: -74.0060, city: "New York" },
            { lat: 42.3601, lng: -71.0589, city: "Boston" },
            { lat: 43.6532, lng: -79.3832, city: "Toronto" },
            { lat: 51.5074, lng: -0.1278, city: "London" },
            { lat: 48.8566, lng: 2.3522, city: "Paris" },
            { lat: 52.3676, lng: 4.9041, city: "Amsterdam" },
            { lat: 59.3293, lng: 18.0686, city: "Stockholm" },
            { lat: 52.5200, lng: 13.4050, city: "Berlin" },
            { lat: 48.1351, lng: 11.5820, city: "Munich" },
            { lat: 47.3769, lng: 8.5417, city: "Zurich" },
            { lat: 32.0853, lng: 34.7818, city: "Tel Aviv" },
            { lat: 12.9716, lng: 77.5946, city: "Bangalore" },
            { lat: 1.3521, lng: 103.8198, city: "Singapore" },
            { lat: 35.6762, lng: 139.6503, city: "Tokyo" },
            { lat: -1.2921, lng: 36.8219, city: "Nairobi" },
            { lat: -33.8688, lng: 151.2093, city: "Sydney" },
            { lat: -23.5505, lng: -46.6333, city: "São Paulo" },
          ]}
          arcs={[
            { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 40.7128, lng: -74.0060 } },
            { from: { lat: 40.7128, lng: -74.0060 }, to: { lat: 51.5074, lng: -0.1278 } },
            { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 35.6762, lng: 139.6503 } },
            { from: { lat: 35.6762, lng: 139.6503 }, to: { lat: 1.3521, lng: 103.8198 } },
            { from: { lat: 1.3521, lng: 103.8198 }, to: { lat: -33.8688, lng: 151.2093 } },
            { from: { lat: 40.7128, lng: -74.0060 }, to: { lat: -23.5505, lng: -46.6333 } },
            { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 43.6532, lng: -79.3832 } },
            { from: { lat: 43.6532, lng: -79.3832 }, to: { lat: 42.3601, lng: -71.0589 } },
            { from: { lat: 42.3601, lng: -71.0589 }, to: { lat: 40.7128, lng: -74.0060 } },
            { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 48.8566, lng: 2.3522 } },
            { from: { lat: 48.8566, lng: 2.3522 }, to: { lat: 52.3676, lng: 4.9041 } },
            { from: { lat: 52.3676, lng: 4.9041 }, to: { lat: 59.3293, lng: 18.0686 } },
            { from: { lat: 59.3293, lng: 18.0686 }, to: { lat: 52.5200, lng: 13.4050 } },
            { from: { lat: 52.5200, lng: 13.4050 }, to: { lat: 48.1351, lng: 11.5820 } },
            { from: { lat: 48.1351, lng: 11.5820 }, to: { lat: 47.3769, lng: 8.5417 } },
            { from: { lat: 47.3769, lng: 8.5417 }, to: { lat: 48.8566, lng: 2.3522 } },
            { from: { lat: 52.5200, lng: 13.4050 }, to: { lat: 51.5074, lng: -0.1278 } },
            { from: { lat: 48.8566, lng: 2.3522 }, to: { lat: 32.0853, lng: 34.7818 } },
            { from: { lat: 32.0853, lng: 34.7818 }, to: { lat: 12.9716, lng: 77.5946 } },
            { from: { lat: 12.9716, lng: 77.5946 }, to: { lat: 1.3521, lng: 103.8198 } },
            { from: { lat: 35.6762, lng: 139.6503 }, to: { lat: 12.9716, lng: 77.5946 } },
            { from: { lat: -1.2921, lng: 36.8219 }, to: { lat: 12.9716, lng: 77.5946 } },
            { from: { lat: -1.2921, lng: 36.8219 }, to: { lat: 51.5074, lng: -0.1278 } },
            { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 35.6762, lng: 139.6503 } },
            { from: { lat: -23.5505, lng: -46.6333 }, to: { lat: -33.8688, lng: 151.2093 } },
            { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 47.3769, lng: 8.5417 } },
            { from: { lat: 40.7128, lng: -74.0060 }, to: { lat: 48.8566, lng: 2.3522 } },
            { from: { lat: 37.7749, lng: -122.4194 }, to: { lat: 1.3521, lng: 103.8198 } },
            { from: { lat: 12.9716, lng: 77.5946 }, to: { lat: 35.6762, lng: 139.6503 } },
            { from: { lat: 52.3676, lng: 4.9041 }, to: { lat: 52.5200, lng: 13.4050 } },
            { from: { lat: 43.6532, lng: -79.3832 }, to: { lat: 51.5074, lng: -0.1278 } },
          ]}
        />

        {/* Invitris: The cell free company Section */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="cell-free">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-center">
              {/* Content Side */}
              <AnimatedSection animation="fadeRight" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Invitris: The <span className="text-[#B43632]">cell free</span> company
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    We are redefining the future of biotechnology with cell-free protein synthesis. Our universal platform enables rapid design, expression, and scalable production of even the most complex proteins and unlocking breakthroughs beyond the limits of cell-based systems.
                  </p>
                </div>
              </AnimatedSection>
              
              {/* Image Side */}
              <AnimatedSection animation="fadeLeft" delay={0.2} className="relative">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <Image
                    src="/Images/phactory graphic on black background example.png"
                    alt="Invitris Cell-Free Technology"
                    width={3000}
                    height={1300}
                    className="w-full h-auto object-contain"
                    priority
                    sizes="(min-width: 1024px) 600px, 100vw"
                  />
                </div>
              </AnimatedSection>
            </div>
            
            {/* Statistics Section - Aligned with content */}
            <div className="mt-20">
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" staggerDelay={0.15}>
                <StaggerItem animation="scaleUp">
                  <div className="text-center space-y-3">
                    <div className="text-3xl md:text-4xl font-bold text-[#B43632]">20x</div>
                    <div className="text-gray-300 text-sm">Faster protein synthesis</div>
                  </div>
                </StaggerItem>
                <StaggerItem animation="scaleUp">
                  <div className="text-center space-y-3"> 
                    <div className="text-3xl md:text-4xl font-bold text-[#B43632]">30x </div>
                    <div className="text-gray-300 text-sm">Higher turnaround</div>
                  </div>
                </StaggerItem>
                <StaggerItem animation="scaleUp">
                  <div className="text-center space-y-3">
                    <div className="text-3xl md:text-4xl font-bold text-[#B43632]">100%</div>
                    <div className="text-gray-300 text-sm">High flexibility and tunability</div>
                  </div>
                </StaggerItem>
                <StaggerItem animation="scaleUp">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center items-center">
                      <Infinity className="w-10 h-10 stroke-[3] text-[#B43632]" />
                    </div>
                    <div className="text-gray-300 text-sm">
                      Unlimited possibilities
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

  
            
            {/* Technical Details */}
            <div className="mt-20">
              <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
                {/* Prokaryotic Production */}
                <StaggerItem animation="fadeUp">
                  <HoverCard className="h-full">
                    <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10 h-full transition-all duration-300 hover:border-[#B43632]/30 hover:bg-gray-500/20">
                      <h4 className="text-xl font-bold text-white mb-6">
                        Prokaryotic Cell-Free Expression System
                      </h4>
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>High-yield protein expression with streamlined purification using Phactory™ reagents</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Optimized for microbial proteins including enzymes, phages, endolysins, tailocins, and binders</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Supports E. coli codon-optimized DNA with T7 promoters for consistent, scalable results</span>
                        </li>
                      </ul>
                    </div>
                  </HoverCard>
                </StaggerItem>
                
                {/* Mammalian Production */}
                <StaggerItem animation="fadeUp">
                  <HoverCard className="h-full">
                    <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10 h-full transition-all duration-300 hover:border-[#B43632]/30 hover:bg-gray-500/20">
                      <h4 className="text-xl font-bold text-white mb-6">
                        Mammalian Cell-Free Expression System
                      </h4>
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Enables production of complex proteins with post-translational modifications like glycosylation and disulfide bonds</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Bypasses complex transfection protocols for faster workflows</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#B43632] rounded-full mt-2 flex-shrink-0"></div>
                          <span>Delivers scalable, high-yield expression of difficult-to-express proteins</span>
                        </li>
                      </ul>
                    </div>
                  </HoverCard>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Platforms Section - Larger */}
        <section className="w-full py-48 md:py-64 relative overflow-hidden bg-black border-t border-gray-800" id="features">
          <div className="absolute inset-0">
            <video
              src="/videos/our%20solutions.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover blur-[2px] brightness-50 opacity-40 scale-110"
              onError={(e) => console.error('Video failed to load:', e)}
              onCanPlay={() => console.log('Video can start playing')}
            />
            {/* Red overlay to match the site theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B43632]/20 via-[#8B2C28]/15 to-black/40" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-start">
              {/* Heading on the left (mobile: order-1 to appear first) */}
              <AnimatedSection animation="fadeRight" className="space-y-6 lg:sticky lg:top-24 order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Our <span className="text-[#B43632]">Solutions</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  We partner across life sciences to tackle challenges and enable innovation in research and development
                </p>
              </AnimatedSection>
              
              {/* Feature boxes on the right (mobile: order-2 to appear second) */}
              <StaggerContainer className="grid gap-8 md:grid-cols-2 order-2 lg:order-1" staggerDelay={0.15}>
                {[
                  {
                    icon: Syringe,
                    title: "Cell-free protein synthesis",
                    description: "Leverage advanced cell-free systems for rapid, flexible protein production",
                  },
                  {
                    icon: Waves,
                    title: "Ultra high-throughput",
                    description: "Harness microfluidics to screen up to 1,000 proteins per second",
                  },
                  {
                    icon: Zap,
                    title: "Rapid protein engineering (Sequence to structure)",
                    description: "Integrate computational design with high-throughput screening",
                  },
                  {
                    icon: Cog,
                    title: "Translational protein production",
                    description: "Seamlessly scale from picoliter reactions to liter-scale",
                  },
                ].map((platform, index) => (
                  <StaggerItem key={index} animation="fadeUp">
                    <HoverCard className="h-full">
                      <div className="group relative overflow-hidden rounded-xl bg-gray-500/15 backdrop-blur-sm p-8 border border-gray-400/10 h-full transition-all duration-300 hover:border-[#B43632]/30 hover:bg-gray-500/25">
                        <div className="flex flex-col space-y-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-600/25 text-gray-200 transition-all duration-300 group-hover:bg-[#B43632]/20 group-hover:text-[#B43632]">
                            <platform.icon className="h-7 w-7" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{platform.title}</h3>
                          <p className="text-gray-300 text-base md:text-lg">{platform.description}</p>
                        </div>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Platforms Section - Larger */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="markets">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,2fr] gap-16">
              <AnimatedSection animation="fadeRight" className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Advancing innovation across <span className="text-[#B43632]">sectors</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  Our technologies adapt to diverse industry needs, driving innovation from research to real-world application
                </p>
              </AnimatedSection>
              <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-2" staggerDelay={0.12}>
                {[
                  {
                    title: "Biopharmaceuticals",
                    image:
                      "/Images/biopharmaceuticals image.jpg",
                    description: "Accelerating drug discovery and therapeutic development",
                    //link: "Visit Invitris for Biopharmaceuticals",
                    //action: () => {},
                  },
                  {
                    title: "AMR and Phage production",
                    image:
                      "/Images/AMR and phages image.png",
                    description: "Targeted phage engineering to combat AMR",
                    //link: "Visit Invitris for AMR and Phages",
                    //action: () => setIsAmrModalOpen(true),
                  },
                  {
                    title: "Industrial Biotechnology",
                    image:
                      "/Images/industrial biotech image.jpg",
                    description: "Enabling efficient solutions for enzyme production",
                    //link: "Visit Invitris for Industrial",
                    //action: () => {},
                  },
                  {
                    title: "Agriculture",
                    image:
                      "/Images/agriculture 3.jpg",
                    description: "Innovative solutions for sustainable agriculture",
                    //link: "Visit Invitris for Agriculture",
                    //action: () => {},
                  }
                ].map((market, index) => (
                  <StaggerItem key={index} animation="scaleUp">
                    <HoverCard>
                      <div className="group relative overflow-hidden rounded-xl cursor-pointer">
                        <div className="aspect-video relative">
                          <Image
                            src={market.image || "/placeholder.svg"}
                            alt={market.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                            <h3 className="text-xl font-bold text-white mb-3 transition-transform duration-300 group-hover:-translate-y-1">{market.title}</h3>
                            <p className="text-white text-base md:text-lg opacity-90 transition-all duration-300 group-hover:opacity-100">{market.description}</p>
                          </div>
                        </div>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Partnership Sections */}
        <section className="w-full bg-black py-0 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row">
            {/* Co-Development Partnership */}
            <AnimatedSection animation="fadeRight" className="w-full lg:w-1/2 relative h-[800px] lg:h-[1000px] group overflow-hidden">
              <Image
                src="/Images/collab.jpeg"
                alt="Research Collaboration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/40 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Co-development & Licensing
                  </h3>
                  <p className="text-white text-base md:text-lg opacity-90">
                    Accelerate discovery with joint research, co-development, and flexible licensing to turn ideas into market-ready solutions.
                  </p>
                  {/* <Button className="mt-6 bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Manufacturing Partnership */}
            <AnimatedSection animation="fadeLeft" delay={0.2} className="w-full lg:w-1/2 relative h-[800px] lg:h-[1000px] group overflow-hidden">
              <Image
                src="/Images/s.jpeg"
                alt="Industrial Manufacturing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/40 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Scalable Biotech Production
                  </h3>
                  <p className="text-white text-base md:text-lg opacity-90">
                    Scale seamlessly from cell-free validation to GMP manufacturing with advanced, reliable, and efficient production technologies.
                  </p>
                  {/* <Button className="mt-6 bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* News Section - With Horizontal Scroll */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="news">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="fadeUp">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">
                Read the <span className="text-[#B43632]">latest</span>
                <br />
                from Invitris
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div className="overflow-x-auto pb-4 scrollbar-large-interaction">
                <div className="flex gap-8 min-w-max">
                  {newsItems.map((article, index) => (
                    <motion.div 
                      key={index} 
                      className="group relative flex-shrink-0 w-[420px] bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <h3 className="text-lg font-bold text-white mb-4 transition-transform duration-300 group-hover:-translate-y-1">{article.title}</h3>
                          <button
                            onClick={() => setSelectedNewsIndex(index)}
                            className="flex items-center text-white hover:text-[#B43632] transition-all duration-300 group-hover:translate-x-1"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-black border-t border-gray-800" id="contact">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"><span className="text-[#B43632]">Contact</span> Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
              Ready to explore how our biotechnology solutions can advance your projects? 
              Let&apos;s discuss your needs and discover the possibilities together.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scaleUp" delay={0.2} className="max-w-2xl mx-auto">
            <form onSubmit={handleContactSubmit} className="space-y-6 bg-gray-900/60 border border-gray-800 rounded-xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-700">
              {/* Honeypot field - hidden from users, catches bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                  <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4">
                  <p className="text-green-300 text-sm">
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && validationErrors.length === 0 && (
                <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-300 text-sm">
                    Failed to send message. Please try again or email us directly at contact@invitris.com
                  </p>
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={contactForm.firstName}
                    onChange={handleContactChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#B43632] focus:ring-1 focus:ring-[#B43632] transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={contactForm.lastName}
                    onChange={handleContactChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#B43632] focus:ring-1 focus:ring-[#B43632] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#B43632] focus:ring-1 focus:ring-[#B43632] transition-colors"
                  placeholder="john.doe@company.com"
                />
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={contactForm.company}
                  onChange={handleContactChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#B43632] focus:ring-1 focus:ring-[#B43632] transition-colors"
                  placeholder="Biotech Corp"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                  Message * (min. 10 characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows={5}
                  maxLength={5000}
                  className="w-full px-4 py-3 bg-black/70 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#B43632] focus:ring-1 focus:ring-[#B43632] transition-colors resize-none"
                  placeholder="Tell us about your project or how we can help..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#B43632] hover:bg-[#8B2C28] text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                <p className="text-gray-400 text-sm">
                  Or email us directly at{" "}
                  <a href="mailto:contact@invitris.com" className="text-[#B43632] hover:text-[#8B2C28] underline">
                    contact@invitris.com
                  </a>
                </p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

        
      </main>
      <Footer />

      {/* AMR and Phages Modal */}
      <Modal isOpen={isAmrModalOpen} onClose={() => setIsAmrModalOpen(false)}>
        <AmrPhagesModal />
      </Modal>

      {/* News Modal */}
      {selectedNewsIndex !== null && (
        <Modal 
          isOpen={selectedNewsIndex !== null} 
          onClose={() => setSelectedNewsIndex(null)}
        >
          <NewsModal article={newsItems[selectedNewsIndex]} />
        </Modal>
      )}
    </div>

    
   
  )
}

