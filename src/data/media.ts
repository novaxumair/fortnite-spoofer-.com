/**
 * First-party Fortnite media paths (IGN-sourced gameplay stills, self-hosted WebP).
 */

export const FN_HERO = '/media/fn-hero-full.webp'
export const FN_COVER = '/media/fn-cover.webp'
export const FN_IGN_COVER = '/media/fn-ign-cover.webp'
export const FN_GAME_COVER = FN_IGN_COVER
export const FN_MENU = '/media/fn-menu.webp'
export const FN_VIDEO_THUMB = '/media/fn-video-thumb.jpg'

export const FN_HOME_VIDEO = {
  src: '/videos/hero.webm',
  poster: FN_VIDEO_THUMB,
  title: 'Fortnite spoofer hero preview on Windows PC',
  caption:
    'Fortnite gameplay preview — HWID utilities, EAC status, and store products on Windows PC.',
} as const

/** @deprecated use FN_* — legacy import alias */
export const D2_HERO = FN_HERO
export const D2_COVER = FN_COVER
export const D2_IGN_COVER = FN_IGN_COVER
export const D2_GAME_COVER = FN_GAME_COVER
export const D2_MENU = FN_MENU
export const D2_VIDEO_THUMB = FN_VIDEO_THUMB
export const D2_HOME_VIDEO = FN_HOME_VIDEO

export function shot(n: number) {
  return `/media/fn-screenshot-${n}.webp`
}

const SHOT_COUNT = 10

export function articleThumbnail(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return shot(1 + (h % SHOT_COUNT))
}

const SHOT_ALTS = [
  'Fortnite gameplay screenshot from IGN — battle royale island combat',
  'Fortnite Unreal Engine 5 screenshot from IGN — in-game environment',
  'Fortnite UE5 showcase screenshot from IGN',
  'Fortnite landscape screenshot from IGN',
  'Fortnite in-match screenshot from IGN',
  'Fortnite OG mode promotional still from IGN',
  'Fortnite OG Chapter 1 style screenshot from IGN',
  'Fortnite OG gameplay screenshot from IGN',
  'Fortnite OG island screenshot from IGN',
  'Fortnite OG map overview from IGN',
] as const

export type SeoMediaItem = {
  image: string
  alt: string
  title: string
  caption: string
  video?: string
  videoTitle?: string
}

function slugMediaIndex(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h % SHOT_COUNT
}

export function getArticleMedia(slug: string): SeoMediaItem {
  const n = slugMediaIndex(slug) + 1
  const title = slug.replace(/-/g, ' ')
  return {
    image: shot(n),
    alt: SHOT_ALTS[n - 1] ?? `Fortnite screenshot — ${title}`,
    title: `Fortnite Spoofer — ${title}`,
    caption: `Fortnite imagery (IGN) for the ${title} guide on fortnitespoofer.com.`,
  }
}

export function getForumMedia(slug: string): SeoMediaItem {
  const n = 1 + slugMediaIndex(slug)
  const title = slug.replace(/-/g, ' ')
  return {
    image: shot(n),
    alt: SHOT_ALTS[n - 1] ?? `Fortnite forum thread — ${title}`,
    title: `Fortnite Spoofer Forums — ${title}`,
    caption: `Community thread imagery for ${title} — Fortnite on Windows PC.`,
  }
}

export const PAGE_MEDIA = {
  home: {
    image: FN_HERO,
    alt: 'Fortnite gameplay with spoofer and store products on Windows PC',
    title: 'Fortnite Spoofer',
    caption: 'HWID utilities, cheats, and UGC recovery for Fortnite.',
  },
  product: {
    image: FN_COVER,
    video: FN_HOME_VIDEO.src,
    alt: 'Fortnite Spoofer store — HWID utilities on Windows PC',
    title: 'Fortnite Spoofer Store',
    caption: 'Spoofer, cheats, and UGC recovery plans.',
    videoTitle: FN_HOME_VIDEO.title,
    videoDescription: FN_HOME_VIDEO.caption,
  },
  forums: {
    image: shot(4),
    alt: 'Fortnite community forum screenshot from IGN',
    title: 'Fortnite Spoofer Forums',
    caption: 'EAC status, setup, spoofer, and loader help.',
  },
  reviews: {
    image: shot(2),
    alt: 'Fortnite screenshot for buyer reviews',
    title: 'Fortnite Spoofer Reviews',
    caption: 'Feedback on spoofer profiles, backups, and loader stability.',
  },
  faq: {
    image: shot(8),
    alt: 'Fortnite screenshot for FAQ',
    title: 'Fortnite Spoofer FAQ',
    caption: 'Pricing, HWID features, EAC notes, and setup answers.',
  },
  support: {
    image: shot(6),
    alt: 'Fortnite screenshot for support',
    title: 'Fortnite Spoofer Support',
    caption: 'Delivery, loader errors, and configuration help.',
  },
} as const
