/**
 * Ensures fortnitespoofer.com branding and product routes in source.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const failures = []

const REQUIRED_PAGES = [
  'src/pages/store.astro',
  'src/pages/fortnite-spoofer.astro',
  'src/pages/fortnite-cheats.astro',
  'src/pages/ugc-account-recovery.astro',
]

for (const rel of REQUIRED_PAGES) {
  if (!existsSync(join(root, rel))) failures.push(`Missing page: ${rel}`)
}

const siteTs = readFileSync(join(root, 'src', 'data', 'site.ts'), 'utf8')
if (!siteTs.includes('fortnitespoofer.com')) failures.push('site.ts must use fortnitespoofer.com')
if (!siteTs.includes('Fortnite Spoofer')) failures.push('site.ts must use Fortnite Spoofer brand')

const productsTs = readFileSync(join(root, 'src', 'data', 'products.ts'), 'utf8')
const productCount = (productsTs.match(/id: '/g) || []).length
if (productCount < 3) failures.push('products.ts must define three products')

if (failures.length) {
  throw new Error(`Fortnite site verification failed:\n- ${failures.join('\n- ')}`)
}

console.log('Fortnite site verification passed (fortnitespoofer.com)')
