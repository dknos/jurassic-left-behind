// Dossier prototype — shared chrome + helpers
// Pulls accent from a TWEAKS context. All screens consume `tw` (the live tweaks).

const DP = {
  // light "paper" theme
  light: {
    bg:    '#E9E2D2',
    bg2:   '#DBD2BC',
    ink:   '#1C1A16',
    ink2:  '#3A352B',
    faint: '#7A7263',
  },
  // dark "archive terminal"
  dark: {
    bg:    '#0E1410',
    bg2:   '#161D17',
    ink:   '#C8D4BD',
    ink2:  '#A0B095',
    faint: '#5A6A55',
  },
  // pure black "blackout"
  blackout: {
    bg:    '#000000',
    bg2:   '#0A0A0A',
    ink:   '#EAEAEA',
    ink2:  '#BBBBBB',
    faint: '#555555',
  },
};

const ACCENTS = {
  red:    { name: 'ALARM',    light: '#B12B1F', dark: '#E04A3D' },
  amber:  { name: 'CAUTION',  light: '#9A6B14', dark: '#E5A33A' },
  cyan:   { name: 'DIAGNOSE', light: '#1E5F6E', dark: '#5DD3E0' },
  chart:  { name: 'SIGNAL',   light: '#5C6B14', dark: '#C4D940' },
};

function getPalette(tw) {
  const themeKey = tw.theme; // 'light' | 'dark' | 'blackout'
  const base = DP[themeKey] || DP.light;
  const isDark = themeKey !== 'light';
  const a = ACCENTS[tw.accent] || ACCENTS.red;
  return {
    ...base,
    isDark,
    accent: isDark ? a.dark : a.light,
    accentName: a.name,
  };
}

function DossierGrain({ p, intensity = 1 }) {
  return (
    <svg style={{
      position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none',
      mixBlendMode: p.isDark ? 'overlay' : 'multiply',
      opacity: (p.isDark ? 0.3 : 0.16) * intensity,
    }}>
      <filter id={`dgrain-${intensity}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"/>
      </filter>
      <rect width="100%" height="100%" filter={`url(#dgrain-${intensity})`}/>
    </svg>
  );
}

function DossierBg({ p, tw }) {
  return (
    <div style={{ position:'absolute', inset:0, background: p.bg, overflow:'hidden' }}>
      <DossierGrain p={p} intensity={tw.texture}/>
      {p.isDark && (
        <div style={{
          position:'absolute', inset:0,
          backgroundImage: `linear-gradient(${p.ink}10 1px, transparent 1px)`,
          backgroundSize: '100% 4px',
          opacity: 0.55, pointerEvents: 'none',
        }}/>
      )}
      {!p.isDark && (
        <div style={{
          position:'absolute', inset:0,
          backgroundImage: `linear-gradient(${p.ink}05 1px, transparent 1px)`,
          backgroundSize: '100% 26px', pointerEvents:'none',
        }}/>
      )}
    </div>
  );
}

function DossierStamp({ children, color, rotate = -8, style, slam = false }) {
  return (
    <div className={slam ? 'stamp-slam' : ''} style={{
      display:'inline-block',
      transform: `rotate(${rotate}deg)`,
      border: `2.5px solid ${color}`,
      color: color,
      padding: '4px 10px 3px',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
      textTransform: 'uppercase', borderRadius: 2, whiteSpace:'nowrap',
      ...style,
    }}>{children}</div>
  );
}

function StatusBarSpace({ children }) {
  // top padding to clear iOS status bar
  return <div style={{ paddingTop: 54 }}>{children}</div>;
}

function MonoSmall({ children, color, style }) {
  return (
    <span style={{
      fontFamily:'"JetBrains Mono", monospace',
      fontSize: 10, letterSpacing:'0.18em', color, ...style,
    }}>{children}</span>
  );
}

function DLine({ p, dashed }) {
  return <div style={{ height:1, borderTop: dashed ? `1px dashed ${p.faint}` : `1px solid ${p.ink}33` }}/>;
}

// Roman numerals (used in chapter headers)
function toRoman(n) {
  const m = [['X',10],['IX',9],['V',5],['IV',4],['I',1]];
  let s=''; let v=n; m.forEach(([r,n2])=>{ while(v>=n2){ s+=r; v-=n2; } });
  return s;
}

window.DossierShared = {
  DP, ACCENTS, getPalette,
  DossierGrain, DossierBg, DossierStamp,
  StatusBarSpace, MonoSmall, DLine, toRoman,
};
