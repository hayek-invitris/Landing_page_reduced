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
      title: "You shall not pass: Wie zellfreie Moleküle das Böse bekämpfen",
      image: "/Images/dna-g1adaf9d6b_1920.jpg",
      link: "https://www.im-io.de/you-shall-not-pass-wie-zellfreie-molekuele-das-boese-bekaempfen/",
      hasExternalLink: true,
      date: "August 15, 2025",
      content: "In this IM+io interview, our CEO Patrick Grossmann describes how their cell-free system synthetically produces bacteriophages, antibodies and even vaccines directly from DNA templates—eliminating the need for traditional cell cultures and enabling precise, rapid manufacturing of targeted therapeutics. Leveraging AI-driven optimization of reaction conditions and an automated phage printer developed with EIC Accelerator support, they aim to generate personalized treatments against antibiotic-resistant infections in under eight hours. Beyond healthcare, Invitris' versatile platform can also be licensed for nanobody production, vaccine development and applications in agriculture or environmental biotechnology."
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
      content: "In May 2023, Invitris was selected by INCATE as the first company to receive a €250 000 Phase II grant—enabling the completion of its spin-out from the TUM's Chair of Synthetic Biological Systems and the scale-up of antimicrobial protein production to combat antibiotic resistance. The funding will support the transition of Invitris' cell-free platform into a GMP-compliant process for manufacturing bacteriophages, phage-derived endolysins and other antimicrobial proteins at scale. Having proven its technology and business model during INCATE Phase I (January 2022) and secured a place in Y Combinator's Winter '23 cohort, Invitris is now poised to accelerate next-generation phage therapies toward broad clinical and industrial applications."
    },
    {
      title: "Invitris in one of the largest daily newspapers in 🇩🇪 !",
      image: "/Images/dna-g1adaf9d6b_1920.jpg",
      link: "#",
      hasExternalLink: false,
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 text-center mb-12">
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
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    Invitris: The cell free company
                  </h2>
                  <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
                    We are redefining the future of biotechnology with revolutionary cell-free protein synthesis. Our universal platform empowers the rapid design, expression, and scalable production of the most complex and hard-to-express proteins, including toxic proteins, membrane proteins and. By moving beyond the limits of traditional cell-based systems, we deliver unmatched speed, precision, and scalability in protein engineering and therapeutic development
                  </p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="text-3xl md:text-4xl font-bold text-white">20x</div>
                    <div className="text-gray-300 text-sm">Faster protein synthesis compared to traditional methods</div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
                    <div className="text-gray-300 text-sm">High flexibility and tunability with openness of cell-free platform</div>
                  </div>
                  <div className="text-center space-y-3">
                     <div className="flex justify-center items-center">
                      <Infinity className="w-10 h-10 stroke-[3] text-white" />
                      </div>
                      <div className="text-gray-300 text-sm">
                        Unlimited possibilities in protein engineering
                        </div>
                      </div>
                  <div className="text-center space-y-3"> 
                    <div className="text-3xl md:text-4xl font-bold text-white">30x </div>
                    <div className="text-gray-300 text-sm">Higher turnaround</div>

                  </div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-400/10">
                  <Image
                    src="/Images/Slide7.jpg"
                    alt="Invitris Cell-Free Technology"
                    width={1200}
                    height={900}
                    className="object-contain w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Technical Details */}
            <div className="mt-20">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Prokaryotic Production */}
                <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10">
                  <h4 className="text-2xl font-bold text-gray-100 mb-6">
                    Prokaryotic cell-free system
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ideal for smaller proteins or enzymes that naturally fold in <em>Escherichia coli</em> (or other bacterial hosts)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Phactory™&apos;s base reagents support high-titer bacterial expression and streamlined downstream purification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Optimized for microbial proteins such as phages, endolysins, tailocins, and binders, the system supports  incorporation of E. coli codon-optimized DNA sequences with a T7 promoter while maintaining consistent process parameters</span>
                    </li>
                  </ul>
                </div>
                
                {/* Mammalian Production */}
                <div className="bg-gray-500/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400/10">
                  <h4 className="text-2xl font-bold text-gray-100 mb-6">
                    Mammalian cell-free expression system
                  </h4>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ideal for synthesizing complex proteins that require mammalian post-translational modifications such as glycosylation and disulfide bond formation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Overcomes the need for complex transfection protocols</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Fast, scalable, and high yield expression of functional difficult-to express proteins</span>
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
            <Image
              src="/Images/dna-gc30aada1a_1280.jpg"
              alt="DNA Background"
              fill
              className="object-cover blur-[2px] brightness-50 opacity-40 scale-110"
              priority
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-start">
              {/* Feature boxes on the left */}
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    icon: Syringe,
                    title: "Cell-free protein synthesis",
                    description: "Leverage advanced cell-free systems for rapid, flexible protein production",
                  },
                  {
                    icon: Waves,
                    title: "Ultra high-throughput",
                    description: "Harness microfluidics to screen up to 1,000 proteins per second and accelerate discovery at unmatched throughput",
                  },
                  {
                    icon: Zap,
                    title: "Rapid protein engineering (Sequence to structure)",
                    description: "Integrate computational design with high-throughput screening to accelerate protein optimization",
                  },
                  {
                    icon: Cog,
                    title: "Translational protein production",
                    description: "Seamlessly scale from picoliter reactions to liter-scale bioreactors while maintaining folding, solubility, and yields",
                  },
                ].map((platform, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-500/15 backdrop-blur-sm p-8 border border-gray-400/10">
                    <div className="flex flex-col space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-600/25 text-gray-200">
                        <platform.icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-100">{platform.title}</h3>
                      <p className="text-gray-300 text-lg">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Heading on the right */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-100">Features</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  Our Solutions
                </h2>
                <p className="text-gray-300 text-lg">
                  We partner across life sciences to tackle challenges and enable innovation in research and development
                </p>
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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  Advancing innovation across sectors
                </h2>
                <p className="text-gray-300 text-xl md:text-2xl">
                  Our technologies adapt to diverse industry needs, driving innovation from research to real-world application
                </p>
              </div>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
                {[
                  {
                    title: "Biopharmaceuticals",
                    image:
                      "/Images/biopharmaceuticals image.jpg",
                    description: "Deliver advanced solutions to accelerate drug discovery and therapeutic development",
                    //link: "Visit Invitris for Biopharmaceuticals",
                    //action: () => {},
                  },
                  {
                    title: "AMR and Phage production",
                    image:
                      "/Images/AMR and phages image.png",
                    description: "Develop targeted phage engineering appraoches to combat antimicrobial resistance",
                    //link: "Visit Invitris for AMR and Phages",
                    //action: () => setIsAmrModalOpen(true),
                  },
                  {
                    title: "Industrial Biotechnology",
                    image:
                      "/Images/industrial biotech image.jpg",
                    description: "Provide robust biotechnological solutions for industrial processes and enzyme production",
                    //link: "Visit Invitris for Industrial",
                    //action: () => {},
                  },
                  {
                    title: "Agriculture",
                    image:
                      "/Images/agriculture 3.jpg",
                    description: "Enable innovative technologies to enhance agricultural productivity and sustainability",
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
                        <h3 className="text-3xl font-bold text-white mb-3">{market.title}</h3>
                        <p className="text-white text-base">{market.description}</p>
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
                src="/Images/pexels-polina-tankilevitch-3735769-scaled.jpg"
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
                  <p className="text-white text-lg">
                    Partner with us to accelerate discovery and develop novel proteins through joint research, co-development, and flexible licensing, turning ideas into market-ready solutions
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
                    Seamlessly Scale Your Biotech Production
                  </h3>
                  <p className="text-white text-lg">
                    Partner with us to scale your biotech manufacturing from cell-free validation to GMP-compliant large-scale production, leveraging advanced technologies for consistent, efficient, and high-quality output
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
                        <h3 className="text-xl font-bold text-white mb-4">{article.title}</h3>
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

        {/* Newsletter Section - Smaller */}
        <section className="w-full py-24 md:py-32 border-t bg-black border-gray-800">
          <div className="container flex flex-col items-center justify-center gap-3 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                Ready to Transform Bio?
              </h2>
              <p className="mx-auto max-w-[500px] text-gray-300 text-base mb-2">
                Join us in revolutionizing biotechnology research.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="mailto:contact@invitris.com">
                <Button 
                  className="bg-[#1a3d5c] text-white hover:bg-[#152f47] w-[160px]"
                >
                  Contact us 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

