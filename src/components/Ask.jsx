import { useState, useRef, useEffect } from 'react'
import { meta, projects, skills, experience } from '../data/portfolio.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const C = {
  bg: '#08090e', prompt: '#00d4ff', cmd: '#ffffff',
  out: 'rgba(237,234,224,0.78)', err: '#ff4444',
  gold: '#f0a500', mu: '#58607a',
}

function renderText(text) {
  return text.split(/(<gold>.*?<\/gold>)/g).map((part, i) =>
    part.startsWith('<gold>')
      ? <span key={i} style={{ color: C.gold }}>{part.slice(6, -7)}</span>
      : <span key={i}>{part}</span>
  )
}

function processCommand(raw) {
  const cmd = raw.trim()
  const lower = cmd.toLowerCase()

  if (!cmd) return []

  if (lower === 'clear') return [{ type: 'clear' }]

  if (lower === 'help') {
    return [
      { type: 'output', text: 'Available commands:' },
      { type: 'blank' },
      { type: 'output', text: '  whoami                   About Snavya' },
      { type: 'output', text: '  cat why_hire_me.txt       Why you should hire me' },
      { type: 'output', text: '  cat experience.txt        Work history' },
      { type: 'output', text: '  cat skills.txt            Tech stack' },
      { type: 'output', text: '  cat contact.txt           Contact info' },
      { type: 'output', text: '  ls projects/              List all projects' },
      { type: 'output', text: '  cat <project>             Project details' },
      { type: 'output', text: '    → lillian, notary, investment, startup, unlearning, quantum' },
      { type: 'output', text: '  git log                   Commit history of my career' },
      { type: 'output', text: '  open resume               Open resume PDF' },
      { type: 'output', text: '  sudo hire me              ...' },
      { type: 'output', text: '  clear                     Clear terminal' },
      { type: 'blank' },
    ]
  }

  if (lower === 'whoami') {
    return [
      { type: 'output', text: `<gold>${meta.name}</gold>` },
      { type: 'output', text: meta.degree },
      { type: 'output', text: 'Applied AI Engineer · ML Engineer · Software Engineer' },
      { type: 'output', text: meta.location },
      { type: 'blank' },
    ]
  }

  if (lower === 'ls') {
    return [
      { type: 'output', text: 'experience.txt  projects/  skills.txt  contact.txt  resume.pdf' },
      { type: 'blank' },
    ]
  }

  if (lower === 'ls projects' || lower === 'ls projects/') {
    const lines = [{ type: 'output', text: 'projects/' }]
    projects.forEach((p, i) => {
      lines.push({ type: 'output', text: `  ${String(i + 1).padStart(2, '0')}. ${p.title}` })
    })
    lines.push({ type: 'blank' })
    return lines
  }

  if (lower === 'cat experience.txt') {
    const lines = []
    experience.forEach(e => {
      lines.push({ type: 'output', text: `<gold>${e.title}</gold>` })
      lines.push({ type: 'output', text: `${e.company} · ${e.date}` })
      e.bullets.forEach(b => {
        lines.push({ type: 'output', text: '  · ' + b.replace(/<[^>]*>/g, '') })
      })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'cat skills.txt') {
    const lines = []
    skills.forEach(s => {
      lines.push({ type: 'output', text: `<gold>${s.category}</gold>` })
      lines.push({ type: 'output', text: '  ' + s.items.join(' · ') })
      lines.push({ type: 'blank' })
    })
    return lines
  }

  if (lower === 'cat contact.txt') {
    return [
      { type: 'output', text: `email     <gold>${meta.email}</gold>` },
      { type: 'output', text: `linkedin  ${meta.linkedin}` },
      { type: 'output', text: `github    ${meta.github}` },
      { type: 'output', text: `location  ${meta.location}` },
      { type: 'blank' },
    ]
  }

  if (lower === 'open resume') {
    window.open(meta.resumeUrl, '_blank')
    return [
      { type: 'output', text: 'Opening resume in new tab...' },
      { type: 'blank' },
    ]
  }

  if (lower === 'sudo hire me') {
    return [
      { type: 'output', text: '[sudo] password for hiring_manager: ****' },
      { type: 'output', text: '<gold>✓ Access granted. Offer letter dispatched.</gold>' },
      { type: 'blank' },
    ]
  }

  if (lower === 'git log') {
    return [
      { type: 'output', text: 'commit a3f8c12  (HEAD → main)' },
      { type: 'output', text: 'Author: Snavya Sai <smuntimu@asu.edu>' },
      { type: 'output', text: 'Date:   Graduating May 2026 · 4.0 GPA · M.S. Data Science · ASU' },
      { type: 'blank' },
      { type: 'output', text: '    feat: building full AI pipeline for The Lillian Project (capstone)' },
      { type: 'output', text: '    feat: Head of Industry Relations · IEEE Eta Kappa Nu' },
      { type: 'blank' },
      { type: 'output', text: 'commit b7d2e09' },
      { type: 'output', text: '    feat: 85% startup exit model shipped to production · Hissa' },
      { type: 'output', text: '    feat: machine unlearning on Phi + Mamba · PEFT · LoRA' },
      { type: 'output', text: '    feat: Quantum ML paper published · Runner-Up Unisys Innovation Program' },
      { type: 'blank' },
      { type: 'output', text: 'commit c1e9f44' },
      { type: 'output', text: '    feat: RAG chatbot shipped to 50+ Mercedes-Benz technicians on AWS' },
      { type: 'output', text: '    feat: 35% latency reduction · 25+ features · CI/CD on GitHub Actions' },
      { type: 'blank' },
    ]
  }

  if (lower === 'cat why_hire_me.txt') {
    return [
      { type: 'output', text: '<gold>// why_hire_me.txt</gold>' },
      { type: 'blank' },
      { type: 'output', text: 'I ship end-to-end. Not just models, not just code — full systems.' },
      { type: 'blank' },
      { type: 'output', text: '  <gold>→</gold> Shipped a RAG GenAI chatbot to 50+ technicians at Mercedes-Benz R&D' },
      { type: 'output', text: '  <gold>→</gold> Built an 85%-accurate startup exit model in production at Hissa' },
      { type: 'output', text: '  <gold>→</gold> 4.0 GPA · M.S. Data Science · ASU · May 2026' },
      { type: 'output', text: '  <gold>→</gold> Published research · Runner-Up Unisys Innovation Program Year 14' },
      { type: 'output', text: '  <gold>→</gold> Full stack: data pipelines → model training → API → cloud deployment' },
      { type: 'blank' },
      { type: 'output', text: 'I own the problem from raw data to deployed product.' },
      { type: 'output', text: 'Less interested in demos. More interested in systems that actually ship.' },
      { type: 'blank' },
    ]
  }

  if (lower === 'vim' || lower === 'vi') {
    return [
      { type: 'output', text: 'VIM - Vi IMproved 9.0' },
      { type: 'error', text: 'Nice try. This is a portfolio terminal, not a text editor.' },
      { type: 'output', text: "Pro tip: type :q! in your actual terminal to escape vim." },
      { type: 'blank' },
    ]
  }

  if (lower.startsWith('ping')) {
    return [
      { type: 'output', text: 'PING snavya.dev: 56 data bytes' },
      { type: 'output', text: '64 bytes from snavya.dev: icmp_seq=0 ttl=64 time=0.42 ms' },
      { type: 'output', text: '64 bytes from snavya.dev: icmp_seq=1 ttl=64 time=0.38 ms' },
      { type: 'output', text: '--- snavya.dev ping statistics ---' },
      { type: 'output', text: '2 packets transmitted, 2 received, 0% packet loss' },
      { type: 'blank' },
    ]
  }

  const projectMap = {
    lillian: 0, dyslexia: 0,
    unlearning: 1, phi: 1, mamba: 1,
    emotilearn: 2,
    investment: 3, crewai: 3, finbert: 3,
    spark: 4, book: 4,
    nyc: 5, taxi: 5,
    quantum: 6, cancer: 6,
    startup: 7, oracle: 7, hissa: 7,
  }

  if (lower.startsWith('cat ')) {
    const keyword = lower.slice(4).trim()

    if (keyword === 'notary' || keyword === 'notaryverify') {
      return [
        { type: 'output', text: '<gold>NotaryVerify AI</gold>' },
        { type: 'output', text: '04 · FULL-STACK · AI' },
        { type: 'output', text: 'Full-stack identity verification platform for remote notarization. FastAPI backend, Next.js frontend, DeepFace/FaceNet biometric comparison, EasyOCR, liveness detection, compliance across 6 US states.' },
        { type: 'output', text: '  FastAPI · Next.js · DeepFace · FaceNet · EasyOCR · OpenCV · TypeScript · Tailwind CSS' },
        { type: 'blank' },
      ]
    }

    const idx = projectMap[keyword]
    if (idx !== undefined) {
      const p = projects[idx]
      const lines = [
        { type: 'output', text: `<gold>${p.title}</gold>` },
        { type: 'output', text: p.tag },
        { type: 'output', text: p.desc },
      ]
      if (p.metric) lines.push({ type: 'output', text: `  ${p.metric.val} ${p.metric.label}` })
      if (p.award) lines.push({ type: 'output', text: `  Award: ${p.award}` })
      if (p.chips) lines.push({ type: 'output', text: '  ' + p.chips.join(' · ') })
      lines.push({ type: 'blank' })
      return lines
    }
    return [
      { type: 'error', text: `cat: ${keyword}: No such file. Try 'ls projects/' to see all projects.` },
      { type: 'blank' },
    ]
  }

  return [
    { type: 'error', text: `command not found: ${cmd}` },
    { type: 'output', text: "Type 'help' to see available commands." },
    { type: 'blank' },
  ]
}

const BOOT_LINES = [
  { type: 'boot', text: 'Initializing portfolio kernel v2.6.0...' },
  { type: 'boot', text: 'Loading data modules: [experience] [projects] [skills]' },
  { type: 'boot', text: 'Establishing secure connection to snavya.dev...' },
  { type: 'boot', text: '✓ System ready.' },
  { type: 'blank' },
  { type: 'output', text: 'Welcome to <gold>snavya@portfolio</gold>. Type <gold>help</gold> to see available commands.' },
  { type: 'blank' },
]

const QUICK_CMDS = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'cat why_hire_me.txt', cmd: 'cat why_hire_me.txt' },
  { label: 'git log', cmd: 'git log' },
  { label: 'cat experience.txt', cmd: 'cat experience.txt' },
  { label: 'cat skills.txt', cmd: 'cat skills.txt' },
  { label: 'ls projects/', cmd: 'ls projects/' },
  { label: 'open resume', cmd: 'open resume' },
  { label: 'sudo hire me', cmd: 'sudo hire me' },
]

