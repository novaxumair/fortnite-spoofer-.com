import { Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { FaqSection } from '../components/FaqSection'
import { NotFoundPage } from './NotFoundPage'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import { InternalLinksSection } from '../components/InternalLinksSection'
import { getProductInternalLinks } from '../data/internal-links'
import { PLANS, getProduct, type Product, type ProductId } from '../data/products'
import { forumPath } from '../data/blog-paths'
import { SITE_HOST, SITE_NAME } from '../data/site'

function SecurityPills({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-2">
      {product.systemRequirements.securityPills.map((pill) => (
        <span
          key={pill}
          className="inline-flex items-center gap-1.5 rounded-lg border border-z-soft/20 bg-z-card/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/85"
        >
          <Check className="h-3.5 w-3.5 text-z-soft" strokeWidth={2.5} />
          {pill}
        </span>
      ))}
    </div>
  )
}

function PurchasePanel({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-z-soft/20 bg-[rgba(12,10,26,0.92)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="border-b border-white/10 bg-gradient-to-br from-z-accent/25 via-transparent to-transparent px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-z-soft/90">
          Get {product.shortName}
        </p>
        <ul className="mt-4 space-y-2">
          {PLANS.map((plan) => (
            <li
              key={plan.id}
              className="flex items-baseline justify-between gap-3 text-sm text-white/80"
            >
              <span>
                <span className="font-semibold text-white">${plan.priceUsd}</span>
                <span className="text-white/50"> / {plan.label.toLowerCase()}</span>
              </span>
              <span className="text-xs text-white/45">{plan.durationLabel}</span>
            </li>
          ))}
        </ul>
        <CheckoutLink
          productId={product.id}
          className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Buy now — from ${PLANS[0].priceUsd}
        </CheckoutLink>
      </div>
      <div className="px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-z-soft">How to get access</p>
        <ol className="mt-4 space-y-4">
          {product.acquisitionSteps.map((item) => (
            <li key={item.step} className="flex gap-3">
              <span className="text-xs font-bold tabular-nums text-z-soft/80">{item.step}</span>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

type ProductDetailPageProps = {
  productId: ProductId
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const product = getProduct(productId)
  if (!product) return <NotFoundPage />

  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <div className="content-surface-nav">
        <Navbar currentPath={product.path} checkoutProductId={product.id} />
      </div>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(176,64,251,0.35),transparent_55%)]"
            aria-hidden
          />
          <div className="page-x relative py-10 sm:py-14 lg:py-16">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-white/70">
                Home
              </a>
              <span>/</span>
              <a href="/store" className="hover:text-white/70">
                Products
              </a>
              <span>/</span>
              <span className="text-white/70">{product.name}</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-z-soft/85">
                  {product.heroEyebrow}
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem]">
                  {product.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-z-soft">{product.name.split(' ').slice(-1)}</span>
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                  {product.description}{' '}
                  <a href="/store" className="text-z-soft hover:text-white">
                    Compare all products
                  </a>{' '}
                  or read{' '}
                  <a href={forumPath('complete-setup')} className="text-z-soft hover:text-white">
                    setup steps
                  </a>{' '}
                  on the forums.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-z-soft">
                  <Shield className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {product.status} · {SITE_HOST}
                </div>

                {product.infoSections?.map((block) => (
                  <div key={block.heading} className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h2 className="text-lg font-semibold text-white">{block.heading}</h2>
                    {block.paragraphs.map((p) => (
                      <p key={p.slice(0, 32)} className="mt-3 text-sm leading-relaxed text-white/60">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}

                <div className="mt-10 space-y-10">
                  {product.featureGroups.map((group) => (
                    <div key={group.name}>
                      <h2 className="text-lg font-semibold tracking-tight text-z-soft sm:text-xl">
                        {group.name}
                      </h2>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm text-white/65"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-z-soft" strokeWidth={2} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <PurchasePanel product={product} />
                <ul className="mt-6 space-y-2">
                  {product.highlightBullets.map((line) => (
                    <li key={line} className="flex gap-2 text-xs text-white/55">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-z-soft" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-x py-12 sm:py-16">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Before load</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/50">
            System requirements for {product.name} on {SITE_NAME}
          </p>
          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-z-soft/15 bg-z-card/50 p-6 sm:p-8">
            <SecurityPills product={product} />
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-z-soft">
                Operating system
              </p>
              <p className="mt-2 text-sm font-medium text-white/85">
                {product.systemRequirements.bullets[0]}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {product.systemRequirements.bullets.slice(1).map((line) => (
                <li key={line} className="flex gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-z-soft" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <InternalLinksSection
          title="Related pages & guides"
          intro={`More ${SITE_NAME} resources for ${product.shortName} buyers — status, forums, blog, and sibling products.`}
          links={getProductInternalLinks(productId)}
        />

        <FaqSection
          heading={`${product.shortName} FAQ`}
          items={PRODUCT_PAGE_FAQS}
          id={`${product.id}-faq`}
          className="pb-16"
        />
      </main>

      <SiteFooter currentPath={product.path} />
    </div>
  )
}
