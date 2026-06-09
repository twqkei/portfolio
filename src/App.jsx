import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ProjectsPage from './ProjectsPage'
import ContactPage from './ContactPage'

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c14;
    --surface: #0d1220;
    --card: #111827;
    --border: #1e2d45;
    --blue: #2563eb;
    --blue-bright: #3b82f6;
    --blue-dim: #1e3a5f;
    --text: #e8eef8;
    --muted: #6b7fa3;
    --accent: #93c5fd;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    font-size: 16px;    

  }

  /* SHARED NAV */
  .main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 3rem;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8,12,20,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    color: var(--accent);
    letter-spacing: -0.03em;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    align-items: center;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active { color: var(--accent); }

  .nav-hire {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    padding: 0.55rem 1.3rem;
    background: var(--blue);
    color: #fff !important;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
    box-shadow: 0 0 16px rgba(37,99,235,0.4);
  }

  .nav-hire:hover {
    background: var(--blue-bright) !important;
    box-shadow: 0 0 28px rgba(59,130,246,0.6);
    transform: translateY(-1px);
    color: #fff !important;
  }

  /* PAGE WRAPPER — full width consistent */
  .page-content {
    width: 100%;
  }

  /* SHARED SECTION CONTAINER */
  .section-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 5rem 4rem;
  }

  @media (max-width: 900px) {
    .main-nav { padding: 1rem 1.5rem; }
    .section-container { padding: 3rem 1.5rem; }
  }

  @media (max-width: 600px) {
    .nav-links { gap: 1rem; }
  }
`

import { useState } from 'react'

export default function App() {
  const [active, setActive] = useState('Home')
  const navLinks = ['Home', 'About', 'Projects', 'Contact']

  return (
    <>
      <style>{globalStyle}</style>

      <nav className="main-nav">
        <a href="#home" className="nav-logo" onClick={() => setActive('Home')}>
          mikaelaagang
        </a>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={active === l ? 'active' : ''}
                onClick={() => setActive(l)}
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-hire" onClick={() => setActive('Contact')}>
              Hire Me ✦
            </a>
          </li>
        </ul>
      </nav>

      <div className="page-content">
        <div id="home"><HomePage /></div>
        <div id="about"><AboutPage /></div>
        <div id="projects"><ProjectsPage /></div>
        <div id="contact"><ContactPage /></div>
      </div>
    </>
  )
}