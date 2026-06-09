import { useEffect, useRef } from "react";
import photo from './assets/lala.png';

// ── SKILL ICONS — all served from devicons CDN, no local files needed
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const icons = {
  react:    `${CDN}/react/react-original.svg`,
  nextjs:   `${CDN}/nextjs/nextjs-original.svg`,
  vite:     "https://vitejs.dev/logo.svg",
  tailwind: `${CDN}/tailwindcss/tailwindcss-plain.svg`,
  html5:    `${CDN}/html5/html5-original.svg`,
  android:  `${CDN}/android/android-original.svg`,
  flutter:  `${CDN}/flutter/flutter-original.svg`,
  nodejs:   `${CDN}/nodejs/nodejs-original.svg`,
  django:   `${CDN}/django/django-plain.svg`,
  figma:    `${CDN}/figma/figma-original.svg`,
  git:      `${CDN}/git/git-original.svg`,
  vercel:   "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
  canva:    "https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg",
  api:      `${CDN}/fastapi/fastapi-original.svg`,
};

const style = `
  .about-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem 2rem 2rem;

  }

  /* ── HERO SPLIT ── */
  .about-hero {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 3rem;
    align-items: start;
      margin-bottom: 1.5rem;

  }

  /* LEFT — PHOTO */
  .about-photo-col {
    position: relative;
  }

  .about-photo-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: none;
    outline: none;
    box-shadow: 0 0 60px rgba(37,99,235,0.45), 0 0 120px rgba(37,99,235,0.2);
  }

  .about-photo-wrap img {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 3/4;
  }

  .about-photo-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 50%);
    pointer-events: none;
  }

  .photo-name-overlay {
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    z-index: 2;
  }

  .photo-name-overlay .hello-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.12em;
    margin-bottom: 0.2rem;
  }

  .photo-name-overlay .name-text {
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .photo-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 1rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent);
    background: rgba(37,99,235,0.1);
    border: 1px solid var(--blue-dim);
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    width: fit-content;
  }

  .photo-tag::before {
    content: '▸';
    color: var(--blue-bright);
  }

  /* RIGHT — INFO */
  .about-info-col {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding-top: 0.5rem;
  }

  .about-intro h1 {
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .about-intro h1 span {
    background: linear-gradient(135deg, #93c5fd, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-intro p {
    color: var(--muted);
    line-height: 1.8;
    font-size: 0.95rem;
    max-width: 520px;
  }

  /* SECTION TITLE */
  .section-title {
    font-size: 0.72rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--blue-bright);
    letter-spacing: 0.14em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* SKILLS */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  .skill-card {
    padding: 0.4rem 0;
    background: none;
    border: none;
    box-shadow: none;
  }

  .skill-card h3 {
    font-size: 0.72rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--blue-bright);
    margin-bottom: 0.8rem;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }

  /* ICON BADGES */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .tag {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    cursor: default;
  }

  .tag-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .tag:hover .tag-icon-wrap {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.35);
  }

  .tag-icon-wrap img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }

  .tag-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    color: var(--muted);
    text-align: center;
    white-space: nowrap;
  }

  /* EDUCATION + EXPERIENCE — two col */
  .edu-exp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .edu-exp-col h4 {
    font-size: 0.72rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--blue-bright);
    letter-spacing: 0.14em;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .edu-exp-col h4::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .edu-item, .exp-item {
    margin-bottom: 1rem;
    padding-left: 0.8rem;
    border-left: 2px solid var(--blue-dim);
  }

  .edu-item:last-child, .exp-item:last-child {
    margin-bottom: 0;
  }

  .edu-year, .exp-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--blue-bright);
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .edu-year::before, .exp-year::before {
    content: '◆';
    font-size: 0.5rem;
  }

  .edu-title, .exp-role {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.15rem;
  }

  .edu-school, .exp-company {
    font-size: 0.78rem;
    color: var(--muted);
  }

  .exp-desc {
    font-size: 0.75rem;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 0.3rem;
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

  @media (max-width: 900px) {
    .about-hero { grid-template-columns: 1fr; }
    .about-photo-wrap { max-width: 300px; margin: 0 auto; }
  }

  @media (max-width: 600px) {
    .about-page { padding: 2rem 1rem 4rem; }
    .skills-grid { grid-template-columns: 1fr; }
    .edu-exp-grid { grid-template-columns: 1fr; }
  }
`;

