import { Metadata } from "next"
import { NavBar } from "@/components/common/NavBar"
import { Footer } from "@/components/common/Footer"

export const metadata: Metadata = {
  title: "Impressum | Invitris",
  description: "Legal disclosure and privacy policy for Invitris GmbH",
}

export default function ImpressumPage() {
  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <NavBar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-white">Impressum</h1>
        
        <div className="space-y-8 text-white">
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Information in accordance with § 5 TMG</h2>
            <div className="text-gray-200">
              <p className="font-semibold">Invitris GmbH</p>
              <p>Am Klopferspitz 19</p>
              <p>82152 Planegg-Martinsried</p>
              <p>Germany</p>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Represented by</h2>
            <div className="text-gray-200">
              <p>Patrick Grossmann</p>
              <p>Kilian Vogele</p>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
            <div className="text-gray-200">
              <p><span className="font-semibold">Email:</span> contact@invitris.com</p>
              <p><span className="font-semibold">Website:</span> www.invitris.com</p>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Design Acknowledgment</h2>
            <p className="text-gray-200">
              Few design elements are based on the iGEM website of the Munich iGEM Team 2018 Phactroy. 
              We want to especially thank Dominic Schwarz and Yunfei Long for the professional design.
            </p>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Disclaimer</h2>
            
            <div className="space-y-4 text-gray-200">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Liability for content</h3>
                <p>
                  As a service provider, we are liable under general law for own content on these pages according to § 7 par.1 TMG. 
                  According to §§ 8 to 10 TMG we as a service provider are not obliged to monitor foreign transmitted or stored 
                  information or to investigate circumstances indicating illegal activity. The obligation to remove or block the 
                  use of information under general law remain unaffected thereof. However, liability hereof is only possible from 
                  the date of noticing a concrete violation of the law. Upon notification of a respective violation, we will remove 
                  the content immediately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Liability for links</h3>
                <p>
                  Our website contains links to external websites beyond our control. Therefore, we can not accept any responsibility 
                  for external content. The respective provider or operator is always responsible for the contents of any linked site. 
                  The linked sites were checked for possible statutory violations at the time of linking. Illegal contents could not 
                  be identified at the time of linking. A permanent control of the content of the linked pages without concrete evidence 
                  of a violation, is, however, unreasonable. Upon notification of a respective violation, we will remove such links immediately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Copyright</h3>
                <p>
                  All contents and works on the website created by the site operator are subject to German copyright law. 
                  Duplication, editing, distribution and any kind of processing beyond the bounds of copyright require written 
                  consent of the respective author or creator. The rights of all mentioned trademarks belong to their respective owners.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">Privacy Policy (Datenschutzerklärung)</h2>
            
            <div className="space-y-6 text-gray-200">
                               <p>
                   This privacy policy explains the type, scope and purpose of the processing of personal data 
                   (hereinafter referred to as &quot;data&quot;) within our online services and the related websites, 
                   functions and content.
                 </p>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Types of processed data</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Inventory data (e.g., personal master data, names or addresses)</li>
                  <li>Contact data (e.g., email, telephone numbers)</li>
                  <li>Content data (e.g., text entries, photographs, videos)</li>
                  <li>Usage data (e.g., visited websites, interest in content, access times)</li>
                  <li>Meta/communication data (e.g., device information, IP addresses)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Purpose of processing</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provision of the online service, its functions and content</li>
                  <li>Answering contact requests and communication with users</li>
                  <li>Security measures</li>
                  <li>Reach measurement/Marketing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Legal basis</h3>
                <p>
                  We process personal data in accordance with the EU General Data Protection Regulation (GDPR). 
                  The legal basis for processing includes consent (Art. 6 para. 1 lit. a GDPR), contract fulfillment 
                  (Art. 6 para. 1 lit. b GDPR), legal obligations (Art. 6 para. 1 lit. c GDPR), and legitimate interests 
                  (Art. 6 para. 1 lit. f GDPR).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Your rights</h3>
                <p>
                  You have the right to information, correction, deletion, restriction of processing, data portability, 
                  and objection. You can also withdraw consent at any time. For complaints, please contact the relevant 
                  data protection authority.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
                <p>
                  When contacting us (e.g., via contact form, email, telephone or social media), user information is 
                  processed to handle the contact request according to Art. 6 para. 1 lit. b and f GDPR. 
                  We delete requests when they are no longer necessary, reviewing necessity every two years.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Cookies</h3>
                <p>
                  We use cookies to improve user experience and analyze website usage. You can disable cookies in your 
                  browser settings, though this may limit website functionality. For more information about cookies 
                  and opting out, visit <a href="http://www.youronlinechoices.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">youronlinechoices.com</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Third-party services</h3>
                <p>
                  We may use third-party services for analytics and functionality. These services may collect data 
                  according to their own privacy policies. We only work with services that comply with applicable 
                  data protection regulations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Data retention</h3>
                <p>
                  We process and store personal data only for the period necessary for the purpose of processing or 
                  as required by law. Data is deleted when it is no longer needed and no legal retention obligations apply.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Updates to this policy</h3>
                <p>
                  We may update this privacy policy to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes through our website.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center text-sm text-gray-400 mt-8 pt-6 border-t border-gray-700">
            <p>This privacy policy was created with assistance from Datenschutz-Generator.de by RA Dr. Thomas Schwenke</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 