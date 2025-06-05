import { Metadata } from "next"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"

export const metadata: Metadata = {
  title: "Impressum | Investment Landing",
  description: "Impressum for Investment Landing platform",
}

export default function ImpressumPage() {
  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <NavBar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
            <p>Invitris GmbH<br />
            Am Klopferspitz 19<br />
            82152 Martinsried<br />
            Germany</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>Phone: +49 (0) 89 1234567<br />
            Email: info@invitris.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Registration</h2>
            <p>Commercial Register: Munich Local Court<br />
            Registration Number: HRB 123456<br />
            VAT ID: DE123456789</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsible for Content</h2>
            <p>Dr. John Doe<br />
            Am Klopferspitz 19<br />
            82152 Martinsried<br />
            Germany</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p>Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Copyright</h2>
            <p>All content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
} 