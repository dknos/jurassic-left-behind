// Dossier prototype — Desktop layout (Jurassic Left Behind)

const { getPalette, DossierBg, DossierStamp, MonoSmall, DLine, toRoman } = window.DossierShared;

function DesktopCover({ tw, onOpen, onTOC, onGlossary }) {
  const p = getPalette(tw);
  const n = window.NOVEL;
  return (
    <div style={{ position:'relative', minHeight:'100vh', color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', maxWidth: 1240, margin:'0 auto', padding:'40px 56px 80px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 28 }}>
          <MonoSmall color={p.faint}>FILE 04-2026 / JLB · TEMP ACCESS / FOURTEEN DAYS</MonoSmall>
          <MonoSmall color={p.faint}>SANITATION · APR 26 / 2026</MonoSmall>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: 36 }}>
          <div style={{ width:18, height:18, border:`1.5px solid ${p.ink}`, borderRadius:2, position:'relative' }}>
            <div style={{ position:'absolute', inset:4, background: p.accent }}/>
          </div>
          <MonoSmall color={p.ink} style={{ fontWeight:700, fontSize:12 }}>INCIDENT FILE</MonoSmall>
          <div style={{ flex:1, borderTop:`1px solid ${p.ink}` }}/>
          <MonoSmall color={p.faint}>VOL. 01</MonoSmall>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 56, marginBottom: 56 }}>
          <div>
            <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 12 }}>SUBJECT</MonoSmall>
            <h1 style={{
              fontFamily:'"Newsreader", Georgia, serif', fontWeight: 600,
              fontSize: 'clamp(72px, 8vw, 132px)', lineHeight: 0.92,
              letterSpacing:'-0.025em', margin:'0 0 22px',
            }}>Jurassic<br/>Left<br/>Behind</h1>
            <MonoSmall color={p.ink} style={{ display:'block', marginBottom: 28, fontSize: 13 }}>
              AFTER MICHAEL CRICHTON
            </MonoSmall>

            {tw.stamps > 0 && (
              <div style={{ display:'flex', gap:18, marginBottom: 28, alignItems:'flex-start', opacity: Math.min(1, tw.stamps) }}>
                <DossierStamp color={p.accent} rotate={-7} style={{ fontSize: 12, padding:'6px 14px' }}>BIOHAZARD ROUTE</DossierStamp>
                <DossierStamp color={p.ink} rotate={4} style={{ marginTop:14, fontSize: 12, padding:'6px 14px' }}>NON-PROFIT FAN WORK</DossierStamp>
              </div>
            )}

            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.55, color: p.ink, marginBottom: 30, maxWidth: 520 }}>
              A 1993 film-continuity side-story. <span style={{ background: p.ink, color: p.bg, padding:'0 4px' }}>Mateo&nbsp;Valverde</span> was a temporary sanitation contractor on Isla Nublar. His badge was valid for fourteen days. When the park rebooted, it did not remember him.
            </div>

            <div style={{ display:'flex', gap: 12 }}>
              <button onClick={() => onOpen(1)} style={{
                padding:'18px 28px', background: p.ink, color: p.bg,
                border:'none', fontFamily:'"JetBrains Mono", monospace',
                fontSize: 13, fontWeight: 700, letterSpacing:'0.22em', cursor:'pointer',
                display:'flex', alignItems:'center', gap: 12,
              }}>
                <span>OPEN FILE : CH 01</span>
                <span style={{ fontSize:16 }}>→</span>
              </button>
              <button onClick={onTOC} style={{
                padding:'18px 24px', background:'transparent', color: p.ink,
                border:`1px solid ${p.ink}`, fontFamily:'inherit', fontSize: 12,
                letterSpacing:'0.22em', cursor:'pointer',
              }}>INDEX</button>
              <button onClick={onGlossary} style={{
                padding:'18px 24px', background:'transparent', color: p.ink,
                border:`1px solid ${p.ink}`, fontFamily:'inherit', fontSize: 12,
                letterSpacing:'0.22em', cursor:'pointer',
              }}>APPENDIX</button>
            </div>
          </div>

          <div>
            <div style={{ position:'relative', height: 380, background: p.bg2, border:`1px solid ${p.ink}`, padding:6 }}>
              <div style={{
                position:'absolute', inset:6,
                background: p.isDark
                  ? 'repeating-linear-gradient(45deg, #0E1A0E 0 8px, #0A130A 8px 16px)'
                  : 'repeating-linear-gradient(45deg, #C9BE9E 0 8px, #BDB18D 8px 16px)',
              }}/>
              <div style={{ position:'absolute', top:14, left:18, fontSize:10, letterSpacing:'0.2em', color: p.faint, background: p.bg, padding:'3px 8px', fontFamily:'"JetBrains Mono", monospace' }}>EXHIBIT A — SERVICE SECTOR</div>
              <div style={{ position:'absolute', inset:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ textAlign:'center', fontFamily:'"JetBrains Mono", monospace', color: p.faint, fontSize: 12, letterSpacing:'0.18em', lineHeight: 2 }}>
                  <div>ISLA NUBLAR / 1993</div>
                  <div>RAPTOR SERVICE LEVEL</div>
                  <div>BIOHAZARD AREA</div>
                  <div style={{ marginTop: 12, color: p.accent, fontSize: 14 }}>STAFF ONLY</div>
                </div>
              </div>
              {[[14,14,1,1],[14,'auto',1,0],['auto',14,0,1],['auto','auto',0,0]].map(([t,l,top,left],i)=>(
                <div key={i} style={{
                  position:'absolute',
                  top: t==='auto'?'auto':t, bottom: t==='auto'?14:'auto',
                  left:l==='auto'?'auto':l, right:l==='auto'?14:'auto',
                  width:20, height:20,
                  borderTop: top?`2px solid ${p.accent}`:'none',
                  borderBottom: !top?`2px solid ${p.accent}`:'none',
                  borderLeft: left?`2px solid ${p.accent}`:'none',
                  borderRight: !left?`2px solid ${p.accent}`:'none',
                }}/>
              ))}
            </div>

            <div style={{ marginTop: 24, borderTop:`1px solid ${p.ink}`, borderBottom:`1px solid ${p.ink}`, padding:'14px 0', fontSize: 12 }}>
              {[
                ['STATUS',    n.status.toUpperCase()],
                ['CHAPTERS',  String(n.chapterCount)],
                ['LENGTH',    n.totalWords + ' W'],
                ['UPDATED',   'APR 26 / 2026'],
                ['CLASSIFIED','THRILLER · ADAPTATION'],
              ].map(([k,v],i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom: i<4?`1px dashed ${p.faint}66`:'none' }}>
                  <MonoSmall color={p.faint} style={{ fontSize: 11 }}>{k}</MonoSmall>
                  <MonoSmall color={p.ink} style={{ fontSize: 11, fontWeight: 700 }}>{v}</MonoSmall>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function DesktopTOC({ tw, onOpen, onBack, onGlossary, currentChapter, completedChapters }) {
  const p = getPalette(tw);
  const n = window.NOVEL;
  const completedSet = new Set(completedChapters);
  const readPct = Math.round((completedSet.size / n.chapterCount) * 100);

  return (
    <div style={{ position:'relative', minHeight:'100vh', color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', maxWidth: 1240, margin:'0 auto', padding:'30px 56px 80px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 12 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'inherit', fontSize:11, letterSpacing:'0.2em', cursor:'pointer', padding:0 }}>← FILE 04-2026</button>
          <MonoSmall color={p.faint}>{n.chapterCount} ENTRIES · {readPct}% READ</MonoSmall>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize: 56, letterSpacing:'-0.02em', margin:'12px 0 8px' }}>{n.title}</h2>
        <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 28 }}>INDEX · {n.chapterCount} OF {n.chapterCount} LOGGED</MonoSmall>

        <div style={{ marginBottom: 36 }}>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${n.chapterCount}, 1fr)`, gap: 4 }}>
            {n.chapters.map((c, i) => {
              const state = completedSet.has(c.n) ? 'done' : c.n === currentChapter ? 'now' : 'todo';
              return (
                <div key={i} style={{
                  height: 22,
                  background: state==='done' ? p.ink : state==='now' ? p.accent : 'transparent',
                  border: `1px solid ${state==='todo' ? p.faint+'88' : p.ink}`,
                }}/>
              );
            })}
          </div>
        </div>

        <div onClick={() => onOpen(currentChapter)} style={{
          border:`1px solid ${p.accent}`, padding:'20px 24px', marginBottom: 36, position:'relative', cursor:'pointer',
          background: p.isDark ? `${p.accent}18` : `${p.accent}12`,
          display:'flex', justifyContent:'space-between', alignItems:'center',
        }}>
          <div style={{ position:'absolute', top:-9, left:14, background: p.bg, padding:'0 8px' }}>
            <MonoSmall color={p.accent} style={{ fontWeight:700 }}>◉ ACTIVE</MonoSmall>
          </div>
          <div>
            <MonoSmall color={p.faint} style={{ display:'block' }}>RESUME AT</MonoSmall>
            <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:28, fontWeight: 600, margin:'4px 0' }}>
              {String(currentChapter).padStart(2,'0')} / {n.chapters[currentChapter-1].title}
            </div>
            <MonoSmall color={p.faint}>{n.chapters[currentChapter-1].words.toLocaleString()} W</MonoSmall>
          </div>
          <div style={{ fontSize: 32, color: p.accent }}>→</div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', columnGap: 36, rowGap: 0 }}>
          {n.chapters.map(c => {
            const state = completedSet.has(c.n) ? 'done' : c.n === currentChapter ? 'now' : 'todo';
            return (
              <div key={c.n}
                onClick={() => onOpen(c.n)}
                style={{
                  borderBottom:`1px dashed ${p.faint}55`, padding:'14px 0',
                  display:'flex', alignItems:'center', gap:14, cursor:'pointer',
                }}>
                <div style={{ width:28, fontSize:13, fontWeight:700, color: state==='now'?p.accent : state==='done'?p.ink : p.faint }}>
                  {String(c.n).padStart(2,'0')}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{
                    fontFamily:'"Newsreader", Georgia, serif', fontSize:19, fontWeight:500,
                    color: p.ink,
                    textDecoration: state==='done' ? `line-through ${p.faint}` : 'none',
                  }}>{c.title}</div>
                  <MonoSmall color={p.faint} style={{ display:'block', marginTop:3 }}>
                    {c.words.toLocaleString()} W · 2026.04.26
                  </MonoSmall>
                </div>
                <div style={{ width:18, textAlign:'right', fontSize:13, color: state==='now'?p.accent:p.faint }}>
                  {state==='done' ? '✓' : state==='now' ? '●' : '·'}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 36, textAlign:'center' }}>
          <button onClick={onGlossary} style={{
            background:'transparent', color: p.ink, border:`1px solid ${p.ink}`,
            padding:'14px 28px', fontFamily:'inherit', fontSize:12,
            letterSpacing:'0.22em', cursor:'pointer',
          }}>APPENDIX-G — GLOSSARY ↗</button>
        </div>

      </div>
    </div>
  );
}

function DesktopReader({ tw, chapter, onBack, onPrev, onNext, onTooltip, activeTooltip, onOpenChapter, completedChapters }) {
  const p = getPalette(tw);
  const n = window.NOVEL;
  const chData = window.NOVEL_CH[chapter] || null;
  const chMeta = n.chapters[chapter - 1];
  const completedSet = new Set(completedChapters);
  const [revealed, setRevealed] = React.useState(new Set());
  const [stampVisible, setStampVisible] = React.useState(false);
  const [evidenceCollapsed, setEvidenceCollapsed] = React.useState(false);

  React.useEffect(() => {
    setStampVisible(false); setRevealed(new Set());
    const t = setTimeout(() => setStampVisible(true), 220);
    return () => clearTimeout(t);
  }, [chapter]);

  const REDACT_TARGETS = ['InGen', 'asset', 'incident residue'];

  const parseInline = (text, baseKey) => {
    const result = [];
    const italicParts = text.split(/(<i>[^<]*<\/i>)/g);
    italicParts.forEach((part, ii) => {
      if (part.startsWith('<i>') && part.endsWith('</i>')) {
        result.push(<i key={`${baseKey}-i${ii}`}>{part.slice(3, -4)}</i>);
      } else {
        const rtok = part.split(/(\bInGen\b|\basset\b|\bincident residue\b)/g);
        rtok.forEach((tok, ti) => {
          if (REDACT_TARGETS.includes(tok)) {
            const id = `${baseKey}-r${ii}-${ti}`;
            const isRev = revealed.has(id);
            result.push(
              <span key={id} onClick={(e) => {
                e.stopPropagation();
                setRevealed(s => { const ns = new Set(s); ns.add(id); return ns; });
              }} style={{
                background: isRev ? 'transparent' : p.ink,
                color: isRev ? p.accent : 'transparent',
                cursor: 'pointer', padding: '0 2px',
                transition: 'background 0.3s',
                borderBottom: isRev ? `1px dotted ${p.accent}` : 'none',
                fontWeight: isRev ? 600 : 400,
              }}>{isRev ? tok : '█'.repeat(Math.max(3, tok.length))}</span>
            );
          } else {
            result.push(tok);
          }
        });
      }
    });
    return result;
  };

  const renderPara = (text, key) => {
    const gParts = text.split(/(\{\{[^}]+\}\})/g);
    const content = gParts.flatMap((part, i) => {
      const m = part.match(/^\{\{(.+)\}\}$/);
      if (m) {
        return [<span key={`${key}-g${i}`} onClick={() => onTooltip(m[1])} style={{
          color: p.accent, cursor:'pointer',
          textDecoration:`underline dotted ${p.accent}99`,
          textUnderlineOffset: 4, fontWeight: 500,
        }}>{m[1]}</span>];
      }
      return parseInline(part, `${key}-p${i}`);
    });
    return (
      <p key={key} style={{
        fontFamily: tw.bodyFont === 'mono' ? '"JetBrains Mono", monospace' : '"Newsreader", Georgia, serif',
        fontSize: tw.fontSize + 2, lineHeight: tw.lineHeight, color: p.ink,
        margin: '0 0 1.2em',
        textAlign: tw.justify ? 'justify' : 'left',
        textWrap: 'pretty', hyphens: tw.justify ? 'auto' : 'manual',
      }}>{content}</p>
    );
  };

  const renderItem = (item, key) => {
    if (item && typeof item === 'object' && item.type === 'image') {
      const chStr = String(chapter).padStart(3, '0');
      return (
        <div key={key} style={{ margin: '2em 0', lineHeight: 0 }}>
          <img
            src={`images/jurassic-left-behind/chapter-${chStr}/${item.src}`}
            alt={item.alt || ''}
            onError={(e) => { e.target.parentNode.style.display = 'none'; }}
            style={{ width:'100%', display:'block', border: `1px solid ${p.faint}40` }}
          />
          {item.alt && (
            <div style={{ fontFamily:'"JetBrains Mono", monospace', fontSize: 9, color: p.faint, letterSpacing: '0.1em', padding: '5px 4px 0', lineHeight: 1.4 }}>
              {item.alt}
            </div>
          )}
        </div>
      );
    }
    return renderPara(item, key);
  };

  return (
    <div style={{ position:'relative', minHeight:'100vh', color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{
        position:'sticky', top:0, zIndex: 10, background: p.bg + 'F0', backdropFilter:'blur(10px)',
        borderBottom:`1px solid ${p.ink}`, padding:'12px 32px',
        display:'flex', alignItems:'center', gap:16,
      }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color: p.ink, fontFamily:'inherit', fontSize:11, letterSpacing:'0.2em', cursor:'pointer', padding:0 }}>← INDEX</button>
        <div style={{ flex:1, textAlign:'center', fontSize:11, letterSpacing:'0.2em', color: p.faint, fontWeight: 700 }}>
          FILE 04-2026 · CH. {String(chapter).padStart(2,'0')} / {n.chapterCount}
        </div>
        <button onClick={() => setEvidenceCollapsed(v=>!v)} style={{
          background: !evidenceCollapsed ? p.ink : 'transparent',
          color: !evidenceCollapsed ? p.bg : p.ink,
          border:`1px solid ${p.ink}`, padding:'5px 12px',
          fontFamily:'inherit', fontSize:10, letterSpacing:'0.18em', cursor:'pointer',
        }}>EVIDENCE</button>
      </div>

      <div style={{
        position:'relative',
        display:'grid',
        gridTemplateColumns: evidenceCollapsed ? '260px 1fr 0px' : '260px 1fr 320px',
        transition:'grid-template-columns 220ms ease',
        maxWidth: 1400, margin:'0 auto', minHeight: 'calc(100vh - 50px)',
      }}>

        {/* LEFT — chapter rail */}
        <div style={{
          borderRight:`1px solid ${p.faint}55`, padding:'24px 18px',
          position:'sticky', top: 51, alignSelf:'flex-start', maxHeight:'calc(100vh - 51px)', overflowY:'auto',
        }}>
          <MonoSmall color={p.faint} style={{ display:'block', marginBottom: 12 }}>CHAPTERS · {n.chapterCount}</MonoSmall>
          {n.chapters.map(c => {
            const state = completedSet.has(c.n) ? 'done' : c.n === chapter ? 'active' : 'todo';
            return (
              <div key={c.n} onClick={() => onOpenChapter(c.n)} style={{
                padding:'8px 10px', marginBottom: 2, cursor:'pointer',
                background: state==='active' ? p.accent + '20' : 'transparent',
                borderLeft: `2px solid ${state==='active' ? p.accent : 'transparent'}`,
                display:'flex', gap:10, alignItems:'baseline',
              }}>
                <span style={{ fontSize: 10, color: state==='active' ? p.accent : p.faint, fontWeight: 700, width: 22, fontFamily:'"JetBrains Mono", monospace' }}>
                  {String(c.n).padStart(2,'0')}
                </span>
                <span style={{
                  fontFamily:'"Newsreader", Georgia, serif', fontSize:13,
                  color: state==='todo' ? p.faint : p.ink,
                  fontWeight: state==='active' ? 600 : 400,
                  textDecoration: state==='done' ? `line-through ${p.faint}` : 'none',
                  lineHeight: 1.35,
                }}>{c.title}</span>
              </div>
            );
          })}
        </div>

        {/* CENTER — reader */}
        <div style={{ padding:'48px 64px 80px', position:'relative', minWidth: 0 }}>
          {stampVisible && tw.stamps > 0 && (
            <div style={{ position:'absolute', top: 40, right: 40, zIndex: 2 }} className="stamp-slam-anim">
              <DossierStamp color={p.accent} rotate={-12} style={{ fontSize: 13, padding:'6px 14px' }}>FILED · APR 26</DossierStamp>
            </div>
          )}

          <div style={{ maxWidth: 680, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 18, marginBottom: 6 }}>
              <span style={{ fontSize: 80, fontWeight: 700, color: p.ink, letterSpacing:'-0.04em', lineHeight:1, fontFamily:'"JetBrains Mono", monospace' }}>
                {String(chapter).padStart(2,'0')}
              </span>
              <div>
                <MonoSmall color={p.faint} style={{ display:'block', fontSize: 11 }}>CHAPTER {toRoman(chapter)}</MonoSmall>
                <MonoSmall color={p.accent} style={{ fontWeight:700, display:'block', fontSize: 11 }}>SECTION I</MonoSmall>
              </div>
            </div>
            <h1 style={{
              fontFamily:'"Newsreader", Georgia, serif', fontWeight:600,
              fontSize: 48, letterSpacing:'-0.015em', lineHeight:1.05, margin:'8px 0 28px',
            }}>{chMeta ? chMeta.title : `Chapter ${chapter}`}</h1>

            <DLine p={p}/>

            {chData && chData.epigraph && (
              <div style={{
                margin:'24px 0 36px', padding:'18px 22px',
                background: p.isDark ? `${p.accent}15` : `${p.ink}06`,
                borderLeft:`3px solid ${p.accent}`,
                fontFamily:'"JetBrains Mono", monospace', fontSize: 13, lineHeight: 1.6,
              }}>
                <MonoSmall color={p.faint} style={{ display:'block', marginBottom:8 }}>
                  INTERCEPT · ISLA NUBLAR · 1993
                </MonoSmall>
                "{chData.epigraph.text}"
                <div style={{ fontSize:11, color: p.faint, marginTop:10 }}>{chData.epigraph.attribution}</div>
              </div>
            )}

            {chData && chData.paragraphs ? (
              chData.paragraphs.map((item, i) => renderItem(item, i))
            ) : (
              <div style={{ padding: '48px 0', textAlign:'center', fontFamily:'"JetBrains Mono", monospace', color: p.faint }}>
                <div style={{ fontSize: 48, marginBottom: 18, letterSpacing: '0.2em' }}>█ █ █</div>
                <MonoSmall color={p.faint}>SECTION NOT ON FILE</MonoSmall>
                <div style={{ fontSize:12, color: p.faint, marginTop:10 }}>
                  {chMeta && chMeta.words ? `${chMeta.words.toLocaleString()} W · CLASSIFIED` : 'ACCESS PENDING'}
                </div>
              </div>
            )}

            {tw.ornaments && chData && chData.paragraphs && (
              <div style={{ textAlign:'center', margin:'32px 0', color: p.faint, fontSize:13, letterSpacing:'0.4em' }}>
                ─── §§§ ───
              </div>
            )}

            <DLine p={p} dashed/>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 0 4px', fontSize:11, letterSpacing:'0.2em' }}>
              <button onClick={onPrev} disabled={chapter<=1} style={{ background:'none', border:'none', color: chapter<=1?p.faint:p.ink, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor: chapter<=1?'default':'pointer', padding:0 }}>
                ← CH {String(Math.max(1,chapter-1)).padStart(2,'0')}
              </button>
              <span style={{ color: p.ink, fontWeight: 700 }}>{String(chapter).padStart(2,'0')} / {n.chapterCount}</span>
              <button onClick={onNext} disabled={chapter>=n.chapterCount} style={{ background:'none', border:'none', color: p.accent, fontFamily:'inherit', fontSize:'inherit', letterSpacing:'inherit', cursor:'pointer', padding:0 }}>
                CH {String(Math.min(n.chapterCount,chapter+1)).padStart(2,'0')} →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — evidence sidecar */}
        {!evidenceCollapsed && (
          <div style={{
            borderLeft:`1px solid ${p.faint}55`, padding:'24px 18px',
            position:'sticky', top: 51, alignSelf:'flex-start', maxHeight:'calc(100vh - 51px)', overflowY:'auto',
          }}>
            <MonoSmall color={p.accent} style={{ display:'block', fontWeight:700, marginBottom: 12 }}>
              EVIDENCE · CH {String(chapter).padStart(2,'0')}
            </MonoSmall>
            {[
              { tag:'WHO',   label:'Mateo Valverde',   note:'Temporary contractor. Badge valid 14 days.' },
              { tag:'WHERE', label:'Isla Nublar',       note:'Service level. Staff only.' },
              { tag:'WHAT',  label: chMeta ? chMeta.title : `Chapter ${chapter}`, note: chMeta ? `${chMeta.words?.toLocaleString()} words.` : '' },
              { tag:'WHEN',  label:'1993',              note:'Nine days after Jophery Brown. Storm incoming.' },
            ].map((it, i) => (
              <div key={i} style={{ borderBottom: `1px dashed ${p.faint}66`, padding:'12px 0' }}>
                <MonoSmall color={p.faint}>{it.tag}</MonoSmall>
                <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:15, fontWeight:600, color: p.ink, margin:'2px 0 4px' }}>{it.label}</div>
                <div style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:12, lineHeight:1.5, color: p.ink2 }}>{it.note}</div>
              </div>
            ))}
            <MonoSmall color={p.faint} style={{ display:'block', marginTop:16, textAlign:'center' }}>─── EOF ───</MonoSmall>
          </div>
        )}
      </div>

      {activeTooltip && <DesktopTooltip p={p} term={activeTooltip} onClose={() => onTooltip(null)}/>}
    </div>
  );
}

function DesktopTooltip({ p, term, onClose }) {
  const all = Object.assign({}, window.NOVEL.glossary, window.NOVEL_GLOSS_EXT);
  const entry = all[term] || { cat:'unknown', def:'No entry on file. Cross-reference Appendix-G.' };
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:30, display:'flex', alignItems:'center', justifyContent:'center', background:'#0008' }}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:'relative', maxWidth: 560, width:'90%',
        background: p.bg2, border:`2px solid ${p.accent}`,
        padding:'24px 28px 28px', fontFamily:'"JetBrains Mono", monospace',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 12 }}>
          <MonoSmall color={p.accent} style={{ fontWeight:700 }}>GLOSSARY · {(entry.cat||'').toUpperCase()}</MonoSmall>
          <button onClick={onClose} style={{ background:'none', border:`1px solid ${p.ink}`, color: p.ink, padding:'3px 10px', fontSize:10, fontFamily:'inherit', cursor:'pointer' }}>CLOSE ✕</button>
        </div>
        <h3 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:32, margin:'0 0 12px', color: p.ink }}>{term}</h3>
        <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:16, lineHeight:1.55, color: p.ink, margin:0 }}>{entry.def}</p>
        <MonoSmall color={p.faint} style={{ display:'block', marginTop:18 }}>SEE FULL FILE → APPENDIX-G</MonoSmall>
      </div>
    </div>
  );
}

function DesktopGlossary({ tw, onBack }) {
  const p = getPalette(tw);
  const n = window.NOVEL;
  const [filter, setFilter] = React.useState('ALL');
  const [query, setQuery] = React.useState('');
  const cats = ['ALL', ...n.glossaryFull.map(s => s.cat.toUpperCase())];

  return (
    <div style={{ position:'relative', minHeight:'100vh', color: p.ink, fontFamily:'"JetBrains Mono", monospace' }}>
      <DossierBg p={p} tw={tw}/>
      <div style={{ position:'relative', maxWidth: 1240, margin:'0 auto', padding:'30px 56px 80px' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color: p.faint, fontFamily:'inherit', fontSize:11, letterSpacing:'0.2em', cursor:'pointer', padding:0 }}>← BACK</button>
          <MonoSmall color={p.faint}>APPENDIX-G</MonoSmall>
        </div>
        <h2 style={{ fontFamily:'"Newsreader", Georgia, serif', fontWeight:600, fontSize:54, letterSpacing:'-0.02em', margin:'14px 0 8px' }}>Glossary</h2>
        <MonoSmall color={p.faint} style={{ display:'block', marginBottom:24 }}>
          {n.glossaryFull.reduce((a,s)=>a+s.terms.length,0)} TERMS · {n.glossaryFull.length} CATEGORIES
        </MonoSmall>

        <div style={{ display:'flex', gap: 16, marginBottom: 24 }}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:10, border:`1.5px solid ${p.ink}`, padding:'12px 16px' }}>
            <span style={{ color: p.faint, fontSize:14 }}>⌕</span>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="filter terms…"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:'inherit', fontSize:13, color: p.ink }}/>
          </div>
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom: 32 }}>
          {cats.map(c => (
            <button key={c} onClick={()=>setFilter(c)} style={{
              fontSize:10, letterSpacing:'0.2em', padding:'6px 12px', border:`1px solid ${p.ink}`,
              background: filter===c ? p.ink : 'transparent', color: filter===c ? p.bg : p.ink,
              fontFamily:'inherit', cursor:'pointer',
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', columnGap: 56, rowGap: 0 }}>
          {n.glossaryFull.filter(s => filter==='ALL' || s.cat.toUpperCase()===filter).map((sec, si) => {
            const terms = sec.terms.filter(t => !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.short.toLowerCase().includes(query.toLowerCase()));
            if (terms.length === 0) return null;
            return (
              <div key={si} style={{ marginBottom:32, breakInside:'avoid' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <MonoSmall color={p.ink} style={{ fontWeight:700 }}>{sec.cat.toUpperCase()}</MonoSmall>
                  <div style={{ flex:1, borderTop:`1px dashed ${p.faint}` }}/>
                  <MonoSmall color={p.faint}>{String(terms.length).padStart(2,'0')}</MonoSmall>
                </div>
                {terms.map((t, ti) => (
                  <div key={ti} style={{ borderBottom:`1px solid ${p.faint}33`, padding:'14px 0' }}>
                    <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
                      <span style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:20, fontWeight:600, color: p.ink }}>{t.name}</span>
                      {t.alias && <MonoSmall color={p.accent}>A.K.A. {t.alias.toUpperCase()}</MonoSmall>}
                    </div>
                    <p style={{ fontFamily:'"Newsreader", Georgia, serif', fontSize:14, lineHeight:1.55, color: p.ink, margin:'4px 0 0' }}>{t.short}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.DesktopCover = DesktopCover;
window.DesktopTOC = DesktopTOC;
window.DesktopReader = DesktopReader;
window.DesktopGlossary = DesktopGlossary;
