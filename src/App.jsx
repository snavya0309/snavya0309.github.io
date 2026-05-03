import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Achievements from './components/Achievements.jsx'
import Experience from './components/Experience.jsx'
import Ask from './components/Ask.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Ask />
      <Contact />
      <footer style={{borderTop:'1px solid var(--br)',padding:'1.2rem 2.5rem',display:'flex',justifyContent:'space-between',fontFamily:'var(--fm)',fontSize:11,color:'var(--mu)'}}>
        <div>© 2026 Snavya Sai Badri Prasad · Tempe, AZ · Open to Relocation</div>
        <div>Built with React + Vite · Powered by Claude</div>
      </footer>
    </>
  )
}
