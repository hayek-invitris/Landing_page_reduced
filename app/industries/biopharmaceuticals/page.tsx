import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"

export default function BiopharmaceuticalsPage() {
  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Images/bacteria-163711_1920.jpg"
            alt="Biopharmaceuticals Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Biopharmaceuticals
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-base xl:text-xl">
                Advanced solutions for pharmaceutical development and therapeutic applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-12 md:py-24 bg-black/40 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white">
                Transforming Pharmaceutical Research
              </h2>
              <p className="text-gray-300">
                Our cutting-edge protein synthesis technology is revolutionizing the development of biopharmaceuticals, enabling faster, more efficient, and more precise therapeutic solutions.
              </p>
              <p className="text-gray-300">
                From antibody engineering to protein-based therapeutics, our platform provides unparalleled capabilities for pharmaceutical researchers and developers.
              </p>
              <div className="pt-4">
                <Button className="bg-[#1a3d5c] text-white hover:bg-[#152f47]">
                  Contact our experts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/Images/bacteria-163711_1920.jpg"
                alt="Biopharmaceutical Research"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
} 