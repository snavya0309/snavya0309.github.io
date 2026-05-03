import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import useReveal from './useReveal.js'

const INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'smuntimu@asu.edu',
    href: 'mailto:smuntimu@asu.edu',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Tempe, Arizona · Open to Relocation',
    href: null,
  },
]

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'var(--s2)', border: '1px solid var(--br2)',
  padding: '0.75rem 1rem', fontFamily: 'var(--ff)',
  fontSize: 14, color: 'var(--tx)', outline: 'none',
  borderRadius: 4, transition: 'border-color .2s',
}

export default function Contact() {
  const [ref, vis] = useReveal()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name:'', subject:'', email:'', confirmEmail:'', message:'' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.email !== form.confirmEmail) { alert('Emails do not match.'); return }
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xaqnjero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, subject: form.subject, email: form.email, message: form.message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" style={{ padding:'0 2.5rem 5.5rem', maxWidth:1100, margin:'0 auto' }}>
      <SectionHeader eyebrow="006 · CONTACT" title="Get in <em style='font-style:italic;color:var(--gold)'>touch</em>" />
      <p style={{ fontSize:14, color:'var(--mu)', marginBottom:'2.5rem', lineHeight:1.8 }}>
        Have a role in mind or want to collaborate? I'd love to hear from you.
      </p>

      <div ref={ref} style={{ opacity:vis?1:0, transition:'opacity .6s ease', display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'2rem', alignItems:'start' }}>

        {/* LEFT — info */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {INFO.map(({ icon, label, value, href }) => {
            const inner = (
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', background:'var(--s1)', border:'1px solid var(--br2)', padding:'1rem 1.25rem', borderRadius:4, transition:'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--br2)'}
              >
                <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--s2)', border:'1px solid var(--br2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', marginBottom:3 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize:13, fontWeight:500, color:'var(--tx)' }}>{value}</div>
                </div>
              </div>
            )
            return href
              ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>{inner}</a>
              : <div key={label}>{inner}</div>
          })}
        </div>

        {/* RIGHT — form */}
        <div style={{ background:'var(--s1)', border:'1px solid var(--br2)', borderRadius:4, padding:'2rem' }}>
          {status === 'sent' ? (
            <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
              <div style={{ fontSize:32, marginBottom:'1rem' }}>✓</div>
              <div style={{ fontFamily:'var(--fm)', fontSize:13, color:'var(--gold)', letterSpacing:'.1em' }}>MESSAGE SENT</div>
              <div style={{ fontSize:14, color:'var(--mu)', marginTop:8 }}>I'll get back to you soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', display:'block', marginBottom:6 }}>NAME</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Your name" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--br2)'} />
                </div>
                <div>
                  <label style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', display:'block', marginBottom:6 }}>SUBJECT</label>
                  <input value={form.subject} onChange={set('subject')} placeholder="Subject (optional)" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--br2)'} />
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', display:'block', marginBottom:6 }}>EMAIL</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="Your email" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--br2)'} />
                </div>
                <div>
                  <label style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', display:'block', marginBottom:6 }}>CONFIRM EMAIL</label>
                  <input required type="email" value={form.confirmEmail} onChange={set('confirmEmail')} placeholder="Confirm your email" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--br2)'} />
                </div>
              </div>

              <div style={{ marginBottom:'1.5rem' }}>
                <label style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--mu)', letterSpacing:'.1em', display:'block', marginBottom:6 }}>MESSAGE</label>
                <textarea required value={form.message} onChange={set('message')} placeholder="Your message" rows={5}
                  style={{ ...inputStyle, resize:'vertical', fontFamily:'var(--ff)' }}
                  onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--br2)'} />
              </div>

              {status === 'error' && (
                <div style={{ fontFamily:'var(--fm)', fontSize:10, color:'#ef4444', marginBottom:'1rem', letterSpacing:'.06em' }}>
                  Something went wrong. Email me directly at smuntimu@asu.edu
                </div>
              )}

              <button type="submit" disabled={status==='sending'} style={{
                width:'100%', padding:'0.9rem', border:'none', borderRadius:4, cursor:'pointer',
                background:'linear-gradient(90deg, var(--gold), #e08800)',
                fontFamily:'var(--fm)', fontSize:11, fontWeight:700, color:'#07090f',
                letterSpacing:'.1em', opacity:status==='sending'?.6:1, transition:'opacity .2s',
              }}>
                {status === 'sending' ? '◉ SENDING...' : '↗ SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
