import { memo } from 'react';

// Futuristic backgrounds drawn as inline SVG, so they appear instantly with no
// image download. Each new game gets a new seed: a different palette, ring
// position, streak angle and star field.

const PALETTES = [
  { base: ['#05070f', '#0b1530', '#04060c'], a: '#1e9bff', b: '#7c3aed', c: '#22d3ee' },
  { base: ['#07050f', '#1d0b33', '#050309'], a: '#d946ef', b: '#6366f1', c: '#f472b6' },
  { base: ['#03100f', '#06302c', '#020807'], a: '#14b8a6', b: '#0ea5e9', c: '#5eead4' },
  { base: ['#0f0805', '#2d1406', '#070403'], a: '#f97316', b: '#e11d48', c: '#fbbf24' },
  { base: ['#06060c', '#141433', '#040409'], a: '#60a5fa', b: '#c084fc', c: '#e0e7ff' },
];

// small deterministic PRNG so a seed always draws the same picture
const rng = (seed) => {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const W = 1600;
const H = 1000;

const Backdrop = memo(function Backdrop({ seed }) {
  const r = rng(seed * 9973 + 17);
  const p = PALETTES[seed % PALETTES.length];
  const cx = W * (0.25 + r() * 0.5);
  const cy = H * (0.35 + r() * 0.4);
  const angle = -35 + r() * 70;
  const id = `bd${seed}`;

  const rings = Array.from({ length: 7 }, (_, i) => ({
    r: 90 + i * 70 + r() * 25,
    dash: `${8 + r() * 60} ${6 + r() * 30}`,
    width: i % 3 === 0 ? 2.2 : 1,
    color: [p.a, p.b, p.c][i % 3],
    spin: (i % 2 ? 1 : -1) * (40 + r() * 80),
  }));
  const streaks = Array.from({ length: 14 }, () => ({
    y: r() * H * 1.6 - H * 0.3,
    len: 300 + r() * 900,
    x: r() * W * 1.2 - W * 0.1,
    w: 0.6 + r() * 2.4,
    color: r() > 0.5 ? p.a : p.b,
    o: 0.35 + r() * 0.55,
  }));
  const stars = Array.from({ length: 90 }, () => ({ x: r() * W, y: r() * H, s: 0.4 + r() * 1.8, o: 0.2 + r() * 0.8 }));
  const nodes = Array.from({ length: 10 }, () => ({ x: r() * W, y: r() * H, s: 4 + r() * 9 }));

  return (
    <svg className="backdrop" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-base`} cx={cx / W} cy={cy / H} r="0.9">
          <stop offset="0" stopColor={p.base[1]} />
          <stop offset="0.55" stopColor={p.base[0]} />
          <stop offset="1" stopColor={p.base[2]} />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={p.c} stopOpacity="0.7" />
          <stop offset="0.35" stopColor={p.a} stopOpacity="0.28" />
          <stop offset="1" stopColor={p.a} stopOpacity="0" />
        </radialGradient>
        {[['sa', p.a], ['sb', p.b]].map(([k, col]) => (
          <linearGradient key={k} id={`${id}-${k}`} x1="0" x2="1">
            <stop offset="0" stopColor={col} stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor={col} stopOpacity="0" />
          </linearGradient>
        ))}
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke={p.a} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-base)`} />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      <circle cx={cx} cy={cy} r="520" fill={`url(#${id}-glow)`} />

      <g transform={`rotate(${angle} ${W / 2} ${H / 2})`}>
        {streaks.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.len} height={s.w} fill={`url(#${id}-${s.color === p.a ? 'sa' : 'sb'})`} opacity={s.o} />
        ))}
        {streaks.slice(0, 5).map((s, i) => (
          <rect key={`c${i}`} x={s.x} y={s.y + 6} width={s.len * 0.6} height={s.w + 1} fill={s.color} opacity="0.35" filter={`url(#${id}-blur)`} />
        ))}
      </g>

      {rings.map((ring, i) => (
        <circle
          key={i}
          className="backdrop-spin"
          style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: `${Math.abs(ring.spin)}s`, animationDirection: ring.spin > 0 ? 'normal' : 'reverse' }}
          cx={cx}
          cy={cy}
          r={ring.r}
          fill="none"
          stroke={ring.color}
          strokeOpacity={i % 3 === 0 ? 0.7 : 0.4}
          strokeWidth={ring.width}
          strokeDasharray={ring.dash}
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r="38" fill="none" stroke={p.c} strokeWidth="3" opacity="0.8" filter={`url(#${id}-blur)`} />
      <circle cx={cx} cy={cy} r="38" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.85" />

      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={s.o} />
      ))}
      {nodes.map((n, i) => (
        <g key={i} className="backdrop-pulse" style={{ animationDelay: `${(i % 5) * 0.7}s` }}>
          <circle cx={n.x} cy={n.y} r={n.s * 2.2} fill={i % 2 ? p.a : p.b} opacity="0.25" filter={`url(#${id}-blur)`} />
          <circle cx={n.x} cy={n.y} r={n.s} fill="none" stroke={i % 2 ? p.c : p.a} strokeWidth="1.5" opacity="0.8" />
        </g>
      ))}
      {/* soft vignette so the cards stay the brightest thing on screen */}
      <rect width={W} height={H} fill="#000" opacity="0.08" />
    </svg>
  );
});

export default Backdrop;
