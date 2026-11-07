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

  // From https://www.color-meanings.com/retro-color-palettes/ (same method).
  { name: 'Warm Rainbow', yellow: '#fef2db', blue: '#01204e', red: '#e23f00' },
  { name: '80s Colorslide', yellow: '#b4e8c4', blue: '#6e071f', red: '#c0370c' },
  { name: 'Chocolate and Cream', yellow: '#fffcc7', blue: '#59322b', red: '#d54751' },
  { name: 'Pop Art', yellow: '#fdb05d', blue: '#1a0856', red: '#9f255a' },
  { name: 'Throwback Stripes', yellow: '#fff1e3', blue: '#8c030c', red: '#c95708' },
  { name: 'California Skies', yellow: '#fbf0dd', blue: '#014c48', red: '#c45810' },
  { name: 'Cirrostratus', yellow: '#86eeda', blue: '#6a0618', red: '#cc2a03' },
  { name: '3D Movie', yellow: '#feb432', blue: '#012939', red: '#b10a09' },
  { name: 'Open Air', yellow: '#b2e4e1', blue: '#3d2c2c', red: '#be011a' },
  { name: 'Tape Deck', yellow: '#ffedd9', blue: '#35312e', red: '#c55920' },
  { name: 'Highway Hypnosis', yellow: '#fddca9', blue: '#562717', red: '#c21717' },
  { name: 'VHS Tape', yellow: '#fedb8e', blue: '#611439', red: '#db0b22' },
  { name: 'Raspberry Road', yellow: '#eed37a', blue: '#522134', red: '#c02942' },
  { name: 'Tropical Vaporwave', yellow: '#fec684', blue: '#480255', red: '#b52b44' },
  { name: 'Butterscotch Blonde', yellow: '#fce2bf', blue: '#4c1d09', red: '#b92a18' },

  // From https://www.orbix.studio/blogs/best-color-combinations (same method).
  { name: 'Charcoal Coral', yellow: '#f7f3ee', blue: '#2d2d2d', red: '#cf5439' },
  { name: 'Electric Blue', yellow: '#ffffff', blue: '#0d1b2a', red: '#307cf4' },
  { name: 'Forest Copper', yellow: '#f5f0e8', blue: '#1a3025', red: '#ab6725' },
  { name: 'Black Red White', yellow: '#ffffff', blue: '#1a1a1a', red: '#e63946' },
  { name: 'Coral Navy', yellow: '#ffffff', blue: '#264653', red: '#df4d51' },
]

export const PALETTE_INTERVAL_MS = 5000
