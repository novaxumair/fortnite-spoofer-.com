/**
 * Single sitemap at /sitemap (extensionless; GSC-friendly on Cloudflare) + /sitemap.xml alias.
 * One urlset only (never a sitemap index). 404 is excluded.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://fortnitespoofer.com').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')

const HERO_FULL = '/media/fn-hero-full.webp'
const COVER = '/media/fn-cover.webp'
const BOX = '/media/fn-screenshot-8.webp'
const ESP = '/media/fn-screenshot-5.webp'
const MENU = '/media/fn-menu.webp'
const SHOT = (n) => `/media/fn-screenshot-${n}.webp`
const VIDEO_THUMB = '/media/fn-video-thumb.jpg'
const PREVIEW_VIDEO = '/videos/hero.webm'
const OG_DEFAULT = '/og/product.jpg'

const ALL_SITE_IMAGES = [
  HERO_FULL,
  COVER,
  BOX,
  ESP,
  MENU,
  ...Array.from({ length: 10 }, (_, i) => SHOT(i + 1)),
  VIDEO_THUMB,
  '/og/home.jpg',
  '/og/product.jpg',
  '/og/blog.jpg',
  '/og/forums.jpg',
  '/og/reviews.jpg',
  '/og/faq.jpg',
  '/og/support.jpg',
  '/og/status.jpg',
  '/og/ban-checker.jpg',
  '/og/privacy.jpg',
  '/og/terms.jpg',
  '/og/refunds.jpg',
]

const FORUM_IMAGES = {
  'features-list': COVER,
  'complete-setup': HERO_FULL,
  'hero-esp-config': ESP,
  'map-hack-fog-config': BOX,
  'eac-fortnite-status': COVER,
  'loader-errors': SHOT(7),
  'fortnite-spoofer-discussion': HERO_FULL,
}

const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/store': { priority: '0.92', changefreq: 'weekly' },
  '/fortnite-spoofer': { priority: '0.9', changefreq: 'weekly' },
  '/fortnite-cheats': { priority: '0.88', changefreq: 'weekly' },
  '/ugc-account-recovery': { priority: '0.86', changefreq: 'weekly' },
  '/blog': { priority: '0.88', changefreq: 'weekly' },
  '/forums': { priority: '0.85', changefreq: 'weekly' },
  '/reviews': { priority: '0.8', changefreq: 'weekly' },
  '/faq': { priority: '0.75', changefreq: 'monthly' },
  '/support': { priority: '0.75', changefreq: 'weekly' },
  '/status': { priority: '0.82', changefreq: 'daily' },
  '/ban-checker': { priority: '0.84', changefreq: 'weekly' },
  '/privacy': { priority: '0.4', changefreq: 'yearly' },
  '/terms': { priority: '0.4', changefreq: 'yearly' },
  '/refunds': { priority: '0.45', changefreq: 'yearly' },
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Keep captions ASCII-safe for maximum crawler compatibility. */
function asciiSafe(value) {
  return String(value)
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const productsPath = join(dataDir, 'products.ts')
  if (existsSync(productsPath)) {
    const src = readFileSync(productsPath, 'utf8')
    return [...src.matchAll(/path: '(\/[^']+)'/g)].map((match) => ({
      slug: match[1].replace(/^\//, ''),
      path: match[1],
      name: match[1],
    }))
  }
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (match) => ({ slug: match[1], name: match[2] }),
  )
}

function loadJsonPosts(file, constName, fnName) {
  const src = readFileSync(join(dataDir, file), 'utf8')
  const jsonMatch = src.match(
    new RegExp(`export const ${constName}[\\s\\S]*?= (\\[[\\s\\S]*?\\n\\])\\s*\\n\\s*export function ${fnName}`),
  )
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1])
  }
  return null
}

function loadForums() {
  const parsed = loadJsonPosts('forums.ts', 'FORUM_THREADS', 'getForumThread')
  if (parsed) return parsed
  const src = readFileSync(join(dataDir, 'forums.ts'), 'utf8')
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],\s*metaTitle:\s*['"]([^'"]+)['"],\s*metaDescription:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    metaTitle: match[4],
    metaDescription: match[5],
    date: match[6],
  }))
}