function Terminal() {
  const [lines, setLines] = useState(BOOT_LINES)
  const [input, setInput] = useState('')
  const queueRef = useRef([])
  const charTimerRef = useRef(null)
  const cmdHistoryRef = useRef([])
  const histIdxRef = useRef(-1)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  function drainQueue() {
    if (queueRef.current.length === 0) {
      charTimerRef.current = null
      return
    }
    const item = queueRef.current.shift()
    if (item.type === 'blank') {
      setLines(prev => [...prev, { type: 'blank' }])
      charTimerRef.current = setTimeout(drainQueue, 20)
      return
    }
    setLines(prev => [...prev, { type: item.type, text: '' }])
    let charIdx = 0
    const text = item.text
    function typeNextChar() {
      charIdx++
      setLines(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { type: item.type, text: text.slice(0, charIdx) }
        return updated
      })
      if (charIdx < text.length) {
        charTimerRef.current = setTimeout(typeNextChar, 8)
      } else {
        charTimerRef.current = setTimeout(drainQueue, 20)
      }
    }
    typeNextChar()
  }

  function enqueueLines(newLines) {
    queueRef.current.push(...newLines)
    if (!charTimerRef.current) drainQueue()
  }

  useEffect(() => {
    return () => { if (charTimerRef.current) clearTimeout(charTimerRef.current) }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  function runCommand(cmd) {
    setLines(prev => [...prev, { type: 'cmd', text: cmd }])
    if (cmd) {
      cmdHistoryRef.current.push(cmd)
      histIdxRef.current = -1
    }
    const result = processCommand(cmd)
    if (result.length > 0 && result[0].type === 'clear') {
      if (charTimerRef.current) clearTimeout(charTimerRef.current)
      charTimerRef.current = null
      queueRef.current = []
      setLines([])
    } else {
      enqueueLines(result)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const cmd = input.trim()
      setInput('')
      runCommand(cmd)
      inputRef.current?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = cmdHistoryRef.current
      if (!hist.length) return
      const newIdx = Math.min(histIdxRef.current + 1, hist.length - 1)
      histIdxRef.current = newIdx
      setInput(hist[hist.length - 1 - newIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = histIdxRef.current - 1
      histIdxRef.current = newIdx
      if (newIdx < 0) {
        histIdxRef.current = -1
        setInput('')
      } else {
        const hist = cmdHistoryRef.current
        setInput(hist[hist.length - 1 - newIdx])
      }
    }
  }

  function lineColor(type) {
    if (type === 'cmd') return C.cmd
    if (type === 'error') return C.err
    if (type === 'boot') return C.mu
    return C.out
  }

  return (
    <div
      style={{ background: C.bg, border: '1px solid rgba(240,165,0,0.2)', borderRadius: 8, overflow: 'hidden', fontFamily: 'var(--fm)', fontSize: 12, cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 14px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(240,165,0,0.1)', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 6, zIndex: 1 }}>
          {['#ff5f57', '#ffbd2e', '#28ca41'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: C.mu, whiteSpace: 'nowrap',
        }}>
          terminal — <span style={{
            color: C.prompt,
            textShadow: '0 0 8px rgba(0,212,255,0.6)',
            animation: 'termGlow 2.5s ease-in-out infinite',
          }}>snavya@portfolio</span>
        </span>
      </div>
      <div ref={scrollRef} className="term-scroll" style={{ padding: '14px 16px', minHeight: 260, maxHeight: 400, overflowY: 'auto' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ lineHeight: 1.65, color: lineColor(line.type) }}>
            {line.type === 'blank' ? <br /> : (
              line.type === 'cmd'
                ? <><span style={{ color: C.prompt }}>snavya@portfolio:~$</span>{' '}<span>{line.text}</span></>
                : renderText(line.text)
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderTop: '1px solid rgba(240,165,0,0.1)', gap: 8 }}>
        <span style={{ color: C.prompt, flexShrink: 0 }}>snavya@portfolio:~$</span>
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); histIdxRef.current = -1 }}
            onKeyDown={handleKeyDown}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: C.cmd, fontFamily: 'var(--fm)', fontSize: 12, flex: 1, caretColor: C.prompt }}
            autoComplete="off"
            spellCheck={false}
          />
          <span style={{
            display: 'inline-block', width: 8, height: 14,
            background: C.prompt,
            opacity: input.length === 0 ? 1 : 0,
            animation: 'termCursor 1s step-end infinite',
            verticalAlign: 'middle',
            flexShrink: 0,
          }} />
        </div>
      </div>
      <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ color: C.mu, fontSize: 10, alignSelf: 'center', marginRight: 4, flexShrink: 0 }}>try:</span>
        {QUICK_CMDS.map(({ label, cmd }) => (
          <button
            key={cmd}
            onClick={() => { runCommand(cmd); inputRef.current?.focus() }}
            style={{
              background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 4, color: C.prompt, fontFamily: 'var(--fm)', fontSize: 10,
              padding: '2px 8px', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)' }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Ask() {
  const [ref, vis] = useReveal()
  return (
    <section id="ask" style={{ padding: '0 2.5rem 5.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionHeader eyebrow="005 · TERMINAL" title='Open a <em style="font-style:italic;color:var(--gold)">terminal</em>' />
      <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }}>
        <Terminal />
      </div>
    </section>
  )
}
