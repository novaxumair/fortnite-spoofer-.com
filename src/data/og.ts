/**
 * Canonical 1200x630 JPEG Open Graph images for Google SERP thumbnails.
 */

export const OG_HOME = '/og/home.jpg'
export const OG_PRODUCT = '/og/product.jpg'
export const OG_FORUMS = '/og/forums.jpg'
export const OG_BLOG = '/og/blog.jpg'
export const OG_REVIEWS = '/og/reviews.jpg'
export const OG_FAQ = '/og/faq.jpg'
export const OG_SUPPORT = '/og/support.jpg'
export const OG_PRIVACY = '/og/privacy.jpg'
export const OG_TERMS = '/og/terms.jpg'
export const OG_REFUNDS = '/og/refunds.jpg'
export const OG_STATUS = '/og/status.jpg'
export const OG_BAN_CHECKER = '/og/ban-checker.jpg'

export const SITE_OG = OG_PRODUCT

export function forumOgImage(slug: string) {
  return `/og/forums-${slug}.jpg`
}

export function blogOgImage(slug: string) {
  return `/og/blog-${slug}.jpg`
}

export function getOgImageForPath(path?: string): string {
  if (!path || path === '/') return OG_HOME
  if (
    path === '/store' ||
    path === '/fortnite-spoofer' ||
    path === '/fortnite-cheats' ||
    path === '/ugc-account-recovery'
  )
    return OG_PRODUCT
  if (path === '/blog') return OG_BLOG
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length).replace(/\/$/, '')
    return blogOgImage(slug)
  }
  if (path === '/forums') return OG_FORUMS
  if (path === '/reviews') return OG_REVIEWS
  if (path === '/faq') return OG_FAQ
  if (path === '/support') return OG_SUPPORT
  if (path === '/privacy') return OG_PRIVACY
  if (path === '/terms') return OG_TERMS
  if (path === '/refunds') return OG_REFUNDS
  if (path === '/status') return OG_STATUS
  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length).replace(/\/$/, '')
    return forumOgImage(slug)
  }
  return OG_HOME
}

export const PAGE_OG = {
  home: OG_HOME,
  product: OG_PRODUCT,
  forums: OG_FORUMS,
  blog: OG_BLOG,
  reviews: OG_REVIEWS,
  faq: OG_FAQ,
  support: OG_SUPPORT,
  privacy: OG_PRIVACY,
  terms: OG_TERMS,
  refunds: OG_REFUNDS,
  status: OG_STATUS,
  banChecker: OG_BAN_CHECKER,
} as const
