import { Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import {
  GUIDE_FEATURES,
  PRODUCT_FEATURE_GROUPS,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import {
  PRODUCT_LIFETIME_PRICE_USD,
  PRODUCT_PRICE_USD,
  SITE_HOST,
  SITE_NAME,
} from '../data/site'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'
import { forumPath } from '../data/blog-paths'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-z-soft/15 bg-[rgba(20,16,31,0.95)] sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="View Dota 2 Cheats plans">
        <GameCover
          slug={game.slug}
          name={game.name}
          aspect="square"
          variant="product"
          className="rounded-none"
        />
      </CheckoutLink>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">D2</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Dota 2</p>
            <p className="text-xs text-white/45">
              {game.status} · ${PRODUCT_PRICE_USD} monthly · ${PRODUCT_LIFETIME_PRICE_USD} lifetime
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90">
          View plans & checkout
        </CheckoutLink>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Digital delivery · Confirm Active status first
        </p>
      </div>
    </div>
  )
}

type GameProductPageProps = {
  guideSlug: string
}

export function GameProductPage({ guideSlug }: GameProductPageProps) {
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug)

  if (!guideSlug.toLowerCase().endsWith('-cheats')) {
    const maybe = getGame(guideSlug.toLowerCase())
    if (maybe) {
      if (typeof window !== 'undefined') {
        window.location.replace(guidePath(maybe.slug))
      }
      return null
    }
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <div className="content-surface-nav">
        <Navbar currentPath="/dota-2-cheats" />
      </div>

      <main>
        <section className="page-x py-8 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="shrink-0 hover:text-white/70">
                Home
              </a>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">Product details</span>
            </nav>

            <div className="mt-6 text-center lg:mt-8">
              <span className="inline-flex items-center gap-1.5 text-xs text-z-soft">
                <Shield className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                {game.status} · Valve Anti-Cheat (VAC) · Steam · Windows PC · {SITE_HOST}
              </span>

              <h1 className="mx-auto mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Dota 2 Cheats Store
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Premium Dota 2 cheats — hero ESP, full map hack, cooldown tracker, creep and rune
                timers, last-hit helper, auto-dodge, ward ESP, roshan timer, and enemy inventory
                ESP. Monthly $35 and lifetime $150 with instant delivery when status is Active.
              </p>
            </div>

            <div className="mt-10 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7">
                <div className="space-y-10">
                  {PRODUCT_FEATURE_GROUPS.map((group) => (
                    <div key={group.name}>
                      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {group.name}
                      </h2>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-white/60"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-z-soft" strokeWidth={2} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Why players use these modules
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {GUIDE_FEATURES.map((f) => (
                      <li key={f.name} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-accent/20">
                          <Check className="h-3 w-3 text-z-soft" strokeWidth={2.5} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{f.name}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-white/50">{f.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/55">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Platforms & patches
                    </h2>
                    <p className="mt-3">
                      Runs on Dota 2 via Steam when loader status is Active. After a Dota 2 or VAC
                      update, status may show Updating until tested — {SITE_NAME}{' '}
                      publishes Active labels so you are not loading a mismatched build. Status
                      first, then queue.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Checkout and delivery
                    </h2>
                    <ol className="mt-3 list-decimal space-y-2 pl-5">
                      <li>Confirm current status on {SITE_HOST}.</li>
                      <li>Load only when status is Active (or accept Updating risk).</li>
                      <li>Checkout for digital license delivery.</li>
                      <li>
                        Follow the{' '}
                        <a
                          href={forumPath('complete-setup')}
                          className="text-white/80 underline-offset-2 hover:underline"
                        >
                          complete setup guide
                        </a>{' '}
                        after delivery.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-24">
                  <ProductPurchaseCard game={game} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="pb-10 pt-2 sm:pb-12 sm:pt-4"
          aria-labelledby="gameplay-preview-heading"
        >
          <div className="page-x text-center">
            <h2
              id="gameplay-preview-heading"
              className="text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              Dota 2 preview
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/45">
              {D2_HOME_VIDEO.caption} Hover to slow the scroll — click any shot to zoom in.
            </p>
          </div>
          <div className="relative left-1/2 mt-6 w-screen max-w-[100vw] -translate-x-1/2 sm:mt-8">
            <GameplayPreviewGallery />
          </div>
        </section>

        <FaqSection
          heading="Dota 2 cheats FAQ"
          intro="Status, features, platforms, delivery, and load questions before checkout."
          items={PRODUCT_PAGE_FAQS}
        />
      </main>

      <SiteFooter currentPath="/dota-2-cheats" />
    </div>
  )
}
