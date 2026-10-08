/**
 * Cloudflare Worker deploy (static assets in dist/ + workers/site.js).
 * Dashboard: Build = npm run build  |  Deploy = npm run deploy:worker
 *
 * Invokes wrangler.js directly (never the postinstall .bin shim) so CI does not hang.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const config = join(root, 'wrangler.worker.toml')
const workerEntry = join(root, 'workers', 'site.js')
const wranglerJs = join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js')

function fail(msg) {
  console.error(`cf-worker-deploy: ${msg}`)
  process.exit(1)
}

if (!existsSync(wranglerJs)) fail('wrangler not installed — run npm ci first')
if (!existsSync(config)) fail('wrangler.worker.toml missing')
if (!existsSync(workerEntry)) fail('workers/site.js missing')
if (!existsSync(dist)) fail('dist/ missing — run npm run build first')
if (!existsSync(join(dist, 'sitemap'))) fail('dist/sitemap missing — run npm run build first')
if (!existsSync(join(dist, 'sitemap.xml'))) fail('dist/sitemap.xml missing — run npm run build first')
if (!existsSync(join(dist, 'google-sitemap.xml'))) fail('dist/google-sitemap.xml missing — run npm run build first')

const onCloudflareBuild =
  process.cwd().includes('buildhome') ||
  Boolean(process.env.CF_PAGES || process.env.WORKERS_CI || process.env.CF_BUILD_URL)

const hasToken = Boolean(
  process.env.CLOUDFLARE_API_TOKEN ||
    process.env.CF_API_TOKEN ||
    process.env.CLOUDFLARE_AUTH_TOKEN,
)

if (onCloudflareBuild && !hasToken) {
  console.warn(
    'cf-worker-deploy: CLOUDFLARE_API_TOKEN not in env — link an API token in Workers Builds (Workers Scripts Edit) or deploy may hang/fail',
  )
}

// Build already ran in dashboard (wrangler.worker.toml has no [build] — Wrangler 4 has no --no-build).
const wranglerArgs = ['deploy', '-c', 'wrangler.worker.toml']

console.log(`Worker deploy → fortnite-spoofer--com (${dist})`)
console.log(`cf-worker-deploy: node wrangler.js ${wranglerArgs.join(' ')}`)

const env = {
  ...process.env,
  WRANGLER_SEND_METRICS: 'false',
  CI: 'true',
  FORCE_COLOR: '1',
}

const result = spawnSync(process.execPath, [wranglerJs, ...wranglerArgs], {
  cwd: root,
  stdio: 'inherit',
  env,
  timeout: 20 * 60 * 1000,
})

if (result.error) {
  console.error(result.error.message || result.error)
  process.exit(1)
}

if (result.signal) {
  console.error(`cf-worker-deploy: wrangler killed (${result.signal})`)
  process.exit(1)
}

process.exit(result.status ?? 1)
