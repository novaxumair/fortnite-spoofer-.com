import { SITE_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://fortnitespoofer.com'
export const SITE_NAME = 'Fortnite Spoofer'
export const SITE_HOST = 'fortnitespoofer.com'

/** Stable site identity — Organization, WebSite, and about copy (not per-route). */
export const SITE_PURPOSE =
  'Fortnite Spoofer is a Fortnite-focused site for hardware ID testing utilities, Easy Anti-Cheat (EAC) status, and related Windows PC tools — including a separate Fortnite cheats product and UGC account recovery workspace in the store.'

/** Site-wide subject terms for schema knowsAbout (max 6). */
export const SITE_ABOUT = [
  'Fortnite Spoofer',
  'HWID utilities',
  'Fortnite',
  'Easy Anti-Cheat',
  'hardware profile manager',
  'Fortnite spoofer setup',
] as const

export const ORGANIZATION_ALTERNATE_NAMES = [
  'Fortnite Spoofer',
  'fortnite spoofer',
  'fortnitespoofer',
  'fortnitespoofer.com',
] as const

export const SEO_ROUTE_INTENTS = {
  home: ['fortnite spoofer', 'hwid spoofer fortnite', 'fortnite hwid spoofer', 'spoofer fortnite'],
  store: ['Fortnite spoofer store', 'hwid utilities', 'Fortnite cheats store'],
  spoofer: ['fortnite spoofer', 'best fortnite spoofer', 'fortnite perm spoofer'],
  cheats: ['fortnite cheats', 'cheats for fortnite', 'best fortnite cheats'],
  ugc: ['UGC account recovery', 'account recovery tool'],
  reviews: ['Fortnite Spoofer reviews', 'buyer feedback'],
  blog: ['fortnite spoofer', 'hwid spoofer fortnite', 'fortnite cheats'],
  forums: ['fortnite spoofer', 'hwid spoofer fortnite reddit', 'fortnite cheats'],
  faq: ['Fortnite Spoofer FAQ', 'HWID utilities questions'],
} as const

export const PRODUCT_SCHEMA_DESCRIPTION =
  'Windows PC HWID utility suite for Fortnite with hardware profile manager, session isolation, pre-change backup, audit log, compatibility checker, and digital license delivery.'

export const PRODUCT_PRICE_USD = '35'

export const PRODUCT_LIFETIME_PRICE_USD = '150'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'English' },
] as const

