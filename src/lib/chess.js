// Minimal move player for the opening lesson.
// It checks each move is pseudo-legal (right piece, right side, clear path, capture matches the SAN).
// It does not look for checks: lines come from published theory, this only catches data mistakes.

export const FILES = 'abcdefgh'
const BACK_RANK = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']

export function startPosition() {
  const pieces = []
  FILES.split('').forEach((file, i) => {
    pieces.push({ id: `w${file}1`, type: BACK_RANK[i], side: 'w', sq: `${file}1` })
    pieces.push({ id: `w${file}2`, type: 'p', side: 'w', sq: `${file}2` })
    pieces.push({ id: `b${file}7`, type: 'p', side: 'b', sq: `${file}7` })
    pieces.push({ id: `b${file}8`, type: BACK_RANK[i], side: 'b', sq: `${file}8` })
  })
  return pieces
}

function xy(sq) {
  if (!/^[a-h][1-8]$/.test(sq)) throw new Error(`chess: "${sq}" is not a square`)
  return { x: FILES.indexOf(sq[0]), y: Number(sq[1]) - 1 }
}

function at(pieces, sq) {
  return pieces.find((p) => p.sq === sq)
}

function pathClear(pieces, from, to) {
  const a = xy(from)
  const b = xy(to)
  const sx = Math.sign(b.x - a.x)
  const sy = Math.sign(b.y - a.y)
  for (let x = a.x + sx, y = a.y + sy; x !== b.x || y !== b.y; x += sx, y += sy) {
    if (at(pieces, `${FILES[x]}${y + 1}`)) return false
  }
  return true
}

function reachable(pieces, piece, move, capture) {
  const a = xy(move.from)
  const b = xy(move.to)
  const dx = b.x - a.x
  const dy = b.y - a.y
  const ax = Math.abs(dx)
  const ay = Math.abs(dy)

  if (piece.type === 'p') {
    const dir = piece.side === 'w' ? 1 : -1
    const home = piece.side === 'w' ? 1 : 6
    if (capture) return ax === 1 && dy === dir
    if (dx !== 0) return false
    if (dy === dir) return true
    return a.y === home && dy === 2 * dir && pathClear(pieces, move.from, move.to)
  }
  if (piece.type === 'n') return (ax === 1 && ay === 2) || (ax === 2 && ay === 1)
  if (piece.type === 'b') return ax === ay && pathClear(pieces, move.from, move.to)
  if (piece.type === 'r') return (dx === 0 || dy === 0) && pathClear(pieces, move.from, move.to)
  if (piece.type === 'q') return (ax === ay || dx === 0 || dy === 0) && pathClear(pieces, move.from, move.to)
  if (piece.type === 'k' && move.rook) return dy === 0 && ax === 2 && pathClear(pieces, move.from, move.rook[0])
  if (piece.type === 'k') return Math.max(ax, ay) === 1
  throw new Error(`chess: unknown piece type "${piece.type}"`)
}

// move: { san, from, to, mark?, rook?: [from, to] } — `mark` is the annotation (!, ??), `rook` marks castling.
export function play(pieces, move, side) {
  const where = `${move.san} (${move.from}-${move.to})`
  const piece = at(pieces, move.from)
  if (!piece) throw new Error(`chess: ${where}: no piece on ${move.from}`)
  if (piece.side !== side) throw new Error(`chess: ${where}: it is not ${piece.side === 'w' ? 'White' : 'Black'}'s turn`)

  const target = at(pieces, move.to)
  if (target && target.side === side) throw new Error(`chess: ${where}: ${move.to} holds a piece of the same side`)
  const capture = Boolean(target)
  if (capture !== move.san.includes('x')) throw new Error(`chess: ${where}: SAN and board disagree on the capture`)
  if (!reachable(pieces, piece, move, capture)) throw new Error(`chess: ${where}: illegal move for this piece`)

  const next = pieces.filter((p) => p !== target).map((p) => ({ ...p }))
  next.find((p) => p.id === piece.id).sq = move.to
  if (move.rook) {
    const rook = next.find((p) => p.sq === move.rook[0] && p.type === 'r' && p.side === side)
    if (!rook) throw new Error(`chess: ${where}: no rook on ${move.rook[0]} to castle with`)
    rook.sq = move.rook[1]
  }
  return next
}

// Returns every position of the line: positions[0] is the start, positions[n] follows move n.
export function replay(moves) {
  const positions = [startPosition()]
  moves.forEach((move, i) => positions.push(play(positions[i], move, i % 2 === 0 ? 'w' : 'b')))
  return positions
}

// "1. h4", "1… d5" — the move number belongs to the ply.
export function moveLabel(index, san) {
  const n = Math.floor(index / 2) + 1
  return index % 2 === 0 ? `${n}. ${san}` : `${n}… ${san}`
}
