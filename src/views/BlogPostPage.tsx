import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { InternalLinksSection } from '../components/InternalLinksSection'
import { forumPath, getForumThread, getRelatedForumThreads } from '../data/forums'
import { getForumExploreLinks } from '../data/internal-links'
import { CheckoutLink } from '../components/CheckoutLink'
import { SeoMedia } from '../components/SeoMedia'
import { SITE_HOST } from '../data/site'
import { getForumMedia } from '../data/media'
import { getForumReplies } from '../data/forum-replies'
import { NotFoundPage } from './NotFoundPage'

type BlogPostPageProps = {
  slug: string
}

function sectionId(heading: string) {
  return heading
    .replace(/^\d+\)\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = getForumThread(slug)

  if (!post) return <NotFoundPage />

  const related = getRelatedForumThreads(post.slug, 6)
  const replies = getForumReplies(post.slug)

  function replyKey(reply: (typeof replies)[number], index: number) {
    return `${reply.author}-${reply.date}-${index}`
  }

  function isStaffReply(role: (typeof replies)[number]['role']) {
    return role === 'editor' || role === 'moderator'
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar currentPath={`/forums/${slug}`} />
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
              <a href="/forums" className="hover:text-white/70">
                Forums
              </a>
              <span>/</span>
              <span className="text-white/70">r/{post.community}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                u/{post.author} · r/{post.community} · {post.date}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-100/90">
                <Lock className="h-3 w-3" strokeWidth={2} aria-hidden />
                Read-only
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              {post.excerpt}
            </p>

            <SeoMedia media={getForumMedia(post.slug)} className="mt-8" showVideo={false} />

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
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

            {replies.length > 0 ? (
              <section className="mt-12" aria-labelledby="forum-replies-heading">
                <h2
                  id="forum-replies-heading"
                  className="text-lg font-semibold tracking-tight text-white sm:text-xl"
                >
                  Thread replies ({replies.length})
                </h2>
                <p className="mt-2 text-xs text-white/40">
                  Locked archive — highlighted posts are from staff. New replies are disabled.
                </p>
                <ul className="mt-5 space-y-4">
                  {replies.map((reply, index) => {
                    const staff = isStaffReply(reply.role)
                    return (
                      <li
                        key={replyKey(reply, index)}
                        className={`page-card rounded-2xl p-5 ${
                          staff
                            ? 'border border-amber-400/30 bg-amber-400/[0.07] ring-1 ring-amber-400/15'
                            : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-white">{reply.author}</p>
                            {staff ? (
                              <span className="rounded-md bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-100/95">
                                {reply.role === 'editor' ? 'Editor' : 'Moderator'}
                              </span>
                            ) : null}
                          </div>
                          <time className="text-xs text-white/40" dateTime={reply.date}>
                            {reply.date}
                          </time>
                        </div>
                        {reply.replyToAuthor ? (
                          <p className="mt-2 text-xs font-medium text-amber-100/75">
                            Replying to @{reply.replyToAuthor}
                          </p>
                        ) : null}
                        <p className={`mt-2 text-sm leading-relaxed ${staff ? 'text-white/75' : 'text-white/60'}`}>
                          {reply.body}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ) : null}

            <div className="page-card mt-12 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">
                Ready for Fortnite Spoofer?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Check{' '}
                <a href="/status" className="text-z-soft hover:text-white">
                  loader status
                </a>{' '}
                on {SITE_HOST}, then visit the{' '}
                <a href="/store" className="text-z-soft hover:text-white">
                  products store
                </a>{' '}
                or{' '}
                <a href="/blog" className="text-z-soft hover:text-white">
                  blog guides
                </a>
                .
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/fortnite-spoofer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  Spoofer details
                </a>
                <a
                  href="/support"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  Support
                </a>
                <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white">
                  Checkout
                </CheckoutLink>
              </div>
            </div>

            <a
              href="/forums"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              All forum threads
            </a>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                More forum threads
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((b) => (
                  <a
                    key={b.slug}
                    href={forumPath(b.slug)}
                    className="page-card group flex h-full flex-col rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-wider text-white/40">{b.tag}</p>
                      <Lock className="h-3 w-3 shrink-0 text-amber-100/70" strokeWidth={2} aria-hidden />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-white/85">
                      {b.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-white/50">
                      {b.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/70">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <InternalLinksSection title="From forums to products" links={getForumExploreLinks()} className="page-band" />

        <SiteFooter currentPath={forumPath(post.slug)} />
      </main>
    </div>
  )
}