export const OG_IMAGE = SITE_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'Fortnite Spoofer | Hardware ID & Privacy Utilities',
    description:
      'Buy Fortnite spoofer and hardware ID testing utility for Windows PC. Profile manager, session isolation, pre-change backup, audit log, and safe recovery. Monthly $35 or lifetime $150.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'Fortnite spoofer hardware ID utilities on Windows PC',
    robots: INDEX_ROBOTS,
  },
  blog: {
    title: 'Fortnite Spoofer Intel | HWID Utilities',
    description:
      'Fortnite spoofer intel hub for hardware ID testing utilities — profile managers, session isolation, Windows setup, compatibility checkers, and status before you buy.',
    path: '/blog',
    ogType: 'website',
    image: PAGE_OG.blog,
    imageAlt: 'Fortnite spoofer blog and HWID guides',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'Fortnite Spoofer Forums | Community Threads',
    description:
      'Community forums for fortnite spoofer and HWID utilities — EAC status, setup, loader help, and patch-day updates from moderators.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'Fortnite spoofer community forum threads',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'Fortnite Spoofer Reviews | Buyer Feedback',
    description:
      'Read Fortnite spoofer reviews from buyers covering profile management, session isolation, audit logs, and status before you pick monthly or lifetime.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'Fortnite spoofer review feedback',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'Fortnite Spoofer FAQ | HWID Utilities',
    description:
      'FAQ for Fortnite spoofer utilities on Windows PC — $35 monthly and $150 lifetime, hardware profile and backup features, status, setup, and Discord support.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'Fortnite spoofer FAQ',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'Fortnite Spoofer Support | HWID Utilities',
    description:
      'Get support for Fortnite spoofer utilities on Discord — loader setup, instant delivery, menu configuration, and system status help after you purchase.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'Fortnite spoofer support',
    robots: INDEX_ROBOTS,
  },
  store: {
    title: 'Fortnite Spoofer Store | HWID Utilities',
    description:
      'Fortnite spoofer store for hardware ID testing utilities. Monthly access is $35 and lifetime is $150, featuring profile management, backups, and instant delivery.',
    path: '/store',
    ogType: 'website',
    image: PAGE_OG.product,
    imageAlt: 'Fortnite Spoofer store — spoofer, cheats, and UGC tools',
    robots: INDEX_ROBOTS,
  },
  spooferProduct: {
    title: 'Fortnite Spoofer | HWID Utilities & EAC Recovery',
    description:
      'Buy Fortnite spoofer for HWID utilities on Windows PC. Profile manager, backups, session isolation, and EAC title support. Monthly $35 or lifetime $150.',
    path: '/fortnite-spoofer',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Fortnite spoofer product page',
    robots: INDEX_ROBOTS,
  },
  cheatsProduct: {
    title: 'Fortnite Cheats | ESP, Aimbot & Loot Radar',
    description:
      'Buy Fortnite cheats for Windows PC — player ESP, aimbot, triggerbot, item ESP, and 2D radar. Easy Anti-Cheat status tracked. Monthly $35 or lifetime $150.',
    path: '/fortnite-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Fortnite cheats ESP and aimbot features',
    robots: INDEX_ROBOTS,
  },
  ugcProduct: {
    title: 'UGC Account Recovery | Appeal Automation Tool',
    description:
      'UGC account recovery for Windows PC — appeal workflows, evidence logs, and multi-platform lockout tracking. Monthly $35 or lifetime $150 with instant delivery.',
    path: '/ugc-account-recovery',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'UGC account recovery workspace',
    robots: INDEX_ROBOTS,
  },
  features: {
    title: 'Fortnite Spoofer Features | HWID Utilities',
    description:
      'Fortnite spoofer features for hardware ID utilities — hardware profile manager, session isolation, pre-change backup, audit log, compatibility checker, and integrity verification on Windows PC.',
    path: '/forums/features-list',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Fortnite spoofer feature list',
    robots: INDEX_ROBOTS,
  },
  setup: {
    title: 'Fortnite Spoofer Setup | HWID Utilities',
    description:
      'Learn how to set up Fortnite spoofer hardware utilities, which compatibility checkers matter, and what to check before running your profile manager on Windows PC.',
    path: '/forums/complete-setup',
    ogType: 'article',
    image: PAGE_OG.forums,
    imageAlt: 'Fortnite spoofer setup on Windows PC',
    robots: INDEX_ROBOTS,
  },
  status: {
    title: 'Fortnite Spoofer Status | HWID Utilities',
    description:
      'Fortnite spoofer status and security updates for hardware ID testing utilities. Read clear versus updating status after game patches and system updates before you load.',
    path: '/status',
    ogType: 'website',
    image: PAGE_OG.status,
    imageAlt: 'Fortnite Spoofer loader status',
    robots: INDEX_ROBOTS,
  },
  banChecker: {
    title: 'HWID Ban Checker | Free EAC Diagnostic',
    description:
      'Free HWID ban checker for Easy Anti-Cheat games. Select Fortnite, Rust, Apex Legends, or other EAC titles and compare symptoms with account, IP, and hardware ban patterns.',
    path: '/ban-checker',
    ogType: 'website',
    image: PAGE_OG.banChecker,
    imageAlt: 'HWID ban checker for Easy Anti-Cheat games',
    robots: INDEX_ROBOTS,
  },
  preview: {
    title: 'Fortnite Spoofer Preview | HWID Utilities',
    description:
      'Preview hardware profile manager, session isolation, and audit log features for Fortnite spoofer utilities. See how hardware testing tools work before you checkout.',
    path: '/fortnite-spoofer',
    ogType: 'website',
    image: PAGE_OG.product,
    imageAlt: 'Fortnite spoofer preview',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Fortnite Spoofer',
  h2Features: 'Fortnite Spoofer Features',
  h2HowItWorks: 'How HWID Utilities Work',
  h2Reviews: 'Fortnite Spoofer Reviews',
  h2Blog: 'Fortnite Spoofer Intel',
  h2Forums: 'Community Forums',
  h2Faq: 'Fortnite Spoofer FAQ',
  h2Access: 'Ready when you are',
} as const

/** Apex URL without trailing slash (except homepage). Matches Astro trailingSlash: 'never'. */
export function absoluteUrl(path: string) {
  let p = (path ?? '').trim()
  if (!p || p === '/') return `${SITE_URL}/`
  if (!p.startsWith('/')) p = `/${p}`
  p = p.replace(/\/+$/, '') || '/'
  if (p === '/') return `${SITE_URL}/`
  return `${SITE_URL}${p}`
}