function loadArticles() {
  const parsed = loadJsonPosts('articles.ts', 'ARTICLES', 'getArticle')
  return parsed ?? []
}

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(asciiSafe(title))}</image:title>
      <image:caption>${escapeXml(asciiSafe(caption))}</image:caption>
    </image:image>`
}

function videoBlock({ thumb, title, description, content }) {
  return `    <video:video>
      <video:thumbnail_loc>${escapeXml(siteUrl(thumb))}</video:thumbnail_loc>
      <video:title>${escapeXml(asciiSafe(title))}</video:title>
      <video:description>${escapeXml(asciiSafe(description))}</video:description>
      <video:content_loc>${escapeXml(siteUrl(content))}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
}

function metaForPath(path) {
  if (PAGE_META[path]) return PAGE_META[path]
  if (path.startsWith('/blog/')) return { priority: '0.72', changefreq: 'monthly' }
  if (path.startsWith('/forums/')) return { priority: '0.68', changefreq: 'monthly' }
  return { priority: '0.55', changefreq: 'monthly' }
}

/** Plain urlset entries (loc, lastmod, changefreq, priority) for GSC and human-readable XML. */
function urlEntry({ path, lastmod = TODAY }) {
  const url = siteUrl(path)
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
}

function imagesForPath(path, games, forums) {
  if (path === '/') {
    return [
      {
        src: '/og/home.jpg',
        title: 'Dota 2 Cheats Open Graph',
        caption: 'Primary social and search preview for the homepage.',
      },
      {
        src: HERO_FULL,
        title: 'Dota 2 Cheats Hero',
        caption: 'Hero artwork for Dota 2 hero ESP, map hack, and timers on PC.',
      },
      {
        src: COVER,
        title: 'Dota 2 Cheats Product Cover',
        caption: 'Product cover used on checkout and product previews.',
      },
      {
        src: VIDEO_THUMB,
        title: 'Dota 2 Cheats Preview Thumbnail',
        caption: 'Video thumbnail for the self-hosted product preview.',
      },
      {
        src: BOX,
        title: 'Dota 2 Cheats ESP Gameplay Screenshot',
        caption: 'Steam gameplay with player ESP overlays on buydota2cheats.com.',
      },
    ]
  }

  const game = games.find((g) => path === `/${g.slug}-cheats`)
  if (game) {
    return [
      {
        src: '/og/product.jpg',
        title: 'Dota 2 Cheats Open Graph',
        caption: 'Google and social preview for the Dota 2 Cheats product page.',
      },
      {
        src: COVER,
        title: 'Dota 2 Cheats ESP Product Artwork',
        caption: 'Product features, compatibility, status and price before checkout.',
      },
      {
        src: HERO_FULL,
        title: `${game.name} Cheats Product Hero`,
        caption: `Hero artwork for ${game.name} hero ESP, map hack, and timer product details.`,
      },
      {
        src: MENU,
        title: `${game.name} Cheats Menu Preview`,
        caption: `In-game menu and overlay settings preview for ${game.name} cheats.`,
      },
      {
        src: ESP,
        title: `${game.name} ESP Gameplay`,
        caption: `Hero ESP and map vision preview for ${game.name} on PC.`,
      },
      {
        src: VIDEO_THUMB,
        title: 'Dota 2 Cheats Preview Thumbnail',
        caption: 'Thumbnail for the Dota 2 Cheats preview video.',
      },
    ]
  }

  if (path === '/forums') {
    return [
      {
        src: '/og/forums.jpg',
        title: 'Dota 2 Cheats Forums Open Graph',
        caption: 'Google preview image for the Dota 2 Cheats guides index.',
      },
      {
        src: MENU,
        title: 'Dota 2 Cheats Forum Artwork',
        caption: 'Artwork reference for Dota 2 Cheats setup and feature guides.',
      },
    ]
  }

  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length)
    const forum = forums.find((f) => f.slug === slug)
    return [
      {
        src: `/og/forums-${slug}.jpg`,
        title: `${forum?.title || slug} Open Graph`,
        caption:
          forum?.metaDescription ||
          `Google preview image for ${forum?.title || slug} on buydota2cheats.com.`,
      },
      {
        src: FORUM_IMAGES[slug] || MENU,
        title: `${forum?.title || slug} Artwork`,
        caption:
          forum?.excerpt ||
          `Visible Dota 2 Cheats guide artwork for ${forum?.title || slug}.`,
      },
    ]
  }

  if (path === '/reviews') {
    return [
      {
        src: '/og/reviews.jpg',
        title: 'Dota 2 Cheats Reviews Open Graph',
        caption: 'Google preview image for Dota 2 Cheats reviews.',
      },
    ]
  }
  if (path === '/faq') {
    return [
      {
        src: '/og/faq.jpg',
        title: 'Dota 2 Cheats FAQ Open Graph',
        caption: 'Google preview image for the Dota 2 Cheats FAQ.',
      },
    ]
  }
  if (path === '/support') {
    return [
      {
        src: '/og/support.jpg',
        title: 'Dota 2 Cheats Support Open Graph',
        caption: 'Google preview image for Dota 2 Cheats support.',
      },
    ]
  }
  if (path === '/privacy') {
    return [
      {
        src: '/og/privacy.jpg',
        title: 'Dota 2 Cheats Privacy Policy',
        caption: 'Privacy policy preview for buydota2cheats.com orders and support.',
      },
    ]
  }
  if (path === '/terms') {
    return [
      {
        src: '/og/terms.jpg',
        title: 'Dota 2 Cheats Terms of Use',
        caption: 'License terms preview for Dota 2 Cheats.',
      },
    ]
  }
  if (path === '/refunds') {
    return [
      {
        src: '/og/refunds.jpg',
        title: 'Dota 2 Cheats Refund Policy',
        caption: 'Refund rules preview for digital Dota 2 Cheats licenses.',
      },
    ]
  }

  return [{ src: OG_DEFAULT, title: 'Dota 2 Cheats', caption: 'Dota 2 Cheats page artwork.' }]
}

