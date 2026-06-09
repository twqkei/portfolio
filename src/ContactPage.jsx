import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

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

  /* ── HIRE ME SECTION ── */
  .hire-section {
    position: relative;
    overflow: hidden;
    padding: 5rem 2rem 6rem;
    text-align: center;
    background: var(--bg);
  }

  .hire-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .hire-inner {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hire-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
    color: var(--accent);
    letter-spacing: 0.14em;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .hire-label::before,
  .hire-label::after {
    content: '';
    width: 32px;
    height: 1px;
    background: var(--blue-bright);
    opacity: 0.5;
  }

  .hire-title {
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text);
    margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
  }

  .hire-title span {
    background: linear-gradient(135deg, #93c5fd, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hire-desc {
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.75;
    max-width: 520px;
    margin: 0 auto 2.4rem;
  }

  .hire-btns {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3.5rem;
  }

  .btn-primary {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 0.9rem 2.2rem;
    background: var(--blue);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(37,99,235,0.4);
  }

  .btn-primary:hover {
    background: var(--blue-bright);
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(59,130,246,0.55);
  }

  .btn-outline {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 0.9rem 2.2rem;
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

  /* STATS */
  .hire-stats {
    display: flex;
    justify-content: center;
    gap: 4rem;
    padding: 2.5rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .hire-stat-num {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .hire-stat-num span { color: var(--blue-bright); }

  .hire-stat-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── CONTACT SECTION ── */
  .contact-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 5rem 2rem 6rem;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 4rem;
    align-items: start;
  }

  /* LEFT INFO */
  .contact-info {}

  .section-title {
    font-size: 1.7rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 0.6rem;
    position: relative;
    display: inline-block;
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
    box-shadow: 0 0 8px rgba(59,130,246,0.5);
  }

  .contact-desc {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.75;
    margin-top: 1.2rem;
    margin-bottom: 2rem;
  }

  /* CONTACT DETAILS */
  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.4rem;
  }

  .contact-detail-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .detail-icon {
    width: 38px;
    height: 38px;
    background: rgba(37,99,235,0.1);
    border: 1px solid var(--blue-dim);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .detail-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    color: var(--muted);
    margin-bottom: 0.15rem;
    letter-spacing: 0.06em;
  }

  .detail-value {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text);
  }

  /* SOCIAL LINKS */
  .social-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    margin-bottom: 0.8rem;
  }

  .social-links {
    display: flex;
    gap: 0.7rem;
  }

  .social-link {
    width: 42px;
    height: 42px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
    cursor: pointer;
  }

  .social-link:hover {
    border-color: var(--blue-bright);
    background: rgba(37,99,235,0.12);
    transform: translateY(-3px);
    box-shadow: 0 0 16px rgba(37,99,235,0.2);
  }

  /* RIGHT — FORM */
  .contact-form-wrap {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.2rem;
  }

  .form-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1.6rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.1rem;
  }

  .form-group label {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.08em;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text);
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--muted);
    opacity: 0.6;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    border-color: var(--blue-bright);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-group select option {
    background: var(--card);
    color: var(--text);
  }

  .form-submit {
    width: 100%;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 0.9rem;
    background: var(--blue);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(37,99,235,0.3);
    margin-top: 0.4rem;
  }

  .form-submit:hover {
    background: var(--blue-bright);
    transform: translateY(-2px);
    box-shadow: 0 0 32px rgba(59,130,246,0.45);
  }

  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .form-success {
    text-align: center;
    padding: 2rem;
  }

  .form-success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .form-success h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .form-success p {
    color: var(--muted);
    font-size: 0.88rem;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
  }

  .footer-logo {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    color: var(--accent);
  }

  .footer-copy {
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.04em;
  }

  .footer-copy span { color: var(--blue-bright); }

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
    .hire-section { padding: 4rem 1.5rem; }
    .hire-stats { gap: 2rem; }
    .contact-section { grid-template-columns: 1fr; padding: 3rem 1.5rem 5rem; gap: 2.5rem; }
    .form-row { grid-template-columns: 1fr; }
    .footer { flex-direction: column; gap: 0.6rem; text-align: center; padding: 1.5rem; }
  }
`;

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  const socials = [
    { icon: "🐙", label: "GitHub", href: "https://github.com/yourusername" },
    { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { icon: "📸", label: "Instagram", href: "https://instagram.com/yourusername" },
    { icon: "✉️", label: "Email", href: "mailto:mikaagang@gmail.com" },
  ];

  return (
    <>
      <style>{style}</style>

      {/* ── HIRE ME ── */}
      <FadeSection>
        <section className="hire-section">
          <div className="hire-inner">
            <div className="hire-label">OPEN TO OPPORTUNITIES</div>
            <h2 className="hire-title">
              Let's Build Something<br />
              <span>Amazing Together.</span>
            </h2>
            <p className="hire-desc">
              I'm available for freelance projects, full-time roles, and collaborations.
              If you have an idea or a problem to solve — I'd love to hear about it.
            </p>
            <div className="hire-btns">
              <a href="mailto:mikaagang@gmail.com" className="btn-primary">
                Hire Me ✦
              </a>
              <a href="#contact-form" className="btn-outline">
                Send a Message
              </a>
            </div>

            <div className="hire-stats">
              <div>
                <div className="hire-stat-num">6<span>+</span></div>
                <div className="hire-stat-label">Projects Done</div>
              </div>
              <div>
                <div className="hire-stat-num">3<span>+</span></div>
                <div className="hire-stat-label">Web Apps</div>
              </div>
              <div>
                <div className="hire-stat-num">3<span>+</span></div>
                <div className="hire-stat-label">Mobile Apps</div>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ── CONTACT FORM ── */}
      <div id="contact-form">
        <FadeSection delay={100}>
          <div className="contact-section">

            {/* LEFT */}
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="contact-desc">
                Have a project in mind? Want to collaborate? Or just want to say hi?
                Fill out the form and I'll get back to you as soon as possible.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="detail-icon">📍</div>
                  <div>
                    <div className="detail-label">LOCATION</div>
                    <div className="detail-value">Davao City, Philippines</div>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="detail-icon">✉️</div>
                  <div>
                    <div className="detail-label">EMAIL</div>
                    <div className="detail-value">mikaagang@gmail.com</div>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="detail-icon">⚡</div>
                  <div>
                    <div className="detail-label">RESPONSE TIME</div>
                    <div className="detail-value">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="social-label">// FIND ME ON</div>
              <div className="social-links">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="social-link" title={s.label} target="_blank" rel="noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div className="contact-form-wrap">
              {sent ? (
                <div className="form-success">
                  <div className="form-success-icon">🎉</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out! I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="form-title">Send a Message</div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>YOUR NAME</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Mikaela"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>EMAIL ADDRESS</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="hello@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>SUBJECT</label>
                      <select name="subject" value={form.subject} onChange={handleChange} required>
                        <option value="" disabled>Select a topic...</option>
                        <option value="freelance">Freelance Project</option>
                        <option value="fulltime">Full-time Role</option>
                        <option value="collab">Collaboration</option>
                        <option value="other">Just Saying Hi</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>MESSAGE</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or idea..."
                        required
                      />
                    </div>

                    <button type="submit" className="form-submit" disabled={loading}>
                      {loading ? "Sending..." : "Send Message →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </FadeSection>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">mikaelaagang</div>
        <div className="footer-copy">
          © 2025 Mikaela Agang. Built with <span>React</span> ✦
        </div>
      </footer>
    </>
  );
}