import { useState, useEffect } from 'react'
import { projects } from '../data/portfolio.js'
import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const FEATURED_IDS = [0, 8, 3, 7, 1]

// Real photos via picsum — swap these with actual project screenshots
// Format: https://picsum.photos/seed/{seed}/800/480
const PROJECT_IMG = {
  0: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', // classroom/education
  1: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', // neural network / dark tech
  2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', // people / collaborative / engagement
  3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // analytics dashboard / investment
  5: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', // city / transportation / network
  7: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', // finance / charts
  8: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=800&q=80', // identity / face scan
}

// Fallback gradient per project (shown while image loads or if it fails)
const PROJECT_GRADIENT = {
  0: 'linear-gradient(145deg, #0d1535 0%, #1a0f2e 100%)',
  1: 'linear-gradient(145deg, #071220 0%, #0d1a12 100%)',
  2: 'linear-gradient(145deg, #0d0720 0%, #12071a 100%)',
  3: 'linear-gradient(145deg, #071a14 0%, #0d1a08 100%)',
  5: 'linear-gradient(145deg, #071015 0%, #07120a 100%)',
  7: 'linear-gradient(145deg, #0a1408 0%, #0f1200 100%)',
  8: 'linear-gradient(145deg, #071824 0%, #07140f 100%)',
}

const REF_CODES = { 0: 'REF_412', 1: 'REF_424', 2: 'REF_428', 3: 'REF_451', 5: 'REF_455', 7: 'REF_460', 8: 'REF_436' }

