// Dossier prototype — Reader screen (Jurassic Left Behind)

const { getPalette, DossierBg, DossierStamp, MonoSmall, DLine, toRoman } = window.DossierShared;

function ReaderScreen({
  tw, chapter, onBack, onPrev, onNext, onTooltip, activeTooltip,
  onTypeMenu, typeMenuOpen, onEvidence, evidenceOpen,
}) {
  const p = getPalette(tw);
  const n = window.NOVEL;
  const chData = chapter === 1 ? n.sampleChapter : (window.NOVEL_CH[chapter] || null);
  const chMeta = n.chapters[chapter - 1];
  const fs = tw.fontSize;
  const lh = tw.lineHeight;
  const justify = tw.justify;
  const ornaments = tw.ornaments;

  const [revealed, setRevealed] = React.useState(new Set());
  const [stampVisible, setStampVisible] = React.useState(false);
  React.useEffect(() => {
    setStampVisible(false);
    setRevealed(new Set());
    const t = setTimeout(() => setStampVisible(true), 220);
    return () => clearTimeout(t);
  }, [chapter]);

  // Redact InGen institutional terms
  const REDACT_TARGETS = ['InGen', 'asset', 'incident residue'];

  const renderPara = (text, key) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{
        fontFamily: tw.bodyFont === 'mono'
          ? '"JetBrains Mono", monospace'
          : '"Newsreader", "Source Serif 4", Georgia, serif',
        fontSize: fs,
        lineHeight: lh,
        color: p.ink,
        margin: '0 0 1.1em',
        textAlign: justify ? 'justify' : 'left',
        textWrap: 'pretty',
        hyphens: justify ? 'auto' : 'manual',
      }}>
        {parts.map((part, i) => {
          const m = part.match(/^\{\{(.+)\}\}$/);
          if (!m) {
            const tokens = part.split(/(\bInGen\b|\basset\b|\bincident residue\b)/g);
            return tokens.map((tok, ti) => {
              if (REDACT_TARGETS.includes(tok)) {
                const id = `${key}-${i}-${ti}`;
                const isRev = revealed.has(id);
                return (
                  <span key={ti} onClick={(e) => {
                    e.stopPropagation();
                    setRevealed(s => { const ns = new Set(s); ns.add(id); return ns; });
                  }} style={{
                    background: isRev ? 'transparent' : p.ink,
                    color: isRev ? p.accent : 'transparent',
                    cursor: 'pointer',
                    padding: '0 2px',
                    transition: 'background 0.3s',
                    borderBottom: isRev ? `1px dotted ${p.accent}` : 'none',
                    fontWeight: isRev ? 600 : 400,
                  }}>{isRev ? tok : '█'.repeat(Math.max(3, tok.length))}</span>
                );
              }
              // Handle italic markdown <i> tags
              if (tok.startsWith('<i>') && tok.endsWith('</i>')) {
                return <i key={ti}>{tok.slice(3, -4)}</i>;
              }
              return tok;
            });
          }
          const term = m[1];
          return (
            <span key={i} onClick={() => onTooltip(term)} style={{
              color: p.accent, cursor:'pointer',
              textDecoration:`underline dotted ${p.accent}99`,
              textUnderlineOffset: 3, fontWeight: 500,
            }}>{term}</span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{ position:'relative', minHeight:'100%', paddingTop: 54, color: p.ink, paddingBottom: 100 }}>
      <DossierBg p={p} tw={tw}/>

      {/* Sticky chrome */}
      <div style={{
        position:'sticky', top:54, zIndex:5, background: p.bg + 'F0', backdropFilter:'blur(8px)',
        borderBottom:`1px solid ${p.ink}`, padding:'10px 18px',
        display:'flex', alignItems:'center', gap:10,
      }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em', cursor:'pointer', padding:0 }}>← INDEX</button>
        <div style={{ flex:1, textAlign:'center', fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em', color: p.ink, fontWeight: 700 }}>
          CH. {String(chapter).padStart(2,'0')} / {n.chapterCount}
        </div>
        <button onClick={onEvidence} style={{
          background: evidenceOpen ? p.ink : 'transparent',
          color: evidenceOpen ? p.bg : p.ink,
          border:`1px solid ${p.ink}`, padding:'3px 8px',
          fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.15em', cursor:'pointer', marginRight: 4,
        }}>EV</button>
        <button onClick={onTypeMenu} style={{
          background: typeMenuOpen ? p.ink : 'transparent',
          color: typeMenuOpen ? p.bg : p.ink,
          border:`1px solid ${p.ink}`, padding:'3px 8px',
          fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.15em', cursor:'pointer',
        }}>Aa</button>
      </div>

      {/* Reading progress strip */}
      <div style={{ position:'sticky', top: 94, zIndex:4, height: 2, background: p.faint+'33' }}>
        <div style={{ height:'100%', width: `${(chapter / n.chapterCount) * 100}%`, background: p.accent }}/>
      </div>

      {typeMenuOpen && <TypeMenu p={p} tw={tw}/>}

      <div style={{ position:'relative', padding:'18px 22px 0' }}>

        {stampVisible && tw.stamps > 0 && (
          <div style={{ position:'absolute', top: 22, right: 14, zIndex: 2 }} className="stamp-slam-anim">
            <DossierStamp color={p.accent} rotate={-12} style={{ fontSize: 11, padding:'5px 12px' }}>
              FILED · APR 26
            </DossierStamp>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:4, fontFamily:'"JetBrains Mono", monospace' }}>
          <span style={{ fontSize:60, fontWeight:700, color: p.ink, letterSpacing:'-0.04em', lineHeight:1 }}>
            {String(chapter).padStart(2,'0')}
          </span>
          <div style={{ flex:1 }}>
            <MonoSmall color={p.faint} style={{ display:'block' }}>CHAPTER {toRoman(chapter)}</MonoSmall>
            <MonoSmall color={p.accent} style={{ fontWeight:700, display:'block' }}>SECTION I</MonoSmall>
          </div>
        </div>
        <h1 style={{
          fontFamily:'"Newsreader", Georgia, serif', fontWeight:600,
          fontSize:30, letterSpacing:'-0.01em', lineHeight:1.05, margin:'4px 0 18px',
        }}>{chMeta ? chMeta.title : `Chapter ${chapter}`}</h1>

        <DLine p={p}/>

        {chData && chData.epigraph && (
          <div style={{
            margin:'16px 0 26px', padding:14,
            background: p.isDark ? `${p.accent}15` : `${p.ink}06`,
            borderLeft:`3px solid ${p.accent}`,
            fontFamily:'"JetBrains Mono", monospace', fontSize:12, lineHeight:1.55,
          }}>
            <MonoSmall color={p.faint} style={{ display:'block', marginBottom:6 }}>
              INTERCEPT · ISLA NUBLAR · 1993
            </MonoSmall>
            "{chData.epigraph.text}"
            <div style={{ fontSize:10, color: p.faint, marginTop:8 }}>{chData.epigraph.attribution}</div>
          </div>
        )}

        {chData && chData.paragraphs ? (
          chData.paragraphs.map((para, i) => renderPara(para, i))
        ) : (
          <div style={{
            padding: '32px 0', textAlign:'center',
            fontFamily:'"JetBrains Mono", monospace', color: p.faint,
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>█ █ █</div>
            <MonoSmall color={p.faint}>SECTION NOT ON FILE</MonoSmall>
            <div style={{ fontSize:11, color: p.faint, marginTop:8 }}>
              {chMeta && chMeta.words ? `${chMeta.words.toLocaleString()} W · CLASSIFIED` : 'ACCESS PENDING'}
            </div>
          </div>
        )}

        {ornaments && chData && chData.paragraphs && (
          <div style={{ textAlign:'center', margin:'22px 0', color: p.faint, fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:'0.4em' }}>
            ─── §§§ ───
          </div>
        )}

        <DLine p={p} dashed/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 0 4px', fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em' }}>
          <button onClick={onPrev} disabled={chapter<=1} style={{ background:'none', border:'none', color: chapter<=1?p.faint:p.ink, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor: chapter<=1?'default':'pointer', padding:0 }}>
            ← CH {String(Math.max(1,chapter-1)).padStart(2,'0')}
          </button>
          <span style={{ color: p.ink, fontWeight: 700 }}>{String(chapter).padStart(2,'0')} / {n.chapterCount}</span>
          <button onClick={onNext} disabled={chapter>=n.chapterCount} style={{ background:'none', border:'none', color: p.accent, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor:'pointer', padding:0 }}>
            CH {String(Math.min(n.chapterCount,chapter+1)).padStart(2,'0')} →
          </button>
        </div>
      </div>

      {activeTooltip && <TooltipDrawer p={p} term={activeTooltip} onClose={() => onTooltip(null)}/>}
      {evidenceOpen && <EvidenceSidecar p={p} chapter={chData || {n: chapter, title: chMeta?.title}} chMeta={chMeta} onClose={onEvidence}/>}
    </div>
  );
}

function TypeMenu({ p, tw }) {
  return (
    <div style={{
      position:'absolute', top: 110, right: 14, zIndex: 10,
      background: p.bg2, border:`1.5px solid ${p.ink}`, padding:14, width: 240,
      fontFamily:'"JetBrains Mono", monospace',
      boxShadow: p.isDark?'none':'4px 4px 0 rgba(0,0,0,0.18)',
    }}>
      <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 10 }}>TYPE SETTINGS</MonoSmall>
      <div style={{ fontSize:10, color: p.faint, lineHeight:1.6 }}>
        Adjust via the <b style={{ color: p.accent }}>TWEAKS</b> panel — toolbar toggle, top of screen.
      </div>
      <div style={{ marginTop:10, padding:'8px', background: p.bg, border:`1px dashed ${p.faint}` }}>
        <MonoSmall color={p.faint}>SIZE</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{Math.round(tw.fontSize)}px</span>
        <br/>
        <MonoSmall color={p.faint}>LEAD</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{tw.lineHeight.toFixed(2)}</span>
        <br/>
        <MonoSmall color={p.faint}>FACE</MonoSmall>
        <span style={{ float:'right', fontSize:11 }}>{tw.bodyFont.toUpperCase()}</span>
      </div>
    </div>
  );
}

function TooltipDrawer({ p, term, onClose }) {
  const all = Object.assign({}, window.NOVEL.glossary, window.NOVEL_GLOSS_EXT);
  const entry = all[term] || { cat:'unknown', def:'No entry on file. Cross-reference Appendix-G.' };
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, top:54, zIndex:20, display:'flex', alignItems:'flex-end' }}>
      <div style={{ position:'absolute', inset:0, top:0, background:'#0008' }}/>
      <div onClick={e=>e.stopPropagation()} className="drawer-rise" style={{
        position:'relative', width:'100%',
        background: p.bg2, borderTop:`2px solid ${p.accent}`,
        padding:'18px 22px 38px', fontFamily:'"JetBrains Mono", monospace',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <MonoSmall color={p.accent} style={{ fontWeight:700 }}>
            GLOSSARY · {(entry.cat||'').toUpperCase()}
          </MonoSmall>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${p.ink}`, color: p.ink, padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>CLOSE ✕</button>
        </div>
        <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:24, margin:'0 0 8px', color: p.ink }}>{term}</h3>
        <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:14, lineHeight:1.55, color: p.ink, margin:0 }}>{entry.def}</p>
        <MonoSmall color={p.faint} style={{ display:'block', marginTop:14 }}>SEE FULL FILE → APPENDIX-G</MonoSmall>
      </div>
    </div>
  );
}

function EvidenceSidecar({ p, chapter, chMeta, onClose }) {
  const chNum = chapter.n || 1;
  // Evidence cards per chapter
  const evidenceByChapter = {
    1: [
      { tag:'WHO',   label:'Jophery Brown',        note:'Both hands on the gate when the crate moved. Not the first transfer. Knew where to put his boots.' },
      { tag:'WHERE', label:'Transfer yard, Nublar', note:'Concrete apron. Floodlights. Chain-link shadows. The rain turned everything black glass.' },
      { tag:'WHAT',  label:'The incident',          note:'Incident residue. Biohazard closure. Temporary sanitation support required immediately.' },
      { tag:'WHEN',  label:'11:42 p.m.',            note:'Loaded into helicopter. Pen marked secure at 11:51. Legal called it a restricted-area worker injury.' },
    ],
    default: [
      { tag:'WHO',   label:'Mateo Valverde',        note:'Temporary sanitation contractor. Badge valid fourteen days.' },
      { tag:'WHERE', label:'Isla Nublar',            note:'Service level. Staff only. Not the park from the brochure.' },
      { tag:'WHAT',  label:`Chapter ${chNum}`,      note: chMeta ? `${chMeta.words?.toLocaleString()} words.` : 'On file.' },
      { tag:'WHEN',  label:'1993',                   note:'Nine days after Jophery Brown. Storm incoming.' },
    ],
  };
  const items = evidenceByChapter[chNum] || evidenceByChapter.default;
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, top:54, zIndex:25 }}>
      <div style={{ position:'absolute', inset:0, background:'#000A' }}/>
      <div onClick={e=>e.stopPropagation()} className="sidecar-slide" style={{
        position:'absolute', top:0, right:0, bottom:0, width:'85%',
        background: p.bg, borderLeft:`2px solid ${p.accent}`,
        padding:'18px', fontFamily:'"JetBrains Mono", monospace',
        overflowY:'auto',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <MonoSmall color={p.accent} style={{ fontWeight:700 }}>EVIDENCE · CH {String(chNum).padStart(2,'0')}</MonoSmall>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${p.ink}`, color: p.ink, padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>✕</button>
        </div>
        <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:22, margin:'0 0 14px', color: p.ink }}>
          {chMeta ? chMeta.title : `Chapter ${chNum}`}
        </h3>
        {items.map((it, i) => (
          <div key={i} style={{ borderBottom: `1px dashed ${p.faint}`, padding:'12px 0' }}>
            <MonoSmall color={p.faint}>{it.tag}</MonoSmall>
            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:17, fontWeight:600, color: p.ink, margin:'2px 0 4px' }}>{it.label}</div>
            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:13, lineHeight:1.45, color: p.ink2 }}>{it.note}</div>
          </div>
        ))}
        <MonoSmall color={p.faint} style={{ display:'block', marginTop:18, textAlign:'center' }}>
          ─── EOF ───
        </MonoSmall>
      </div>
    </div>
  );
}

window.ReaderScreen = ReaderScreen;
