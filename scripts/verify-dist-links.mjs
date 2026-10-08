/**
 * After build: ensure dist HTML/JS local href/src paths resolve (file exists or valid redirect chain).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const failures = []

function fail(msg) {
  failures.push(msg)
}

function stripTrailingSlash(path) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

function splitHash(path) {
  const [pathname, hash = ''] = path.split('#')
  return { pathname, hash }
}

function parseRedirects(file) {
  const rules = []
  for (const line of file.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const parts = trimmed.split(/\s+/)
    if (parts.length < 2) continue
    const status = parts.at(-1)
    const to = parts.at(-2)
    const from = parts.slice(0, -2).join(' ')
    if (!/^\d+$/.test(status)) continue
    rules.push({ from, to, status: Number(status) })
  }
  return rules
}

function htmlRoutes(directory, base = '') {
  const routes = new Set()
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const r of htmlRoutes(path, `${base}/${entry.name}`)) routes.add(r)
    } else if (entry.name.endsWith('.html')) {
      if (entry.name === '404.html') continue
      if (entry.name === 'index.html') routes.add(stripTrailingSlash(base || '/'))
      else routes.add(stripTrailingSlash(`${base}/${entry.name.slice(0, -5)}`))
    }
  }
  return routes
}

function staticAssetRoutes(directory, base = '') {
  const routes = new Set()
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const r of staticAssetRoutes(path, `${base}/${entry.name}`)) routes.add(r)
    } else if (!entry.name.endsWith('.html')) {
      routes.add(stripTrailingSlash(`${base}/${entry.name}`))
    }
  }
  return routes
}

function lookupRedirect(pathname, redirectMap) {
  return redirectMap.get(pathname)
}

function followRedirects(startPathname, redirectMap, maxHops = 20) {
  let current = startPathname
  const seen = new Set([current])
  for (let hop = 0; hop < maxHops; hop++) {
    const next = lookupRedirect(current, redirectMap)
    if (!next) return stripTrailingSlash(current)
    const { pathname } = splitHash(next)
    const resolved = stripTrailingSlash(pathname)
    if (seen.has(resolved)) return resolved
    seen.add(resolved)
    current = resolved
  }
  return current
}

if (!existsSync(dist)) {
  fail('dist/ missing — run npm run build first')
} else {
  const redirectsRaw = readFileSync(join(root, 'public', '_redirects'), 'utf8')
  const rules = parseRedirects(redirectsRaw)
  const redirectMap = new Map()
  for (const rule of rules) {
    if (rule.from.includes(':slug') || rule.from.includes('*')) continue
    redirectMap.set(rule.from, rule.to)
    redirectMap.set(stripTrailingSlash(rule.from), rule.to)
  }

  const valid = new Set([...htmlRoutes(dist), ...staticAssetRoutes(dist)])
  const assetRe = /(?:href|src)=["'](\/(?!\/)[^"'#?]+)/g

  const files = []
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (/\.(html|js|css|xml)$/.test(entry.name)) files.push(p)
    }
  }
  walk(dist)

  const checked = new Set()
  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    let m
    while ((m = assetRe.exec(text))) {
      let path = m[1]
      if (path.startsWith('//')) continue
      const { pathname } = splitHash(path)
      if (!pathname.startsWith('/')) continue
      if (pathname.startsWith('/checkout')) continue
      if (pathname.length > 1 && pathname.endsWith('/')) {
        fail(`Trailing slash in local URL ${pathname} (in ${relative(root, file)})`)
        continue
      }
      const norm = stripTrailingSlash(pathname)
      const key = `${norm}@${relative(dist, file)}`
      if (checked.has(key)) continue
      checked.add(key)

      const dest = followRedirects(norm, redirectMap)
      if (!valid.has(dest)) {
        fail(`Broken local URL ${norm} → ${dest} (in ${relative(root, file)})`)
      }
    }
  }
}

if (failures.length) {
  console.error(`Dist link verification failed (${failures.length}):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log('Dist link verification passed (href/src resolve in dist/)')