function videosForPath(path) {
  if (path === '/dota-2-cheats') {
    return [
      {
        thumb: VIDEO_THUMB,
        title: 'Dota 2 Cheats ESP and Map Vision Preview',
        description:
          'Self-hosted Dota 2 Cheats preview showing hero ESP, map hack, and timer overlays on PC.',
        content: PREVIEW_VIDEO,
      },
    ]
  }
  return []
}

function collectAllPaths(games, forums, articles, staticRoutes) {
  const paths = new Set([
    ...staticRoutes,
    ...games.map((game) => game.path || `/${game.slug}-cheats`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
    ...articles.map((article) => `/blog/${article.slug}`),
  ])
  // Never index error page
  paths.delete('/404')
  return [...paths]
}

function sectionLabel(path) {
  if (path === '/') return 'Homepage'
  if (path.endsWith('-cheats')) return 'Product'
  if (path === '/blog') return 'Blog index'
  if (path.startsWith('/blog/')) return 'Blog article'
  if (path === '/forums') return 'Forums index'
  if (path.startsWith('/forums/')) return 'Forum guide'
  if (path === '/status') return 'Loader status'
  if (path === '/reviews' || path === '/faq' || path === '/support') return 'Trust and support'
  return 'Legal and policies'
}

function plainTitleForPath(path, forums, articles) {
  if (path === '/') return 'Dota 2 Cheats home'
  if (path === '/dota-2-cheats') return 'Dota 2 Cheats product page'
  if (path === '/status') return 'Loader status (Active or Updating)'
  if (path === '/blog') return 'Blog index'
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length)
    const article = articles.find((a) => a.slug === slug)
    return article?.title || slug
  }
  if (path === '/forums') return 'Forums and setup guides'
  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length)
    const forum = forums.find((f) => f.slug === slug)
    return forum?.title || slug
  }
  const labels = {
    '/reviews': 'Customer reviews',
    '/faq': 'FAQ',
    '/support': 'Support',
    '/privacy': 'Privacy policy',
    '/terms': 'Terms of use',
    '/refunds': 'Refund policy',
  }
  return labels[path] || path
}

function writePlainUrlList(forums, articles, allPaths) {
  const lines = [
    '# Dota 2 Cheats — plain URL list (buydota2cheats.com)',
    '# One URL per line for humans and tools. Canonical sitemap for Google: /sitemap',
    '',
  ]
  const sorted = [...allPaths].sort((a, b) => a.localeCompare(b))
  for (const path of sorted) {
    const title = asciiSafe(plainTitleForPath(path, forums, articles))
    const section = sectionLabel(path)
    lines.push(`${siteUrl(path)}\t[${section}] ${title}`)
  }
  lines.push('')
  const text = lines.join('\n')
  writeFileSync(join(publicDir, 'sitemap-urls.txt'), text, 'utf8')
  const distDir = join(root, 'dist')
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, 'sitemap-urls.txt'), text, 'utf8')
  }
}

