import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { LogoMark } from './LogoMark'
import {
  OFFICIAL_GAME_LINKS,
  SITE_GUIDE_LINKS,
  SITE_PAGE_LINKS,
} from '../data/links'
import { SITE_NAME } from '../data/site'
import { isActiveRoute as isCurrent, normalizePath } from '../lib/paths'

type SiteFooterProps = {
  currentPath?: string
}

const FOOTER_PAGES = SITE_PAGE_LINKS.filter(
  (l) => !['/privacy', '/terms', '/refunds'].includes(l.to),
)

const FOOTER_LEGAL = SITE_PAGE_LINKS.filter((l) =>
  ['/privacy', '/terms', '/refunds'].includes(l.to),
)

function FooterLink({
  href,
  children,
  active,
  external,
}: {
  href: string
  children: ReactNode
  active?: boolean
  external?: boolean
}) {
  const className = `inline-flex items-center gap-1 rounded-md py-0.5 transition-colors ${
    active ? 'text-white' : 'text-white/65 hover:text-white'
  }`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ArrowUpRight className="h-3 w-3 opacity-60" strokeWidth={2} aria-hidden />
      </a>
    )
  }

  return (
    <a href={href} aria-current={active ? 'page' : undefined} className={className}>
      {children}
    </a>
  )
}

/**
 * Site footer with page / guide / official Dota 2 links (crawl-friendly).
 */
export function SiteFooter({ currentPath }: SiteFooterProps) {
  const path = normalizePath(currentPath || '/')

  return (
    <footer className="relative mt-auto border-t border-z-soft/20 bg-z-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-z-accent/40 to-transparent"
        aria-hidden
      />
      <div className="page-x py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <a href="/" className="inline-flex items-center gap-3" aria-label={SITE_NAME}>
                <LogoMark className="!h-16 !w-16" />
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
                Fortnite HWID spoofer, cheats, and UGC account recovery — blog guides, forums, status,
                and ban checker on Windows PC.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/store"
                  className="cta-gradient inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Products
                </a>
                <a
                  href="/fortnite-spoofer"
                  className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                >
                  Spoofer page
                </a>
              </div>
            </div>

            <nav aria-label="Footer pages" className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-z-soft/90">
                Pages
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_PAGES.map((l) => (
                  <li key={l.to}>
                    <FooterLink href={l.to} active={isCurrent(l.to, path)}>
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer guides" className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-z-soft/90">
                Guides
              </p>
              <ul className="mt-4 columns-1 gap-x-8 space-y-2.5 text-sm sm:columns-2">
                {SITE_GUIDE_LINKS.map((l) => (
                  <li key={l.to} className="break-inside-avoid">
                    <FooterLink href={l.to} active={isCurrent(l.to, path)}>
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                <a href="/blog" className="text-z-soft transition-colors hover:text-white">
                  All blog articles →
                </a>
                <a href="/forums" className="text-z-soft transition-colors hover:text-white">
                  All forum threads →
                </a>
              </div>
            </nav>

            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-z-soft/90">
                Legal
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_LEGAL.map((l) => (
                  <li key={l.to}>
                    <FooterLink href={l.to} active={isCurrent(l.to, path)}>
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-z-soft/90">
                Official game
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {OFFICIAL_GAME_LINKS.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href} external>
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Epic Games or Easy Anti-Cheat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
