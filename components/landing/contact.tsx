"use client"

import * as React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { contactFormAction, type ContactState } from "@/lib/actions"
import { Check } from "lucide-react"

const initialState: ContactState = {
  defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  success: false,
  errors: null,
}

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
  const [state, formAction, pending] = React.useActionState<ContactState, FormData>(
    contactFormAction,
    initialState
  )

  return (
    <Card className={cn("w-full max-w-2xl mx-auto bg-black border border-white/20 shadow-2xl", className)}>
      <form action={formAction} noValidate>
        <CardContent className="flex flex-col gap-8 px-8 pt-8">
          {state.success && (
            <div className="text-center py-4 px-6 bg-green-900/50 border border-green-500/50 rounded-lg">
              <p
                className="text-green-300 flex items-center justify-center gap-2 font-medium"
                role="status"
                aria-live="polite"
              >
                <Check className="h-5 w-5" />
                Message sent successfully! We&apos;ll get back to you soon.
              </p>
            </div>
          )}

          {state.errors?._form && (
            <div className="text-center py-4 px-6 bg-red-900/50 border border-red-500/50 rounded-lg">
              <p className="text-red-300 font-medium" role="alert">
                {state.errors._form}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vorname */}
            <div className="group/field grid gap-3" data-invalid={!!state.errors?.firstName}>
              <Label
                htmlFor="firstName"
                className="text-white font-semibold group-data-[invalid=true]/field:text-red-400"
              >
                First Name <span aria-hidden="true" className="text-red-400">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Max"
                className="h-12 border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 
                  focus:border-[#1a3d5c] focus:ring-[#1a3d5c] 
                  group-data-[invalid=true]/field:border-red-400 
                  focus-visible:group-data-[invalid=true]/field:ring-red-400"
                aria-invalid={!!state.errors?.firstName}
                aria-errormessage="error-firstName"
                defaultValue={state.defaultValues.firstName}
                required
                disabled={pending}
              />
              {state.errors?.firstName && (
                <p id="error-firstName" className="text-red-400 text-sm font-medium">
                  {state.errors.firstName}
                </p>
              )}
            </div>

            {/* Nachname */}
            <div className="group/field grid gap-3" data-invalid={!!state.errors?.lastName}>
              <Label
                htmlFor="lastName"
                className="text-white font-semibold group-data-[invalid=true]/field:text-red-400"
              >
                Last Name <span aria-hidden="true" className="text-red-400">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Mustermann"
                className="h-12 border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 
                  focus:border-[#1a3d5c] focus:ring-[#1a3d5c] 
                  group-data-[invalid=true]/field:border-red-400 
                  focus-visible:group-data-[invalid=true]/field:ring-red-400"
                aria-invalid={!!state.errors?.lastName}
                aria-errormessage="error-lastName"
                defaultValue={state.defaultValues.lastName}
                required
                disabled={pending}
              />
              {state.errors?.lastName && (
                <p id="error-lastName" className="text-red-400 text-sm font-medium">
                  {state.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="group/field grid gap-3" data-invalid={!!state.errors?.email}>
            <Label
              htmlFor="email"
              className="text-white font-semibold group-data-[invalid=true]/field:text-red-400"
            >
              Email Address <span aria-hidden="true" className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="max@company.com"
              className="h-12 border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 
                focus:border-[#1a3d5c] focus:ring-[#1a3d5c] 
                group-data-[invalid=true]/field:border-red-400 
                focus-visible:group-data-[invalid=true]/field:ring-red-400"
              aria-invalid={!!state.errors?.email}
              aria-errormessage="error-email"
              defaultValue={state.defaultValues.email}
              required
              disabled={pending}
            />
            {state.errors?.email && (
              <p id="error-email" className="text-red-400 text-sm font-medium">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Nachricht */}
          <div className="group/field grid gap-3" data-invalid={!!state.errors?.message}>
            <Label
              htmlFor="message"
              className="text-white font-semibold group-data-[invalid=true]/field:text-red-400"
            >
              Message <span aria-hidden="true" className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project and how we can help you..."
              className="min-h-32 border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 
                focus:border-[#1a3d5c] focus:ring-[#1a3d5c] 
                group-data-[invalid=true]/field:border-red-400 
                focus-visible:group-data-[invalid=true]/field:ring-red-400 resize-none"
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message}
              required
              disabled={pending}
            />
            {state.errors?.message && (
              <p id="error-message" className="text-red-400 text-sm font-medium">
                {state.errors.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-4 pb-8 px-8">
          <Button
            type="submit"
            size="lg"
            className="h-12 px-12 bg-[#1a3d5c] hover:bg-[#2c5a85] text-white font-semibold text-lg 
              transition-colors duration-200 w-full md:w-auto"
            disabled={pending}
          >
            {pending ? "Sending Message..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
