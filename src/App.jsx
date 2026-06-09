import { useState } from 'react'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ProjectsPage from './ProjectsPage'
import ContactPage from './ContactPage'

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

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

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    font-size: 16px;
  }

  /* NAVBAR */
  .main-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.2rem 3rem;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8,12,20,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
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
  .nav-links a.active {
    color: var(--accent);
  }

  /* PAGE WRAPPER */
  .page-content {
    width: 100%;
  }

  /* SECTION SPACING */
  #home,
  #about,
  #projects,
  #contact {
    scroll-margin-top: 80px;
  }

  /* Reduce spacing between sections */
  #about,
  #projects,
  #contact {
    padding-top: 1rem;
  }

  @media (max-width: 900px) {
    .main-nav {
      padding: 1rem 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .nav-links {
      gap: 1rem;
    }
  }
`

export default function App() {
  const [active, setActive] = useState('Home')

  const navLinks = ['Home', 'About', 'Projects', 'Contact']

  return (
    <>
      <style>{globalStyle}</style>

      <nav className="main-nav">
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
        </ul>
      </nav>

      <div className="page-content">
        <section id="home">
          <HomePage />
        </section>

        <section id="about">
          <AboutPage />
        </section>

        <section id="projects">
          <ProjectsPage />
        </section>

        <section id="contact">
          <ContactPage />
        </section>
      </div>
    </>
  )
}