import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const ITEMS = [
  {
    id: '01',
    label: 'PUBLICATION_01',
    title: 'Quantum Cancer Detection',
    org: '11th ICTCAC · IJONS Journal · 2023',
    desc: 'Co-authored research on Quantum ML and Quantum DL vs classical approaches for breast cancer detection. Presented at the 11th International Conference on Current Trends in Advanced Computing and published in the IJONS journal.',
    badge: 'PUBLISHED',
    badgeGold: true,
    featured: true,
    link: 'https://snavya0309.github.io/paperportfolio/',
  },
  {
    id: '02',
    label: 'AWARD_01',
    title: 'Runner-Up · Unisys Innovation Program',
    org: 'Unisys · Year 14 · 2023',
    desc: 'Recognized as runner-up out of all competing teams for the Quantum Cancer Detection research — the same project that went on to international publication.',
    badge: 'RUNNER-UP',
    badgeGold: true,
    featured: false,
    link: null,
  },
  {
    id: '03',
    label: 'LEADERSHIP_01',
    title: 'Head of Industry Relations',
    org: 'IEEE Eta Kappa Nu (HKN) · Epsilon Beta · Apr 2025–Present',
    desc: 'Lead industry outreach for IEEE Eta Kappa Nu, coordinating guest lectures and workshops with industry professionals to enhance student engagement and career exposure.',
    badge: 'CURRENT',
    badgeGold: false,
    featured: false,
    link: null,
  },
  {
    id: '04',
    label: 'SPEAKER_01',
    title: 'Quantum ML & DL Workshop',
    org: 'Dayananda Sagar University · Nov 2024',
    desc: 'Invited as guest speaker to conduct a hands-on workshop on Quantum Machine Learning and Deep Learning — covering IBMQ, Qiskit, and a live demo of Breast Cancer Classification using quantum and classical approaches.',
    badge: 'SPEAKER',
    badgeGold: false,
    featured: false,
    link: null,
  },
]

function Badge({ label, gold }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'var(--fm)', fontSize: 8, letterSpacing: '.12em',
      padding: '4px 10px',
      background: gold ? 'var(--gold)' : 'transparent',
      color: gold ? 'var(--bg)' : 'var(--mu)',
      border: gold ? 'none' : '1px solid var(--br2)',
      fontWeight: gold ? 700 : 400,
    }}>
      {label}
    </span>
  )
}

function FeaturedCard({ item }) {
  return (
    <div style={{
      gridColumn: '1', gridRow: '1 / 3',
      background: 'var(--gold)',
      padding: '2rem',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      minHeight: 360,
    }}>
      {/* faded large number */}
      <div style={{
        position: 'absolute', top: -10, right: 16,
        fontFamily: 'var(--fs)', fontSize: 'clamp(100px, 14vw, 160px)',
        fontWeight: 900, color: 'rgba(0,0,0,0.1)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {item.id}
      </div>

      {/* top label */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'rgba(0,0,0,0.55)', letterSpacing: '.14em' }}>{item.label}</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--fs)', fontWeight: 900,
          fontSize: 'clamp(22px, 2.8vw, 34px)',
          color: 'var(--bg)', lineHeight: 1.1, marginBottom: '0.6rem',
        }}>
          {item.title}
        </div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'rgba(0,0,0,0.55)', letterSpacing: '.1em', marginBottom: '1rem' }}>
          {item.org}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.7)', lineHeight: 1.75, marginBottom: '1.5rem', fontWeight: 500 }}>
          {item.desc}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Badge label={item.badge} gold={false} />
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: '.1em',
              color: 'var(--bg)', fontWeight: 700,
              textDecoration: 'none',
              borderBottom: '1.5px solid rgba(0,0,0,0.4)',
              paddingBottom: 1,
            }}>
              VIEW PAPER ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function SmallCard({ item, style = {} }) {
  return (
    <div style={{
      background: 'var(--s1)', border: '1px solid var(--br2)',
      padding: '1.5rem',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      ...style,
    }}>
      {/* faded large number */}
      <div style={{
        position: 'absolute', top: -16, right: 10,
        fontFamily: 'var(--fs)', fontSize: 'clamp(60px, 8vw, 90px)',
        fontWeight: 900, color: 'rgba(240,165,0,0.06)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {item.id}
      </div>

      <div>
        {/* top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.25rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--mu)', letterSpacing: '.14em' }}>{item.label}</span>
        </div>

        <div style={{
          fontFamily: 'var(--fs)', fontWeight: 900,
          fontSize: 'clamp(15px, 1.6vw, 20px)',
          color: 'var(--tx)', lineHeight: 1.2, marginBottom: '0.4rem',
        }}>
          {item.title}
        </div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--gold)', letterSpacing: '.1em', marginBottom: '0.9rem' }}>
          {item.org}
        </div>
        <p style={{ fontSize: 12, color: 'var(--mu)', lineHeight: 1.7, margin: 0 }}>
          {item.desc}
        </p>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <Badge label={item.badge} gold={item.badgeGold} />
      </div>
    </div>
  )
}

export default function Achievements() {
  const [ref, vis] = useReveal()
  const [featured, ...rest] = ITEMS

  return (
    <section id="achievements" style={{ padding: '0 2.5rem 5.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 0 }}>
        <SectionHeader eyebrow="004 · RECOGNITION" title='Achievements & <em style="font-style:italic;color:var(--gold)">recognition</em>' />
        {/* counter badge */}
        <div style={{
          flexShrink: 0, border: '1px solid var(--br2)',
          padding: '0.75rem 1rem', display: 'flex', gap: '1.25rem', alignItems: 'center',
          marginTop: '2rem',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--fs)', fontSize: 28, fontWeight: 900, color: 'var(--tx)', lineHeight: 1 }}>04</div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--mu)', letterSpacing: '.12em', marginTop: 2 }}>MILESTONES</div>
          </div>
          <div style={{ width: 1, height: 36, background: 'var(--br2)' }} />
          <div>
            <div style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>2023 — 2026</div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--mu)', letterSpacing: '.12em', marginTop: 2 }}>TIME_DOMAIN</div>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr 1fr',
          gridTemplateRows: 'repeat(2, auto)',
          gap: 14,
          opacity: vis ? 1 : 0,
          transition: 'opacity .6s ease',
        }}
      >
        <FeaturedCard item={featured} />
        <SmallCard item={rest[0]} />
        <SmallCard item={rest[1]} />
        <SmallCard item={rest[2]} style={{ gridColumn: '2 / 4' }} />
      </div>
    </section>
  )
}
