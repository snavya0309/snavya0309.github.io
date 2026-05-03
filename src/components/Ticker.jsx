const items = [
  'LANGUAGES  ·  PYTHON · JAVA · SQL · JAVASCRIPT · KOTLIN · R · C',
  'ML & DATA SCIENCE  ·  PYTORCH · TENSORFLOW · SCIKIT-LEARN · KERAS · TRANSFORMERS · PANDAS · OPENCV · TABLEAU · POWER BI',
  'BACKEND & FRAMEWORKS  ·  FASTAPI · FLASK · DJANGO · REACT.JS',
  'CLOUD & DEVOPS  ·  AWS · DOCKER · KUBERNETES · GITHUB ACTIONS · JENKINS · CI/CD',
  'DATABASES  ·  POSTGRESQL · MYSQL · MONGODB',
  'AI TOOLS  ·  CLAUDE · CURSOR · GITHUB COPILOT',
]
const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div style={{borderTop:'1px solid var(--br)',borderBottom:'1px solid var(--br)',overflow:'hidden',padding:'.58rem 0',background:'var(--s1)'}}>
      <div style={{display:'flex',whiteSpace:'nowrap',width:'max-content',animation:'ticker 32s linear infinite'}}>
        {doubled.map((t, i) => (
          <span key={i} style={{fontFamily:'var(--fm)',fontSize:11,color:'var(--mu)',letterSpacing:'.1em',padding:'0 2.5rem',flexShrink:0}}>
            <span style={{color:'var(--gold)'}}>★</span> {t}
          </span>
        ))}
      </div>
    </div>
  )
}
