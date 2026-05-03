import useReveal from './useReveal.js'

function Barcode() {
  const pattern = [3,1,2,1,3,2,1,2,1,3,1,2,2,1,3,1,2,1,2,3,1,2,1,3,2,1,2,1,3,1]
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      title="Open Resume"
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, marginTop:'1rem', textDecoration:'none', cursor:'pointer' }}
      onMouseEnter={e => e.currentTarget.querySelectorAll('div').forEach(d => d.style.opacity = '0.85')}
      onMouseLeave={e => e.currentTarget.querySelectorAll('div').forEach(d => d.style.opacity = '')}
    >
      <div style={{ display:'flex', alignItems:'flex-end', gap:1.5 }}>
        {pattern.map((w, i) => (
          <div key={i} style={{ width: w * 1.5, height: i % 4 === 0 ? 24 : 17, background:'var(--gold)', opacity:0.5, borderRadius:1, transition:'opacity .2s' }} />
        ))}
      </div>
      <div style={{ fontFamily:'var(--fm)', fontSize:7, color:'var(--mu)', letterSpacing:'.15em' }}>SCAN · OPEN RESUME ↗</div>
    </a>
  )
}

function IDBadge() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', animation:'badgeEntrance 1s cubic-bezier(0.22,1,0.36,1) both' }}>
      {/* lanyard strap + clip */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:2, animation:'lanyardSway 5s ease-in-out infinite', transformOrigin:'top center' }}>
        {/* striped strap */}
        <div style={{
          width:22, height:52,
          background:'repeating-linear-gradient(45deg, var(--gold) 0px, var(--gold) 5px, rgba(20,16,4,0.85) 5px, rgba(20,16,4,0.85) 10px)',
          borderRadius:'3px 3px 0 0',
        }} />
        {/* metal clip */}
        <div style={{ width:30, height:13, background:'linear-gradient(to bottom, #c0b090, #8a7a60)', borderRadius:4, boxShadow:'0 2px 6px rgba(0,0,0,0.5)', marginTop:-1 }} />
        {/* pin into badge */}
        <div style={{ width:3, height:8, background:'#9a8a70', marginTop:-1 }} />
      </div>

      {/* badge card with stacked shadow */}
      <div style={{ position:'relative', width:'100%', animation:'badgeSway 5s ease-in-out infinite', transformOrigin:'top center', zIndex:2 }}>
        <div style={{ position:'absolute', top:10, left:10, right:-10, bottom:-10, background:'rgba(240,165,0,0.35)' }} />
        <div style={{
          position:'relative',
          background:'var(--s1)', border:'1px solid var(--br2)',
          borderRadius:12, padding:'1.75rem 1rem 1.25rem',
          textAlign:'center', minHeight:280,
          display:'flex', flexDirection:'column', justifyContent:'center',
        }}>

        {/* headshot */}
        <div style={{
          width:88, height:88, borderRadius:'50%',
          border:'2px solid rgba(240,165,0,0.45)',
          margin:'0 auto 0.9rem',
          overflow:'hidden', background:'var(--s2)',
        }}>
          <img
            src="/headshot.png"
            alt="Snavya Sai Badri Prasad"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}
          />
        </div>

        <div style={{ fontFamily:'var(--fm)', fontSize:12, fontWeight:700, letterSpacing:'.12em', color:'var(--tx)' }}>SNAVYA SAI</div>
        <div style={{ fontFamily:'var(--fm)', fontSize:8, color:'var(--mu)', letterSpacing:'.1em', marginTop:4 }}>DATA SCIENTIST · ML ENGINEER</div>
        <div style={{
          display:'inline-block', marginTop:8,
          fontFamily:'var(--fm)', fontSize:8, color:'var(--gold)',
          border:'1px solid rgba(240,165,0,0.25)', padding:'2px 9px', borderRadius:20,
          letterSpacing:'.1em',
        }}>ASU · TEMPE, AZ</div>

        <Barcode />
        </div>
      </div>
    </div>
  )
}

const VALUES = [
  { label: 'VALUES · 01', title: 'SHIP IT COMPLETE' },
  { label: 'VALUES · 02', title: 'BUILD RESPONSIBLY' },
  { label: 'VALUES · 03', title: 'OWN THE STACK' },
]

