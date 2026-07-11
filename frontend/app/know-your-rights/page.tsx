import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PageReader from "@/components/accessibility/PageReader";

export const metadata = {
  title: "Know Your Rights | Anvaya",
};

/**
 * Know Your Rights — static content page about disability rights and education laws.
 */
export default function KnowYourRightsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PageReader text="Know Your Rights page. Learn about your educational rights, landmark acts, accessibility standards, and how to access government scholarship portals." />
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Know Your Rights" />
        <main className="p-8 max-w-3xl">
          <article className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm prose prose-gray max-w-none">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              ⚖️ Know Your Rights
            </h1>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Right to Education
              </h2>
              <p>
                Every person with a disability has the right to free and
                compulsory education in a neighbourhood school. The Right to
                Education Act (RTE) ensures inclusive education for children
                with disabilities aged 6–14 years.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Rights of Persons with Disabilities Act, 2016
              </h2>
              <p>
                This landmark legislation recognises 21 types of disabilities
                and provides for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Inclusive education at all levels</li>
                <li>Reasonable accommodations in examinations</li>
                <li>Accessible curriculum and study materials</li>
                <li>Assistive devices and technology support</li>
                <li>Reservation in government employment and education</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Accessibility Standards
              </h2>
              <p>
                Educational institutions must provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Accessible physical infrastructure (ramps, lifts, accessible toilets)</li>
                <li>Sign language interpreters for hearing-impaired students</li>
                <li>Screen reader compatible digital content</li>
                <li>Alternative assessment methods</li>
                <li>Extra time during examinations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                How to File a Complaint
              </h2>
              <p>
                If your rights are being violated, you can:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Contact the Chief Commissioner for Persons with Disabilities</li>
                <li>File a complaint with the State Commissioner for Disabilities</li>
                <li>Reach out to the National Human Rights Commission</li>
                <li>Seek legal aid through District Legal Services Authorities</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Key Government Support Portals
              </h2>
              <p>
                Use these official portals to apply for scholarships, get your
                disability ID, discover benefits, and access learning support.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <a
                    href="https://scholarships.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    National Scholarship Portal (NSP)
                  </a>{" "}
                  for pre-matric, post-matric, and top-class scholarships.
                </li>
                <li>
                  <a
                    href="https://www.swavlambancard.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    UDID (Swavlamban Portal)
                  </a>{" "}
                  to apply for the Unique Disability ID card.
                </li>
                <li>
                  <a
                    href="https://depwd.gov.in/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    DEPwD Official Portal
                  </a>{" "}
                  for central schemes, helplines, and disability resources.
                </li>
                <li>
                  <a
                    href="https://www.myscheme.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    myScheme
                  </a>{" "}
                  to find government schemes based on your eligibility.
                </li>
                <li>
                  <a
                    href="https://www.nhfdc.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    NHFDC
                  </a>{" "}
                  for concessional education and self-employment loans.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Major Schemes You Can Explore
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Education Scholarships
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Pre-Matric Scholarship (Class 9-10 support)</li>
                    <li>Post-Matric Scholarship (Class 11 to PG support)</li>
                    <li>Top Class Education Scholarship for premier institutes</li>
                    <li>Saksham Scholarship for technical degree and diploma</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Skill Development and Practical Support
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>ADIP Scheme for assistive devices and appliances</li>
                    <li>PM-DAKSH-DEPwD for skill training and jobs</li>
                    <li>DDRS-supported vocational and rehabilitation centers</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Health and Care Support
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>NIRAMAYA health insurance support</li>
                    <li>National Trust care services and family support</li>
                    <li>Day-care and community support programs for PwDs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Quick Access Links
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://pmdaksh.depwd.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-teal-100 bg-teal-50 text-teal-800 font-medium hover:bg-teal-100 transition-colors"
                >
                  PM-DAKSH-DEPwD
                </a>
                <a
                  href="https://adip.disabilityaffairs.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-teal-100 bg-teal-50 text-teal-800 font-medium hover:bg-teal-100 transition-colors"
                >
                  ADIP Assistive Devices Portal
                </a>
                <a
                  href="https://thenationaltrust.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-teal-100 bg-teal-50 text-teal-800 font-medium hover:bg-teal-100 transition-colors"
                >
                  National Trust
                </a>
                <a
                  href="https://library.daisyindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-teal-100 bg-teal-50 text-teal-800 font-medium hover:bg-teal-100 transition-colors"
                >
                  Sugamya Pustakalaya
                </a>
              </div>
            </section>

            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 mt-6">
              <p className="text-sm text-teal-800 font-medium">
                💡 Remember: You have the right to accessible, quality
                education. Don&apos;t hesitate to speak up and advocate for yourself.
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
