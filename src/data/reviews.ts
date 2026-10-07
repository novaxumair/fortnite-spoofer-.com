export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  datePublished: string
  body: string
}

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'Arena regular',
    game: 'Fortnite',
    rating: 5,
    datePublished: '2026-03-14',
    body: 'Status on the store page matched what I got in menu. HWID backup and audit log held after the last patch — glad I waited for Active before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Creative tester',
    game: 'Fortnite',
    rating: 5,
    datePublished: '2026-03-13',
    body: 'Session isolation plus profile manager cleaned up my alt workflow. That is why I wanted a fortnite spoofer with honest Updating labels in the first place.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'Fortnite',
    rating: 4,
    datePublished: '2026-03-13',
    body: 'No fake multi-game catalog. Honest Updating vs Active flips after Epic patches are what I wanted before checkout.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Zero build',
    game: 'Fortnite',
    rating: 5,
    datePublished: '2026-03-12',
    body: 'Loader came back Active within a day after patch. Compatibility checker caught Secure Boot issues before I wasted a ban appeal.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'HWID recovery',
    game: 'Fortnite',
    rating: 5,
    datePublished: '2026-03-12',
    body: 'Pre-change backup took ten minutes to dial in. Setup forum thread covered Defender exclusions so first launch worked.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Fortnite',
    rating: 5,
    datePublished: '2026-03-11',
    body: 'Monthly first was the right call. Instant delivery and live status sold me before I looked at lifetime Fortnite spoofer plans.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Cheats add-on',
    game: 'Fortnite',
    rating: 4,
    datePublished: '2026-03-11',
    body: 'ESP presets are subtle with low-opacity boxes. Saved profiles make swapping between Creative and pubs easy.',
  },
  {
    id: '8',
    author: 'sora',
    role: 'Epic regular',
    game: 'Fortnite',
    rating: 4,
    datePublished: '2026-03-10',
    body: 'Spoofer-first most nights — fewer surprise HWID locks. Would like faster patch notes on site but loader always caught up within a day.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0)
  const avg = count ? (sum / count).toFixed(1) : '5.0'
  return {
    ratingValue: avg,
    reviewCount: String(count),
    bestRating: '5',
    worstRating: '1',
  }
}
