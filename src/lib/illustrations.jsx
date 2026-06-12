// SVG illustration components — one per thematic category

function AtomOrbital({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52%', height: '52%' }}>
      <circle cx="60" cy="60" r="42" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="60" r="24" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="60" cy="60" rx="42" ry="16" stroke={color} strokeWidth="1.5" opacity="0.6" transform="rotate(-35 60 60)" />
      <circle cx="60" cy="60" r="6.5" fill={color} opacity="0.85" />
      <circle cx="60" cy="18" r="4" fill={color} opacity="0.6" />
    </svg>
  )
}

function Columns({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '58%', height: '58%' }}>
      {/* Entablature top */}
      <rect x="10" y="28" width="100" height="9" rx="1.5" fill={color} opacity="0.28" />
      {/* Left column */}
      <rect x="16" y="37" width="22" height="52" rx="1.5" fill={color} opacity="0.32" />
      {/* Center column */}
      <rect x="49" y="37" width="22" height="52" rx="1.5" fill={color} opacity="0.38" />
      {/* Right column */}
      <rect x="82" y="37" width="22" height="52" rx="1.5" fill={color} opacity="0.32" />
      {/* Ground band */}
      <rect x="10" y="89" width="100" height="6" rx="1.5" fill={color} opacity="0.22" />
      {/* Decorative circle below */}
      <circle cx="60" cy="105" r="5" stroke={color} strokeWidth="1.5" opacity="0.45" />
      <line x1="55" y1="105" x2="65" y2="105" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="60" y1="100" x2="60" y2="110" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  )
}

function DNAHelix({ color }) {
  // A vertical DNA ladder: dots on left & right strands connected by rungs
  const nodes = [
    { y: 12,  lx: 42, rx: 78 },
    { y: 28,  lx: 33, rx: 87 },
    { y: 44,  lx: 33, rx: 87 },
    { y: 60,  lx: 42, rx: 78 },
    { y: 76,  lx: 55, rx: 65 },
    { y: 92,  lx: 42, rx: 78 },
    { y: 108, lx: 33, rx: 87 },
  ]
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '48%', height: '48%' }}>
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={n.lx} y1={n.y} x2={n.rx} y2={n.y} stroke={color} strokeWidth="1.5" opacity="0.45" />
          <circle cx={n.lx} cy={n.y} r="4.5" fill={color} opacity="0.75" />
          <circle cx={n.rx} cy={n.y} r="4.5" fill={color} opacity="0.75" />
        </g>
      ))}
    </svg>
  )
}

function ElectronAtom({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: '60%' }}>
      {/* Nucleus */}
      <circle cx="60" cy="60" r="8" fill={color} opacity="0.8" />
      {/* Orbit 1 — horizontal */}
      <ellipse cx="60" cy="60" rx="46" ry="18" stroke={color} strokeWidth="1.3" opacity="0.45" />
      {/* Orbit 2 — 60° */}
      <ellipse cx="60" cy="60" rx="46" ry="18" stroke={color} strokeWidth="1.3" opacity="0.45" transform="rotate(60 60 60)" />
      {/* Orbit 3 — -60° */}
      <ellipse cx="60" cy="60" rx="46" ry="18" stroke={color} strokeWidth="1.3" opacity="0.45" transform="rotate(-60 60 60)" />
      {/* Electrons */}
      <circle cx="106" cy="60" r="4.5" fill={color} opacity="0.75" />
      <circle cx="37" cy="26" r="4.5" fill={color} opacity="0.75" />
      <circle cx="83" cy="94" r="4.5" fill={color} opacity="0.75" />
      {/* Ambient dots */}
      <circle cx="14" cy="42" r="2" fill={color} opacity="0.25" />
      <circle cx="100" cy="22" r="2" fill={color} opacity="0.25" />
      <circle cx="18" cy="82" r="2" fill={color} opacity="0.25" />
      <circle cx="106" cy="88" r="2" fill={color} opacity="0.25" />
    </svg>
  )
}

function AbstractEye({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '55%', height: '55%' }}>
      {/* Outer eye shape */}
      <path d="M 10 60 Q 60 20 110 60 Q 60 100 10 60 Z" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Iris */}
      <circle cx="60" cy="60" r="18" stroke={color} strokeWidth="1.5" opacity="0.55" />
      {/* Pupil */}
      <circle cx="60" cy="60" r="8" fill={color} opacity="0.7" />
      {/* Highlight */}
      <circle cx="65" cy="55" r="3" fill={color} opacity="0.25" />
      {/* Lash lines */}
      <line x1="60" y1="42" x2="60" y2="36" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <line x1="45" y1="47" x2="41" y2="43" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <line x1="75" y1="47" x2="79" y2="43" stroke={color} strokeWidth="1.2" opacity="0.3" />
    </svg>
  )
}

function Crescent({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52%', height: '52%' }}>
      {/* Crescent */}
      <path
        d="M 60 15 A 45 45 0 1 1 60 105 A 30 30 0 1 0 60 15 Z"
        fill={color}
        opacity="0.5"
      />
      {/* Star */}
      <polygon
        points="88,38 90,45 97,45 91,49 93,56 88,52 83,56 85,49 79,45 86,45"
        fill={color}
        opacity="0.65"
      />
    </svg>
  )
}

