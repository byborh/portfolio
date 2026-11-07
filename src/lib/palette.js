import { reactive } from 'vue'
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

// Fisher-Yates on a copy: every order has the same probability.
function shuffle(palettes) {
  const order = [...palettes]
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

// A new cycle can start with the palette that ended the last one. The swap prevents
// the same palette on screen for two intervals in a row.
function nextCycle(previous) {
  const order = shuffle(PALETTES)
  if (order.length > 1 && order[0] === previous) [order[0], order[order.length - 1]] = [order[order.length - 1], order[0]]
  return order
}

// The Header button reads this state and calls togglePaletteKept().
export const paletteState = reactive({ running: false, name: '' })

const STORAGE_KEY = 'palette.kept'

// Storage throws in a private window or with blocked site data. The rotation still works:
// only the memory of the kept palette is lost, so a warning is enough.
function readKept() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.warn('palette.js: cannot read the kept palette', error)
    return null
  }
}

function writeKept(name) {
  try {
    if (name) localStorage.setItem(STORAGE_KEY, name)
    else localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('palette.js: cannot save the kept palette', error)
  }
}

let advance = null
let timer = 0

function setPaletteRunning(running) {
  if (!advance) throw new Error('palette.js: call startPaletteRotation() first')
  if (running === paletteState.running) return
  paletteState.running = running
  clearInterval(timer)
  // A new interval on resume: the next palette comes a full interval after the click, not at once.
  if (running) timer = setInterval(advance, PALETTE_INTERVAL_MS)
}

// Only a click remembers the choice. A stop caused by reduced motion is not a choice of palette.
export function togglePaletteKept() {
  const keep = paletteState.running
  setPaletteRunning(!keep)
  writeKept(keep ? paletteState.name : null)
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

  // A random palette opens the site, so each visit starts on new colors.
  // A palette kept on an earlier visit replaces it.
  const keptName = readKept()
  const kept = PALETTES.find((palette) => palette.name === keptName)
  // The kept palette was renamed or removed since that visit: forget it.
  if (keptName && !kept) writeKept(null)
  let current = PALETTES[Math.floor(Math.random() * PALETTES.length)]
  if (kept) current = kept

  apply(root, themeColor, current)
  // Reading the computed style flushes the first palette. The transition class added after it
  // then animates only the next changes, not the first jump from transparent.
  getComputedStyle(root).getPropertyValue('--red')
  root.classList.add('palette-live')

  // Under reduced motion the rotation starts stopped. The visitor can still start it with the button.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) setPaletteRunning(false)
  })

  // The rest of the first cycle is random. Every cycle shows each palette once, in a new random order.
  let queue = shuffle(PALETTES.filter((palette) => palette !== current))
  paletteState.name = current.name
  advance = () => {
    if (queue.length === 0) queue = nextCycle(current)
    current = queue.shift()
    apply(root, themeColor, current)
    paletteState.name = current.name
  }
  setPaletteRunning(!kept && !reducedMotion.matches)
}
