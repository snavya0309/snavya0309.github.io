import { useEffect, useRef } from 'react'
import { meta } from '../data/portfolio.js'

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

function NeuralCanvas() {
  const cvRef = useRef(null)
  useEffect(() => {
    const cv = cvRef.current
    const cx = cv.getContext('2d')
    let particles = [], raf
    function resize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
        r: Math.random() * 1.2 + .4,
        phase: Math.random() * Math.PI * 2,
      }))
    }
    function draw() {
      cx.clearRect(0, 0, cv.width, cv.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.phase += 0.016
        if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0
        if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0
        const gv = Math.sin(p.phase) * .5 + .5
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx.fillStyle = `rgba(240,165,0,${.25 + gv * .55})`; cx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={cvRef} style={{ position:'absolute', inset:0, zIndex:0, width:'100%', height:'100%' }} />
}


function AvatarCharacter() {
  const avatarRef = useRef(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    function onMouseMove(e) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      tiltRef.current = {
        x: ((e.clientY - cy) / cy) * 6,
        y: ((e.clientX - cx) / cx) * -10,
      }
    }
    function onMouseLeave() {
      tiltRef.current = { x: 0, y: 0 }
    }
    function animate() {
      if (avatarRef.current) {
        const el = avatarRef.current
        const cur = el._tilt || { x: 0, y: 0 }
        const next = {
          x: cur.x + (tiltRef.current.x - cur.x) * 0.08,
          y: cur.y + (tiltRef.current.y - cur.y) * 0.08,
        }
        el._tilt = next
        el.style.transform = `perspective(800px) rotateX(${next.x}deg) rotateY(${next.y}deg)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    function onScroll() {
      if (avatarRef.current) {
        const progress = Math.min(window.scrollY / window.innerHeight, 1)
        avatarRef.current.style.opacity = String(1 - progress * 1.4)
        avatarRef.current.style.marginBottom = `${progress * 60}px`
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    animate()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={avatarRef} style={{
      position: 'absolute', bottom: 0, right: '2%',
      height: '96%', width: 'auto', zIndex: 3,
      pointerEvents: 'none', willChange: 'transform',
      transformOrigin: 'bottom center',
    }}>
      <img
        src="/avatar.png"
        alt="Snavya"
        style={{ height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom', display: 'block' }}
      />
      {/* fade feet into background */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
      }} />
    </div>
  )
}

const socialLinks = [
  { icon: <IconLinkedIn />, href: `https://${meta.linkedin}`, label: 'LinkedIn', color: '#0077B5' },
  { icon: <IconGitHub />,   href: `https://${meta.github}`,   label: 'GitHub',   color: 'var(--tx)' },
  { icon: <IconEmail />,    href: `mailto:${meta.email}`,     label: 'Email',    color: 'var(--gold)' },
]

export default function Hero() {
  return (
    <div id="hero" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <NeuralCanvas />

      {/* ── TOP BAR ── */}
      <div className="fade-in fade-in-1" style={{
        position: 'relative', zIndex: 3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '80px 2rem 0',
      }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:10, color:'var(--gold)', letterSpacing:'.18em', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'var(--gold)' }} />
          <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', animation:'pulse 2s infinite', display:'inline-block' }} />
          M.S. DATA SCIENCE · ASU · MAY 2026 · OPEN TO WORK · TEMPE, AZ
        </div>
        <div style={{ display:'flex', gap:'3rem', fontFamily:'var(--fm)', fontSize:11, letterSpacing:'.16em', color:'var(--gold)' }}>
          <span>DATA SCIENTIST</span>
          <span>ML / AI ENGINEER</span>
          <span>SOFTWARE ENGINEER</span>
        </div>
      </div>

      {/* ── GIANT NAME ── */}
      <div style={{ position:'relative', zIndex:2, flex:1, display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', lineHeight:0.88 }}>
        <h1 style={{
          fontFamily:'var(--fs)', fontWeight:900,
          fontSize:'clamp(80px, 20.5vw, 300px)',
          letterSpacing:'-0.01em', margin:0, userSelect:'none',
          paddingLeft:'1.5rem', overflow:'hidden',
        }}>
          <span style={{ display:'block', color:'var(--tx)' }}>
            {'SNAVYA'.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block',
                animation: `letterUp 0.7s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${0.05 + i * 0.07}s`,
              }}>{ch}</span>
            ))}
          </span>
          <span style={{ display:'block', color:'var(--gold)', fontStyle:'italic' }}>
            {'SAI'.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block',
                animation: `letterUp 0.7s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${0.52 + i * 0.09}s`,
              }}>{ch}</span>
            ))}
          </span>
        </h1>
      </div>

      {/* ── AVATAR ── */}
      <AvatarCharacter />

      {/* ── BOTTOM BAR ── */}
      <div className="fade-in fade-in-3" style={{
        position:'relative', zIndex:3,
        display:'flex', alignItems:'flex-end',
        padding:'0 2rem 2rem',
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'1.2rem' }}>
          {/* social icons */}
          <div style={{ display:'flex', gap:10 }}>
            {socialLinks.map(({ icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={{
                display:'flex', alignItems:'center', justifyContent:'center',
                width:42, height:42,
                border:`1.5px solid ${color}`,
                borderRadius:6, color, transition:'background .15s, transform .15s',
                textDecoration:'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)' }}
              >
                {icon}
              </a>
            ))}
          </div>
          {/* CTA buttons */}
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} style={{ fontFamily:'var(--fm)', fontSize:12, fontWeight:700, background:'var(--gold)', color:'var(--bg)', border:'none', padding:'12px 28px', letterSpacing:'.08em', cursor:'pointer', transition:'opacity .15s' }}>VIEW MY WORK →</button>
            <button onClick={()=>document.getElementById('ask')?.scrollIntoView({behavior:'smooth'})} style={{ fontFamily:'var(--fm)', fontSize:12, background:'transparent', color:'var(--gold)', border:'1px solid var(--br2)', padding:'12px 28px', letterSpacing:'.08em', cursor:'pointer' }}>ASK MY PORTFOLIO</button>
          </div>
        </div>
      </div>
    </div>
  )
}
