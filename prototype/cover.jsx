// Dossier prototype — Cover screen (Jurassic Left Behind)

const { getPalette, DossierBg, DossierStamp, MonoSmall, DLine } = window.DossierShared;

function CoverScreen({ tw, onOpen, onTOC, onGlossary }) {
  const p = getPalette(tw);
  const stamps = tw.stamps;
  const n = window.NOVEL;

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', padding:'18px 22px 100px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 14 }}>
          <MonoSmall color={p.faint}>FILE 04-2026 / JLB</MonoSmall>
          <MonoSmall color={p.faint}>TEMP ACCESS / FOURTEEN DAYS</MonoSmall>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom: 24 }}>
          <div style={{ width:14, height:14, border:`1.5px solid ${p.ink}`, borderRadius:2, position:'relative' }}>
            <div style={{ position:'absolute', inset:3, background: p.accent }}/>
          </div>
          <MonoSmall color={p.ink} style={{ fontWeight: 700 }}>INCIDENT FILE</MonoSmall>
          <div style={{ flex:1, borderTop:`1px solid ${p.ink}` }}/>
          <MonoSmall color={p.faint}>SANITATION</MonoSmall>
        </div>

        {stamps > 0 && (
          <div style={{ display:'flex', gap: 14, marginBottom: 26, alignItems:'flex-start', opacity: Math.min(1, stamps) }}>
            <DossierStamp color={p.accent} rotate={-7} style={{ opacity: Math.min(1, stamps*1.2) }}>BIOHAZARD ROUTE</DossierStamp>
            <DossierStamp color={p.ink} rotate={4} style={{ marginTop:12, opacity: Math.min(1, stamps) }}>NON-PROFIT FAN WORK</DossierStamp>
            {stamps > 0.9 && (
              <DossierStamp color={p.accent} rotate={-3} style={{ marginTop:30, marginLeft:-30, opacity: stamps-0.5 }}>NUBLAR</DossierStamp>
            )}
          </div>
        )}

        <MonoSmall color={p.faint} style={{ display:'block', marginBottom:6 }}>SUBJECT</MonoSmall>
        <h1 style={{
          fontFamily:'"Newsreader", Georgia, serif', fontWeight: 600,
          fontSize: 44, lineHeight: 0.95, letterSpacing:'-0.02em', margin:'0 0 10px',
        }}>Jurassic<br/>Left<br/>Behind</h1>
        <MonoSmall color={p.ink} style={{ display:'block', marginBottom:22 }}>AFTER MICHAEL CRICHTON</MonoSmall>

        {/* Cover image placeholder — film-style frame */}
        <div style={{ position:'relative', height:200, marginBottom:18, background: p.bg2, border:`1px solid ${p.ink}`, padding:4 }}>
          <div style={{
            position:'absolute', inset:4,
            background: p.isDark
              ? 'repeating-linear-gradient(45deg, #0E1A0E 0 6px, #0A130A 6px 12px)'
              : 'repeating-linear-gradient(45deg, #C9BE9E 0 6px, #BDB18D 6px 12px)',
          }}/>
          <div style={{ position:'absolute', top:8, left:10, fontSize:9, letterSpacing:'0.18em', color: p.faint, background: p.bg, padding:'2px 6px', fontFamily:'"JetBrains Mono", monospace' }}>EXHIBIT A — SERVICE SECTOR</div>
          <div style={{ position:'absolute', inset:4, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ textAlign:'center', fontFamily:'"JetBrains Mono", monospace', color: p.faint, fontSize: 10, letterSpacing:'0.18em', lineHeight: 1.8 }}>
              <div>ISLA NUBLAR / 1993</div>
              <div>RAPTOR SERVICE LEVEL</div>
              <div style={{ marginTop: 8, color: p.accent }}>STAFF ONLY</div>
            </div>
          </div>
          {[[8,8,1,1],[8,'auto',1,0],['auto',8,0,1],['auto','auto',0,0]].map(([t,l,top,left],i)=>(
            <div key={i} style={{
              position:'absolute',
              top: t==='auto'?'auto':t, bottom: t==='auto'?8:'auto',
              left:l==='auto'?'auto':l, right:l==='auto'?8:'auto',
              width:14, height:14,
              borderTop: top?`2px solid ${p.accent}`:'none',
              borderBottom: !top?`2px solid ${p.accent}`:'none',
              borderLeft: left?`2px solid ${p.accent}`:'none',
              borderRight: !left?`2px solid ${p.accent}`:'none',
            }}/>
          ))}
        </div>

        <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize: 14, lineHeight: 1.55, color: p.ink, marginBottom: 22 }}>
          A 1993 film-continuity side-story. <span style={{ background: p.ink, color: p.bg, padding:'0 4px' }}>Mateo&nbsp;Valverde</span> was a temporary sanitation contractor. His badge was valid for fourteen days. The park's access rollback did not know he existed.
        </div>

        <div style={{ borderTop:`1px solid ${p.ink}`, borderBottom:`1px solid ${p.ink}`, padding:'10px 0', fontSize: 11, marginBottom: 22 }}>
          {[
            ['STATUS',    n.status.toUpperCase()],
            ['CHAPTERS',  String(n.chapterCount)],
            ['LENGTH',    n.totalWords + ' W'],
            ['UPDATED',   'APR 26 / 2026'],
            ['CLASSIFIED','THRILLER · ADAPTATION'],
          ].map(([k,v],i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom: i<4?`1px dashed ${p.faint}66`:'none', letterSpacing:'0.08em' }}>
              <MonoSmall color={p.faint}>{k}</MonoSmall>
              <MonoSmall color={p.ink} style={{ fontWeight: 700 }}>{v}</MonoSmall>
            </div>
          ))}
        </div>

        <button onClick={() => onOpen(1)} style={{
          width:'100%', padding:'18px 14px',
          background: p.ink, color: p.bg,
          border:'none', fontFamily:'"JetBrains Mono", monospace',
          fontSize: 13, fontWeight: 700, letterSpacing:'0.22em',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          cursor:'pointer',
        }}>
          <span>OPEN FILE : CH 01</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>
        <div style={{ display:'flex', gap: 8, marginTop: 8 }}>
          <button onClick={onTOC} style={{
            flex:1, padding:'12px', background:'transparent', color: p.ink,
            border:`1px solid ${p.ink}`, fontFamily:'inherit', fontSize: 11,
            letterSpacing:'0.18em', cursor:'pointer',
          }}>INDEX</button>
          <button onClick={onGlossary} style={{
            flex:1, padding:'12px', background:'transparent', color: p.ink,
            border:`1px solid ${p.ink}`, fontFamily:'inherit', fontSize: 11,
            letterSpacing:'0.18em', cursor:'pointer',
          }}>APPENDIX</button>
        </div>

      </div>
    </div>
  );
}

window.CoverScreen = CoverScreen;
