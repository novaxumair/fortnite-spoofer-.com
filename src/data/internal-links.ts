import { articlePath, forumPath } from './blog-paths'
import { PRODUCTS, type ProductId } from './products'

export type InternalLinkItem = {
  label: string
  to: string
  description: string
}

/** Primary site hubs — safe to embed on most pages (excludes ban checker page content edits). */
export const SITE_HUB_LINKS: InternalLinkItem[] = [
  { label: 'Products', to: '/store', description: 'Spoofer, cheats, and UGC recovery' },
  { label: 'Fortnite spoofer', to: '/fortnite-spoofer', description: 'HWID utilities and EAC coverage' },
  { label: 'Fortnite cheats', to: '/fortnite-cheats', description: 'ESP, aimbot, and radar features' },
  { label: 'UGC recovery', to: '/ugc-account-recovery', description: 'Account recovery workspace' },
  { label: 'Loader status', to: '/status', description: 'Active or Updating after patches' },
  { label: 'Ban checker', to: '/ban-checker', description: 'Symptom quiz for EAC games' },
  { label: 'Blog', to: '/blog', description: 'HWID and Fortnite guides' },
  { label: 'Forums', to: '/forums', description: 'Setup threads and community help' },
  { label: 'FAQ', to: '/faq', description: 'Buying, delivery, and loader answers' },
  { label: 'Support', to: '/support', description: 'Discord and delivery help' },
  { label: 'Reviews', to: '/reviews', description: 'Buyer feedback on-site' },
]

export const SETUP_GUIDE_LINKS: InternalLinkItem[] = [
  {
    label: 'Complete setup',
    to: forumPath('complete-setup'),
    description: 'Backup, apply, verify, launch',
  },
  {
    label: 'Features checklist',
    to: forumPath('features-list'),
    description: 'Spoofer modules and EAC list',
  },
  {
    label: 'EAC Fortnite status',
    to: forumPath('eac-fortnite-status'),
    description: 'Patch-day discussion',
  },
  {
    label: 'Loader errors',
    to: forumPath('loader-errors'),
    description: 'Common fix paths',
  },
]

export const HWID_ARTICLE_LINKS: InternalLinkItem[] = [
  {
    label: 'How HWID bans work',
    to: articlePath('how-hwid-bans-work'),
    description: 'EAC and Fortnite context',
  },
  {
    label: 'What to do after HWID ban',
    to: articlePath('what-to-do-after-hwid-ban'),
    description: 'Recovery workflow',
  },
  {
    label: 'Spoofer setup guide',
    to: articlePath('fortnite-spoofer-setup-guide'),
    description: 'Backup and apply steps',
  },
  {
    label: 'Games that HWID ban',
    to: articlePath('games-that-hwid-ban'),
    description: 'EAC titles beyond Fortnite',
  },
]

const PRODUCT_EXTRA: Record<ProductId, InternalLinkItem[]> = {
  'fortnite-spoofer': [
    {
      label: 'HWID spoofer forum',
      to: forumPath('hwid-spoofer-fortnite'),
      description: 'Community Q&A',
    },
    ...HWID_ARTICLE_LINKS.slice(0, 2),
  ],
  'fortnite-cheats': [
    {
      label: 'Cheats features forum',
      to: forumPath('fortnite-cheats-features'),
      description: 'ESP and aimbot thread',
    },
    {
      label: 'Cheats for Fortnite guide',
      to: articlePath('cheats-for-fortnite-guide'),
      description: 'Feature overview',
    },
    {
      label: 'Best Fortnite cheats',
      to: articlePath('best-fortnite-cheats'),
      description: '2026 comparison',
    },
  ],
  'ugc-account-recovery': [
    {
      label: 'UGC recovery forum',
      to: forumPath('ugc-account-recovery-help'),
      description: 'Evidence and appeals',
    },
    {
      label: 'HWID ban appeal guide',
      to: articlePath('hwid-ban-appeal-guide'),
      description: 'Epic support workflow',
    },
    {
      label: 'Pair with spoofer',
      to: '/fortnite-spoofer',
      description: 'When hardware is involved',
    },
  ],
}

export function getProductInternalLinks(productId: ProductId): InternalLinkItem[] {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) return SITE_HUB_LINKS.slice(0, 6)

  const siblings = PRODUCTS.filter((p) => p.id !== productId).map((p) => ({
    label: p.shortName === 'Spoofer' ? 'Fortnite spoofer' : p.name,
    to: p.path,
    description: p.tagline,
  }))

  return [
    { label: 'All products', to: '/store', description: 'Compare plans and pricing' },
    ...siblings,
    { label: 'Loader status', to: '/status', description: 'Check before you load' },
    { label: 'Ban checker', to: '/ban-checker', description: 'HWID vs account symptoms' },
    ...PRODUCT_EXTRA[productId],
  ]
}

export function getBlogExploreLinks(): InternalLinkItem[] {
  return [
    { label: 'Products', to: '/store', description: 'Buy spoofer or cheats' },
    { label: 'Forums', to: '/forums', description: 'Discuss this topic' },
    { label: 'Complete setup', to: forumPath('complete-setup'), description: 'Step-by-step load' },
    { label: 'Loader status', to: '/status', description: 'Patch-day truth source' },
    { label: 'Ban checker', to: '/ban-checker', description: 'Free EAC diagnostic' },
  ]
}

export function getForumExploreLinks(): InternalLinkItem[] {
  return [
    { label: 'Blog articles', to: '/blog', description: 'Long-form HWID guides' },
    { label: 'Products', to: '/store', description: 'Checkout when status is Active' },
    { label: 'Fortnite spoofer', to: '/fortnite-spoofer', description: 'Feature list and FAQ' },
    { label: 'Support', to: '/support', description: 'Delivery and Discord help' },
    { label: 'FAQ', to: '/faq', description: 'License and refund answers' },
  ]
}

export function getFaqSupportLinks(): InternalLinkItem[] {
  return [
    ...SITE_HUB_LINKS.filter((l) =>
      ['/store', '/status', '/fortnite-spoofer', '/blog', '/forums', '/ban-checker'].includes(l.to),
    ),
    SETUP_GUIDE_LINKS[0],
    HWID_ARTICLE_LINKS[0],
  ]
}
