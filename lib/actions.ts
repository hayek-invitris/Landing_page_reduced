// lib/actions.ts
"use server"

import { Resend } from "resend"
import { z } from "zod"

export type ContactState = {
  defaultValues: { firstName: string; lastName: string; email: string; message: string }
  success: boolean
  errors: null | {
    firstName?: string
    lastName?: string
    email?: string
    message?: string
    _form?: string
  }
}

const Schema = z.object({
  firstName: z.string().min(2, "Bitte mind. 2 Zeichen."),
  lastName: z.string().min(2, "Bitte mind. 2 Zeichen."),
  email: z.string().email("Bitte gültige E-Mail."),
  message: z.string().min(10, "Bitte etwas ausführlicher (≥10 Zeichen)."),
})

export async function contactFormAction(
  prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1) Felder auslesen
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  }

  // 2) Validieren
  const parsed = Schema.safeParse(raw)
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors
    return {
      defaultValues: raw,
      success: false,
      errors: {
        firstName: fe.firstName?.[0],
        lastName: fe.lastName?.[0],
        email: fe.email?.[0],
        message: fe.message?.[0],
      },
    }
  }

  // 3) Resend einrichten
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY")
    return {
      defaultValues: raw,
      success: false,
      errors: { _form: "Mail-Versand nicht konfiguriert." },
    }
  }
  const resend = new Resend(apiKey)

  // 4) Mail senden
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // funktioniert ohne Domain-Verify
      to: [process.env.MAIL_TO!],
      replyTo: [parsed.data.email],
      subject: `Neue Kontaktanfrage von ${parsed.data.firstName} ${parsed.data.lastName}`,
      text: [
        `Vorname: ${parsed.data.firstName}`,
        `Nachname: ${parsed.data.lastName}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
    })

    return {
      defaultValues: { firstName: "", lastName: "", email: "", message: "" },
      success: true,
      errors: null,
    }
  } catch (e) {
    console.error(e)
    return {
      defaultValues: raw,
      success: false,
      errors: { _form: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
    }
  }
}
