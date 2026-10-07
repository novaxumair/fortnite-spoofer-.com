import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { LogoMark } from './LogoMark'
import { CheckoutLink } from './CheckoutLink'
import type { ProductId } from '../data/products'
import { SITE_NAME } from '../data/site'
import { isActiveRoute, normalizePath } from '../lib/paths'

const NAV_LINKS = [
  { label: 'Products', to: '/store' },
  { label: 'Blog', to: '/blog' },
  { label: 'Forums', to: '/forums' },
  { label: 'Status', to: '/status' },
  { label: 'BAN CHECKER', to: '/ban-checker' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Support', to: '/support' },
] as const

const NAV_LINK_CLASS =
  'inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors'
const NAV_LINK_ACTIVE = 'bg-z-accent/25 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.22)]'
const NAV_LINK_IDLE = 'text-white/70 hover:bg-z-accent/15 hover:text-white'

const MOBILE_LINK_CLASS = 'mobile-nav-link rounded-xl px-4 py-3 text-base font-medium transition-all'
const MOBILE_LINK_ACTIVE = 'bg-z-accent/20 text-white'
const MOBILE_LINK_IDLE = 'text-white/80 hover:bg-z-accent/15 hover:text-white'

type NavbarProps = {
  onVideo?: boolean
  currentPath?: string
  checkoutProductId?: ProductId
}

function MobileNavLayers({
  path,
  linkClass,
  checkoutProductId,
}: {
  path: string
  linkClass: (to: string, mobile?: boolean) => string
  checkoutProductId: ProductId
}) {
  return (
    <>
      <div
        id="mobile-nav-backdrop"
        className="mobile-nav-backdrop fixed inset-0 z-[500] bg-[#06020f]/80 backdrop-blur-md md:hidden"
        data-mobile-nav-close
        aria-hidden="true"
      />
      <div
        id="mobile-nav-drawer"
        className="mobile-nav-drawer fixed right-0 top-0 z-[510] flex h-[100dvh] w-[min(100vw,16rem)] max-w-[85vw] flex-col border-l border-z-soft/20 bg-z-elevated/98 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
        aria-hidden="true"
      >
        <div className="flex flex-col gap-1 overflow-y-auto px-5 pb-4 pt-[max(5.5rem,env(safe-area-inset-top))]">
          <a
            href="/"
            data-mobile-nav-close
            className={`${MOBILE_LINK_CLASS} ${path === '/' ? MOBILE_LINK_ACTIVE : MOBILE_LINK_IDLE}`}
            aria-current={path === '/' ? 'page' : undefined}
          >
            Home
          </a>
          {NAV_LINKS.map((link) => {
            const active = isActiveRoute(link.to, path)
            return (
              <a
                key={link.label}
                href={link.to}
                data-mobile-nav-close
                className={linkClass(link.to, true)}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </div>
        <div className="mt-auto px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <CheckoutLink
            productId={checkoutProductId}
            aria-label="Get access — open checkout"
            data-mobile-nav-close
            className="cta-gradient block w-full rounded-full px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Get Access
          </CheckoutLink>
        </div>
      </div>
    </>
  )
}

export function Navbar({
  onVideo: _onVideo = false,
  currentPath,
  checkoutProductId = 'fortnite-spoofer',
}: NavbarProps) {
  const [clientPath, setClientPath] = useState(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '',
  )
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setClientPath(normalizePath(window.location.pathname))
    setPortalReady(true)
  }, [])

  const path = normalizePath(currentPath ?? clientPath)

  function linkClass(to: string, mobile = false) {
    const active = isActiveRoute(to, path)
    if (mobile) {
      return `${MOBILE_LINK_CLASS} ${active ? MOBILE_LINK_ACTIVE : MOBILE_LINK_IDLE}`
    }
    return `${NAV_LINK_CLASS} ${active ? NAV_LINK_ACTIVE : NAV_LINK_IDLE}`
  }

  const mobileLayers = (
    <MobileNavLayers
      path={path}
      linkClass={linkClass}
      checkoutProductId={checkoutProductId}
    />
  )

  return (
    <header className="site-nav relative z-[220]">
      <nav className="page-x relative flex items-center justify-between gap-3 py-4 sm:py-5">
        <a href="/" className="flex min-w-0 items-center" aria-label={SITE_NAME}>
          <LogoMark priority />
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <div className="nav-chip flex items-center gap-0.5 rounded-full px-1 py-1">
            {NAV_LINKS.map((link) => {
              const active = isActiveRoute(link.to, path)
              return (
                <a
                  key={link.label}
                  href={link.to}
                  className={linkClass(link.to)}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
          <CheckoutLink
            productId={checkoutProductId}
            aria-label="Get access — open checkout"
            className="cta-gradient flex items-center self-stretch rounded-full px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Access
          </CheckoutLink>
        </div>

        <button
          type="button"
          data-mobile-nav-toggle
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-nav-drawer"
          className="relative z-[520] flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-z-soft/25 bg-z-elevated/80 text-white backdrop-blur-lg md:hidden"
        >
          <Menu className="mobile-nav-icon-menu absolute h-5 w-5 text-white" strokeWidth={2} aria-hidden />
          <X className="mobile-nav-icon-close absolute h-5 w-5 text-white" strokeWidth={2} aria-hidden />
        </button>
      </nav>

      {portalReady && typeof document !== 'undefined'
        ? createPortal(mobileLayers, document.body)
        : mobileLayers}
    </header>
  )
}
