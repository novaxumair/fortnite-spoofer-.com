export type GameStatus = 'Active' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Primary catalog entry — Fortnite spoofer (legacy helpers for media components). */
export const GAMES: Game[] = [
  { slug: 'fortnite', name: 'Fortnite', status: 'Active', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  if (slug === 'fortnite' || slug === 'fortnite-spoofer') return '/fortnite-spoofer'
  return `/${slug}`
}

export function parseGuideSlug(param: string) {
  const lower = param.toLowerCase()
  if (lower === 'fortnite-spoofer') return 'fortnite'
  return lower.endsWith('-cheats') ? lower.slice(0, -7) : lower
}

export const PRODUCT_FEATURE_GROUPS = [] as const

export const GUIDE_FEATURES = [] as const

export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
