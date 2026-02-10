"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { submitJobApplication } from "@/lib/application-service"
import { toast } from "sonner"
import { sanitizeJobApplicationForm } from "@/lib/sanitization"

interface ApplicationFormProps {
  title: string
  department: string
  isOpen: boolean
  onClose: () => void
  positionId: string // Added for tracking the specific position
}

export function ApplicationForm({ title, department, isOpen, onClose, positionId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);
    
    try {
      // Sanitize and validate the form data
      const sanitizedData = sanitizeJobApplicationForm(formData);
      
      if (!sanitizedData.isValid) {
        setValidationErrors(sanitizedData.errors);
        toast.error("Please fix the errors in the form");
        return;
      }
      
      const result = await submitJobApplication({
        positionId,
        positionTitle: title,
        department,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        coverLetter: sanitizedData.coverLetter,
        resumeFile: resume,
      });
      
      if (!result.success) {
        throw new Error(result.error || "Failed to submit application");
      }
      
      // Success case
      toast.success("Your application has been submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
    });
    setResume(null);
    setSubmitted(false);
    setValidationErrors([]);
  };
  
  // Reset the form when the dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      // Small delay to prevent visual glitches when reopening
      setTimeout(resetForm, 300);
    }
  }, [isOpen]);
  
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`Apply for ${title}`}>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-[#B43632]/20 p-6 rounded-lg border border-[#B43632]/40">
            <p className="text-gray-200 text-lg">
              Join our team in the <span className="font-semibold text-white">{department}</span> department and help shape the future of biotechnology.
            </p>
          </div>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-base font-medium text-gray-200 mb-2">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                maxLength={100}
                className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-base font-medium text-gray-200 mb-2">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                maxLength={100}
                className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-200 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-base font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="coverLetter" className="block text-base font-medium text-gray-200 mb-2">
              CV * (minimum 50 characters)
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              required
              rows={8}
              value={formData.coverLetter}
              onChange={handleChange}
              maxLength={5000}
              className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              placeholder="Tell us about your professional experience, skills, and qualifications relevant to this position..."
            />
          </div>
          
          <div>
            <label htmlFor="resume" className="block text-base font-medium text-gray-200 mb-2">
              Resume/CV (PDF) *
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf"
              //required
              onChange={handleFileChange}
              className="block w-full rounded-md bg-black/70 border border-white/20 text-white p-3 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#B43632] file:text-white hover:file:bg-[#8B2C28] text-lg"
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-[#B43632] text-white hover:bg-[#8B2C28] px-8 py-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="bg-[#B43632]/20 p-8 rounded-lg border border-[#B43632]/40">
            <h3 className="text-2xl font-bold text-white mb-6">Thank You for Applying!</h3>
            <p className="text-gray-200 text-lg mb-8">
              We have received your application for the <span className="font-semibold text-white">{title}</span> position. 
              Our team will review your information and contact you if your qualifications match our needs.
            </p>
            <Button 
              onClick={onClose}
              className="bg-[#B43632] text-white hover:bg-[#8B2C28] px-8 py-6 text-lg"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
} 