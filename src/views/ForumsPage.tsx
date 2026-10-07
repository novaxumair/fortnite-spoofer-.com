import { useMemo, useState } from 'react'
import { ArrowBigUp, MessageSquare, Shield } from 'lucide-react'
import { ListingPageHero } from '../components/ListingPageHero'
import { ListingSearchField } from '../components/ListingSearchField'
import { SiteFooter } from '../components/SiteFooter'
import { forumPath } from '../data/blog-paths'
import { FORUM_INDEX, FORUM_MODERATORS } from '../data/forum-index'
import { articlePath } from '../data/blog-paths'
import { useListingSearchQuery } from '../hooks/useListingSearchQuery'
import { forumSearchHaystack } from '../lib/listing-search'
import { SITE_HOST, SITE_NAME } from '../data/site'

type ForumsPageProps = {
  initialQuery?: string
}

type SortMode = 'hot' | 'new'

function formatScore(score: number) {
  if (score >= 1000) return `${(score / 1000).toFixed(1)}k`
  return String(score)
}

export function ForumsPage({ initialQuery = '' }: ForumsPageProps) {
  const { inputRef, q, onSearchInput } = useListingSearchQuery(initialQuery)
  const [sort, setSort] = useState<SortMode>('hot')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    let list = term
      ? FORUM_INDEX.filter((b) => {
          const hay = `${b.title} ${b.excerpt} ${b.tag} r/${b.community} ${b.slug}`.toLowerCase()
          return hay.includes(term)
        })
      : [...FORUM_INDEX]

    if (sort === 'hot') {
      list = [...list].sort((a, b) => b.score - a.score)
    } else {
      list = [...list].sort((a, b) => a.slug.localeCompare(b.slug))
    }
    return list
  }, [q, sort])

  const communities = useMemo(() => {
    const map = new Map<string, number>()
    for (const t of FORUM_INDEX) {
      map.set(t.community, (map.get(t.community) ?? 0) + 1)
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <ListingPageHero
        currentPath="/forums"
        eyebrow={<>r/fnspoofer · EAC · Setup · {SITE_HOST}</>}
        title="Fortnite Spoofer Forums"
        description={
          <>
            Reddit-style threads for fortnite spoofer, HWID utilities, and Fortnite cheats —
            moderators, locked archives, and member replies. Long-form guides live on the{' '}
            <a href="/blog">blog</a>.
          </>
        }
      />

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        <section id="forums-listing" className="page-x py-10 sm:py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className="forums-list-toolbar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex shrink-0 rounded-full border border-white/10 bg-black/30 p-1">
                  <button
                    type="button"
                    onClick={() => setSort('hot')}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      sort === 'hot' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white/80'
                    }`}
                  >
                    Hot
                  </button>
                  <button
                    type="button"
                    onClick={() => setSort('new')}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      sort === 'new' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white/80'
                    }`}
                  >
                    New
                  </button>
                </div>
                <div className="listing-toolbar__search min-w-0 w-full sm:max-w-md sm:flex-1 sm:ml-auto lg:max-w-lg">
                  <ListingSearchField
                    id="forums-search"
                    label="Search forum threads"
                    placeholder="Search forums — EAC, HWID, setup…"
                    defaultValue={initialQuery}
                    inputRef={inputRef}
                    onInput={onSearchInput}
                  />
                </div>
              </div>

              <ul className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[rgba(10,6,18,0.85)]">
                {filtered.map((post) => (
                  <li
                    key={post.slug}
                    className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.02]"
                    data-listing-item
                    data-search={forumSearchHaystack(post)}
                  >
                    <a
                      href={forumPath(post.slug)}
                      className="flex gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4"
                      aria-label={`Open forum thread: ${post.title}`}
                    >
                      <div className="flex w-10 shrink-0 flex-col items-center gap-0.5 pt-1 text-white/70">
                        <ArrowBigUp className="h-5 w-5 text-orange-400/90" strokeWidth={1.75} aria-hidden />
                        <span className="text-xs font-bold tabular-nums">{formatScore(post.score)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-snug text-white sm:text-base">
                          {post.title}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
                          <span className="font-medium text-orange-200/80">r/{post.community}</span>
                          <span>·</span>
                          <span>Posted by u/{post.author}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" strokeWidth={2} aria-hidden />
                            {post.commentCount} comments
                          </span>
                          <span>·</span>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                            {post.tag}
                          </span>
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50 sm:text-sm">
                          {post.excerpt}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              <p
                data-listing-empty
                hidden={filtered.length !== 0}
                className="mt-8 text-center text-sm text-white/55"
              >
                No threads matched your search.
              </p>
            </div>

            <aside className="w-full shrink-0 lg:w-72">
              <div className="page-card rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-white/45">About</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{SITE_NAME}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Community forums for Fortnite spoofer and HWID utilities on Windows PC. Threads
                  are moderated; no key reselling or crack links.
                </p>
                <a
                  href="/store"
                  className="cta-gradient mt-4 block rounded-full py-2.5 text-center text-sm font-semibold text-white"
                >
                  Products
                </a>
                <a
                  href="/blog"
                  className="mt-2 block text-center text-sm font-medium text-z-soft hover:text-white"
                >
                  Blog guides →
                </a>
              </div>

              <div className="page-card mt-4 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-white/45">Quick links</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/status" className="text-white/70 hover:text-white">
                      Loader status
                    </a>
                  </li>
                  <li>
                    <a href="/ban-checker" className="text-white/70 hover:text-white">
                      Ban checker
                    </a>
                  </li>
                  <li>
                    <a href={articlePath('how-hwid-bans-work')} className="text-white/70 hover:text-white">
                      How HWID bans work
                    </a>
                  </li>
                </ul>
              </div>

              <div className="page-card mt-4 rounded-2xl p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/45">
                  <Shield className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  Moderators
                </p>
                <ul className="mt-3 space-y-2">
                  {FORUM_MODERATORS.map((mod) => (
                    <li key={mod.name} className="text-sm">
                      <span className="font-semibold text-white">{mod.name}</span>
                      <span className="text-white/45"> · r/{mod.community}</span>
                      <span className="ml-1 rounded bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-100/90">
                        {mod.flair}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="page-card mt-4 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-white/45">Communities</p>
                <ul className="mt-3 space-y-1.5 text-sm text-white/60">
                  {communities.map(([name, count]) => (
                    <li key={name}>
                      <span className="font-medium text-orange-200/85">r/{name}</span>
                      <span className="text-white/40"> — {count} thread{count === 1 ? '' : 's'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <SiteFooter currentPath="/forums" />
      </main>
    </div>
  )
}
