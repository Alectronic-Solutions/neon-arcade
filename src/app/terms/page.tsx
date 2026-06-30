import type { Metadata } from 'next'
import LegalPageLayout, { LegalSection } from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | Neon Arcade',
  description: 'The terms that govern use of the Neon Arcade website and bookings at our private event venue in Sacramento, CA.',
}

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="June 29, 2026"
      intro="These Terms of Service ('Terms') govern your use of this website and any booking made with Neon Arcade for private events, parties, or walk-in free play at our venue at 412 Retro Row, Sacramento, CA 95814. By using this website or booking an event with us, you agree to these Terms."
    >
      <LegalSection title="Website Use">
        <p>
          You agree to use this website only for lawful purposes, including submitting genuine booking inquiries. We may suspend or restrict access to the website if it is being used in a way that disrupts the site or other visitors.
        </p>
      </LegalSection>

      <LegalSection title="Bookings and Deposits">
        <p>
          A deposit is required to confirm all private events, in the amount specified for your selected package (Player 1, High Roller, or Arcade Royalty) at the time of booking. Deposits are non-refundable within 14 days of your event date. Final guest counts, food selections, and add-ons must be confirmed with our event staff ahead of your event.
        </p>
        <p>
          Package pricing, minimum and maximum guest counts, and inclusions are described on our Packages section and are subject to change for bookings made after a pricing update. Pricing confirmed in writing for an existing booking will be honored.
        </p>
      </LegalSection>

      <LegalSection title="Cancellations and Rescheduling">
        <p>
          If you need to cancel or reschedule your event, contact us as soon as possible at <a href="mailto:hello@neonarcade.com" className="text-neon-cyan hover:underline">hello@neonarcade.com</a>. Rescheduling requests made more than 14 days before your event date will be accommodated where availability allows. Deposits are non-refundable within 14 days of the event date, as described above.
        </p>
      </LegalSection>

      <LegalSection title="Conduct and Assumption of Risk">
        <p>
          Our venue includes physical arcade cabinets, pinball machines, and dance or motion based games. By visiting Neon Arcade, you acknowledge that gameplay involves an inherent risk of minor physical activity and you assume that risk. Guests are expected to treat cabinets, equipment, and other guests with respect. We reserve the right to ask any guest to leave the venue for behavior that endangers people or equipment, without refund.
        </p>
      </LegalSection>

      <LegalSection title="No Warranty">
        <p>
          We make reasonable efforts to keep all cabinets and equipment in working order, but we do not guarantee that every game will be available or fully operational during your visit or event. The website and its content are provided "as is" without warranties of any kind.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Neon Arcade is not liable for indirect, incidental, or consequential damages arising from your use of the website or attendance at our venue, except where such liability cannot be limited under California law.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the courts located in Sacramento County, California.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. Changes will be posted on this page with a revised "last updated" date. Continued use of the website or an existing confirmed booking will be honored under the Terms in effect at the time the deposit was paid.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          Questions about these Terms can be sent to:
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
