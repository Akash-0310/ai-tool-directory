import { Link } from 'react-router-dom';
import {
  FiTarget, FiHeart, FiUsers, FiAward, FiArrowUpRight, FiCheck,
  FiGlobe, FiEdit3, FiCoffee, FiBookOpen,
} from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';

const VALUES = [
  {
    icon: <FiTarget />,
    title: 'Signal over noise',
    body: 'The AI space is loud. We take pride in saying no to mediocre tools, even popular ones.',
  },
  {
    icon: <FiHeart />,
    title: 'Maker-first',
    body: 'Neural exists because we were drowning in AI newsletters. We built the tool we wanted.',
  },
  {
    icon: <FiUsers />,
    title: 'Community-reviewed',
    body: 'Our 6,200-person Discord stress-tests every submission before it reaches the front page.',
  },
  {
    icon: <FiAward />,
    title: 'Independently funded',
    body: 'Bootstrapped. No VC money, no growth hacks, no pivot to become a social network.',
  },
  {
    icon: <FiGlobe />,
    title: 'Globally accessible',
    body: 'Served from 6 continents, translated into 12 languages, and free at every tier forever.',
  },
  {
    icon: <FiEdit3 />,
    title: 'Opinionated, not neutral',
    body: 'We tell you what we actually think. Neutral-sounding AI directories are usually hiding something.',
  },
];

const TEAM = [
  {
    name: 'Maya Rodríguez',
    role: 'Co-founder · Research',
    bio: 'Ex-DeepMind research engineer. Spends weekends rating RAG pipelines for fun.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=75',
  },
  {
    name: 'Aarav Patel',
    role: 'Co-founder · Product',
    bio: 'Built and sold two developer tools. Responsible for the "curated, not scraped" policy.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=75',
  },
  {
    name: 'Linh Nguyen',
    role: 'Head of Editorial',
    bio: 'Former ML reporter at The Verge. Writes 70% of our reviews; rejects 80% of submissions.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=75',
  },
  {
    name: 'Kai Okonkwo',
    role: 'Engineering Lead',
    bio: 'Keeps the site fast, the MongoDB happy, and our scrapers polite to every source.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=75',
  },
  {
    name: 'Sofia Laurent',
    role: 'Community Lead',
    bio: 'Runs our 6k-person Discord and weekly office hours. Coordinates the review pipeline.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=75',
  },
  {
    name: 'Tomás Oliveira',
    role: 'Design',
    bio: 'The reason this site looks good. Comes from a background in editorial magazine design.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=75',
  },
];

const TIMELINE = [
  {
    year: '2022',
    title: 'A spreadsheet, shared on Twitter',
    body: 'Maya posted a Notion page listing 40 AI tools she trusted. 80k views in a week.',
  },
  {
    year: '2023',
    title: 'Neural v1 launches',
    body: 'Aarav joined. We shipped the first version as a weekend project — it hit Product Hunt #1.',
  },
  {
    year: '2024',
    title: 'Editorial team forms',
    body: 'Linh joined to build a real review process. We rejected our first 200 submissions.',
  },
  {
    year: '2025',
    title: '1,000,000 monthly visitors',
    body: 'Crossed a million uniques. Added categories for Audio, Research, and Productivity.',
  },
  {
    year: '2026',
    title: 'Today — and this directory',
    body: 'You are reading the new redesign. 500+ tools, weekly refreshes, dark/light modes.',
  },
];

const STATS = [
  { num: '500+', label: 'Tools reviewed' },
  { num: '2.4M', label: 'Monthly readers' },
  { num: '6,200', label: 'Community members' },
  { num: '42', label: 'Countries reached' },
];