const skills = [
  {
    title: "FRONTEND",
    tags: [
      { label: "React",    icon: icons.react,    color: "#61DAFB" },
      { label: "Next.js",  icon: icons.nextjs,   color: "#e2e8f0" },
      { label: "Vite",     icon: icons.vite,     color: "#A259FF" },
      { label: "Tailwind", icon: icons.tailwind, color: "#38BDF8" },
    ],
  },
  {
    title: "MOBILE",
    tags: [
      { label: "React Native",   icon: icons.react,   color: "#61DAFB" },
      { label: "Android Studio", icon: icons.android, color: "#3DDC84" },
      { label: "Flutter",        icon: icons.flutter, color: "#54C5F8" },
    ],
  },
  {
    title: "BACKEND",
    tags: [
      { label: "Node.js",  icon: icons.nodejs, color: "#8CC84B" },
      { label: "Django",   icon: icons.django, color: "#44B78B" },
      { label: "REST API", icon: icons.api,    color: "#FF6B6B" },
    ],
  },
  {
    title: "DESIGN & TOOLS",
    tags: [
      { label: "Figma",  icon: icons.figma,  color: "#F24E1E" },
      { label: "Git",    icon: icons.git,    color: "#F05032" },
      { label: "Vercel", icon: icons.vercel, color: "#e2e8f0" },
      { label: "Canva",  icon: icons.canva,  color: "#00C4CC" },
    ],
  },
];

const education = [
  {
    year: "2016 – 2020",
    title: "Carmen National High School",
    school: "Cookery",
  },
  {
    year: "2020 – 2022",
    title: "Northlink Technological College",
    school: "Technical-Vocational-Livelihood (TVL) – ICT CSS",
  },
  {
    year: "2022 – 2026",
    title: "Davao del Norte State College",
    school: "Bachelor of Science in Information Technology",
  }
];

const experience = [
  {
    year: "2022 – 2023",
    role: "Social Media Evaluator",
    company: "Appen",
    desc: "Analyzed online ads for relevance, categorized content, and provided quality feedback.",
  },
  {
    year: "2024 – 2026",
    role: "English Secondary Teacher",
    company: "Glats Inc.",
    desc: "Teach English online to students of different ages and levels, creating personalized lessons and providing regular feedback.",
  },
  {
    year: "2026",
    role: "Programmer",
    company: "DNSC - Office of the Presidential Affairs",
    desc: "Developed Dispatch Requisitioning System for DNSC school vehicles",
  }
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08 }
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
          <div className="about-hero">

            {/* LEFT — PHOTO */}
            <div className="about-photo-col">
              <div className="about-photo-wrap">
                <img src={photo} alt="Mikaela Agang" />
                <div className="photo-name-overlay">
                  <div className="hello-text">HELLO, I AM</div>
                  <div className="name-text">Mikaela<br />Agang</div>
                </div>
              </div>
              <div className="photo-tag">UI/UX Designer + Developer</div>
            </div>

            {/* RIGHT — INFO */}
            <div className="about-info-col">

              <div className="about-intro">
                <h1>About <span>Me</span></h1>
                <p>
                  Hi! My name is Mikaela Agang. I have experience in web design, 
                  programming, and documentation. Throughout my college years, 
                  I worked on various projects that helped me improve my problem-solving, 
                  leadership, and sense of responsibility. These experiences have helped 
                  shape who I am today and strengthened my confidence in my knowledge, 
                  particularly in programming and web design, which I am passionate about.
                </p>
              </div>

              {/* SKILLS */}
              <div>
                <div className="section-title">SOFTWARE SKILLS</div>
                <div className="skills-grid">
                  {skills.map(function(s) {
                    return (
                      <div className="skill-card" key={s.title}>
                        <h3>{s.title}</h3>
                        <div className="tags">
                          {s.tags.map(function(t) {
                            return (
                              <div className="tag" key={t.label}>
                                <div
                                  className="tag-icon-wrap"
                                  style={{ background: t.color + "22" }}
                                >
                                  <img src={t.icon} alt={t.label} />
                                </div>
                                <span className="tag-label">{t.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* EDUCATION + EXPERIENCE */}
              <div className="edu-exp-grid">
                <div className="edu-exp-col">
                  <h4>EDUCATION</h4>
                  {education.map(function(e, i) {
                    return (
                      <div className="edu-item" key={i}>
                        <div className="edu-year">{e.year}</div>
                        <div className="edu-title">{e.title}</div>
                        <div className="edu-school">{e.school}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="edu-exp-col">
                  <h4>EXPERIENCE</h4>
                  {experience.map(function(e, i) {
                    return (
                      <div className="exp-item" key={i}>
                        <div className="exp-year">{e.year}</div>
                        <div className="exp-role">{e.role}</div>
                        <div className="exp-company">{e.company}</div>
                        <div className="exp-desc">{e.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </FadeSection>

      </main>
    </>
  );
}