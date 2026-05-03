import useReveal from './useReveal.js'

export default function SectionHeader({ eyebrow, title }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transition: 'opacity .6s ease' }}>
      <div style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--gold)',letterSpacing:'.2em',marginBottom:'.75rem',display:'flex',alignItems:'center',gap:8}}>
        <span style={{display:'inline-block',width:16,height:1,background:'var(--gold)'}}></span>
        {eyebrow}
      </div>
      <div style={{fontFamily:'var(--fs)',fontSize:'clamp(33px,3.8vw,50px)',fontWeight:900,lineHeight:1.05,marginBottom:'2.25rem'}}
        dangerouslySetInnerHTML={{__html: title}}
      />
    </div>
  )
}
