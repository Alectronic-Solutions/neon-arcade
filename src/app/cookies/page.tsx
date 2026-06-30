import type { Metadata } from 'next'
import LegalPageLayout, { LegalSection } from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy | Neon Arcade',
  description: 'How Neon Arcade uses cookies on this website and how you can control them.',
}

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="June 29, 2026"
      intro="This Cookie Policy explains how Neon Arcade uses cookies on this website and how you can control them. It should be read together with our Privacy Policy."
    >
      <LegalSection title="What Is a Cookie">
        <p>
          A cookie is a small text file that a website stores on your device. Cookies help a site remember information about your visit, such as your preferences or the state of the page, between visits or as you browse.
        </p>
      </LegalSection>

      <LegalSection title="Cookies We Use">
        <p>
          This website currently uses only essential and functional cookies needed for basic operation, such as remembering whether the mobile navigation menu is open. We do not currently use third party analytics cookies, advertising cookies, or tracking pixels.
        </p>
      </LegalSection>

      <LegalSection title="Controlling Cookies">
        <p>
          Most web browsers let you control or delete cookies through their settings. You can usually find these settings in the "Privacy" or "Security" section of your browser. Blocking essential cookies may affect how some parts of the website function, such as the mobile menu.
        </p>
      </LegalSection>

      <LegalSection title="Future Changes">
        <p>
          If we begin using analytics or advertising cookies in the future, we will update this Cookie Policy and our Privacy Policy in advance to describe what is collected and how it is used.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          Questions about this Cookie Policy can be sent to <a href="mailto:hello@neonarcade.com" className="text-neon-cyan hover:underline">hello@neonarcade.com</a>. See our <a href="/privacy" className="text-neon-cyan hover:underline">Privacy Policy</a> for more on how we handle information generally.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
