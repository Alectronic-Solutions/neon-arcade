import type { Metadata } from 'next'
import LegalPageLayout, { LegalSection } from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Neon Arcade',
  description: 'How Neon Arcade collects, uses, and protects information submitted through booking inquiries and the website.',
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 29, 2026"
      intro="Neon Arcade ('we', 'us', or 'our') operates this website and our private event venue at 412 Retro Row, Sacramento, CA 95814. This policy explains what information we collect, how we use it, and the choices you have."
    >
      <LegalSection title="Information We Collect">
        <p>
          When you submit a booking inquiry, contact form, or email us directly, we collect the information you provide, which may include your name, email address, phone number, preferred event date, guest count, and any details about your event. We do not require you to create an account, and we do not collect payment card information through the website.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>
          We use the information you submit to respond to booking inquiries, confirm reservations, coordinate event logistics with our staff, and communicate with you about your upcoming visit or event. We do not sell, rent, or trade your personal information to third parties.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Tracking">
        <p>
          The website currently uses only cookies that are necessary for basic functionality, such as remembering your menu state while browsing. We do not currently use third party analytics, advertising pixels, or tracking cookies. If that changes in the future, we will update this policy and our Cookie Policy in advance. See our <a href="/cookies" className="text-neon-cyan hover:underline">Cookie Policy</a> for more detail.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We keep booking inquiry information for as long as needed to fulfill your event, respond to follow-up questions, and maintain basic business records. We periodically remove inquiry information that is no longer needed for these purposes.
        </p>
      </LegalSection>

      <LegalSection title="Sharing of Information">
        <p>
          We may share information with staff and contractors directly involved in preparing for your event, such as party hosts or catering staff. We do not share your information with outside companies for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights and Choices">
        <p>
          You can ask us to correct, update, or delete the information we hold about you at any time by emailing <a href="mailto:hello@neonarcade.com" className="text-neon-cyan hover:underline">hello@neonarcade.com</a>. We will respond to your request within a reasonable time.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          This website is intended for adults booking events on behalf of guests of all ages. We do not knowingly collect personal information directly from children under 13 through the website. Information about minors attending a private event (such as a guest count) is provided to us by the adult organizing the booking.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "last updated" date. Continued use of the website after changes are posted means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          If you have questions about this Privacy Policy or how your information is handled, contact us at:
        </p>
        <p>
          Neon Arcade<br />
          412 Retro Row<br />
          Sacramento, CA 95814<br />
          <a href="mailto:hello@neonarcade.com" className="text-neon-cyan hover:underline">hello@neonarcade.com</a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
