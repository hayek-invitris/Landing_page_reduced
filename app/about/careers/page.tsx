"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Dna, Globe2, Users } from "lucide-react"
import Image from "next/image"
import React from "react"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"
import { ApplicationForm } from "@/components/careers/ApplicationForm"

export default function CareersPage() {
  const [applicationForms, setApplicationForms] = React.useState({
    seniorResearchScientist: false,
    studentIntern: false,
    initiativeApplication: false,
  });

  const openForm = (formName: keyof typeof applicationForms) => {
    setApplicationForms(prev => ({ ...prev, [formName]: true }));
  };

  const closeForm = (formName: keyof typeof applicationForms) => {
    setApplicationForms(prev => ({ ...prev, [formName]: false }));
  };

  const positions = [
    {
      id: "senior-research-scientist",
      title: "Senior Research Scientist",
      department: "R&D",
      location: "Munich, Germany",
      type: "Full-time",
      formName: "seniorResearchScientist" as const,
    },
    {
      id: "student-intern",
      title: "Student Intern",
      department: "Biotech",
      location: "Munich, Germany",
      type: "Full-time",
      formName: "studentIntern" as const,
    },
    {
      id: "initiative-application",
      title: "Initiative Application",
      department: "Biotech",
      location: "Munich, Germany",
      type: "Part-time or Full-time",
      formName: "initiativeApplication" as const,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen dark">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Images/pexels-polina-tankilevitch-3735769-scaled.jpg"
            alt="Careers Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Join Our Team
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Help us shape the future of biotechnology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="w-full py-12 md:py-24 bg-black/40 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-white text-center mb-12">Why Join Invitris?</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                icon: Dna,
                title: "Cutting-edge Science",
                description: "Work on breakthrough technologies that transform healthcare",
              },
              {
                icon: Users,
                title: "Collaborative Culture",
                description: "Join a team of passionate scientists and innovators",
              },
              {
                icon: Globe2,
                title: "Global Impact",
                description: "Make a difference in healthcare worldwide",
              },
              {
                icon: Building2,
                title: "Growth Opportunities",
                description: "Develop your career with industry leaders",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a3d5c] text-white">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="w-full py-24 md:py-32 bg-black/60 backdrop-blur-sm border-t border-white/10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-white text-center mb-12">Open Positions</h2>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {positions.map((position, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40 p-6 hover:bg-black/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{position.title}</h3>
                    <p className="text-gray-300">{position.department}</p>
                    <p className="text-gray-300">
                      {position.location} • {position.type}
                    </p>
                  </div>
                  <Button 
                    className="bg-[#1a3d5c] text-white hover:bg-[#152f47]"
                    onClick={() => openForm(position.formName)}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Forms */}
      {positions.map((position) => (
        <ApplicationForm
          key={position.formName}
          title={position.title}
          department={position.department}
          positionId={position.id}
          isOpen={applicationForms[position.formName]}
          onClose={() => closeForm(position.formName)}
        />
      ))}
      
      <Footer />
    </div>
  )
}

