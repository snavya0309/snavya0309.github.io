import { useRef, useState } from 'react'
import { experience } from '../data/portfolio.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const COLORS = [
  '#7C3AED', // ASU QA     — vivid violet
  '#D97706', // Hissa       — vivid amber
  '#2563EB', // ASU Research — vivid blue
  '#DC2626', // Mercedes    — vivid crimson
]

function TiltCard({ exp, color }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, on: false })
  const company = exp.company.split(' · ')[0]
  const location = exp.company.split(' · ')[1] || ''

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setTilt({ x: (y - 0.5) * -14, y: (x - 0.5) * 14, on: true })
  }
  const onLeave = () => setTilt({ x: 0, y: 0, on: false })

  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 310, display: 'flex', flexDirection: 'column' }}>
      {/* stacked shadow */}
      <div style={{
        position: 'absolute', top: 8, left: 8, right: -8, bottom: -8,
        background: 'rgba(0,0,0,0.28)', zIndex: 0,
      }} />
      {/* card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          background: color, padding: '1.75rem',
          position: 'relative', zIndex: 1, flex: 1,
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.on ? 1.04 : 1})`,
          transition: tilt.on ? 'transform 0.08s ease' : 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
          transformStyle: 'preserve-3d', cursor: 'default',
        }}
      >
        {/* date + current */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: 10, background: 'rgba(0,0,0,0.45)', color: 'white', padding: '5px 12px', letterSpacing: '.08em' }}>
            {exp.date}
          </span>
          {exp.current && (
            <span style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '3px 8px', letterSpacing: '.1em' }}>
              ● CURRENT
            </span>
          )}
        </div>

        {/* company */}
        <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 6 }}>
          {company}
        </div>

        {/* role */}
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'rgba(255,255,255,0.68)', letterSpacing: '.1em', marginBottom: '1.1rem' }}>
          {exp.title.toUpperCase()}
        </div>

        {/* timeline dot */}
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'white', opacity: 0.85, marginBottom: '1.1rem' }} />

        {/* bullets */}
        {exp.bullets && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginTop: 2, fontSize: 9 }}>▸</span>
                <span
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: b.replace(/<b>/g, '<span style="color:white;font-weight:700">').replace(/<\/b>/g, '</span>') }}
                />
              </li>
            ))}
          </ul>
        )}

        {/* chips */}
        {exp.chips && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {exp.chips.map(c => (
              <span key={c} style={{
                fontFamily: 'var(--fm)', fontSize: 9, padding: '3px 8px',
                border: '1px solid rgba(255,255,255,0.32)', color: 'rgba(255,255,255,0.9)',
                letterSpacing: '.04em',
              }}>{c}</span>
            ))}
          </div>
        )}

        {location && (
          <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', fontFamily: 'var(--fm)', fontSize: 8, color: 'rgba(255,255,255,0.22)', letterSpacing: '.08em' }}>
            {location}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref, vis] = useReveal()
  return (
    <section id="experience" style={{ padding: '0 0 6rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2.5rem' }}>
        <SectionHeader eyebrow="003 · EXPERIENCE" title="Where I've <em style='font-style:italic;color:var(--gold)'>worked</em>" />

        {/* timeline label bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 24, height: 1, background: 'var(--mu)' }} />
            <span style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--mu)', letterSpacing: '.12em' }}>CAREER_CHRONICLE</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--br)' }} />
          <span style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--mu)', letterSpacing: '.12em', flexShrink: 0 }}>HORIZONTAL_TIMELINE_LOG</span>
        </div>
      </div>

      <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }}>
        {/* card row */}
        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '0.5rem 2.5rem 2rem', maxWidth: 1100, margin: '0 auto', alignItems: 'stretch' }}>
          {experience.map((exp, i) => (
            <TiltCard key={i} exp={exp} color={COLORS[i]} />
          ))}
        </div>

        {/* bottom timeline line */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2.5rem' }}>
          <div style={{ height: 1, background: 'var(--br)' }} />
        </div>
      </div>
    </section>
  )
}
