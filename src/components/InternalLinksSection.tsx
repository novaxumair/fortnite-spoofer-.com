import { ArrowRight } from 'lucide-react'
import type { InternalLinkItem } from '../data/internal-links'

type InternalLinksSectionProps = {
  title?: string
  intro?: string
  links: InternalLinkItem[]
  className?: string
  columns?: 2 | 3
}

export function InternalLinksSection({
  title = 'Explore the site',
  intro,
  links,
  className = '',
  columns = 3,
}: InternalLinksSectionProps) {
  if (links.length === 0) return null

  const colClass = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section
      className={`page-x border-t border-white/10 py-12 sm:py-14 ${className}`.trim()}
      aria-labelledby="internal-links-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="internal-links-heading" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        {intro ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{intro}</p> : null}
        <ul className={`mt-6 grid list-none gap-3 p-0 ${colClass}`}>
          {links.map((link) => (
            <li key={link.to + link.label}>
              <a
                href={link.to}
                className="page-card group flex h-full flex-col rounded-2xl p-4 transition-colors hover:border-z-soft/25 sm:p-5"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  {link.label}
                  <ArrowRight
                    className="h-3.5 w-3.5 text-z-soft transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-white/50">{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
