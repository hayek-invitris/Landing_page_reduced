import Image from "next/image"
import Link from "next/link"
import { Eye, Crosshair } from "lucide-react"
import { ParallaxHero } from "@/components/technology/parallax-hero"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"

export default function CompanyPage() {
  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <NavBar />

      {/* Hero Section with Parallax */}
      <ParallaxHero 
        title="About Invitris"
        description="Pioneering the future of biotechnology through innovation and collaboration"
        imageSrc="/Images/istockphoto-1354171846-1024x1024.jpg"
      />

      {/* About Us Text Section */}
      <section className="w-full py-16 md:py-24 bg-white border-t border-black/10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-black mb-6">Our Story</h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
              Encoded in DNA, proteins are the building blocks of biology. However, developing novel proteins and producing them at scale is a major technology issue. Advancements in protein expression, particularly through innovative methods like cell-free protein expression, are paving the way for scalable solutions. We are here to leverage these breakthroughs to solve this issue. For better health and a better life.
              </p>
              <p className="text-gray-700 mb-4">
              One of the biggest impacts lies with antimicrobial proteins: one of our largest health-economic burdens is antimicrobial resistance (AMR). AMR is predicted to cause 10 million deaths per year – or 25% more deaths than cancer. This is the future predicted by an expert panel if we do not create new drugs against AMR NOW!
              </p>
              <p className="text-gray-700 mb-4">
              Particularly, drug-resistant bacteria are threatening to catapult our global societies back into the pre-antibiotic era, inhibiting not only the successful treatment of common infections but also all therapies that rely on infection control, including surgeries and cancer therapy. Besides this endless suffering, this may cause an economic burden of several trillions of US Dollars to healthcare systems worldwide.
              </p>
              <p className="text-gray-700">
              Through advanced protein expression technologies, including cell-free protein expression, we can create highly complex multiprotein structures such as bacteriophages, endolysins, and tailocins. These innovative solutions are key to combating AMR effectively—for human health, veterinary medicine, agriculture, and food industries alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 border-t border-black/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black flex items-center gap-2">
                <Crosshair className="h-8 w-8 text-black" />
                Our Mission
              </h2>
              <p className="text-gray-700 max-w-md">
                A world, where the next generation of proteins are available for any industry, anywhere and anytime.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black flex items-center gap-2">
                <Eye className="h-8 w-8 text-black" />
                Our Vision
              </h2>
              <p className="text-gray-700 max-w-md">
                Eradicate antimicrobial resistance and other human diseases by leveraging cell-free expression with automation technology and AI to deliver personalized therapeutic proteins, such as bacteriophages and antibodies, to patients directly, on-demand and on-site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="w-full py-24 md:py-32 bg-white border-t border-black/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-black text-center mb-12">Our Founders</h2>
          <div className="flex justify-center">
            <div className="grid gap-8 md:grid-cols-2 max-w-3xl">
              {[
                {
                  name: "Dr. Patrick Grossman",
                  role: "Chief Executive Officer",
                  image: "/Images/Persons /Portrait64-modified.png",
                  bio: "20+ years experience in biotechnology and pharmaceutical research",
                  linkedin: "https://www.linkedin.com/in/patrickgrossmannbioinformatics/",
                },
                {
                  name: "Dr. Kilian Voegele",
                  role: "Chief Scientific Officer",
                  image: "/Images/Persons /Portrait102_white-modified.png",
                  bio: "Scientific lead",
                  linkedin: "https://www.linkedin.com/in/kilian-vogele-21a321183/",
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-700 transition-colors"
                    >
                      {member.name}
                    </a>
                  </h3>
                  <p className="text-[#1a3d5c] font-semibold">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* People at Invitris Section */}
      <section className="w-full py-24 md:py-32 bg-gray-50 border-t border-black/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-black text-center mb-12">Board of Directors</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                name: "Johannes B. Woerstein",
                role: "Director",
                image: "/Images/Persons /jo.jpeg",
                bio: "to be added",
                linkedin: "https://www.linkedin.com/in/jowoehrstein/",
              },
              {
                  name: "Dr. Patrick Grossman",
                  role: "Chief Executive Officer",
                  image: "/Images/Persons /Portrait64-modified.png",
                  bio: "20+ years experience in biotechnology and pharmaceutical research",
                  linkedin: "https://www.linkedin.com/in/patrickgrossmannbioinformatics/",
                },
                {
                  name: "Dr. Kilian Voegele",
                  role: "Chief Scientific Officer",
                  image: "/Images/Persons /Portrait102_white-modified.png",
                  bio: "Scientific lead",
                  linkedin: "https://www.linkedin.com/in/kilian-vogele-21a321183/",
                },
          
          
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-white/80 border border-black/5 rounded-lg shadow-sm">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 transition-colors"
                  >
                    {member.name}
                  </a>
                </h3>
                <p className="text-[#1a3d5c] font-semibold">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We're Hiring Section */}
      <section className="w-full py-24 md:py-32 bg-black border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter text-white">Invitris is Hiring</h2>
            <p className="text-gray-300 text-lg">
              Join our team of innovators and visionaries working at the cutting edge of biotechnology. 
              We&apos;re looking for talented individuals who are passionate about making a difference.
            </p>
            <Link 
              href="/about/careers" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#1a3d5c] px-8 text-white font-medium hover:bg-[#2c5a85] focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

