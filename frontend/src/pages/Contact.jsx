import { useState } from 'react';
import {
  FiMail, FiMapPin, FiMessageCircle, FiClock, FiSend, FiGlobe,
  FiHeadphones, FiCheckCircle, FiArrowUpRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import Reveal from '../components/Reveal.jsx';

const INFO = [
  {
    icon: <FiMail />,
    title: 'Email us',
    body: 'hello@neural.directory — we reply within 2 business days.',
  },
  {
    icon: <FiMapPin />,
    title: 'Head office',
    body: 'Remote-first. Registered in Lisbon, Portugal.',
  },
  {
    icon: <FiMessageCircle />,
    title: 'Join the Discord',
    body: '6,200 makers, researchers and curious humans. Invite-only but open to all.',
  },
  {
    icon: <FiClock />,
    title: 'Office hours',
    body: 'Every Thursday at 5pm UTC — live Q&A with the editorial team.',
  },
];

const SUBJECTS = [
  'General question',
  'Submit a tool',
  'Partnership / sponsorship',
  'Press inquiry',
  'Report an issue',
  'Data / privacy request',
  'Careers',
  'Something else',
];

const QUICK_FAQS = [
  {
    q: 'How fast do you reply?',
    a: "Within 2 business days for general questions. Under 24 hours for tool submissions. Press inquiries get same-day priority.",
  },
  {
    q: 'Do you accept paid placements?',
    a: "No. We decline every paid-placement request we receive — the directory is purely editorial and that will not change.",
  },
  {
    q: "I'm a journalist — can you jump on a call?",
    a: "Yes. Maya and Linh are both comfortable on camera. Include your publication and angle in the message.",
  },
  {
    q: 'Something looks broken — where to report?',
    a: "Pick 'Report an issue' as the subject. Include a screenshot and the URL if you can; speeds up triage a lot.",
  },
];

const CHANNELS = [
  {
    icon: <FiHeadphones />,
    title: 'Support inbox',
    body: 'For account, data, or directory issues.',
    detail: 'support@neural.directory',
    latency: '< 24 hrs',
  },
  {
    icon: <FiGlobe />,
    title: 'Partnerships',
    body: 'Workshops, events, co-marketing.',
    detail: 'partners@neural.directory',
    latency: '2-3 days',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Press',
    body: 'Statements, interviews, data requests.',
    detail: 'press@neural.directory',
    latency: 'Same day',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General question',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    try {
      const res = await api.post('/contact', form);
      setStatus({ success: res.data.message });
      setForm({ name: '', email: '', subject: 'General question', message: '' });
    } catch (err) {
      setStatus({ error: err?.response?.data?.message || 'Something went wrong — try again.' });
    }
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Reveal><span className="eyebrow">Get in touch</span></Reveal>
          <Reveal delay={1}><h1>Let&apos;s talk.</h1></Reveal>
          <Reveal delay={2}>
            <p>
              Submit a tool, report a bug, pitch a partnership, or just say hi. Every message
              lands in a real human&apos;s inbox — we read all of them.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-layout">
            <Reveal>
              <div className="contact-info">
                {INFO.map((c) => (
                  <div key={c.title} className="contact-info-card">
                    <div className="contact-info-icon">{c.icon}</div>
                    <div>
                      <h4>{c.title}</h4>
                      <p>{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1}>
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name" type="text" required minLength={2}
                      value={form.name} onChange={handle('name')}
                      placeholder="Ada Lovelace"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email" type="email" required
                      value={form.email} onChange={handle('email')}
                      placeholder="ada@domain.com"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" value={form.subject} onChange={handle('subject')}>
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" rows={7} required minLength={10}
                    value={form.message} onChange={handle('message')}
                    placeholder="Tell us what's on your mind…"
                  />
                </div>

                {status?.success && <div className="form-alert success">{status.success}</div>}
                {status?.error && <div className="form-alert error">{status.error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={status?.loading}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {status?.loading ? 'Sending…' : <>Send message <FiSend /></>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Dedicated channels ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Direct channels</span>
            <h2>Skip the form — reach the right inbox</h2>
            <p>If you already know the topic, email the dedicated inbox and skip queue time.</p>
          </Reveal>

          <div className="features-grid">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) + 1}>
                <div className="feature-card">
                  <div className="feature-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p style={{ marginBottom: 14 }}>{c.body}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text)' }}>
                    {c.detail}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
                    Typical response: {c.latency}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Quick FAQ ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Before you write</span>
            <h2>A few quick answers</h2>
            <p>The questions we answer five times a week. Full FAQ on the dedicated page.</p>
          </Reveal>

          <div className="contact-faq-grid">
            {QUICK_FAQS.map((f, i) => (
              <Reveal key={f.q} delay={(i % 4) + 1}>
                <div className="contact-faq">
                  <h4>{f.q}</h4>
                  <p>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/faq" className="btn btn-ghost">
              Read the full FAQ <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
