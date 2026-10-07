import {
  ArrowRight,
  Check,
  Clock,
  Headphones,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { InternalLinksSection } from '../components/InternalLinksSection'
import { HWID_ARTICLE_LINKS, SETUP_GUIDE_LINKS } from '../data/internal-links'
import { PLANS, PRODUCTS, type Product, type ProductId } from '../data/products'
import { PRODUCT_LIFETIME_PRICE_USD, PRODUCT_PRICE_USD, SITE_NAME } from '../data/site'

type ProductVisual = {
  icon: LucideIcon
  accent: string
  glow: string
  header: string
  badgeLabel: string
}

const PRODUCT_VISUAL: Record<ProductId, ProductVisual> = {
  'fortnite-spoofer': {
    icon: Shield,
    accent: 'from-violet-500/10 via-transparent to-transparent',
    glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.45)]',
    header: 'ring-violet-500/10',
    badgeLabel: 'HW',
  },
  'fortnite-cheats': {
    icon: Target,
    accent: 'from-fuchsia-500/8 via-transparent to-transparent',
    glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.45)]',
    header: 'ring-fuchsia-500/10',
    badgeLabel: 'FN',
  },
  'ugc-account-recovery': {
    icon: Users,
    accent: 'from-sky-500/8 via-transparent to-transparent',
    glow: 'shadow-[0_20px_50px_rgba(0,0,0,0.45)]',
    header: 'ring-sky-500/10',
    badgeLabel: 'UGC',
  },
}

const TRUST_STRIP = [
  { icon: Zap, label: 'Instant delivery', sub: 'License right after checkout' },
  { icon: Headphones, label: '24/7 Discord', sub: 'Setup & billing help' },
  { icon: Sparkles, label: 'Live status', sub: 'Active / Updating labels' },
] as const

function PlanPills() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-center">
        <p className="text-2xl font-semibold tabular-nums text-white">${PRODUCT_PRICE_USD}</p>
        <p className="text-xs font-medium uppercase tracking-wider text-white/50">Monthly</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-center">
        <p className="text-2xl font-semibold tabular-nums text-white">${PRODUCT_LIFETIME_PRICE_USD}</p>
        <p className="text-xs font-medium uppercase tracking-wider text-z-soft">Lifetime</p>
      </div>
    </div>
  )
}

type StoreProductCardProps = {
  product: Product
  title: string
  viewHref: string
  viewLabel: string
  featured?: boolean
}

function StatusPill({ status }: { status: Product['status'] }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
        status === 'Active'
          ? 'bg-emerald-500/15 text-emerald-300'
          : status === 'Updating'
            ? 'bg-amber-500/15 text-amber-300'
            : 'bg-white/10 text-white/70'
      }`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-80" />
      <span className="truncate">{status}</span>
    </span>
  )
}

function StoreProductCard({ product, title, viewHref, viewLabel, featured = false }: StoreProductCardProps) {
  const visual = PRODUCT_VISUAL[product.id]
  const Icon = visual.icon

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border bg-[#12101c] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 ${
        featured
          ? `border-z-soft/20 ${visual.glow} ring-1 ring-z-soft/15`
          : 'border-white/[0.08] hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
      }`}
    >
      {featured ? (
        <div className="shrink-0 border-b border-white/10 bg-white/[0.04] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-z-soft/90 sm:px-8">
          Most popular
        </div>
      ) : null}

      <div
        className={`relative border-b border-white/[0.08] bg-[#161222] bg-gradient-to-br ${visual.accent} px-6 pb-6 pt-7 sm:px-8 sm:pb-7 sm:pt-8`}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 sm:h-16 sm:w-16">
            <Icon className="h-7 w-7 text-z-soft sm:h-8 sm:w-8" strokeWidth={1.65} />
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <span className="rounded-md bg-black/35 px-2.5 py-1 text-xs font-bold tracking-wide text-white/75">
              {visual.badgeLabel}
            </span>
            <StatusPill status={product.status} />
          </div>
        </div>
        <h2 className="mt-4 break-words text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-3 break-words text-base leading-relaxed text-white/70">{product.tagline}</p>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-[#100e18] px-6 py-6 sm:px-8 sm:py-7">
        <PlanPills />

        <ul className="mt-6 min-h-0 flex-1 space-y-3">
          {product.highlightBullets.slice(0, 5).map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/65">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                <Check className="h-3 w-3 text-z-soft" strokeWidth={3} />
              </span>
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 space-y-3">
          <CheckoutLink
            productId={product.id}
            className="cta-gradient block w-full rounded-full px-4 py-4 text-center text-base font-semibold leading-snug text-white shadow-lg transition-opacity hover:opacity-95"
          >
            Buy {product.shortName}
          </CheckoutLink>
          <a
            href={viewHref}
            className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold leading-snug text-white/90 transition-colors hover:border-z-soft/35 hover:bg-white/[0.06] sm:text-base"
          >
            <span className="min-w-0 break-words">{viewLabel}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  )
}

export function StorePage() {
  const [spoofer, cheats, ugc] = PRODUCTS

  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <Navbar currentPath="/store" />

      <main className="page-x pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-z-soft/85 sm:text-[11px] sm:tracking-[0.24em]">
            {SITE_NAME} store · ${PLANS[0].priceUsd} / ${PLANS[1].priceUsd}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Fortnite utilities & recovery tools
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            HWID spoofer, Fortnite cheats, and UGC account recovery — instant delivery, Discord
            support, and live loader status.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55">
            {TRUST_STRIP.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-z-soft" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-[88rem] grid-cols-1 items-stretch gap-8 min-[1120px]:grid-cols-3 min-[1120px]:gap-6">
          <StoreProductCard
            product={spoofer}
            title={spoofer.name}
            viewHref={spoofer.path}
            viewLabel="Explore spoofer features"
            featured
          />
          <StoreProductCard
            product={cheats}
            title={cheats.name}
            viewHref={cheats.path}
            viewLabel="Explore cheat features"
          />
          <StoreProductCard
            product={ugc}
            title={ugc.shortName}
            viewHref={ugc.path}
            viewLabel="Explore UGC recovery"
          />
        </div>

        <section className="mx-auto mb-10 mt-16 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:mb-12 sm:p-10">
          <h2 className="text-xl font-semibold sm:text-2xl">What each bundle includes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Instant delivery',
                text: 'Digital license and loader access right after checkout.',
              },
              {
                icon: Headphones,
                title: '24/7 support',
                text: 'Discord help for setup, billing, and status questions.',
              },
              {
                icon: Clock,
                title: 'Live status',
                text: 'Active versus Updating labels after Fortnite and EAC patches.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <Icon className="h-5 w-5 text-z-soft" strokeWidth={1.75} />
                <p className="mt-3 text-base font-semibold text-z-soft">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/ban-checker"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-base font-semibold text-white/90 hover:bg-white/5"
            >
              HWID ban checker
            </a>
            <a
              href="/status"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-z-soft hover:text-white"
            >
              Loader status
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <InternalLinksSection
          title="Guides & HWID articles"
          intro="Read before you buy — setup forums plus blog posts that link back to products and status."
          links={[...SETUP_GUIDE_LINKS, ...HWID_ARTICLE_LINKS]}
          columns={2}
        />
      </main>

      <SiteFooter currentPath="/store" />
    </div>
  )
}
