import { useEffect, useRef } from "react";

const style = `
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

  .about-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }

  /* HERO */
  .about-hero {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: center;
    margin-bottom: 5rem;
  }

  .about-hero h1 {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.4rem;
    background: linear-gradient(135deg, var(--text) 40%, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-hero p {
    color: var(--muted);
    line-height: 1.8;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    max-width: 520px;
  }

  .pixel-wrap {
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }

  .pixel-cat {
    image-rendering: pixelated;
    width: 160px;
    height: 160px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(37,99,235,0.4));
  }

  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-10px); }
  }

  @keyframes pulse {
    from { opacity: 0.4; transform: scale(1); }
    to { opacity: 1; transform: scale(1.25); }
  }

  .decor-1 { top: 10px; right: 20px; font-size: 1.3rem; color: var(--accent); position: absolute; animation: pulse 2s ease-in-out infinite alternate; }
  .decor-2 { bottom: 20px; left: 10px; font-size: 1rem; color: var(--blue); position: absolute; animation: pulse 2s ease-in-out infinite alternate; }
  .decor-3 { bottom: 30px; right: 10px; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--accent); position: absolute; animation: pulse 2s ease-in-out infinite alternate; }
  .decor-4 { top: 30px; left: 10px; font-size: 0.8rem; color: var(--blue-dim); position: absolute; animation: pulse 2s ease-in-out infinite alternate; }

  /* SECTION TITLE */
  .section-title {
    font-size: 1.7rem;
    font-weight: 800;
    margin-bottom: 1.8rem;
    position: relative;
    display: inline-block;
    color: var(--text);
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40%;
    height: 2px;
    background: var(--blue-bright);
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(59,130,246,0.6);
  }

  /* SKILLS */
  .skills-section { margin-bottom: 5rem; }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
  }

  .skill-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.4rem;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }

  .skill-card:hover {
    border-color: var(--blue-bright);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(37,99,235,0.15);
  }

  .skill-card h3 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.9rem;
    color: var(--text);
  }

  .tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }

  .tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--blue-dim);
    color: var(--accent);
    background: rgba(37,99,235,0.08);
    letter-spacing: 0.02em;
  }

  /* EXPERIENCE */
  .exp-section { margin-bottom: 4rem; }

  .timeline { position: relative; }

  .timeline-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    align-items: start;
    position: relative;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: 49px;
    top: 52px;
    bottom: -24px;
    width: 2px;
    background: linear-gradient(to bottom, var(--blue), transparent);
  }

  .timeline-item:last-child::before { display: none; }

  .year-badge {
    width: 70px;
    height: 70px;
    background: var(--blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    margin-left: 14px;
    box-shadow: 0 0 20px rgba(37,99,235,0.4);
  }

  .exp-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.4rem 1.6rem;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .exp-card:hover {
    border-color: var(--blue-bright);
    box-shadow: 0 0 16px rgba(37,99,235,0.12);
  }

  .exp-card h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    color: var(--text);
  }

  .exp-company {
    color: var(--accent);
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }

  .exp-card p {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.65;
  }

  /* FADE IN */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 700px) {
    .about-page { padding: 3rem 1.5rem 5rem; }
    .about-hero { grid-template-columns: 1fr; }
    .pixel-wrap { display: none; }
    .timeline-item { grid-template-columns: 80px 1fr; }
    .year-badge { width: 56px; height: 56px; margin-left: 8px; font-size: 0.68rem; }
    .timeline-item::before { left: 35px; }
  }
`;

const PixelCat = () => (
  <svg className="pixel-cat" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="1" width="2" height="2" fill="#a07de8"/>
    <rect x="11" y="1" width="2" height="2" fill="#a07de8"/>
    <rect x="2" y="3" width="12" height="8" fill="#7c5cbf"/>
    <rect x="1" y="4" width="1" height="6" fill="#7c5cbf"/>
    <rect x="14" y="4" width="1" height="6" fill="#7c5cbf"/>
    <rect x="2" y="11" width="12" height="3" fill="#7c5cbf"/>
    <rect x="2" y="14" width="3" height="1" fill="#7c5cbf"/>
    <rect x="7" y="14" width="2" height="1" fill="#7c5cbf"/>
    <rect x="11" y="14" width="3" height="1" fill="#7c5cbf"/>
    <rect x="5" y="6" width="2" height="2" fill="#e8e6f0"/>
    <rect x="9" y="6" width="2" height="2" fill="#e8e6f0"/>
    <rect x="6" y="7" width="1" height="1" fill="#1a1a24"/>
    <rect x="10" y="7" width="1" height="1" fill="#1a1a24"/>
    <rect x="8" y="9" width="1" height="1" fill="#c4a8ff"/>
    <rect x="0" y="0" width="1" height="1" fill="#a07de8" opacity="0.6"/>
    <rect x="15" y="3" width="1" height="1" fill="#c4a8ff" opacity="0.8"/>
    <rect x="0" y="12" width="1" height="1" fill="#7c5cbf" opacity="0.7"/>
  </svg>
);

const skills = [
  { title: "Frontend", tags: ["React", "Next.js", "Vite", "Tailwind", "HTML5"] },
  { title: "Mobile", tags: ["React Native", "Android Studio", "Flutter"] },
  { title: "Backend", tags: ["Node.js", "Django", "REST API"] },
  { title: "Design & Tools", tags: ["Figma", "Git", "Vercel", "Canva"] },
];

const experience = [
  {
    year: "2024 - Present",
    role: "English Secondary Teacher",
    company: "Glats Inc.",
    desc: "I teach English online to students of different ages and levels, creating personalized and engaging lessons to help them improve their language skills through clear guidance and regular feedback",
  },
  {
    year: "2022-2023",
    role: "Social Media Evaluator",
    company: "Appen",
    desc: "Analyze online ads from  companies to determine their relevance, categorize, and provide feedback on the content.",
  },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{style}</style>
      <main className="about-page">

        <FadeSection>
          <section className="about-hero">
            <div>
              <h1>About Me</h1>
              <p>I'm a passionate creative developer and designer who loves building digital products that users actually enjoy. I believe good design and clean code go hand in hand.</p>
              <p>When I'm not coding, you'll find me exploring new design trends, contributing to team projects, or learning something new in the dev world.</p>
              <p>I'm always excited to work on projects that challenge me to grow — whether it's a web system, mobile app, or a fresh UI from scratch.</p>
            </div>
            <div className="pixel-wrap">
              <span className="decor-1">✦</span>
              <span className="decor-2">+</span>
              <span className="decor-3"></span>
              <span className="decor-4">✦</span>
              <PixelCat />
            </div>
          </section>
        </FadeSection>

        <FadeSection delay={100}>
          <section className="skills-section">
            <h2 className="section-title">Skills &amp; Technologies</h2>
            <div className="skills-grid">
              {skills.map((s) => (
                <div className="skill-card" key={s.title}>
                  <h3>{s.title}</h3>
                  <div className="tags">
                    {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeSection>

        <FadeSection delay={200}>
          <section className="exp-section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              {experience.map((e, i) => (
                <div className="timeline-item" key={i}>
                  <div className="year-badge">{e.year}</div>
                  <div className="exp-card">
                    <h3>{e.role}</h3>
                    <div className="exp-company">{e.company}</div>
                    <p>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeSection>

      </main>
    </>
  );
} 