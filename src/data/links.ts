import { articlePath, forumPath } from './blog-paths'
import type { ProductId } from './products'
import { PRODUCTS } from './products'

export const OFFICIAL_GAME_LINKS = [
  {
    label: 'Fortnite on Epic Games',
    href: 'https://www.epicgames.com/fortnite',
    description: 'Official game page',
  },
] as const

export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Fortnite spoofer overview and store' },
  { label: 'Products', to: '/store', description: 'Spoofer, Fortnite cheats, and UGC tools' },
  { label: 'Blog', to: '/blog', description: 'HWID guides and Fortnite intel' },
  { label: 'Forums', to: '/forums', description: 'Community threads — EAC, setup, spoofer help' },
  { label: 'Reviews', to: '/reviews', description: 'Buyer reviews and ratings' },
  { label: 'FAQ', to: '/faq', description: 'Frequently asked questions' },
  { label: 'Support', to: '/support', description: 'Delivery and loader help' },
  { label: 'Status', to: '/status', description: 'Active or Updating after Fortnite patches' },
  { label: 'Ban checker', to: '/ban-checker', description: 'Free HWID symptom quiz for EAC games' },
  { label: 'Privacy policy', to: '/privacy', description: 'Order data and site privacy' },
  { label: 'Terms of use', to: '/terms', description: 'License rules and risk disclaimer' },
  { label: 'Refund policy', to: '/refunds', description: 'When digital license refunds apply' },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Fortnite spoofer', to: '/fortnite-spoofer' },
  { label: 'Fortnite cheats', to: '/fortnite-cheats' },
  { label: 'UGC recovery', to: '/ugc-account-recovery' },
  { label: 'Features checklist', to: forumPath('features-list') },
  { label: 'Complete setup', to: forumPath('complete-setup') },
  { label: 'EAC & Fortnite status', to: forumPath('eac-fortnite-status') },
  { label: 'HWID spoofer Fortnite', to: forumPath('hwid-spoofer-fortnite') },
  { label: 'Fortnite cheats features', to: forumPath('fortnite-cheats-features') },
  { label: 'UGC recovery help', to: forumPath('ugc-account-recovery-help') },
  { label: 'How HWID bans work', to: articlePath('how-hwid-bans-work') },
  { label: 'What is HWID', to: articlePath('what-is-hwid') },
  { label: 'HWID ban myths', to: articlePath('hwid-ban-myths') },
  { label: 'Spoofer setup guide', to: articlePath('fortnite-spoofer-setup-guide') },
  { label: 'Best Fortnite cheats', to: articlePath('best-fortnite-cheats') },
] as const

const CHECKOUT_BY_PRODUCT: Record<ProductId, string> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.checkoutUrl]),
) as Record<ProductId, string>

export const CHECKOUT_OUTBOUND = CHECKOUT_BY_PRODUCT['fortnite-spoofer']

export const CHECKOUT_URL = CHECKOUT_OUTBOUND

export function getCheckoutUrl(productId?: ProductId): string {
  if (productId && CHECKOUT_BY_PRODUCT[productId]) return CHECKOUT_BY_PRODUCT[productId]
  return CHECKOUT_OUTBOUND
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'
