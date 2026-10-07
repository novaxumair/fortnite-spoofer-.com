import { SITE_NAME } from './site'

export const SUPPORT_INTRO = `Support for ${SITE_NAME} buyers — loader setup, Active status, HWID spoofer and cheat config, and digital delivery after checkout.`

export const SUPPORT_HIGHLIGHTS = [
  {
    title: 'Loader & menu',
    text: 'Menu not opening, inject failures, and overlay conflicts — we walk through exclusions and load order on Windows PC.',
  },
  {
    title: 'Patch windows',
    text: 'Fortnite and EAC updates can invalidate yesterday’s build. Check status before you queue.',
  },
  {
    title: 'Delivery',
    text: 'Digital licenses arrive via checkout email. Use only the official delivery link from your order.',
  },
] as const

export const SUPPORT_TOPICS = [
  {
    heading: 'Before you contact us',
    body: [
      'Confirm loader status on the Status page (Active vs Updating).',
      'Run through the complete setup forum thread once.',
      'Note your product: Spoofer, Cheats, or UGC recovery.',
    ],
  },
  {
    heading: 'Include in your message',
    body: [
      'Order email or reference from checkout.',
      'Screenshot of status page and any error text.',
      'Windows version and whether Secure Boot / TPM changed recently.',
    ],
  },
] as const

export const SUPPORT_FAQS = [
  {
    q: 'What products do you support?',
    a: 'Fortnite HWID spoofer, Fortnite cheats, and UGC account recovery on Windows PC via our store checkout.',
  },
  {
    q: 'How do I reach support?',
    a: 'Use the contact options linked after purchase or open your order from checkout email. Include status screenshots and your product name.',
  },
  {
    q: 'Loader will not open — what now?',
    a: 'Do not spam launch. Restart the PC, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Where is my license?',
    a: 'Delivery is digital after checkout. Use only the loader link from your order email. Third-party mirrors are unsupported.',
  },
] as const
