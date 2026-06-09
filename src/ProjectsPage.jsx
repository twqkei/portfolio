import { useState } from "react";
import aedex from './assets/aedex.png'
import grading from './assets/grading.png'
import dispatch from './assets/dispatch.png'
import lifeadmin from './assets/lifeadmin.png'
import freshtify from './assets/freshtify.png'
import safelink from './assets/safelink.png'

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

  .projects-wrap {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 1rem 6rem;
  }

  .projects-header { margin-bottom: 3rem; }

  .projects-header h2 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 800;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .projects-header h2 span { color: var(--blue-bright); }

  .projects-header p {
    color: var(--muted);
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-family: 'Space Mono', monospace;
  }

  .device-section { margin-bottom: 4rem; }

  .device-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
    color: var(--blue-bright);
    letter-spacing: 0.12em;
    margin-bottom: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .device-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .laptop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .phone-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    align-items: start;
    overflow: hidden;
  }

  .project-card {
    cursor: pointer;
    transition: transform 0.25s;
  }

  .project-card:hover { transform: translateY(-6px); }

  /* laptop mockup images */
  .mockup-img {
    width: 100%;
    display: block;
    border-radius: 12px;
    border: 1px solid var(--border);
    transition: border-color 0.25s, box-shadow 0.25s;
    object-fit: cover;
  }

  .project-card:hover .mockup-img {
    border-color: var(--blue);
    box-shadow: 0 0 24px rgba(37,99,235,0.25);
  }

  .laptop-placeholder {
    aspect-ratio: 16/10;
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .project-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }

  /* phone mockup images — no forced aspect ratio, just contain the image */
  .phone-mockup-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    transition: filter 0.25s;
    overflow: hidden;
  }

  .phone-mockup-wrap img {
    width: 100%;
    display: block;
    object-fit: contain;
    border-radius: 8px;
    transition: filter 0.25s, transform 0.25s;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
  }

  .project-card:hover .phone-mockup-wrap img {
    filter: drop-shadow(0 4px 24px rgba(37,99,235,0.35));
  }

  .phone-placeholder-fallback {
    width: 75%;
    aspect-ratio: 9/19;
    border-radius: 24px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }

  .placeholder-emoji { font-size: 2.4rem; }

  .placeholder-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: rgba(255,255,255,0.5);
    text-align: center;
    padding: 0 8px;
  }

  .grad-1 { background: linear-gradient(135deg, #1a1a2e, #2563eb); }
  .grad-2 { background: linear-gradient(135deg, #0d1a2e, #3d6ebf); }
  .grad-3 { background: linear-gradient(135deg, #0d2e1a, #3dbf8c); }
  .grad-4 { background: linear-gradient(135deg, #2e1a1a, #bf3d5c); }
  .grad-5 { background: linear-gradient(135deg, #1a2a1a, #5cbf3d); }
  .grad-6 { background: linear-gradient(135deg, #2e1a2e, #bf3da0); }

  .device-info { text-align: center; margin-top: 0.8rem; }

  .device-info-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .device-info-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    color: var(--accent);
    background: rgba(124,92,191,0.12);
    border: 1px solid var(--blue-dim);
    padding: 0.18rem 0.5rem;
    border-radius: 999px;
    display: inline-block;
  }

  /* ── LIGHTBOX ── */
  .lightbox-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .lightbox-inner {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    max-width: 820px;
    width: 100%;
    animation: scaleIn 0.25s ease;
    position: relative;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    max-height: 90vh;
  }

  @keyframes scaleIn {
    from { transform: scale(0.92); opacity:0; }
    to   { transform: scale(1);    opacity:1; }
  }

  .lightbox-preview {
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .lightbox-preview::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.1), transparent 70%);
    pointer-events: none;
  }

  /* laptop preview in lightbox */
  .lb-mockup-img-wrap {
    width: 100%;
    position: relative;
    z-index: 1;
    border-radius: 10px;
    overflow: hidden;
  }

  .lb-mockup-img-wrap.clickable {
    cursor: pointer;
  }

  .lb-mockup-img-wrap.clickable:hover img {
    opacity: 0.85;
  }

  .lb-preview-img {
    width: 100%;
    display: block;
    border-radius: 10px;
    object-fit: contain;
  }

  .lb-click-hint {
    text-align: center;
    margin-top: 0.6rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: var(--accent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .lb-mockup-img-wrap.clickable:hover .lb-click-hint {
    opacity: 1;
  }

  /* phone preview in lightbox */
  .lb-phone-preview {
    width: 85%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  .lb-phone-preview img {
    width: 100%;
    display: block;
    object-fit: contain;
    border-radius: 8px;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  }

  .lb-placeholder {
    width: 100%;
    min-height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    border-radius: 10px;
  }

  .lightbox-body {
    padding: 2rem 1.8rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .lightbox-close {
    position: absolute;
    top: 0.9rem;
    right: 0.9rem;
    width: 30px;
    height: 30px;
    background: rgba(13,13,18,0.8);
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--text);
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    z-index: 10;
  }

  .lightbox-close:hover { background: var(--blue); border-color: var(--blue); }

  .lightbox-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--accent);
    background: rgba(124,92,191,0.15);
    border: 1px solid var(--blue-dim);
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 0.7rem;
  }

  .lightbox-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .lightbox-desc {
    color: var(--muted);
    font-size: 0.84rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .lightbox-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }

  .lightbox-tech span {
    font-family: 'Space Mono', monospace;
    font-size: 0.67rem;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--muted);
  }

  .lightbox-url-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent);
    text-decoration: none;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--blue-dim);
    padding-bottom: 0.2rem;
    width: fit-content;
    word-break: break-all;
  }

  .lightbox-url-link:hover {
    color: var(--blue-bright);
    border-color: var(--blue-bright);
  }

  .team-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--blue-bright);
    letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
  }

  .team-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.3rem;
  }

  .team-member {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .team-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--blue-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--accent);
    flex-shrink: 0;
    border: 1px solid var(--blue);
  }

  .team-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text);
  }

  .team-role {
    font-size: 0.7rem;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
  }

  .lightbox-nav {
    display: flex;
    gap: 0.6rem;
    margin-top: auto;
    padding-top: 1rem;
  }

  .btn-prev {
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    transition: all 0.2s;
  }

  .btn-prev:hover { border-color: var(--blue); color: var(--accent); }

  .btn-next {
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    cursor: pointer;
    background: var(--blue);
    border: 1px solid var(--blue);
    color: #fff;
    transition: all 0.2s;
  }

  .btn-next:hover { background: var(--blue-bright); }

  @media (max-width: 700px) {
    .projects-wrap { padding: 2rem 1.5rem 4rem; }
    .laptop-grid, .phone-grid { grid-template-columns: repeat(2, 1fr); }
    .lightbox-inner { grid-template-columns: 1fr; overflow-y: auto; }
    .lightbox-preview { min-height: 200px; }
  }
