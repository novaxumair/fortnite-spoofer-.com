/**
 * Downloads Fortnite screenshots from IGN (sm.ign.com) into public/media/fn-* WebP assets.
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mediaDir = join(root, 'public', 'media')

const WEBP = { quality: 92, effort: 6, smartSubsample: true }
const THUMB_JPG = { quality: 90, mozjpeg: true }

/** IGN Fortnite gallery stills — .1400.jpg for source quality */
const IGN_SHOTS = [
  'https://sm.ign.com/t/ign_pk/gallery/f/fortnite-g/fortnite-gameplay-screenshots-2024_s2qs.1400.jpg',
  'https://sm.ign.com/t/ign_in/screenshot/default/fortnite-unreal-engine-5-1-scree-3_bcxh.1400.jpg',
  'https://sm.ign.com/t/ign_in/screenshot/default/fortnite-unreal-engine-5-1-scree-2_uumz.1400.jpg',
  'https://sm.ign.com/t/ign_in/screenshot/default/fortnite-unreal-engine-5-1-scree-1_nhze.1400.jpg',
  'https://sm.ign.com/t/ign_in/screenshot/default/fortnite-unreal-engine-5-1-scree_atku.1400.jpg',
  'https://sm.ign.com/t/ign_ap/gallery/f/fortnite-o/fortnite-og-images_frvt.1400.jpg',
  'https://sm.ign.com/t/ign_ap/photo/default/fortnite-og-1-1920x1080-f246656650c6-1733408108973_mtvr.1400.jpg',
  'https://sm.ign.com/t/ign_ap/photo/default/fortnite-og-2-1920x1080-122347b462ac-1733408108972_1pyu.1400.jpg',
  'https://sm.ign.com/t/ign_ap/photo/default/fortnite-og-3-1920x1080-22a4c244d58a-1733408108972_6f5g.1400.jpg',
  'https://sm.ign.com/t/ign_ap/photo/default/fn-og-c1s1-map-en-1733380624775_3y5h.1400.jpg',
]

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'FortniteSpooferSite/1.0 (media prep; fortnitespoofer.com)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function toWebp(buf, output, resize) {
  let pipe = sharp(buf)
  if (resize) pipe = pipe.resize(resize.width, resize.height, { fit: 'cover', position: 'centre' })
  await pipe.webp(WEBP).toFile(output)
  const meta = await sharp(output).metadata()
  console.log('wrote', output.replace(root, ''), `${meta.width}x${meta.height}`)
}

function removeLegacyD2() {
  if (!existsSync(mediaDir)) return
  for (const name of readdirSync(mediaDir)) {
    if (name.startsWith('d2-')) {
      unlinkSync(join(mediaDir, name))
      console.log('removed legacy', name)
    }
  }
}

async function main() {
  mkdirSync(mediaDir, { recursive: true })
  removeLegacyD2()

  for (let i = 0; i < IGN_SHOTS.length; i++) {
    const n = i + 1
    const buf = await download(IGN_SHOTS[i])
    await toWebp(buf, join(mediaDir, `fn-screenshot-${n}.webp`), { width: 1280, height: 720 })
  }

  const heroBuf = await download(IGN_SHOTS[0])
  await toWebp(heroBuf, join(mediaDir, 'fn-hero-full.webp'), { width: 1400, height: 788 })
  await toWebp(heroBuf, join(mediaDir, 'fn-cover.webp'), { width: 960, height: 540 })
  await toWebp(heroBuf, join(mediaDir, 'fn-ign-cover.webp'), { width: 800, height: 450 })
  await toWebp(heroBuf, join(mediaDir, 'fn-menu.webp'), { width: 640, height: 360 })
  await sharp(heroBuf).resize(1280, 720, { fit: 'cover' }).jpeg(THUMB_JPG).toFile(join(mediaDir, 'fn-video-thumb.jpg'))
  console.log('wrote public/media/fn-video-thumb.jpg')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
