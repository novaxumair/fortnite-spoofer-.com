import { useMemo } from 'react'
import { SiteFooter } from '../components/SiteFooter'
import { BlogArticleCard } from '../components/BlogArticleCard'
import { ListingPageHero } from '../components/ListingPageHero'
import { ListingSearchField } from '../components/ListingSearchField'
import { ARTICLES } from '../data/articles'
import { useListingSearchQuery } from '../hooks/useListingSearchQuery'
import { orderArticlesForGrid } from '../lib/blog-order'
import { blogSearchHaystack } from '../lib/listing-search'
import { InternalLinksSection } from '../components/InternalLinksSection'
import { getBlogExploreLinks } from '../data/internal-links'
import { SITE_HOST, SITE_NAME } from '../data/site'

type BlogPageProps = {
  initialQuery?: string
}

export function BlogPage({ initialQuery = '' }: BlogPageProps) {
  const { inputRef, q, onSearchInput } = useListingSearchQuery(initialQuery)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    const list = term
      ? ARTICLES.filter((a) => {
          const hay = `${a.title} ${a.excerpt} ${a.tag} ${a.searchTerms}`.toLowerCase()
          return hay.includes(term)
        })
      : ARTICLES
    if (term) {
      return [...list].sort((a, b) => a.title.localeCompare(b.title))
    }
    return orderArticlesForGrid(list, 4)
  }, [q])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <ListingPageHero
        currentPath="/blog"
        eyebrow={<>Guides · Features · {SITE_HOST}</>}
        title="Fortnite Spoofer Intel"
        description={
          <>
            Long-form guides on HWID utilities, Easy Anti-Cheat, Fortnite spoofer setup, cheats
            features, and 2026 buyer comparisons — no comment threads here; visit{' '}
            <a href="/forums">forums</a> for discussion.
          </>
        }
      />

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        <section id="blog-listing" className="page-x py-12">
          <div className="mx-auto max-w-6xl">
            <div className="page-card mb-10 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/45">Product</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{SITE_NAME}</h2>
                <p className="mt-2 max-w-xl text-sm text-white/55">
                  Spoofer, cheats, and UGC recovery — monthly $35 or lifetime $150 when loader status
                  is Active.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <a
                  href="/store"
                  className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
                >
                  Products store
                </a>
                <a href="/fortnite-spoofer" className="text-sm font-medium text-z-soft hover:text-white">
                  Spoofer page →
                </a>
              </div>
            </div>

            <div className="blog-list-toolbar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h2
                  data-listing-heading
                  data-default-heading="All articles"
                  className="text-xl font-semibold tracking-tight text-white"
                >
                  {q.trim() ? 'Search results' : 'All articles'}
                </h2>
                <p
                  data-listing-count
                  data-count-unit="article"
                  data-count-plural="articles"
                  className="mt-1 text-sm text-white/45"
                >
                  {filtered.length} article{filtered.length === 1 ? '' : 's'}
                </p>
              </div>
              <div className="listing-toolbar__search min-w-0 w-full sm:max-w-md sm:flex-shrink-0 lg:max-w-lg">
                <ListingSearchField
                  id="blog-search"
                  label="Search blog articles"
                  placeholder="Search articles — cheats list, lobby, HWID…"
                  defaultValue={initialQuery}
                  inputRef={inputRef}
                  onInput={onSearchInput}
                />
              </div>
            </div>

            <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((article) => (
                <li
                  key={article.slug}
                  className="min-w-0"
                  data-listing-item
                  data-search={blogSearchHaystack(article)}
                >
                  <BlogArticleCard article={article} />
                </li>
              ))}
            </ul>

            <p
              data-listing-empty
              hidden={filtered.length !== 0}
              className="mt-8 text-center text-sm text-white/55"
            >
              No articles matched your search.
            </p>
          </div>
        </section>

        <InternalLinksSection
          title="Products & tools"
          links={getBlogExploreLinks()}
          className="page-band border-t border-white/10"
        />

        <SiteFooter currentPath="/blog" />
      </main>
    </div>
  )
}