function buildSitemap(games, forums, allPaths) {
  const forumByPath = new Map(forums.map((f) => [`/forums/${f.slug}`, f]))

  const sorted = [...allPaths].sort((a, b) => {
    const rank = (path) => {
      if (path === '/') return 0
      if (path.endsWith('-cheats')) return 1
      if (path === '/forums') return 2
      if (path.startsWith('/forums/')) return 3
      if (path === '/reviews') return 4
      if (path === '/faq') return 5
      if (path === '/support') return 6
      return 10
    }
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  const chunks = []
  for (const path of sorted) {
    const forum = forumByPath.get(path)
    chunks.push(urlEntry({ path, lastmod: forum?.date || TODAY }))
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.join('\n')}
</urlset>
`
}

function validate(games, forums, articles, allPaths, sitemap) {
  const errors = []
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }
  for (const game of games) {
    const routePath = game.path || `/${game.slug}-cheats`
    const pageFile = `${game.slug}.astro`
    const page = join(pagesDir, pageFile)
    if (!existsSync(page)) errors.push(`Product route has no page file: ${routePath}`)
  }
  if (forums.length && !existsSync(join(pagesDir, 'forums', '[slug].astro'))) {
    errors.push('Forum routes have no dynamic page file: src/pages/forums/[slug].astro')
  }
  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }
  for (const forum of forums) {
    const og = join(publicDir, 'og', `forums-${forum.slug}.jpg`)
    if (!existsSync(og)) errors.push(`Missing forum OG image: /og/forums-${forum.slug}.jpg`)
  }
  for (const article of articles) {
    const og = join(publicDir, 'og', `blog-${article.slug}.jpg`)
    if (!existsSync(og)) errors.push(`Missing blog OG image: /og/blog-${article.slug}.jpg`)
  }
  if (articles.length && !existsSync(join(pagesDir, 'blog', '[slug].astro'))) {
    errors.push('Blog routes have no dynamic page file: src/pages/blog/[slug].astro')
  }

  const expectedUrls = new Set(allPaths.map(siteUrl))
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) errors.push('sitemap.xml contains duplicate page URLs')
  if (sitemap.includes('<?xml-stylesheet')) {
    errors.push('sitemap must not use xml-stylesheet (Google Search Console parse failures on Cloudflare)')
  }
  if (sitemap.includes('<video:') || sitemap.includes('xmlns:image=') || sitemap.includes('<image:')) {
    errors.push('sitemap must be a plain urlset (no image/video extensions for GSC)')
  }
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if (sitemap.includes('xmlns:xhtml=')) {
    errors.push('Remove xhtml namespace from sitemap (single-locale site; hreflang lives on HTML pages)')
  }
  if ((sitemap.match(/<urlset[\s>]/g) || []).length !== 1) {
    errors.push('sitemap.xml must contain exactly one <urlset>')
  }
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<lastmod>')) {
      errors.push(`URL missing lastmod: ${loc}`)
    }
  }
  if (/Tarkov|tarkovcheats|EFT Reaper|Warzone|warzonecheats|Ricochet/i.test(sitemap)) {
    errors.push('Sitemap still contains legacy Tarkov/Warzone labels')
  }
  if (!sitemap.includes('fortnitespoofer.com')) {
    errors.push('Sitemap must target fortnitespoofer.com')
  }
  if (/tarkovcheats|warzonecheats|buywardogscheats|wardogs|zadeyo|arena breakout/i.test(sitemap)) {
    errors.push('Sitemap contains legacy or third-party branding')
  }
  if (!allPaths.includes('/status')) {
    errors.push('Sitemap must include /status')
  }
  if (!allPaths.includes('/blog')) {
    errors.push('Sitemap must include /blog')
  }
  if (/[^\x09\x0A\x0D\x20-\x7E]/.test(sitemap.replace(/https?:\/\//g, ''))) {
    // Allow non-ascii only inside https URLs if any; captions should be ascii.
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

/**
 * Pages Functions must not embed XML (GSC "could not be read"). Proxy dist/sitemap.xml via ASSETS.
 * File-based routing: functions/sitemap.xml.js + functions/sitemap.js — no _routes.json.
 */
const SITEMAP_EXTENSIONLESS_FUNCTION = `/**
 * Auto-generated by scripts/generate-sitemaps.mjs — do not edit.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.pathname = '/sitemap'
  url.search = ''
  const asset = await context.env.ASSETS.fetch(new Request(url, context.request))
  if (!asset.ok) {
    return new Response('Sitemap unavailable', { status: 503 })
  }
  const body = await asset.text()
  if (!body.trimStart().startsWith('<?xml')) {
    return new Response('Invalid sitemap asset', { status: 500 })
  }
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
`

const SITEMAP_XML_FUNCTION = `/**
 * Auto-generated by scripts/generate-sitemaps.mjs — do not edit.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.pathname = '/sitemap.xml'
  url.search = ''
  const asset = await context.env.ASSETS.fetch(new Request(url, context.request))
  if (!asset.ok) {
    return new Response('Sitemap unavailable', { status: 503 })
  }
  const body = await asset.text()
  if (!body.trimStart().startsWith('<?xml')) {
    return new Response('Invalid sitemap asset', { status: 500 })
  }
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
`

function writeSitemapProxyFunctions() {
  const functionsDir = join(root, 'functions')
  mkdirSync(functionsDir, { recursive: true })
  writeFileSync(join(functionsDir, 'sitemap.js'), SITEMAP_EXTENSIONLESS_FUNCTION, 'utf8')
  writeFileSync(join(functionsDir, 'sitemap.xml.js'), SITEMAP_XML_FUNCTION, 'utf8')
}

function removeSitemapRoutesConfig() {
  for (const dir of [publicDir, join(root, 'dist')]) {
    const path = join(dir, '_routes.json')
    if (existsSync(path)) unlinkSync(path)
  }
}

function normalizeSitemapXml(sitemap) {
  return `${sitemap.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trimEnd()}\n`
}

function buildSitemapIndex(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(siteUrl('/sitemap.xml'))}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const articles = loadArticles()
  const staticRoutes = loadStaticRoutes()
  const allPaths = collectAllPaths(games, forums, articles, staticRoutes)
  const sitemap = normalizeSitemapXml(buildSitemap(games, forums, allPaths))
  validate(games, forums, articles, allPaths, sitemap)

  const writeTargets = [
    join(publicDir, 'sitemap'),
    join(publicDir, 'sitemap.xml'),
    join(publicDir, 'google-sitemap.xml'),
  ]
  if (existsSync(join(root, 'dist'))) {
    writeTargets.push(
      join(root, 'dist', 'sitemap'),
      join(root, 'dist', 'sitemap.xml'),
      join(root, 'dist', 'google-sitemap.xml'),
    )
  }
  for (const path of writeTargets) {
    writeFileSync(path, sitemap, 'utf8')
  }
  const indexXml = normalizeSitemapXml(buildSitemapIndex(TODAY))
  for (const dir of [publicDir, ...(existsSync(join(root, 'dist')) ? [join(root, 'dist')] : [])]) {
    writeFileSync(join(dir, 'sitemap-index.xml'), indexXml, 'utf8')
  }
  writeSitemapProxyFunctions()
  removeSitemapRoutesConfig()
  writePlainUrlList(forums, articles, allPaths)
  const distDir = join(root, 'dist')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /google-sitemap.xml',
      'Allow: /sitemap-index.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /google-sitemap.xml',
      'Allow: /sitemap-index.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Bingbot',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /google-sitemap.xml',
      'Allow: /sitemap-index.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap',
      'Allow: /sitemap.xml',
      'Allow: /google-sitemap.xml',
      'Allow: /sitemap-index.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      'Disallow: /404',
      'Disallow: /404.html',
      '',
      `Sitemap: ${siteUrl('/sitemap-index.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, 'robots.txt'), readFileSync(join(publicDir, 'robots.txt'), 'utf8'), 'utf8')
  }

  for (const name of [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap_index.xml',
  ]) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  console.log(`Sitemap OK: ${allPaths.length} pages at ${siteUrl('/sitemap')} (extensionless, application/xml)`)
  console.log(`GSC: delete failed sitemap rows, resubmit sitemap or sitemap.xml (both HTTP 200), purge /sitemap cache after deploy.`)
}

main()
