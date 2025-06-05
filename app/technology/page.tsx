import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ParallaxHero } from "@/components/technology/parallax-hero"
import { ScrollReveal } from "@/components/technology/scroll-reveal"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"


export default function TechnologyPage() {
  const techSections = [
    {
      id: "cell-free",
      title: "Cell-Free System",
      description: "Our innovative cell-free platform eliminates the limitations of traditional cell-based methods, enabling rapid and efficient protein synthesis outside of living cells."
    },
    {
      id: "modular",
      title: "Modular Composition",
      description: "Our system uses modular components that can be precisely assembled to create customized biological constructs, offering unprecedented flexibility for researchers."
    },
    {
      id: "phage",
      title: "Phage Assembly",
      description: "We've developed advanced techniques for efficient bacteriophage assembly, enabling targeted solutions for antimicrobial applications and beyond."
    },
    {
      id: "quality",
      title: "Quality Control",
      description: "Our integrated quality control process ensures the highest standards of purity, efficacy, and consistency throughout production."
    },
    {
      id: "encapsulation",
      title: "Encapsulation",
      description: "Our proprietary encapsulation technology preserves biological activity and provides enhanced stability and shelf-life for the final product."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <NavBar />
      
      {/* Hero Section with Parallax Effect */}
      <ParallaxHero 
        title="Advanced Biotechnology Platform"
        description="Discover how our cutting-edge technology is revolutionizing biotechnology research and development"
        imageSrc="/Images/shutterstock_2036608064-scaled.jpg"
      />
      
      {/* Technology Explanation Section */}
      <section className="relative py-36 md:py-48 lg:py-64 bg-gray-950 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 relative">
            <div className="lg:w-1/2">
              <div className="sticky top-24 z-10 py-12 bg-gray-950 mb-32">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  How Our Technology Works
                </h2>
              </div>
              <ScrollReveal sections={techSections} />
            </div>
            
            {/* Right side: sticky image */}
            <div className="lg:w-1/2 hidden lg:block">
              <div className="sticky top-40">
                <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden rounded-lg">
                  <Image
                    src="/Images/technologyerklarung.png"
                    alt="Technology Explanation Diagram"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Technology Overview */}
      {/* <section className="relative py-36 md:py-48 lg:py-64 bg-black border-t border-white/10">
        <div className="container px-4 md:px-6 h-full flex flex-col justify-center">
          <div className="grid gap-12 lg:grid-cols-2">
            {[
              {
                icon: Microscope,
                title: "Advanced Microscopy",
                description:
                  "State-of-the-art imaging technology enabling unprecedented visualization of cellular processes.",
              },
              {
                icon: Database,
                title: "Data Analytics",
                description: "Powerful computational tools for analyzing complex biological datasets.",
              },
              {
                icon: Flask,
                title: "Automated Lab Systems",
                description: "Robotic systems and automated workflows increasing efficiency and reproducibility.",
              },
              {
                icon: Dna,
                title: "Gene Editing",
                description: "Precise genetic modification tools for therapeutic development.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a3d5c] text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Future Vision Section */}
      <section className="w-full py-36 md:py-48 lg:py-64 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                One day we will print phages from our laptop
              </h2>
              <p className="text-slate-100 text-xl md:text-2xl">
                Our revolutionary technology is paving the way for desktop phage synthesis, bringing laboratory capabilities directly to researchers and healthcare providers worldwide.
              </p>
            </div>
            <div className="relative h-[350px] overflow-hidden rounded-lg border border-gray-300 bg-white p-2 custom-shadow">
              <Image
                src="/Images/Slide3.jpg"
                alt="Futuristic phage printing concept"
                fill
                className="object-contain bg-white"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      

      

        {/* Conclusion */}
        
        
    
      
      {/* CTA Section */}
      <section id="contact" className="w-full py-20 md:py-32 bg-gray-950 border-t border-gray-800">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Ready to Transform Your Research?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch to learn how our technology can accelerate your discoveries
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/about/contact">
                <Button className="bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                  Contact us 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