`;

const laptopProjects = [
  {
    id: 1,
    type: "laptop",
    title: "Aedex Admin Dashboard",
    tag: "Web App",
    desc: "A full-featured admin dashboard for Aedex with data management, analytics, user controls, and real-time reporting built for internal operations.",
    tech: ["React", "Tailwind", "REST API", "Charts"],
    image: aedex,
    previewImage: aedex,
    url: "https://aedexappreports.web.app",
  },
  {
    id: 2,
    type: "laptop",
    title: "Grading Management System",
    tag: "Web System",
    desc: "A comprehensive grading system for schools to manage student records, compute grades, generate reports, and track academic performance.",
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    image: grading,
    previewImage: grading,
    url: null,
  },
  {
    id: 3,
    type: "laptop",
    title: "Vehicle Dispatch System",
    tag: "Web System",
    desc: "A real-time vehicle dispatch and fleet management system with live tracking, driver assignment, route optimization, and status monitoring.",
    tech: ["React", "Maps API", "Socket.io", "Node.js"],
    image: dispatch,
    previewImage: dispatch,
    url: "https://dispatch-frontend-one.vercel.app",
  },
];

const phoneProjects = [
  {
    id: 4,
    type: "phone",
    title: "LifeAdmin",
    tag: "Mobile App",
    desc: "A personal life management app to organize tasks, bills, appointments, and goals all in one place. Clean UI with smart reminders and daily planning tools.",
    tech: ["Android Studio", "Figma"],
    image: lifeadmin,
    previewImage: lifeadmin,
    url: null,
    team: [
      { name: "Mikaela Agang", role: "UI/UX + Developer", initials: "MA" },
      { name: "Teammate Name", role: "Mobile Developer", initials: "TN" },
    ],
  },
  {
    id: 5,
    type: "phone",
    title: "Freshtify",
    tag: "Mobile App",
    desc: "A fresh produce delivery app connecting local farmers to consumers. Features product browsing, cart, order tracking, and seller dashboard.",
    tech: ["Android Studio", "Firebase", "Figma"],
    image: freshtify,
    previewImage: freshtify,
    url: null,
  },
  {
    id: 6,
    type: "phone",
    title: "SafeLink App",
    tag: "Mobile App",
    desc: "An emergency response mobile app that connects users to ambulance services in real-time. Features SOS button, live map tracking, and responder routing.",
    tech: ["Android Studio", "Figma"],
    image: safelink,
    previewImage: safelink,
    url: null,
  },
];

const allProjects = [...laptopProjects, ...phoneProjects];

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const selectedIndex = allProjects.findIndex(function(p) { return p.id === selected?.id; });

  function goPrev() {
    setSelected(allProjects[(selectedIndex - 1 + allProjects.length) % allProjects.length]);
  }

  function goNext() {
    setSelected(allProjects[(selectedIndex + 1) % allProjects.length]);
  }

  function handleLightboxPreviewClick() {
    if (selected && selected.url) {
      window.open(selected.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      <style>{style}</style>

      <div className="projects-wrap">
        <div className="projects-header">
          <h2>Projects <span>2023–2026</span></h2>
          <p>// a collection of things i've built & designed</p>
        </div>

        {/* WEB PROJECTS */}
        <div className="device-section">
          <div className="device-label">WEB PROJECTS</div>
          <div className="laptop-grid">
            {laptopProjects.map(function(p) {
              return (
                <div className="project-card" key={p.id} onClick={function() { setSelected(p); }}>
                  {p.image
                    ? <img src={p.image} alt={p.title} className="mockup-img" />
                    : (
                      <div className={"project-placeholder laptop-placeholder " + p.grad}>
                        <span className="placeholder-emoji">{p.emoji}</span>
                        <span className="placeholder-label">{p.title}</span>
                      </div>
                    )
                  }
                  <div className="device-info">
                    <div className="device-info-title">{p.title}</div>
                    <span className="device-info-tag">{p.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE PROJECTS */}
        <div className="device-section">
          <div className="device-label">MOBILE PROJECTS</div>
          <div className="phone-grid">
            {phoneProjects.map(function(p) {
              return (
                <div className="project-card" key={p.id} onClick={function() { setSelected(p); }}>
                  <div className="phone-mockup-wrap">
                    {p.image
                      ? <img src={p.image} alt={p.title} />
                      : (
                        <div className={"phone-placeholder-fallback " + p.grad}>
                          <span className="placeholder-emoji">{p.emoji}</span>
                          <span className="placeholder-label">{p.title}</span>
                        </div>
                      )
                    }
                  </div>
                  <div className="device-info">
                    <div className="device-info-title">{p.title}</div>
                    <span className="device-info-tag">{p.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="lightbox-backdrop"
          onClick={function(e) { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="lightbox-inner">
            <button className="lightbox-close" onClick={function() { setSelected(null); }}>✕</button>

            <div className="lightbox-preview">
              {selected.type === "laptop" ? (
                <div
                  className={"lb-mockup-img-wrap" + (selected.url ? " clickable" : "")}
                  onClick={handleLightboxPreviewClick}
                >
                  {selected.previewImage
                    ? <img src={selected.previewImage} alt={selected.title} className="lb-preview-img" />
                    : <div className={"lb-placeholder " + selected.grad}>{selected.emoji}</div>
                  }
                  {selected.url && <div className="lb-click-hint">🔗 click to visit site</div>}
                </div>
              ) : (
                <div className="lb-phone-preview">
                  {selected.previewImage
                    ? <img src={selected.previewImage} alt={selected.title} />
                    : <div className={"lb-placeholder " + selected.grad}>{selected.emoji}</div>
                  }
                </div>
              )}
            </div>

            <div className="lightbox-body">
              <div className="lightbox-tag">{selected.tag}</div>
              <div className="lightbox-title">{selected.title}</div>
              <div className="lightbox-desc">{selected.desc}</div>

              <div className="lightbox-tech">
                {selected.tech.map(function(t) { return <span key={t}>{t}</span>; })}
              </div>

              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-url-link"
                >
                  🔗 {selected.url}
                </a>
              )}

              {selected.team && (
                <>
                  <div className="team-label">// TEAM</div>
                  <div className="team-list">
                    {selected.team.map(function(m, i) {
                      return (
                        <div className="team-member" key={i}>
                          <div className="team-avatar">{m.initials}</div>
                          <div>
                            <div className="team-name">{m.name}</div>
                            <div className="team-role">{m.role}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="lightbox-nav">
                <button className="btn-prev" onClick={goPrev}>← Prev</button>
                <button className="btn-next" onClick={goNext}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}