export default function About() {
  const [ref, vis] = useReveal()
  return (
    <section id="about" aria-label="About Snavya" style={{
      backgroundImage:'url(/city-night.png)',
      backgroundSize:'cover', backgroundPosition:'center 60%', backgroundAttachment:'fixed',
    }}>
    <div style={{ background:'linear-gradient(to bottom, rgba(7,9,15,0.55) 0%, rgba(7,9,15,0.45) 50%, rgba(7,9,15,0.65) 100%)', padding:'5.5rem 2.5rem' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div
        ref={ref}
        style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition:'opacity .6s ease, transform .6s ease',
          display:'grid', gridTemplateColumns:'220px 1fr', gap:'4rem', alignItems:'start',
        }}
      >
        {/* LEFT — ID badge */}
        <IDBadge />

        {/* RIGHT — bio + value cards */}
        <div style={{ position:'relative' }}>
          <div style={{
            position:'absolute', top:10, left:10, right:-10, bottom:-10,
            background:'rgba(240,165,0,0.35)', zIndex:0,
          }} />
          <div style={{
            position:'relative', zIndex:1,
            background:'var(--s1)', border:'1px solid var(--br2)',
            borderRadius:4, padding:'2rem 2rem 1.75rem',
          }}>
            <h2 style={{ fontFamily:'var(--fm)', fontWeight:700, fontSize:'clamp(28px,4vw,42px)', color:'var(--tx)', letterSpacing:'-.01em', marginBottom:'1.5rem', lineHeight:1 }}>
              ABOUT ME
            </h2>

            <p style={{ fontSize:15, color:'var(--mu)', lineHeight:1.9, marginBottom:'1.1rem', fontWeight:500 }}>
              I'm a <span style={{ color:'var(--gold)', fontWeight:700 }}>software engineer</span> and M.S. Data Science student at <span style={{ color:'var(--tx)', fontWeight:600 }}>ASU</span> building at the intersection of AI systems and full-stack engineering. My time is split between shipping production APIs, training ML models, and understanding how AI actually behaves once real users start depending on it.
            </p>

            <p style={{ fontSize:15, color:'var(--mu)', lineHeight:1.9, marginBottom:'1.1rem', fontWeight:500 }}>
              I've shipped a RAG chatbot for 50+ technicians at <span style={{ color:'var(--tx)', fontWeight:600 }}>Mercedes-Benz R&D</span>, built an <span style={{ color:'var(--gold)', fontWeight:700 }}>85% accurate startup exit predictor</span> at <span style={{ color:'var(--tx)', fontWeight:600 }}>Hissa</span>, co-authored research on <span style={{ color:'var(--tx)', fontWeight:600 }}>AI-reinforced honeypot systems</span> using Random Forest and Deep RL, and researched machine unlearning in Phi and Mamba. I'm currently building the complete AI pipeline for <span style={{ color:'var(--gold)', fontWeight:700 }}>The Lillian Project</span> as my capstone.
            </p>

            <p style={{ fontSize:15, color:'var(--mu)', lineHeight:1.9, marginBottom:'2rem', fontWeight:500 }}>
              What keeps me going is owning the problem completely. Less interested in demos. More interested in systems that actually ship.
            </p>

            {/* Value cards */}
            <div style={{
              display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.65rem',
              padding:'0.85rem',
              backgroundImage:'radial-gradient(circle, rgba(240,165,0,0.12) 1px, transparent 1px)',
              backgroundSize:'18px 18px',
              borderRadius:4,
            }}>
              {VALUES.map(({ label, title }) => (
                <div
                  key={label}
                  style={{
                    border:'1px solid var(--br2)', padding:'0.65rem 0.85rem',
                    background:'var(--s1)', transition:'border-color .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--br2)'}
                >
                  <div style={{ fontFamily:'var(--fm)', fontSize:8, color:'var(--gold)', letterSpacing:'.14em', marginBottom:6 }}>{label}</div>
                  <div style={{ fontFamily:'var(--fm)', fontSize:12, fontWeight:700, color:'var(--tx)', letterSpacing:'.04em' }}>{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </section>
  )
}