const EXTRA_PROJECTS = [
  {
    id: 8,
    tag: '04 · FULL-STACK · AI',
    title: 'NotaryVerify AI',
    desc: 'Full-stack identity verification platform for remote notarization. Government ID upload triggers EasyOCR field extraction; live selfie capture runs DeepFace/FaceNet biometric comparison with a liveness detection challenge. Automated compliance checks span 6 US states (AZ, CA, FL, NY, TX, WA), with separate signer and admin dashboards built on a FastAPI backend and Next.js frontend.',
    chips: ['FastAPI', 'Next.js', 'DeepFace', 'FaceNet', 'EasyOCR', 'OpenCV', 'TypeScript', 'Tailwind CSS'],
    highlighted: ['FastAPI', 'Next.js', 'DeepFace'],
    github: 'https://github.com/snavya0309/notaryverify_ai',
    metric: { val: 'Live', label: 'DEPLOYED', small: true },
    award: null,
    current: false,
  },
]

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ p, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(7,9,15,0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn .2s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--s1)',
          border: '1px solid rgba(240,165,0,0.3)',
          width: '100%', maxWidth: 760,
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'fadeSlide .25s cubic-bezier(0.22,1,0.36,1) both',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            background: 'rgba(7,9,15,0.75)', border: '1px solid rgba(240,165,0,0.25)',
            color: 'var(--tx)', fontFamily: 'var(--fm)', fontSize: 11,
            padding: '4px 10px', cursor: 'pointer', letterSpacing: '.1em',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Hero image */}
        <div style={{
          width: '100%', aspectRatio: '16/7', overflow: 'hidden',
          background: PROJECT_GRADIENT[p.id] || 'var(--s2)',
          position: 'relative',
        }}>
          <img
            src={PROJECT_IMG[p.id]}
            alt={p.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* dark gradient overlay at bottom for readability */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
            background: 'linear-gradient(to top, rgba(11,14,25,0.85) 0%, transparent 100%)',
          }} />
          {p.award && (
            <div style={{
              position: 'absolute', bottom: 16, left: 20,
              fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '.1em',
              color: 'var(--gold)', border: '1px solid rgba(240,165,0,.4)',
              padding: '3px 10px', background: 'rgba(7,9,15,0.85)',
            }}>
              ★ {p.award}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          {/* eyebrow */}
          <div style={{
            fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--mu)',
            letterSpacing: '.14em', marginBottom: '0.5rem',
          }}>
            {p.tag}
          </div>

          {/* title */}
          <h2 style={{
            fontFamily: 'var(--fs)', fontWeight: 900,
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: 'var(--tx)', lineHeight: 1.15,
            margin: '0 0 1.25rem',
          }}>
            {p.title}
          </h2>

          {/* gold description box — like the reference */}
          <div style={{
            border: '1px solid rgba(240,165,0,0.4)',
            borderLeft: '3px solid var(--gold)',
            background: 'rgba(240,165,0,0.06)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--fm)', fontSize: 11.5, letterSpacing: '.04em',
              color: 'var(--tx)', lineHeight: 1.75, margin: 0,
              textTransform: 'uppercase',
            }}>
              {p.desc}
            </p>
          </div>

          {/* tech stack label */}
          {p.chips.length > 0 && (
            <>
              <div style={{
                fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--mu)',
                letterSpacing: '.14em', marginBottom: '0.6rem',
              }}>
                STACK
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.75rem' }}>
                {p.chips.map(c => (
                  <span key={c} style={{
                    fontFamily: 'var(--fm)', fontSize: 9, padding: '4px 10px',
                    border: `1px solid ${p.highlighted?.includes(c) ? 'rgba(240,165,0,.45)' : 'var(--br)'}`,
                    color: p.highlighted?.includes(c) ? 'var(--gold)' : 'var(--mu)',
                    letterSpacing: '.07em',
                  }}>{c}</span>
                ))}
              </div>
            </>
          )}

          {/* footer: metric + open button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {p.metric && (
              <div style={{
                fontFamily: 'var(--fs)', fontStyle: 'italic',
                fontSize: p.metric.small ? 14 : 22,
                fontWeight: 900, color: 'var(--gold)',
              }}>
                {p.metric.val}
                <span style={{ fontFamily: 'var(--fm)', fontStyle: 'normal', fontSize: 8, color: 'var(--mu)', marginLeft: 8, letterSpacing: '.1em' }}>
                  {p.metric.label}
                </span>
              </div>
            )}
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.12em',
                  color: 'var(--bg)', background: 'var(--gold)',
                  border: 'none', padding: '10px 24px',
                  textDecoration: 'none', display: 'inline-block',
                  fontWeight: 700,
                }}
              >
                OPEN PROJECT ↗
              </a>
            ) : (
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '.1em',
                color: p.current ? '#4ade80' : 'var(--mu)',
                border: `1px solid ${p.current ? 'rgba(74,222,128,0.3)' : 'var(--br)'}`,
                padding: '10px 20px',
              }}>
                {p.current ? 'IN PROGRESS' : 'PRIVATE'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Project Card ───────────────────────────────────────────────────────────
function ProjectCard({ p, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        flex: '1 1 0', minWidth: 0,
        display: 'flex', flexDirection: 'column',
        border: `1px solid ${hovered ? 'rgba(240,165,0,0.5)' : 'var(--br)'}`,
        background: 'var(--s1)',
        transition: 'border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Image header */}
      <div style={{
        height: 160, overflow: 'hidden', position: 'relative',
        background: PROJECT_GRADIENT[p.id] || 'var(--s2)',
        borderBottom: `1px solid ${hovered ? 'rgba(240,165,0,0.25)' : 'var(--br)'}`,
        transition: 'border-color 0.25s',
      }}>
        <img
          src={PROJECT_IMG[p.id]}
          alt={p.title}
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            opacity: imgLoaded ? (hovered ? 1 : 0.75) : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
        {/* dark overlay bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(11,14,25,0.9) 0%, transparent 100%)',
        }} />

        {/* top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 11px',
          background: 'rgba(7,9,15,0.55)',
          fontFamily: 'var(--fm)', fontSize: 8,
          color: 'var(--mu)', letterSpacing: '.12em',
        }}>
          <span>PROJECT_INFO_{String(index + 1).padStart(2, '0')}</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {p.current && (
              <span style={{ color: '#4ade80', border: '1px solid rgba(74,222,128,0.35)', padding: '1px 6px', fontSize: 7 }}>LIVE</span>
            )}
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: hovered ? 'var(--gold)' : 'var(--mu2)',
              display: 'inline-block', transition: 'background 0.25s',
            }} />
          </div>
        </div>

        {/* gold accent on hover */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--gold)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.25s',
        }} />

        {p.award && (
          <div style={{
            position: 'absolute', bottom: 10, left: 11,
            fontFamily: 'var(--fm)', fontSize: 7, letterSpacing: '.08em',
            color: 'var(--gold)', border: '1px solid rgba(240,165,0,.35)',
            padding: '2px 8px', background: 'rgba(7,9,15,0.85)',
          }}>★ {p.award}</div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '1rem 1.1rem 0', flex: 1 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--gold)', letterSpacing: '.14em', marginBottom: '0.5rem' }}>
          {REF_CODES[p.id]}
        </div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 7.5, color: 'var(--mu)', letterSpacing: '.1em', marginBottom: '0.4rem' }}>
          {p.tag.split('·').slice(1).join('·').trim()}
        </div>
        <div style={{
          fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.2vw,16px)', fontWeight: 700,
          color: 'var(--tx)', lineHeight: 1.25, marginBottom: '0.75rem',
        }}>
          {p.title}
        </div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 7, color: 'var(--mu)', letterSpacing: '.14em', marginBottom: 5 }}>STACK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {p.chips.slice(0, 5).map(c => (
            <span key={c} style={{
              fontFamily: 'var(--fm)', fontSize: 7.5, padding: '2px 7px', letterSpacing: '.05em',
              border: `1px solid ${p.highlighted?.includes(c) ? 'rgba(240,165,0,.4)' : 'var(--br)'}`,
              color: p.highlighted?.includes(c) ? 'var(--gold)' : 'var(--mu)',
            }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem 1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        {p.metric && (
          <div style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: p.metric.small ? 12 : 18, fontWeight: 900, color: 'var(--gold)' }}>
            {p.metric.val}
          </div>
        )}
        <div style={{
          marginLeft: 'auto',
          fontFamily: 'var(--fm)', fontSize: 8.5, letterSpacing: '.12em',
          color: hovered ? 'var(--bg)' : 'var(--gold)',
          background: hovered ? 'var(--gold)' : 'transparent',
          border: '1px solid rgba(240,165,0,0.5)',
          padding: '6px 16px',
          transition: 'background 0.2s, color 0.2s',
        }}>
          OPEN
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Projects() {
  const [ref, vis] = useReveal()
  const [activeProject, setActiveProject] = useState(null)

  const allProjects = [...projects, ...EXTRA_PROJECTS]
  const featured = FEATURED_IDS.map(id => allProjects.find(p => p.id === id)).filter(Boolean)

  return (
    <section id="projects" style={{ padding: '0 0 5.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2.5rem' }}>
        <SectionHeader
          eyebrow="002 · PROJECTS"
          title='Selected <em style="font-style:italic;color:var(--gold)">work</em>'
        />

        <div
          ref={ref}
          style={{
            display: 'flex',
            gap: 14,
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(24px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}
        >
          {featured.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={i}
              onClick={() => setActiveProject(p)}
            />
          ))}
        </div>
      </div>

      {activeProject && (
        <Modal p={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  )
}
