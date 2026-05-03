import { useState, useRef, useCallback } from 'react'
import { pipelineStages } from '../data/portfolio.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const LOGS = [
  ['$ kafka-consumer --topic raw-data --partitions 3', true],
  ['  Consuming... 43,000 records/sec · schema validation OK', false],
  ['$ spark-submit feature_engineering.py --executor-memory 4g', true],
  ['  120 features extracted · null imputation · coverage 99.8%', false],
  ['$ python train.py --model xgboost --shap-explain --cv 5', true],
  ['  Fold 1/5 → 82.1% · Fold 5/5 → 85.4% · best model saved', false],
  ['$ uvicorn api:app --host 0.0.0.0 --port 8000 --workers 4', true],
  ['  FastAPI live · MongoDB connected · p99 latency 12ms', false],
  ['$ docker build -t snavya/app:latest . && kubectl apply -f k8s/', true],
  ['  3/3 pods Running · GH Actions CI passed · coverage 82% (+30%)', false],
  ['', false],
  ['✓ Pipeline complete · All 5 stages green · Ready for production', true],
]

export default function Pipeline() {
  const [active, setActive] = useState(null)
  const [done, setDone] = useState([])
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState('← Click a stage to inspect · Hit RUN to execute end-to-end')
  const [logLines, setLogLines] = useState([])
  const [packets, setPackets] = useState([])
  const pkIdRef = useRef(0)
  const [ref, vis] = useReveal()

  function selectStage(i) {
    if (running) return
    const s = pipelineStages[i]
    setActive(i)
    setLog(null)
    setLogLines([
      { text: `$ inspect: ${s.name}`, hi: true },
      { text: `stack: ${s.tech}`, hi: false },
      { text: s.desc, hi: false },
    ])
  }

  function spawnPacket(fromPct, toPct, delay) {
    const id = pkIdRef.current++
    setTimeout(() => {
      setPackets(prev => [...prev, { id, from: fromPct, to: toPct, active: false }])
      setTimeout(() => {
        setPackets(prev => prev.map(p => p.id === id ? { ...p, active: true } : p))
        setTimeout(() => setPackets(prev => prev.filter(p => p.id !== id)), 2200)
      }, 50)
    }, delay)
  }

  const runPipeline = useCallback(() => {
    if (running) return
    setRunning(true)
    setActive(null)
    setDone([])
    setPackets([])
    setLogLines([])
    setLog(null)

    for (let si = 0; si < 5; si++) {
      setTimeout(() => {
        setActive(si)
        const sp = si * 20
        for (let pk = 0; pk < 4; pk++) spawnPacket(sp + 2, sp + 18, pk * 340)
        setTimeout(() => { setActive(null); setDone(prev => [...prev, si]) }, 2100)
      }, si * 2200)
    }

    LOGS.forEach((line, i) => {
      setTimeout(() => {
        if (!line[0]) { setLogLines(prev => [...prev, null]); return }
        setLogLines(prev => [...prev, { text: line[0], hi: line[1] }])
      }, i * 380 + 200)
    })

    setTimeout(() => {
      setRunning(false)
      spawnPacket(2, 97, 0)
      setTimeout(() => spawnPacket(2, 97, 0), 350)
    }, 5 * 2200 + 600)
  }, [running])

  const sel = active !== null ? pipelineStages[active] : null

  return (
    <section id="pipeline" style={{padding:'0 2.5rem 5.5rem',maxWidth:1100,margin:'0 auto'}}>
      <SectionHeader eyebrow="002.5 · INTERACTIVE" title='Run my <em style="font-style:italic;color:var(--gold)">pipeline</em>' />
      <p style={{fontSize:14,color:'var(--mu)',maxWidth:500,marginBottom:'2rem',lineHeight:1.85}}>How I think about systems end-to-end. Click any stage to inspect the stack, or hit Run to watch data flow through live.</p>

      <div ref={ref} style={{opacity:vis?1:0,transition:'opacity .6s ease',background:'var(--s1)',border:'1px solid var(--br)',padding:'1.75rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem',paddingBottom:'1rem',borderBottom:'1px solid var(--br)'}}>
          <span style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--mu)',letterSpacing:'.14em'}}>// ML PRODUCTION PIPELINE · CLICK TO INSPECT · RUN TO EXECUTE</span>
          <button onClick={runPipeline} disabled={running} style={{fontFamily:'var(--fm)',fontSize:10,fontWeight:700,color:'var(--bg)',background:'var(--gold)',border:'none',padding:'5px 14px',letterSpacing:'.06em',opacity:running?.45:1}}>
            {running ? '◉ RUNNING...' : '▶ RUN PIPELINE'}
          </button>
        </div>

        <div style={{display:'flex',gap:2,background:'var(--br)'}}>
          {pipelineStages.map((s, i) => (
            <div key={i} onClick={() => selectStage(i)} style={{
              flex:1,background:active===i?'rgba(240,165,0,.05)':done.includes(i)?'rgba(240,165,0,.04)':'var(--s2)',
              padding:'1.1rem',position:'relative',overflow:'hidden',cursor:'pointer',
              transition:'background .2s',borderRight:i<4?'1px solid var(--br)':'none',
            }}>
              <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--mu)',letterSpacing:'.1em',marginBottom:'.4rem'}}>{s.num}</div>
              <div style={{fontFamily:'var(--fm)',fontSize:11,fontWeight:700,color:'var(--tx)',marginBottom:'.3rem',lineHeight:1.3}}>{s.name}</div>
              <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--gold)',lineHeight:1.5,opacity:(active===i||done.includes(i))?1:0,transition:'opacity .3s'}}>{s.tech}</div>
              <div style={{position:'absolute',bottom:0,left:0,height:2,background:'var(--gold)',
                width: done.includes(i)?'100%':active===i?'100%':'0',
                transition: active===i?'width 2s linear':'width 0s',
              }}></div>
            </div>
          ))}
        </div>

        {/* Packet track */}
        <div style={{height:32,position:'relative',overflow:'hidden',margin:'.75rem 0'}}>
          {packets.map(pk => (
            <div key={pk.id} style={{position:'absolute',top:'50%',transform:'translateY(-50%)',width:8,height:8,borderRadius:'50%',background:'var(--gold)',
              left: pk.active ? `${pk.to}%` : `${pk.from}%`,
              opacity: pk.active ? 1 : 0,
              transition: pk.active ? 'left 1.9s cubic-bezier(.4,0,.2,1)' : 'opacity .1s',
            }}></div>
          ))}
        </div>

        <div style={{fontFamily:'var(--fm)',fontSize:11,color:'var(--mu)',lineHeight:1.9,minHeight:72,padding:'.65rem .85rem',background:'var(--bg)',border:'1px solid var(--br)',marginTop:'.75rem',overflowY:'auto',maxHeight:140}}>
          {log && <span>{log}</span>}
          {logLines.map((l, i) => l === null ? <br key={i}/> : (
            <div key={i} style={{color:l.hi?'var(--gold)':'var(--mu)'}}>{l.text}</div>
          ))}
        </div>

        {sel && (
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap',marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid var(--br)'}}>
            <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--mu)',letterSpacing:'.1em',marginBottom:3}}>STAGE</div><div style={{fontSize:14,fontWeight:600,color:'var(--tx)'}}>{sel.name}</div></div>
            <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--mu)',letterSpacing:'.1em',marginBottom:3}}>STACK</div><div style={{fontSize:12,fontFamily:'var(--fm)',color:'var(--gold)'}}>{sel.tech}</div></div>
            <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--mu)',letterSpacing:'.1em',marginBottom:3}}>{sel.m1}</div><div style={{fontSize:14,fontWeight:600,color:'var(--tx)'}}>{sel.v1}</div></div>
            <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--mu)',letterSpacing:'.1em',marginBottom:3}}>{sel.m2}</div><div style={{fontSize:14,fontWeight:600,color:'var(--tx)'}}>{sel.v2}</div></div>
          </div>
        )}
      </div>
    </section>
  )
}
