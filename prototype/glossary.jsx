// Dossier prototype — Glossary (Appendix G)

const { getPalette, DossierBg, MonoSmall, DLine } = window.DossierShared;

function GlossaryScreen({ tw, onBack }) {
  const p = getPalette(tw);
  const [filter, setFilter] = React.useState('ALL');
  const [query, setQuery] = React.useState('');

  const cats = ['ALL', ...window.NOVEL.glossaryFull.map(s => s.cat.toUpperCase())];

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', padding:'14px 22px 100px' }}>

        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'inherit', fontSize:10, letterSpacing:'0.18em', cursor:'pointer', padding:0 }}>
            ← BACK
          </button>
          <MonoSmall color={p.faint}>APPENDIX-G</MonoSmall>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:30, letterSpacing:'-0.01em', margin:'10px 0 4px' }}>Glossary</h2>
        <MonoSmall color={p.faint} style={{ display:'block', marginBottom:16 }}>
          {window.NOVEL.glossaryFull.reduce((a,s)=>a+s.terms.length,0)} TERMS · {window.NOVEL.glossaryFull.length} CATEGORIES
        </MonoSmall>

        <div style={{ display:'flex', alignItems:'center', gap:8, border:`1.5px solid ${p.ink}`, padding:'10px 12px', marginBottom:8 }}>
          <span style={{ color: p.faint, fontSize:12 }}>⌕</span>
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder="filter terms…"
            style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:'inherit', fontSize:12, color: p.ink }}
          />
          <MonoSmall color={p.faint}>⌘K</MonoSmall>
        </div>

        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom: 22 }}>
          {cats.map(c => (
            <button key={c} onClick={()=>setFilter(c)} style={{
              fontSize:9, letterSpacing:'0.18em', padding:'4px 9px',
              border:`1px solid ${p.ink}`,
              background: filter===c ? p.ink : 'transparent',
              color: filter===c ? p.bg : p.ink,
              fontFamily:'inherit', cursor:'pointer',
            }}>{c}</button>
          ))}
        </div>

        {window.NOVEL.glossaryFull
          .filter(s => filter==='ALL' || s.cat.toUpperCase()===filter)
          .map((sec, si) => {
            const terms = sec.terms.filter(t => !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.short.toLowerCase().includes(query.toLowerCase()));
            if (terms.length === 0) return null;
            return (
              <div key={si} style={{ marginBottom:26 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <MonoSmall color={p.ink} style={{ fontWeight:700 }}>{sec.cat.toUpperCase()}</MonoSmall>
                  <div style={{ flex:1, borderTop:`1px dashed ${p.faint}` }}/>
                  <MonoSmall color={p.faint}>{String(terms.length).padStart(2,'0')}</MonoSmall>
                </div>
                {terms.map((t, ti) => (
                  <div key={ti} style={{ borderBottom:`1px solid ${p.faint}33`, padding:'12px 0' }}>
                    <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                      <span style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:17, fontWeight:600, color: p.ink }}>{t.name}</span>
                      {t.alias && <MonoSmall color={p.accent}>A.K.A. {t.alias.toUpperCase()}</MonoSmall>}
                    </div>
                    <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:13, lineHeight:1.5, color: p.ink, margin:'4px 0 0' }}>{t.short}</p>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

window.GlossaryScreen = GlossaryScreen;
