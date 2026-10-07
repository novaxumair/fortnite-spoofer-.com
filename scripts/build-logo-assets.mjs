import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const srcCandidates = [
  process.argv[2],
  `${publicDir}brand/logo-source.png`,
  `${publicDir}brand/logo-source.jpg`,
  `${publicDir}brand/new logo navbar logo and favicon.png`,
  `${publicDir}brand/new logo navbar logo and favicon.jpg`,
  `${publicDir}brand/navbar logo and favicon.webp`,
  `${publicDir}brand/navbar logo and favicon.jpg`,
].filter(Boolean)
const src = srcCandidates.find((p) => existsSync(p))
if (!src) {
  throw new Error(`Logo source not found. Add public/brand/logo-source.png`)
}

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b)
}

function neutralSpread(r, g, b) {
  return Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b))
}

/** Flat grey/white checkerboard tiles (r≈g≈b). Coin metal has a slight blue/cyan tint. */
function isCheckerboardPixel(r, g, b) {
  const ch = chroma(r, g, b)
  if (ch > 8) return false
  if (neutralSpread(r, g, b) > 8) return false
  const lum = luminance(r, g, b)
  return lum >= 52 && lum <= 255
}

/** Pixels that belong to the mark (coins, dark shields, white type). Checker tiles are never foreground. */
function isLogoForegroundPixel(r, g, b) {
  if (isCheckerboardPixel(r, g, b)) return false
  const lum = luminance(r, g, b)
  const ch = chroma(r, g, b)
  const neutral = neutralSpread(r, g, b)
  if (ch > 28) return true
  if (b > r + 3 && lum > 60) return true
  if (g > r + 10 && b > r + 8) return true
  if (lum <= 95 && neutral <= 28) return true
  if (lum >= 188 && neutral <= 18) return true
  return false
}

function isBackdropPixel(r, g, b, a = 255, checkerSamples = []) {
  if (a < 12) return true
  if (isCheckerboardPixel(r, g, b)) return true
  for (const [cr, cg, cb] of checkerSamples) {
    const d = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2)
    if (d <= 14 && chroma(r, g, b) <= 10) return true
  }
  return false
}

function sampleCheckerColors(data, width, height) {
  const buckets = new Map()
  const edge = (x, y) => {
    const i = (y * width + x) * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (chroma(r, g, b) > 10) return
    const key = `${Math.round(r / 8) * 8},${Math.round(g / 8) * 8},${Math.round(b / 8) * 8}`
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }
  for (let x = 0; x < width; x++) {
    edge(x, 0)
    edge(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    edge(0, y)
    edge(width - 1, y)
  }
  return [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key]) => key.split(',').map(Number))
}

function floodClearBackground(data, width, height, checkerSamples) {
  const visited = new Uint8Array(width * height)
  const queue = []

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const pi = y * width + x
    if (visited[pi]) return
    visited[pi] = 1
    queue.push(pi)
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (queue.length > 0) {
    const pi = queue.pop()
    const x = pi % width
    const y = (pi - x) / width
    const i = pi * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    if (!isBackdropPixel(r, g, b, a, checkerSamples)) continue

    data[i + 3] = 0

    push(x + 1, y)
    push(x - 1, y)
    push(x, y + 1)
    push(x, y - 1)
  }

  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        if (data[i + 3] === 0) continue
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        let bgNeighbors = 0
        for (const [nx, ny] of [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ]) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
          const ni = (ny * width + nx) * 4
          if (data[ni + 3] === 0) bgNeighbors++
        }
        if (
          bgNeighbors >= 2 &&
          isBackdropPixel(r, g, b, data[i + 3], checkerSamples)
        ) {
          data[i + 3] = 0
        }
      }
    }
  }
}

function touchesTransparent(data, width, height, x, y) {
  for (const [nx, ny] of [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
    const ni = (ny * width + nx) * 4
    if (data[ni + 3] === 0) return true
  }
  return false
}

function removeHalos(data, width, height, checkerSamples) {
  for (let pass = 0; pass < 6; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        if (data[i + 3] === 0) continue
        if (!touchesTransparent(data, width, height, x, y)) continue

        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const lum = luminance(r, g, b)
        const ch = chroma(r, g, b)

        const peelBackdrop = isBackdropPixel(r, g, b, data[i + 3], checkerSamples)

        if (peelBackdrop) {
          data[i + 3] = 0
          changed = true
        }
      }
    }
    if (!changed) break
  }
}

function cleanFringeAlpha(data, width, height, checkerSamples) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const a = data[i + 3]
      if (a === 0 || a === 255) continue
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (isBackdropPixel(r, g, b, a, checkerSamples)) {
        data[i + 3] = 0
      } else if (touchesTransparent(data, width, height, x, y) && a < 200) {
        data[i + 3] = Math.round(a * 0.65)
        if (data[i + 3] < 24) data[i + 3] = 0
      }
    }
  }
}

function applyMatte(data, width, height) {
  const checkerSamples = sampleCheckerColors(data, width, height)
  floodClearBackground(data, width, height, checkerSamples)
  removeHalos(data, width, height, checkerSamples)
  cleanFringeAlpha(data, width, height, checkerSamples)
}

async function loadMattedRgba(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  applyMatte(data, info.width, info.height)
  return { data, info }
}

async function exportPng(rgba, width, height, outputPath, maxDimension) {
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize(maxDimension, maxDimension, {
      fit: 'inside',
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath)
}

const { data, info } = await loadMattedRgba(src)
await exportPng(data, info.width, info.height, `${publicDir}logo.png`, 512)
await exportPng(data, info.width, info.height, `${publicDir}favicon-32.png`, 128)
await exportPng(data, info.width, info.height, `${publicDir}apple-touch-icon.png`, 180)

const logoMeta = await sharp(`${publicDir}logo.png`).metadata()
const png = readFileSync(`${publicDir}logo.png`)
const b64 = png.toString('base64')
const vw = logoMeta.width || 512
const vh = logoMeta.height || 512
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="Fortnite Spoofer"><image width="${vw}" height="${vh}" href="data:image/png;base64,${b64}"/></svg>`
writeFileSync(`${publicDir}favicon.svg`, svg)

console.log(`Logo assets written from ${src} (transparent background, adaptive checker removal)`)
