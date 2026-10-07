/**
 * Builds 1200x630 OG JPEGs and per-forum / per-blog OG images from first-party screenshots.
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')

mkdirSync(ogDir, { recursive: true })

const gameCover = join(mediaDir, 'fn-ign-cover.webp')
const cover = existsSync(gameCover) ? gameCover : join(mediaDir, 'fn-cover.webp')
const hero = join(mediaDir, 'fn-hero-full.webp')
const menu = join(mediaDir, 'fn-menu.webp')
const shot = (n) => join(mediaDir, `fn-screenshot-${n}.webp`)

async function ogFrom(src, outName, title) {
  const input = existsSync(src) ? src : cover
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(ogDir, outName))
  return title
}

const pages = [
  ['home.jpg', hero, 'Fortnite Spoofer'],
  ['product.jpg', cover, 'Fortnite Spoofer Store'],
  ['forums.jpg', shot(4), 'Fortnite Spoofer Forums'],
  ['blog.jpg', shot(5), 'Fortnite Spoofer Blog'],
  ['reviews.jpg', shot(2), 'Fortnite Spoofer Reviews'],
  ['faq.jpg', shot(8), 'Fortnite Spoofer FAQ'],
  ['support.jpg', shot(6), 'Fortnite Spoofer Support'],
  ['status.jpg', shot(6), 'Fortnite Spoofer Status'],
  ['privacy.jpg', menu, 'Privacy Policy'],
  ['terms.jpg', menu, 'Terms of Use'],
  ['refunds.jpg', menu, 'Refund Policy'],
]

for (const [name, src, title] of pages) {
  await ogFrom(src, name, title)
}

function loadJsonArray(file, constName) {
  const src = readFileSync(join(root, 'src', 'data', file), 'utf8')
  const jsonMatch = src.match(
    new RegExp(`export const ${constName}[\\s\\S]*?= (\\[[\\s\\S]*?\\n\\])\\s*\\n\\s*export function`),
  )
  return jsonMatch ? JSON.parse(jsonMatch[1]) : []
}

const forums = loadJsonArray('forums.ts', 'FORUM_THREADS')
const articles = loadJsonArray('articles.ts', 'ARTICLES')

for (const forum of forums) {
  let h = 0
  for (let i = 0; i < forum.slug.length; i++) h = (h * 31 + forum.slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 10)
  await ogFrom(shot(n), `forums-${forum.slug}.jpg`, forum.title)
}

for (const article of articles) {
  let h = 0
  for (let i = 0; i < article.slug.length; i++) h = (h * 31 + article.slug.charCodeAt(i)) >>> 0
  const n = 1 + (h % 10)
  await ogFrom(shot(n), `blog-${article.slug}.jpg`, article.title)
}

console.log(
  `OG images: ${pages.length} pages + ${forums.length} forum threads + ${articles.length} blog articles`,
)
