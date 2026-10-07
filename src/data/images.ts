import { FN_COVER, FN_GAME_COVER, FN_HERO, FN_MENU } from './media'
import { SITE_OG, getOgImageForPath, PAGE_OG } from './og'

export { SITE_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const FN_PRODUCT_HERO = FN_HERO
export const FN_PRODUCT_COVER = FN_COVER

/** @deprecated */
export const D2_PRODUCT_HERO = FN_PRODUCT_HERO
export const D2_PRODUCT_COVER = FN_PRODUCT_COVER

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export const IMAGE_SEO: Record<
  string,
  ImageSeoFields & {
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  'fortnite-spoofer': {
    alt: 'Fortnite HWID spoofer product on Windows PC',
    title: 'Fortnite Spoofer Product Details',
    caption: 'HWID spoofer for Fortnite and EAC titles',
    heroAlt: 'Fortnite spoofer — product hero',
    heroTitle: 'Fortnite Spoofer',
    heroCaption: 'Premium HWID spoofer for Fortnite on Windows PC',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product' | 'blog',
  PageImage
> = {
  home: {
    src: FN_HERO,
    og: PAGE_OG.home,
    alt: 'Fortnite spoofer and cheats overview',
    title: 'Fortnite Spoofer',
    caption: 'HWID spoofer, cheats, and UGC recovery.',
  },
  blog: {
    src: '/og/blog.jpg',
    og: PAGE_OG.blog,
    alt: 'Fortnite spoofer blog guides',
    title: 'Fortnite Spoofer Blog',
    caption: 'HWID, EAC, and Fortnite setup articles.',
  },
  forums: {
    src: '/og/forums.jpg',
    og: PAGE_OG.forums,
    alt: 'Fortnite spoofer community forums',
    title: 'Fortnite Spoofer Forums',
    caption: 'Setup, EAC, spoofer, and loader threads.',
  },
  reviews: {
    src: '/og/reviews.jpg',
    og: PAGE_OG.reviews,
    alt: 'Fortnite spoofer buyer reviews',
    title: 'Fortnite Spoofer Reviews',
    caption: 'Feedback on spoofer and loader updates.',
  },
  faq: {
    src: '/og/faq.jpg',
    og: PAGE_OG.faq,
    alt: 'Fortnite spoofer FAQ',
    title: 'Fortnite Spoofer FAQ',
    caption: 'Pricing, features, and setup answers.',
  },
  support: {
    src: '/og/support.jpg',
    og: PAGE_OG.support,
    alt: 'Fortnite spoofer support',
    title: 'Fortnite Spoofer Support',
    caption: 'Delivery and loader help.',
  },
  product: {
    src: FN_GAME_COVER,
    og: PAGE_OG.product,
    alt: 'Fortnite spoofer store',
    title: 'Fortnite Spoofer Store',
    caption: 'Spoofer, cheats, and UGC recovery plans.',
  },
}

export function getGameImage(_slug: string): string {
  return FN_GAME_COVER
}

export function getProductHeroImage(_slug: string): string {
  return FN_GAME_COVER
}

export function getOgImage(path?: string): string {
  return getOgImageForPath(path)
}

export function getPageImage(key: keyof typeof PAGE_IMAGES) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product' ? `${name} product details` : `${name} product artwork`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} product`
}

export const FN_MENU_ASSET = FN_MENU
/** @deprecated */
export const D2_MENU_ASSET = FN_MENU