const PRESS_QUOTES = [
  {
    source: 'TechCrunch',
    quote: "Neural quietly became the most trusted AI discovery site of the year — without running a single ad.",
  },
  {
    source: 'The Verge',
    quote: "Where most AI directories are listicle farms, Neural reads like a magazine.",
  },
  {
    source: 'Fast Company',
    quote: "A rare example of taste and technology working in the same product.",
  },
  {
    source: 'Wired',
    quote: "The editorial bar at Neural is higher than at most tech newsrooms.",
  },
  {
    source: 'Hacker News (front page)',
    quote: "Saw this link. Cancelled my three other AI newsletter subscriptions the same hour.",
  },
  {
    source: 'Product Hunt',
    quote: "Product of the day and the week. Fifteen thousand upvotes and counting.",
  },
];

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <Reveal><span className="eyebrow">About Neural</span></Reveal>
          <Reveal delay={1}><h1>We built the AI directory we wished existed.</h1></Reveal>
          <Reveal delay={2}>
            <p>
              No rankings bought by affiliates. No 400-tool listicles written by an LLM. Just
              careful, human-curated recommendations from people who use these tools every day.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ───────── Stats band ───────── */}
      <section style={{ padding: '0 0 40px' }}>
        <div className="container">
          <Reveal>
            <div className="stats-band">
              {STATS.map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Mission ───────── */}
      <section className="section">
        <div className="container about-hero">
          <Reveal className="about-image">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=75"
              alt="A workspace at Neural"
            />
            <div className="about-badge">
              <h4>Remote-first since day one</h4>
              <p>11 people across 7 timezones — Lisbon, Bangalore, New York, Tokyo, Cape Town.</p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <span className="eyebrow">Our mission</span>
            <h2 style={{ margin: '16px 0 20px' }}>
              Help humans ship better work <br /> by finding the right AI — fast.
            </h2>
            <p style={{ color: 'var(--text-soft)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 16 }}>
              Every week, 200+ new AI tools launch. Only a handful actually do something useful.
              We spend 40 hours a week cutting through the noise so you don&apos;t have to.
            </p>
            <p style={{ color: 'var(--text-soft)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 20 }}>
              Neural is read by founders at pre-seed SaaS companies and researchers at Google
              DeepMind. Different jobs, same problem: which AI is worth a trial right now?
            </p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 10, marginBottom: 28 }}>
              {[
                'We do not accept paid placement — ever.',
                'Every listed tool is tested on a real workflow.',
                'We publish a changelog so you can see what moved and why.',
                'If a tool degrades, we downgrade the rating the same week.',
                'Rejected submissions receive detailed, non-template feedback.',
              ].map((line) => (
                <li key={line} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flexShrink: 0, marginTop: 2,
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'var(--accent)', color: 'var(--accent-contrast)',
                      display: 'grid', placeItems: 'center', fontSize: 11,
                    }}
                  >
                    <FiCheck />
                  </span>
                  <span style={{ color: 'var(--text-soft)' }}>{line}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">
              Work with us <FiArrowUpRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Values ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Our values</span>
            <h2>Six principles that shape every decision</h2>
            <p>Whether it&apos;s adding a new tool or rejecting a 6-figure sponsorship.</p>
          </Reveal>

          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) + 1}>
                <div className="feature-card">
                  <div className="feature-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Timeline ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Our journey</span>
            <h2>From spreadsheet to a million readers</h2>
            <p>Five years of slow, deliberate growth without a single paid campaign.</p>
          </Reveal>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={(i % 4) + 1} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Team ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">The team</span>
            <h2>Small, opinionated, permanently online</h2>
            <p>The people hand-reviewing every tool that hits this directory.</p>
          </Reveal>

          <div className="team-grid">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) + 1}>
                <div className="team-card">
                  <div className="team-avatar">
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <h4>{p.name}</h4>
                  <div className="role">{p.role}</div>
                  <p>{p.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Press mentions ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow"><FiBookOpen /> In the press</span>
            <h2>Featured in publications worth reading</h2>
            <p>A handful of things journalists, investors and readers have said about Neural.</p>
          </Reveal>

          <div className="press-list">
            {PRESS_QUOTES.map((p, i) => (
              <Reveal key={p.source} delay={(i % 4) + 1}>
                <div className="press-item">
                  <div className="press-item-source">{p.source}</div>
                  <p>&ldquo;{p.quote}&rdquo;</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Culture snapshot ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container about-hero" style={{ gridTemplateColumns: '1fr 1.1fr' }}>
          <Reveal delay={1}>
            <span className="eyebrow"><FiCoffee /> Culture</span>
            <h2 style={{ margin: '16px 0 20px' }}>A studio, not a startup.</h2>
            <p style={{ color: 'var(--text-soft)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 16 }}>
              We intentionally stayed small. Eleven people, each senior, working four days a week.
              No standups. No OKRs. Deliberate, slow, craft-driven work — the kind it takes to run a
              directory people actually trust.
            </p>
            <p style={{ color: 'var(--text-soft)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 20 }}>
              We write tools reviews like long-form essays. We argue about punctuation. We have an
              internal style guide forbidding the word &ldquo;leverage.&rdquo; Our one pinned message in
              Slack is a quote from Brian Eno: <em>&ldquo;honor thy error as a hidden intention.&rdquo;</em>
            </p>
            <Link to="/resources" className="btn btn-ghost">
              Read our work <FiArrowUpRight />
            </Link>
          </Reveal>

          <Reveal className="about-image" style={{ aspectRatio: '5/6' }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=75"
              alt="Neural office"
            />
            <div className="about-badge">
              <h4>Four-day work week</h4>
              <p>Closed Fridays. Open sourced the internal playbook we use to run it.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="eyebrow">Join us</span>
              <h2>We&apos;re hiring editors &amp; engineers</h2>
              <p>
                If you&apos;ve been called &ldquo;annoyingly picky&rdquo; more than once, we probably want to
                talk to you. Fully remote, async-first, 4-day work week.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                See open roles <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
