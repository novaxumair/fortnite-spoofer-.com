import { Activity, AlertTriangle, CheckCircle2, MessageSquare, ShoppingCart } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { getGame, guidePath, type GameStatus } from '../data/games'
import { forumPath } from '../data/blog-paths'
import {
  PRODUCT_LIFETIME_PRICE_USD,
  PRODUCT_PRICE_USD,
  SITE_HOST,
  SITE_NAME,
} from '../data/site'

const STATUS_COPY: Record<
  GameStatus,
  {
    badge: string
    headline: string
    sub: string
    glow: string
    ring: string
    panel: string
    labelClass: string
    icon: typeof CheckCircle2
  }
> = {
  Active: {
    badge: 'Loader status',
    headline: 'Active',
    sub: 'This build matches the current Fortnite client with Easy Anti-Cheat. Safe to configure HWID profiles and load when your setup checklist is done.',
    glow: 'shadow-[0_0_60px_rgba(52,211,153,0.22)]',
    ring: 'ring-1 ring-emerald-400/35',
    panel: 'from-emerald-500/12 via-[rgba(20,16,31,0.95)] to-[rgba(12,8,22,0.98)]',
    labelClass: 'text-emerald-300',
    icon: CheckCircle2,
  },
  Updating: {
    badge: 'Loader status',
    headline: 'Updating',
    sub: 'Epic shipped a Fortnite patch or the loader is being re-tested. Wait for Active before ranked — forum moderators post ETA hints.',
    glow: 'shadow-[0_0_60px_rgba(251,191,36,0.18)]',
    ring: 'ring-1 ring-amber-400/35',
    panel: 'from-amber-500/10 via-[rgba(20,16,31,0.95)] to-[rgba(12,8,22,0.98)]',
    labelClass: 'text-amber-300',
    icon: AlertTriangle,
  },
  'Use with caution': {
    badge: 'Loader status',
    headline: 'Caution',
    sub: 'Modules may work but reports or EAC noise are elevated. Prefer Creative or read the safety thread before mains.',
    glow: 'shadow-[0_0_60px_rgba(248,113,113,0.16)]',
    ring: 'ring-1 ring-rose-400/30',
    panel: 'from-rose-500/10 via-[rgba(20,16,31,0.95)] to-[rgba(12,8,22,0.98)]',
    labelClass: 'text-rose-300',
    icon: Activity,
  },
}

export function StatusPage() {
  const game = getGame('fortnite')
  const status: GameStatus = game?.status ?? 'Active'
  const ui = STATUS_COPY[status]
  const StatusIcon = ui.icon
  const isActive = status === 'Active'

  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <div className="content-surface-nav">
        <Navbar currentPath="/status" />
      </div>

      <main className="page-x pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <nav
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
            aria-label="Breadcrumb"
          >
            <a href="/" className="transition-colors hover:text-white/70">
              Home
            </a>
            <span aria-hidden>/</span>
            <span className="text-white/65">Status</span>
          </nav>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Is {SITE_NAME} ready to load?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            This page is the source of truth on {SITE_HOST}.{' '}
            <span className="text-emerald-300/90">Active</span> means go —{' '}
            <span className="text-amber-300/90">Updating</span> means wait. Old forum posts do not
            override what you see here.
          </p>

          <div
            className={`relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${ui.panel} p-8 sm:p-10 ${ui.glow} ${ui.ring}`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              <StatusIcon className={`h-4 w-4 ${ui.labelClass}`} strokeWidth={2} aria-hidden />
              {ui.badge}
            </div>
            <p
              className={`mt-6 text-center font-semibold uppercase tracking-[0.12em] ${ui.labelClass} text-5xl sm:text-6xl lg:text-7xl`}
            >
              {ui.headline}
            </p>
            <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-white/60 sm:text-base">
              {ui.sub}
            </p>
            {isActive ? (
              <p className="mt-4 text-center text-xs text-white/40">
                Label can flip after the next Fortnite patch — refresh before every session.
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="page-card rounded-2xl border-t-2 border-t-emerald-400/70 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-emerald-300">Active</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Loader matches the current game build. Configure HWID profiles, backups, and
                session isolation, then checkout if you still need a license. Monthly $
                {PRODUCT_PRICE_USD} · lifetime ${PRODUCT_LIFETIME_PRICE_USD}.
              </p>
              <a
                href={forumPath('complete-setup')}
                className="mt-3 inline-block text-sm font-medium text-z-soft transition-colors hover:text-white"
              >
                Setup walkthrough →
              </a>
            </article>
            <article className="page-card rounded-2xl border-t-2 border-t-amber-400/60 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-amber-300">Updating</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                The menu may fail to inject or features may be stale. Do not reinstall Windows on
                repeat — watch this page and the{' '}
                <a
                  href={forumPath('eac-fortnite-status')}
                  className="text-z-soft underline-offset-2 hover:text-white hover:underline"
                >
                  EAC patch-day thread
                </a>{' '}
                until Active returns.
              </p>
            </article>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-white/50">
            {SITE_NAME} is built for Fortnite on Windows PC with Easy Anti-Cheat (EAC). Epic
            enforcement still applies — use conservative settings on accounts you care about. See the{' '}
            <a href={guidePath('fortnite')} className="text-z-soft hover:text-white">
              product page
            </a>{' '}
            for modules and the{' '}
            <a href="/forums" className="text-z-soft hover:text-white">
              forums
            </a>{' '}
            for moderator updates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {isActive ? (
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                <ShoppingCart className="h-4 w-4" strokeWidth={2} aria-hidden />
                Buy while status is Active
              </CheckoutLink>
            ) : (
              <span
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/45"
                aria-disabled
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2} aria-hidden />
                Checkout paused — not Active
              </span>
            )}
            <a
              href={forumPath('eac-fortnite-status')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <MessageSquare className="h-4 w-4" strokeWidth={2} aria-hidden />
              EAC & Fortnite status thread
            </a>
          </div>
        </div>
      </main>

      <SiteFooter currentPath="/status" />
    </div>
  )
}
