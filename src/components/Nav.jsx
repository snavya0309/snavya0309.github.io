import { useState, useEffect } from 'react'
import { meta } from '../data/portfolio.js'

const links = [
  { id:'about', label:'About' },
  { id:'projects', label:'Projects' },
  { id:'pipeline', label:'ML Pipeline' },
  { id:'experience', label:'Experience' },
  { id:'ask', label:'Terminal' },
  { id:'contact', label:'Contact' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 62, behavior: 'smooth' })
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:99,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'.85rem 2.5rem',
      background: dark ? 'rgba(7,9,15,.93)' : 'rgba(245,243,238,.93)',
      backdropFilter:'blur(16px)',
      borderBottom:'1px solid var(--br)',
      transition:'background 0.3s ease',
    }}>
      <div style={{fontFamily:'var(--ff)',fontSize:13,fontWeight:700,color:'var(--gold)',letterSpacing:'.08em',textTransform:'uppercase'}}>
        SNAVYA<span style={{color:'rgba(240,165,0,.45)',fontWeight:500}}>.DEV</span>
      </div>
      <div style={{display:'flex',gap:'1.75rem'}}>
        {links.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)} style={{
            fontFamily:'var(--ff)',fontSize:12,fontWeight:500,color:'var(--mu)',letterSpacing:'.01em',
            background:'transparent',border:'none',cursor:'pointer',transition:'color .2s',
          }}
          onMouseEnter={e => e.target.style.color='var(--tx)'}
          onMouseLeave={e => e.target.style.color='var(--mu)'}
          >{l.label}</button>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
        <button
          onClick={() => setDark(d => !d)}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            display:'flex',alignItems:'center',justifyContent:'center',
            width:34,height:34,borderRadius:'50%',
            background:'transparent',border:'1px solid var(--br2)',
            color:'var(--gold)',cursor:'pointer',
            transition:'border-color .2s, background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='var(--gd)'}
          onMouseLeave={e => e.currentTarget.style.background='transparent'}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          onClick={() => window.open(meta.resumeUrl)}
          style={{fontFamily:'var(--ff)',fontSize:11,fontWeight:700,color:'var(--bg)',background:'var(--gold)',border:'none',padding:'7px 18px',letterSpacing:'.06em',textTransform:'uppercase'}}
        >RESUME ↗</button>
      </div>
    </nav>
  )
}
