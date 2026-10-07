export type FaqItem = { q: string; a: string }

export const HOME_FAQS: FaqItem[] = [
  {
    q: 'What is Fortnite Spoofer?',
    a: 'Fortnite Spoofer on fortnitespoofer.com is a Windows PC HWID utility suite with hardware profile manager, session isolation, pre-change backup, audit log, and compatibility checker — with Active or Updating status after Fortnite and EAC patches.',
  },
  {
    q: 'How much does Fortnite Spoofer cost?',
    a: 'Fortnite spoofer access starts at $35 for monthly (30 days). Lifetime access is $150. Fortnite cheats and UGC account recovery use the same pricing on the store page.',
  },
  {
    q: 'Do you sell Fortnite cheats on this site?',
    a: 'Yes — on the store page only. The homepage focuses on fortnite spoofer HWID utilities; fortnite cheats have a dedicated product page to avoid mixed SEO.',
  },
  {
    q: 'Does the spoofer work for other EAC games?',
    a: 'Yes. Beyond Fortnite and Fortnite Tournaments (cleaner included), the spoofer supports Rust, Apex Legends, and other Easy Anti-Cheat titles listed on the product page.',
  },
  {
    q: 'How do you handle game patches?',
    a: 'We publish Active or Updating labels after Fortnite updates. Easy Anti-Cheat builds change — always check status on fortnitespoofer.com before you apply profiles or load.',
  },
  {
    q: 'What is session isolation?',
    a: 'Session isolation lets you apply a hardware profile for one boot cycle; reboot returns original hardware IDs unless you re-apply, as documented in the features list.',
  },
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  ...HOME_FAQS,
  {
    q: 'Which spoofer features are included?',
    a: 'Hardware coverage for disk, MAC, motherboard and registry traces, apply and revert workflow, cleaner for Fortnite, hardware profile manager, session isolation, pre-change backup, audit log, compatibility checker, and integrity verification.',
  },
  {
    q: 'Does this work with Easy Anti-Cheat on Fortnite?',
    a: 'The product is built for Fortnite and EAC-protected titles. Follow the setup forum thread and confirm Active status before launching Epic.',
  },
  {
    q: 'How do I get access?',
    a: 'Open the store, choose Fortnite Spoofer, Fortnite Cheats, or UGC account recovery, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I run setup?',
    a: 'Follow the complete setup forum thread: backup, Defender exclusions, apply profile, verify audit log, then launch Fortnite when status is Active.',
  },
  {
    q: 'Where do I get support?',
    a: 'Use the Support page and Discord channels linked after purchase. Include current status and whether you need delivery, loader, or HWID help.',
  },
  {
    q: 'Where can I read reviews?',
    a: 'Visit the Reviews page for buyer feedback on profile management, session isolation, and loader updates.',
  },
  {
    q: 'Is this the official Epic Games site?',
    a: 'No. We cover third-party utilities for Fortnite on Windows PC. Download Fortnite from Epic Games. We are not affiliated with Epic Games.',
  },
]

export const FAQ_PAGE_FAQS: FaqItem[] = PRODUCT_PAGE_FAQS

export const SITE_FAQS = FAQ_PAGE_FAQS
