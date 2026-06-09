import { useState, useEffect } from "react";
import profilePhoto from "./assets/profile.png"; // 👈 Change this path to your actual photo

const style = `
  .hero-wrap {
    min-height: calc(100vh - 66px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .glow-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .glow-1 {
    width: 500px; height: 500px;
    background: rgba(37,99,235,0.18);
    top: -100px; right: -100px;
  }

  .glow-2 {
    width: 400px; height: 400px;
    background: rgba(59,130,246,0.12);
    bottom: -80px; left: -80px;
  }

  .glow-3 {
    width: 300px; height: 300px;
    background: rgba(147,197,253,0.07);
    top: 40%; left: 40%;
  }

  .hero-inner {
    max-width: 1100px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
    color: var(--accent);
    background: rgba(37,99,235,0.1);
    border: 1px solid rgba(59,130,246,0.3);
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    margin-bottom: 1.4rem;
    letter-spacing: 0.08em;
  }

  .badge-dot {
    width: 6px; height: 6px;
    background: #22d3ee;
    border-radius: 50%;
    animation: blink 1.2s ease-in-out infinite;
    box-shadow: 0 0 6px #22d3ee;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .hero-name {
    font-size: clamp(2.8rem, 6vw, 4.8rem);
    font-weight: 800;
    line-height: 1.05;
    margin-bottom: 0.6rem;
    color: var(--text);
    letter-spacing: -0.02em;
  }

  .hero-name span {
    background: linear-gradient(135deg, #93c5fd, #3b82f6, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-title {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: var(--muted);
    margin-bottom: 1.6rem;
    min-height: 1.8rem;
  }

  .cursor {
    display: inline-block;
    width: 2px; height: 1em;
    background: var(--blue-bright);
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 0.8s step-end infinite;
    box-shadow: 0 0 6px var(--blue-bright);
  }

  .hero-desc {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.8;
    max-width: 480px;
    margin-bottom: 2.2rem;
  }

  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn-primary {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.85rem 2rem;
    background: var(--blue);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(37,99,235,0.35);
  }

  .btn-primary:hover {
    background: var(--blue-bright);
    transform: translateY(-2px);
    box-shadow: 0 0 32px rgba(59,130,246,0.5);
  }

  .btn-outline {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.85rem 2rem;
    background: transparent;
    color: var(--accent);
    border: 1.5px solid var(--blue-dim);
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
  }

  .btn-outline:hover {
    border-color: var(--blue-bright);
    color: var(--blue-bright);
    transform: translateY(-2px);
  }

  .hero-stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }

  .stat-num {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .stat-num span { color: var(--blue-bright); }

  .stat-label {
    font-size: 0.75rem;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.06em;
  }

  .hero-right {
    position: relative;
    width: 260px;
    height: 300px;
    flex-shrink: 0;
  }

  .profile-photo {
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: 12px;  /* or remove this line for a sharp square */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 3.5s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(37,99,235,0.5));
    border: 3px solid rgba(59,130,246,0.4);
  }

  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-14px); }
  }

  .deco { position: absolute; font-weight: 700; animation: dpulse 2.5s ease-in-out infinite alternate; }
  .deco-1 { top: 20px; right: 20px; font-size: 1.4rem; color: var(--accent); }
  .deco-2 { top: 60px; left: 0; font-size: 1rem; color: var(--blue); }
  .deco-3 { bottom: 50px; left: 20px; font-size: 1.2rem; color: var(--blue-bright); animation-delay: 0.5s; }
  .deco-4 { bottom: 30px; right: 20px; width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--accent); animation-delay: 1s; }
  .deco-5 { top: 40px; right: 0; width: 7px; height: 7px; background: var(--blue); border-radius: 2px; animation-delay: 0.3s; }
  .deco-6 { bottom: 80px; right: 28px; width: 7px; height: 7px; background: var(--accent); border-radius: 2px; animation-delay: 0.8s; }

  @keyframes dpulse {
    from { opacity: 0.3; transform: scale(1); }
    to { opacity: 1; transform: scale(1.3); }
  }

  .scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 1;
    margin-top: 2rem;
  }

  .scroll-arrow {
    width: 18px; height: 18px;
    border-right: 2px solid var(--blue-bright);
    border-bottom: 2px solid var(--blue-bright);
    transform: rotate(45deg);
    animation: bounce 1.5s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(5px); }
  }

  .trusted-section {
    border-top: 1px solid var(--border);
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    max-width: 100%;
  }

  .trusted-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .trusted-divider {
    width: 1px; height: 20px;
    background: var(--border);
    flex-shrink: 0;
  }

  .trusted-tags { display: flex; gap: 1.2rem; flex-wrap: wrap; }

  .trusted-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    opacity: 0.6;
    transition: opacity 0.2s, color 0.2s;
  }

  .trusted-tag:hover { opacity: 1; color: var(--accent); }

  @media (max-width: 700px) {
    .hero-wrap { padding: 2rem 1.5rem; }
    .hero-inner { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-stats { gap: 1.5rem; }
    .trusted-section { padding: 1.5rem; flex-wrap: wrap; }
  }
`;

const titles = ["UI/UX Designer", "Frontend Developer", "Mobile App Builder", "Creative Technologist"];

export default function HomePage() {
  const [displayed, setDisplayed] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  return (
    <>
      <style>{style}</style>

      <section className="hero-wrap">
        <div className="glow-blob glow-1" />
        <div className="glow-blob glow-2" />
        <div className="glow-blob glow-3" />

        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="badge-dot" />
              AVAILABLE FOR FREELANCE WORK
            </div>
            <h1 className="hero-name">
              Hi, I'm<br />
              <span>Mikaela.</span>
            </h1>
            <div className="hero-title">
              {displayed}<span className="cursor" />
            </div>
            <p className="hero-desc">
              I design and build beautiful digital experiences — from sleek web dashboards
              to polished mobile apps. I turn ideas into products people actually enjoy using.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View My Work ↓</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">6<span>+</span></div>
                <div className="stat-label">PROJECTS</div>
              </div>
              <div>
                <div className="stat-num">3<span>+</span></div>
                <div className="stat-label">WEB APPS</div>
              </div>
              <div>
                <div className="stat-num">3<span>+</span></div>
                <div className="stat-label">MOBILE APPS</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <span className="deco deco-1">✦</span>
            <span className="deco deco-2">+</span>
            <span className="deco deco-3">✦</span>
            <span className="deco deco-4" />
            <span className="deco deco-5" />
            <span className="deco deco-6" />
            {/* 👇 Replace BigPixelCat with your photo */}
            <img
              src={profilePhoto}
              alt="Mikaela"
              className="profile-photo"
            />
          </div>
        </div>

        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-arrow" />
        </div>
      </section>
    </>
  );
}