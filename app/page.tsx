"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Syringe, Waves, Zap, Cog } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import InfiniteSlider from "@/components/landing/InfiniteSlider"
import { SectionNavBar } from "@/components/common/SectionNavBar"
import { Footer } from "@/components/common/Footer"
import { Modal } from "@/components/ui/modal"
import { AmrPhagesModal } from "@/components/landing/AmrPhagesModal"
import { NewsModal } from "@/components/landing/NewsModal"
import { useState, useEffect, useRef } from "react"
import { Infinity } from "lucide-react";
// Contact form removed in favor of static email contact information



export default function LandingPage() {
  const [isAmrModalOpen, setIsAmrModalOpen] = useState(false)
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)

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
    <div className="flex flex-col min-h-screen relative bg-black text-white">
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
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </div>
          
          {/* Hero Section Content */}
          <section className="relative min-h-screen w-full flex items-center justify-center">
            <div className="relative z-10 container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full">
                  <span className="text-sm text-white tracking-wide"></span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                  <span className="text-white">
                    Enabling the protein era
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                  Shaping the future of drug discovery through cell-free expression and AI-driven design
                </p>

                <Link href= "/#cell-free" >
                  <Button 
                    className="bg-transparent backdrop-blur-sm text-white hover:bg-white/10 border border-white/30 px-8 py-6 text-lg font-medium rounded-full transition-all"
                  >
                    Explore Our Technology
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Supported By Section */}
          <section className="w-full py-24 md:py-32 relative">
            {/* Simplified gradient overlay for seamless transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
            
            {/* Single smooth blur effect */}
            <div className="absolute inset-0" style={{
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}></div>
            
            <div className="container px-4 md:px-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Supported By
              </h2>
              
              <InfiniteSlider />
            </div>
          </section>
        </div>

        {/* Invitris: The cell free company Section */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="cell-free">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-center">
              {/* Content Side */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-gray-800/50 px-3 py-1 text-sm text-gray-100">Technology</div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Invitris: The cell free company
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    We are redefining the future of biotechnology with cell-free protein synthesis. Our universal platform enables rapid design, expression, and scalable production of even the most complex proteins and unlocking breakthroughs beyond the limits of cell-based systems.
                  </p>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
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
              </div>
            </div>
            
            {/* Statistics Section - Aligned with content */}
            <div className="mt-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="text-center space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-white">20x</div>
                  <div className="text-gray-300 text-sm">Faster protein synthesis</div>
                </div>
                <div className="text-center space-y-3"> 
                  <div className="text-3xl md:text-4xl font-bold text-white">30x </div>
                  <div className="text-gray-300 text-sm">Higher turnaround</div>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
                  <div className="text-gray-300 text-sm">High flexibility and tunability</div>
                </div>
                <div className="text-center space-y-3">
                   <div className="flex justify-center items-center">
                    <Infinity className="w-10 h-10 stroke-[3] text-white" />
                    </div>
                    <div className="text-gray-300 text-sm">
                      Unlimited possibilities
                      </div>
                    </div>
              </div>
            </div>
            
            {/* Technical Details */}
            <div className="mt-20">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Prokaryotic Production */}
                <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10">
                  <h4 className="text-xl font-bold text-white mb-6">
                    Prokaryotic Cell-Free Expression System
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>High-yield protein expression with streamlined purification using Phactory™ reagents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Optimized for microbial proteins including enzymes, phages, endolysins, tailocins, and binders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Supports E. coli codon-optimized DNA with T7 promoters for consistent, scalable results</span>
                    </li>
                  </ul>
                </div>
                
                {/* Mammalian Production */}
                <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10">
                  <h4 className="text-xl font-bold text-white mb-6">
                    Mammalian Cell-Free Expression System
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Enables production of complex proteins with post-translational modifications like glycosylation and disulfide bonds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Bypasses complex transfection protocols for faster workflows</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Delivers scalable, high-yield expression of difficult-to-express proteins</span>
                    </li>
                  </ul>
                </div>
              </div>
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
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-start">
              {/* Heading on the left (mobile: order-1 to appear first) */}
              <div className="space-y-6 lg:sticky lg:top-24 order-1 lg:order-2">
                <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-100">Features</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Our Solutions
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  We partner across life sciences to tackle challenges and enable innovation in research and development
                </p>
              </div>
              
              {/* Feature boxes on the right (mobile: order-2 to appear second) */}
              <div className="grid gap-8 md:grid-cols-2 order-2 lg:order-1">
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
                  <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-500/15 backdrop-blur-sm p-8 border border-gray-400/10">
                    <div className="flex flex-col space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-600/25 text-gray-200">
                        <platform.icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{platform.title}</h3>
                      <p className="text-gray-300 text-base md:text-lg">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section - Larger */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="markets">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,2fr] gap-16">
              <div className="space-y-8">
                <div className="inline-block rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-100">Markets</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Advancing innovation across sectors
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  Our technologies adapt to diverse industry needs, driving innovation from research to real-world application
                </p>
              </div>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
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
                  <div key={index} className="group relative overflow-hidden rounded-xl">
                    <div className="aspect-video relative">
                      <Image
                        src={market.image || "/placeholder.svg"}
                        alt={market.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:bg-black/70" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-bold text-white mb-3">{market.title}</h3>
                        <p className="text-white text-base md:text-lg">{market.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section - With Scroll Animation */}
        

        {/* Partnership Sections */}
        <section className="w-full bg-black py-0 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row">
            {/* Co-Development Partnership */}
            <div className="w-full lg:w-1/2 relative h-[800px] lg:h-[1000px] group overflow-hidden">
              <Image
                src="/Images/collab.jpeg"
                alt="Research Collaboration"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-100 mb-4">Partnership</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Co-development & Licensing
                  </h3>
                  <p className="text-white text-base md:text-lg">
                    Accelerate discovery with joint research, co-development, and flexible licensing to turn ideas into market-ready solutions.
                  </p>
                  {/* <Button className="mt-6 bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </div>
            
            {/* Manufacturing Partnership */}
            <div className="w-full lg:w-1/2 relative h-[800px] lg:h-[1000px] group overflow-hidden">
              <Image
                src="/Images/s.jpeg"
                alt="Industrial Manufacturing"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-100 mb-4">Partnership</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Scalable Biotech Production
                  </h3>
                  <p className="text-white text-base md:text-lg">
                    Scale seamlessly from cell-free validation to GMP manufacturing with advanced, reliable, and efficient production technologies.
                  </p>
                  {/* <Button className="mt-6 bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section - With Horizontal Scroll */}
        <section className="w-full py-48 md:py-64 bg-black border-t border-gray-800" id="news">
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">
              Read the latest
              <br />
              from Invitris
            </h2>
            <div className="overflow-x-auto pb-4 scrollbar-large-interaction">
              <div className="flex gap-8 min-w-max">
                {newsItems.map((article, index) => (
                  <div key={index} className="group relative flex-shrink-0 w-[420px] bg-gray-900 rounded-lg border border-gray-800">
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-lg font-bold text-white mb-4">{article.title}</h3>
                        <button
                          onClick={() => setSelectedNewsIndex(index)}
                          className="flex items-center text-white hover:text-teal-400 transition-colors"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-black border-t border-gray-800" id="contact">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
              Ready to explore how our biotechnology solutions can advance your projects? 
              Let&apos;s discuss your needs and discover the possibilities together.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-6 px-6 md:px-8 bg-gray-900/60 border border-gray-800 rounded-xl">
              <p className="text-gray-200 text-lg md:text-xl">
                Please contact us via
                {" "}
                <a
                  href="mailto:contact@invitris.com"
                  className="text-white underline hover:text-teal-300"
                >
                  contact@invitris.com
                </a>
                .
              </p>
            </div>
          </div>
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