function OpenBook({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '56%', height: '56%' }}>
      {/* Spine */}
      <line x1="60" y1="30" x2="60" y2="95" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Left page */}
      <path d="M 60 30 Q 35 28 12 38 L 12 95 Q 35 85 60 95 Z" fill={color} opacity="0.18" stroke={color} strokeWidth="1" opacity2="0.35" />
      {/* Right page */}
      <path d="M 60 30 Q 85 28 108 38 L 108 95 Q 85 85 60 95 Z" fill={color} opacity="0.18" stroke={color} strokeWidth="1" />
      {/* Left page lines */}
      <line x1="22" y1="52" x2="52" y2="49" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="61" x2="52" y2="58" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="70" x2="52" y2="67" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="79" x2="52" y2="76" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Right page lines */}
      <line x1="68" y1="49" x2="98" y2="52" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="68" y1="58" x2="98" y2="61" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="68" y1="67" x2="98" y2="70" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="68" y1="76" x2="98" y2="79" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  )
}

function Shield({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '50%', height: '50%' }}>
      <path d="M 60 10 L 100 28 L 100 65 Q 100 95 60 112 Q 20 95 20 65 L 20 28 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.8" opacity2="0.5" />
      <path d="M 60 10 L 100 28 L 100 65 Q 100 95 60 112 Q 20 95 20 65 L 20 28 Z" stroke={color} strokeWidth="1.8" opacity="0.5" />
      {/* Inner cross */}
      <line x1="60" y1="38" x2="60" y2="82" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="38" y1="58" x2="82" y2="58" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

function Globe({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '54%', height: '54%' }}>
      <circle cx="60" cy="60" r="44" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Latitude lines */}
      <ellipse cx="60" cy="60" rx="44" ry="15" stroke={color} strokeWidth="1" opacity="0.35" />
      <ellipse cx="60" cy="45" rx="35" ry="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="60" cy="75" rx="35" ry="10" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Meridian */}
      <line x1="60" y1="16" x2="60" y2="104" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Continent blobs */}
      <path d="M 38 50 Q 50 42 58 55 Q 48 65 38 58 Z" fill={color} opacity="0.4" />
      <path d="M 65 45 Q 78 40 80 58 Q 72 62 65 55 Z" fill={color} opacity="0.4" />
      <path d="M 42 68 Q 54 63 56 75 Q 48 80 42 74 Z" fill={color} opacity="0.35" />
    </svg>
  )
}

function Scales({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52%', height: '52%' }}>
      {/* Pole */}
      <line x1="60" y1="18" x2="60" y2="100" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Base */}
      <rect x="40" y="98" width="40" height="6" rx="3" fill={color} opacity="0.4" />
      {/* Crossbar */}
      <line x1="20" y1="40" x2="100" y2="40" stroke={color} strokeWidth="1.8" opacity="0.5" />
      {/* Left arm */}
      <line x1="20" y1="40" x2="20" y2="58" stroke={color} strokeWidth="1.3" opacity="0.4" />
      <ellipse cx="20" cy="63" rx="16" ry="6" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2" opacity2="0.45" />
      <ellipse cx="20" cy="63" rx="16" ry="6" stroke={color} strokeWidth="1.2" opacity="0.45" />
      {/* Right arm */}
      <line x1="100" y1="40" x2="100" y2="65" stroke={color} strokeWidth="1.3" opacity="0.4" />
      <ellipse cx="100" cy="70" rx="16" ry="6" fill={color} opacity="0.25" />
      <ellipse cx="100" cy="70" rx="16" ry="6" stroke={color} strokeWidth="1.2" opacity="0.45" />
      {/* Center ornament */}
      <circle cx="60" cy="28" r="5" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

function DefaultIllustration({ color }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '50%', height: '50%' }}>
      <circle cx="60" cy="60" r="42" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <circle cx="60" cy="60" r="28" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="60" cy="60" r="14" fill={color} opacity="0.25" />
      <circle cx="60" cy="60" r="6" fill={color} opacity="0.6" />
    </svg>
  )
}

const TAG_TO_ILLUSTRATION = {
  theology:          AtomOrbital,
  religion:          AtomOrbital,
  christianity:      AtomOrbital,
  archaeology:       Columns,
  history:           Columns,
  genetics:          DNAHelix,
  biology:           DNAHelix,
  science:           ElectronAtom,
  'quantum physics': ElectronAtom,
  cosmology:         ElectronAtom,
  creationism:       Globe,
  consciousness:     AbstractEye,
  neuroscience:      AbstractEye,
  philosophy:        AbstractEye,
  parapsychology:    AbstractEye,
  perception:        AbstractEye,
  islam:             Crescent,
  bible:             OpenBook,
  apologetics:       Shield,
  politics:          Scales,
  america:           Scales,
}

export function getIllustration(tags = []) {
  for (const tag of tags) {
    const key = tag.toLowerCase().trim()
    if (TAG_TO_ILLUSTRATION[key]) return TAG_TO_ILLUSTRATION[key]
  }
  return DefaultIllustration
}
