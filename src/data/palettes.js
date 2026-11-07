// The site rotates through these palettes. Each one keeps the same roles:
// yellow is the light background, blue the dark background, red the accent.
// The keys keep the CSS names (--yellow, --blue, --red), even when the hue differs.
// Contrast (WCAG): yellow on blue 8.5:1 or more, yellow on red 3.8:1 or more,
// and every --dim text of main.css at 4.5:1 or more. A new palette must keep these minimums.
export const PALETTES = [
  { name: 'Sunset Splash', yellow: '#ffd60a', blue: '#003566', red: '#d00000' },
  { name: 'Terracotta', yellow: '#f2e8cf', blue: '#283d3b', red: '#c44536' },
  { name: 'Ocean', yellow: '#e9f5db', blue: '#0b3954', red: '#d1495b' },
  { name: 'Plum', yellow: '#fde2e4', blue: '#3d1a3b', red: '#c9184a' },
  { name: 'Matcha', yellow: '#f1f7ed', blue: '#1b4332', red: '#c1440e' },
  { name: 'Lilac', yellow: '#efe9f4', blue: '#2b2d42', red: '#d90429' },

  // From https://www.screensnap.pro/blog/color-palette-ideas (3 colors of each 5-color palette).
  // Where the original failed the contrast minimums, only the OKLCH lightness changed: hue and chroma stay.
  { name: 'Soft Calm', yellow: '#e3f5f4', blue: '#044a3d', red: '#10887e' },
  { name: 'Vibrant Pop', yellow: '#fff0d3', blue: '#590eab', red: '#d8155e' },
  { name: 'Electric Citrus', yellow: '#fee99d', blue: '#240046', red: '#e30f63' },
  { name: 'Summer Coast', yellow: '#fff4ca', blue: '#003049', red: '#bd6003' },
  { name: 'Crisp Autumn', yellow: '#febf69', blue: '#212d0e', red: '#952324' },
  { name: 'Deep Ocean', yellow: '#caf0f8', blue: '#03045e', red: '#0077b6' },
  { name: 'Tech Blue', yellow: '#f8fafc', blue: '#0f172a', red: '#357cef' },
  { name: 'SaaS Mint', yellow: '#f0fdf4', blue: '#052e16', red: '#0b9041' },
  { name: 'Restaurant Warm', yellow: '#fff1e6', blue: '#003049', red: '#d62828' },
  { name: 'Healthcare Calm', yellow: '#e8f5fe', blue: '#023e97', red: '#1976d2' },
  { name: 'Wellness Sage', yellow: '#f1f8e9', blue: '#1f5106', red: '#568a08' },
  { name: 'Finance Trust', yellow: '#fbf0df', blue: '#0a2540', red: '#94752b' },
  { name: '70s Mustard', yellow: '#fff1c6', blue: '#6e3101', red: '#987211' },
  { name: '70s Avocado', yellow: '#fff0d3', blue: '#6e3101', red: '#608210' },
  { name: '80s Neon', yellow: '#c1fcff', blue: '#6708a8', red: '#e30f63' },
  { name: 'Miami Sunset', yellow: '#feeed1', blue: '#203142', red: '#cd3c73' },
  { name: 'Coastal Sea', yellow: '#fee7b1', blue: '#193945', red: '#c45032' },
  { name: 'Forest Pine', yellow: '#dffae3', blue: '#1b4332', red: '#1b8b5f' },
  { name: 'Sunset Glow', yellow: '#ffe6cb', blue: '#2b1c72', red: '#ba5a0a' },
  { name: 'Tropical Sunset', yellow: '#fed88f', blue: '#30068c', red: '#d1146e' },
  { name: 'Desert Sand', yellow: '#fed9bf', blue: '#4e3326', red: '#9d4f2a' },
]

export const PALETTE_INTERVAL_MS = 5000
