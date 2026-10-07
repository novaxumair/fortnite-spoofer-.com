import type { ReactNode } from 'react'
import { Navbar } from './Navbar'

type ListingPageHeroProps = {
  currentPath: '/blog' | '/forums'
  eyebrow: ReactNode
  title: string
  description: ReactNode
  search?: ReactNode
}

export function ListingPageHero({
  currentPath,
  eyebrow,
  title,
  description,
  search,
}: ListingPageHeroProps) {
  return (
    <section className="hero-panel hero-panel--listing relative flex flex-col bg-z-bg">
      <div className="listing-hero-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-20 flex flex-col">
        <Navbar currentPath={currentPath} />
        <div className="page-x pb-7 pt-2 sm:pb-8 sm:pt-3">
          <div className="mx-auto w-full max-w-6xl">
            <div className={search ? 'listing-hero-grid' : 'listing-hero-grid listing-hero-grid--solo'}>
              <div className="min-w-0">
                <p className="listing-hero-eyebrow">{eyebrow}</p>
                <h1 className="listing-hero-title">{title}</h1>
                <div className="listing-hero-desc">{description}</div>
              </div>
              {search ? <div className="listing-hero-search-wrap">{search}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
