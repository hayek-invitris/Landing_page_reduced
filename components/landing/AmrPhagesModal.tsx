import { Dna, Microscope, Pill, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AmrPhagesModal() {
  return (
    <div className="text-slate-200">
      {/* Introduction */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Closing The Protein Gap</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          Leveraging protein expression technologies to combat antimicrobial resistance.
        </p>
      </div>

      {/* Two-column section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Dna className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Building Blocks of Biology</h3>
          </div>
          <p className="text-slate-300 ml-7">
            Proteins are fundamental to biology, but developing and scaling novel proteins remains a significant
            challenge.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Innovative Solutions</h3>
          </div>
          <p className="text-slate-300 ml-7">
            Cell-free protein expression enables creation of complex structures like bacteriophages and endolysins.
          </p>
        </div>
      </div>

      {/* AMR Crisis Section */}
      <div className="mb-12 py-8 px-6 bg-zinc-900 rounded-lg border-l-4 border-red-500">
        <h3 className="text-xl font-bold text-white mb-4 text-center">The AMR Crisis</h3>

        <div className="grid md:grid-cols-3 gap-6 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">10 million</div>
            <p className="text-xs text-slate-400">Annual deaths predicted</p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">25% more</div>
            <p className="text-xs text-slate-400">Than cancer deaths</p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">Trillions</div>
            <p className="text-xs text-slate-400">Economic burden (USD)</p>
          </div>
        </div>

        <p className="text-slate-400 italic text-center text-sm">
          Drug-resistant bacteria threaten to return us to the pre-antibiotic era, endangering common treatments,
          surgeries, and cancer therapy.
        </p>
      </div>

      {/* Our Approach Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-center text-white mb-6">Our Approach</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Human Health",
              icon: <Pill className="h-5 w-5 text-blue-400" />,
              description: "Novel antimicrobial proteins for resistant infections.",
            },
            {
              title: "Veterinary & Agriculture",
              icon: <Pill className="h-5 w-5 text-blue-400" />,
              description: "Sustainable solutions for animal health and agriculture.",
            },
            {
              title: "Food Industry",
              icon: <Pill className="h-5 w-5 text-blue-400" />,
              description: "Protein-based antimicrobials for food safety.",
            },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h4 className="font-semibold text-white">{item.title}</h4>
              </div>
              <p className="text-slate-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learn More Button */}
      <div className="flex justify-center mt-8">
        <Link href="/technology/amr-phages">
          <Button className="bg-[#1a3d5c] text-white hover:bg-[#152f47] px-8 py-6">
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
} 