/**
 * Cloudflare Pages deploy (use instead of bare `wrangler deploy`).
 * Dashboard: leave deploy command empty (recommended), or set to `npm run deploy:pages`.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const project =
  process.env.CF_PAGES_PROJECT_NAME ||
  process.env.WRANGLER_PAGES_PROJECT ||
  'fortnite-spoofer-com'

if (!existsSync(dist)) {
  console.error('cf-pages-deploy: dist/ missing — run npm run build first')
  process.exit(1)
}

if (!existsSync(join(dist, 'sitemap.xml'))) {
  console.error('cf-pages-deploy: dist/sitemap.xml missing — run npm run build first')
  process.exit(1)
}
if (existsSync(join(dist, '_routes.json'))) {
  console.error('cf-pages-deploy: dist/_routes.json must not exist (no embedded sitemap routing)')
  process.exit(1)
}
const fnXml = join(root, 'functions', 'sitemap.xml.js')
if (!existsSync(fnXml) || !readFileSync(fnXml, 'utf8').includes('ASSETS.fetch')) {
  console.error('cf-pages-deploy: functions/sitemap.xml.js missing — run npm run build first')
  process.exit(1)
}

const branch = process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7)
const args = [
  'wrangler',
  'pages',
  'deploy',
  'dist',
  `--project-name=${project}`,
  '--commit-dirty=true',
]
if (branch) args.push(`--branch=${branch}`)

console.log(`Pages deploy → ${project} (${dist})`)
execSync(args.join(' '), { stdio: 'inherit', cwd: root, env: process.env })
