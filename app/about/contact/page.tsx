"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Mail, MapPin } from "lucide-react"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { toast } from "sonner"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"
import { sanitizeContactForm } from "@/lib/sanitization"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [messageCharCount, setMessageCharCount] = useState(0)
  const MESSAGE_CHAR_LIMIT = 2000

  useEffect(() => {
    async function testConnection() {
      try {
        const result = await testSupabaseConnection()
        
        // Only log in development mode and handle different severity levels
        if (process.env.NODE_ENV === 'development') {
          if (result.severity === 'warning') {
            console.warn("Supabase connection:", result.error)
          } else if (!result.success) {
            console.error("Supabase connection failed:", result.error)
          } else {
            console.log("Supabase connection test successful")
          }
        }
      } catch (err) {
        // Only log errors in development mode
        if (process.env.NODE_ENV === 'development') {
          console.error("Connection test exception:", err)
        }
      }
    }
    testConnection()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Track message character count
    if (name === 'message') {
      setMessageCharCount(value.length)
    }
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setValidationErrors([])
    
    try {
      // Check message character limit first
      const messageErrors = []
      if (formData.message.length > MESSAGE_CHAR_LIMIT) {
        messageErrors.push(`Message is too long (${formData.message.length}/${MESSAGE_CHAR_LIMIT} characters). Please shorten your message.`)
      }
      
      // Sanitize and validate the form data
      const sanitizedData = sanitizeContactForm(formData)
      
      // Combine validation errors
      const allErrors = [...messageErrors, ...(sanitizedData.errors || [])]
      
      if (messageErrors.length > 0 || !sanitizedData.isValid) {
        setValidationErrors(allErrors)
        toast.error("Please fix the errors in the form")
        return
      }

      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName,
            email: sanitizedData.email,
            company: sanitizedData.company,
            message: sanitizedData.message,
          },
        ])

      if (error) {
        // Handle specific database errors
        if (error.message.includes('relation "contact_submissions" does not exist')) {
          toast.error("Contact form is currently unavailable. Please try again later or contact us directly at contact@invitris.com")
        } else {
          toast.error(`Failed to send message: ${error.message}`)
        }
        console.error("Database error:", error)
        return
      }

      toast.success("Message sent successfully!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      
      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          toast.error("Network error. Please check your connection and try again.")
        } else {
          toast.error("Failed to send message. Please try again or contact us directly.")
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex flex-col min-h-screen dark">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-black">
          <Image
            src="/Images/dna-g1adaf9d6b_1920.jpg"
            alt="Contact Background"
            fill
            className="object-cover brightness-50 opacity-70"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-base xl:text-xl">
              We&apos;re here to help you advance your research and development
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-8 md:py-16 bg-black backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Send us a message
                </h2>
                <p className="text-gray-300">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {validationErrors.length > 0 && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">Please fix the following errors:</h4>
                    <ul className="text-red-300 text-sm space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                    placeholder="First name"
                    required
                    maxLength={100}
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                    placeholder="Last name"
                    required
                    maxLength={100}
                  />
                </div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                  placeholder="Email"
                  required
                />
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-400"
                  placeholder="Company"
                  required
                  maxLength={100}
                />
                <div className="space-y-2">
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`min-h-[150px] bg-black/20 border-white/10 text-white placeholder:text-gray-400 ${
                      messageCharCount > MESSAGE_CHAR_LIMIT ? 'border-red-500/50' : ''
                    }`}
                    placeholder="Message (minimum 10 characters)"
                    required
                    maxLength={5000}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${
                      messageCharCount > MESSAGE_CHAR_LIMIT 
                        ? 'text-red-400' 
                        : messageCharCount > MESSAGE_CHAR_LIMIT * 0.8 
                        ? 'text-yellow-400' 
                        : 'text-gray-400'
                    }`}>
                      {messageCharCount}/{MESSAGE_CHAR_LIMIT} characters
                    </span>
                    {messageCharCount > MESSAGE_CHAR_LIMIT && (
                      <span className="text-red-400 text-xs">
                        Message too long
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#1a3d5c] text-white hover:bg-[#152f47]"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Contact Information
                </h2>
                <p className="text-gray-300">
                  Reach out to us directly or visit our office.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#1a3d5c] mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-white">Headquarters</h3>
                    <p className="text-gray-300">
                      Am Klopferspitz 19
                      <br />
                      82152, Planegg-Martinsried
                      <br />
                      Germany
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#1a3d5c] mt-1" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-white">Email</h3>
                    <p className="text-gray-300">contact@invitris.com</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Office Hours</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                  </p>
                  <p className="text-gray-300">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-16 md:py-24 bg-black backdrop-blur-sm border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              Visit Our Office
            </h2>
            <p className="text-gray-300">
              Located in the heart of Munich&apos;s biotech hub
            </p>
          </div>
          <div className="mx-auto w-fit rounded-lg overflow-hidden border border-white/10">
            <Image
              src="/Images/Bildschirmfoto 2025-03-31 um 17.13.58.png"
              alt="Office Location Map"
              width={1000}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
    

      
      <Footer />
    </div>
  )
}
