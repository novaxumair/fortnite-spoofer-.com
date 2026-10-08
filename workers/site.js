/**
 * Worker entry for Astro static output in ./dist.
 * IMPORTANT: Always fetch assets via https://assets.local — never the request
 * hostname — or Cloudflare returns HTTP 522 on custom domains.
 *
 * Canonical host is apex (no www). Always 301 www → apex so crawlers never
 * see duplicate content or mismatched canonical/hreflang on www.
 */
function assetsFetch(env, request, pathname) {
  return env.ASSETS.fetch(new Request(new URL(pathname, 'https://assets.local'), request))
}

/**
 * Astro `trailingSlash: 'never'` — serve `/page` via `/page/index.html` without a 308 to `/page/`.
 */
async function fetchStatic(env, request, url) {
  const pathname = url.pathname
  const search = url.search

  if (pathname === '/' || pathname.includes('.')) {
    return assetsFetch(env, request, pathname + search)
  }

  const bare = pathname.replace(/\/+$/, '') || '/'
  if (bare !== '/') {
    const indexRes = await assetsFetch(env, request, `${bare}/index.html${search}`)
    if (indexRes.ok) return indexRes
  }

  return assetsFetch(env, request, pathname + search)
}

function withHtmlCharset(response) {
  const contentType = response.headers.get('content-type') || ''
  const primary = contentType.split(',')[0].trim()
  if (!primary.toLowerCase().startsWith('text/html')) return response
  if (/charset=/i.test(primary)) {
    if (contentType.includes(',')) {
      const headers = new Headers(response.headers)
      headers.set('content-type', primary)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }
    return response
  }
  const headers = new Headers(response.headers)
  headers.set('content-type', 'text/html; charset=utf-8')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/** Prefer apex: https://www.example.com/path → https://example.com/path */
function toApexUrl(url) {
  const host = url.hostname.toLowerCase()
  if (!host.startsWith('www.')) return null
  const next = new URL(url.toString())
  next.hostname = host.slice(4)
  next.protocol = 'https:'
  return next
}

async function serveSitemap(env, request, pathname) {
  const assetPath =
    pathname === '/sitemap' ? '/sitemap' : pathname === '/google-sitemap.xml' ? '/google-sitemap.xml' : '/sitemap.xml'
  const asset = await assetsFetch(env, request, assetPath)
  if (!asset.ok) {
    return new Response('Sitemap unavailable', { status: 503 })
  }
  const body = await asset.text()
  if (!body.trimStart().startsWith('<?xml')) {
    return new Response('Invalid sitemap', { status: 500 })
  }
  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}

async function serveSitemapIndex(env, request) {
  const asset = await assetsFetch(env, request, '/sitemap-index.xml')
  if (!asset.ok) {
    return new Response('Sitemap index unavailable', { status: 503 })
  }
  const body = await asset.text()
  if (!body.includes('<sitemapindex')) {
    return new Response('Invalid sitemap index', { status: 500 })
  }
  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}

const SITEMAP_PATHS = new Set(['/sitemap', '/sitemap.xml', '/google-sitemap.xml'])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/sitemap-index.xml') {
      return serveSitemapIndex(env, request)
    }

    if (SITEMAP_PATHS.has(url.pathname)) {
      return serveSitemap(env, request, url.pathname)
    }

    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      const apex = toApexUrl(url)
      return Response.redirect((apex || url).toString(), 301)
    }

    const apex = toApexUrl(url)
    if (apex) {
      return Response.redirect(apex.toString(), 301)
    }

    // One URL per page: /path/ → /path (matches HTML canonical + sitemap <loc>)
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      const bare = new URL(url.toString())
      bare.pathname = url.pathname.replace(/\/+$/, '')
      return Response.redirect(bare.toString(), 301)
    }

    const assetResponse = await fetchStatic(env, request, url)
    let response = withHtmlCharset(assetResponse)

    // Help crawlers + Seobility: advertise preferred host + self-canonical
    const headers = new Headers(response.headers)
    if (!headers.has('Strict-Transport-Security')) {
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    }
    const contentType = headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const canonical = `https://${url.hostname}${url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '') || '/'}`
      const existing = headers.get('Link')
      const linkCanonical = `<${canonical}>; rel="canonical"`
      headers.set('Link', existing ? `${existing}, ${linkCanonical}` : linkCanonical)
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
