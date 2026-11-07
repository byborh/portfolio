import { PALETTES, PALETTE_INTERVAL_MS } from '@/data/palettes.js'

const HEX = /^#[0-9a-f]{6}$/i
const ROLES = ['yellow', 'blue', 'red']

function validate() {
  if (PALETTES.length === 0) throw new Error('palettes.js: PALETTES is empty')
  if (!Number.isInteger(PALETTE_INTERVAL_MS) || PALETTE_INTERVAL_MS <= 0) {
    throw new Error(`palettes.js: PALETTE_INTERVAL_MS must be a positive integer, got ${PALETTE_INTERVAL_MS}`)
  }
  for (const palette of PALETTES) {
    for (const role of ROLES) {
      if (HEX.test(palette[role])) continue
      throw new Error(`palettes.js: "${palette.name}" has an invalid ${role}: ${palette[role]}`)
    }
  }
}

function apply(root, themeColor, palette) {
  for (const role of ROLES) root.style.setProperty(`--${role}`, palette[role])
  themeColor.setAttribute('content', palette.yellow)
}

export function startPaletteRotation() {
  validate()
  const root = document.documentElement
  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (!themeColor) throw new Error('index.html: <meta name="theme-color"> is missing')

  apply(root, themeColor, PALETTES[0])
  // Reading the computed style flushes the first palette. The transition class added after it
  // then animates only the next changes, not the first jump from transparent.
  getComputedStyle(root).getPropertyValue('--red')
  root.classList.add('palette-live')

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let index = 0
  setInterval(() => {
    // Checked on each tick, so a change of the OS setting takes effect without a reload.
    if (reducedMotion.matches) return
    index = (index + 1) % PALETTES.length
    apply(root, themeColor, PALETTES[index])
  }, PALETTE_INTERVAL_MS)
}
