import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { BlogArticleCard } from '../components/BlogArticleCard'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { InternalLinksSection } from '../components/InternalLinksSection'
import { getArticle, getRelatedArticles } from '../data/articles'
import { articlePath } from '../data/blog-paths'
import { getBlogExploreLinks } from '../data/internal-links'
import { SeoMedia } from '../components/SeoMedia'
import { getArticleMedia } from '../data/media'
import { SITE_HOST, SITE_NAME } from '../data/site'
import { NotFoundPage } from './NotFoundPage'

type BlogArticlePageProps = {
  slug: string
}

function sectionId(heading: string) {
  return heading
    .replace(/^\d+\)\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function BlogArticlePage({ slug }: BlogArticlePageProps) {
  const article = getArticle(slug)

  if (!article) return <NotFoundPage />

  const related = getRelatedArticles(article.slug, 6)

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar currentPath={`/blog/${slug}`} />
      </div>

      <main className="page-body">
        <article className="page-x py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-white/70">
                Home
              </a>
              <span>/</span>
              <a href="/blog" className="hover:text-white/70">
                Blog
              </a>
              <span>/</span>
              <span className="text-white/70">{article.tag}</span>
            </nav>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {article.tag} · {article.date} · {article.readMinutes} min read
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              {article.excerpt}
            </p>

            <SeoMedia media={getArticleMedia(article.slug)} className="mt-8" showVideo={false} />

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading} id={sectionId(section.heading)} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/55 sm:text-base">
                    {section.body.map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="page-card mt-12 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Next steps on {SITE_NAME}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Check{' '}
                <a href="/status" className="text-z-soft hover:text-white">
                  loader status
                </a>{' '}
                on {SITE_HOST}, pick a product on the{' '}
                <a href="/store" className="text-z-soft hover:text-white">
                  store
                </a>
                , or discuss this topic on{' '}
                <a href="/forums" className="text-z-soft hover:text-white">
                  forums
                </a>
                .
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/fortnite-spoofer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  Fortnite spoofer
                </a>
                <a
                  href="/ban-checker"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  Ban checker
                </a>
                <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white">
                  Checkout
                </CheckoutLink>
              </div>
            </div>

            <a
              href="/blog"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              All blog articles
            </a>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold tracking-tight text-white">Related articles</h2>
              <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((a) => (
                  <li key={a.slug} className="min-w-0">
                    <BlogArticleCard article={a} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <InternalLinksSection
          title="Keep exploring"
          links={getBlogExploreLinks()}
          className="page-band"
        />

        <SiteFooter currentPath={articlePath(article.slug)} />
      </main>
    </div>
  )
}
