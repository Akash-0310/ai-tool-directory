import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiClock, FiArrowUpRight, FiBookOpen, FiAward, FiPlayCircle, FiDownload,
} from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';

const RESOURCES = [
  {
    type: 'Guide',
    title: "The 2026 buyer's guide to AI coding assistants",
    summary:
      'Cursor vs Copilot vs Codeium vs Tabnine — benchmarked on real pull-request workflows across three languages.',
    minutes: 14,
    author: 'Linh Nguyen',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Coding',
  },
  {
    type: 'Tutorial',
    title: 'Prompt engineering for designers',
    summary:
      'A 40-minute walkthrough for designers who want to use Midjourney, DALL·E and Flux without prompt-bro clichés.',
    minutes: 22,
    author: 'Maya Rodríguez',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Image',
  },
  {
    type: 'Report',
    title: 'State of AI writing tools — Q1 2026',
    summary:
      'Which AI writers are actually worth paying for? We spent 200 hours benchmarking accuracy, tone, and compliance.',
    minutes: 18,
    author: 'Aarav Patel',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Writing',
  },
  {
    type: 'Video',
    title: 'How we review an AI tool — behind the scenes',
    summary:
      'A 12-minute screencast of Linh putting three new video tools through our full review pipeline.',
    minutes: 12,
    author: 'Neural editorial',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Video',
  },
  {
    type: 'Template',
    title: 'The AI tool evaluation scorecard',
    summary:
      'The Notion template we use internally to score every tool we review. Free to clone, comment, or fork.',
    minutes: 5,
    author: 'Kai Okonkwo',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Productivity',
  },
  {
    type: 'Guide',
    title: 'Running open-source LLMs on a laptop',
    summary:
      'Llama 3.1, Mistral, Phi-3 — which models fit on 16GB of RAM, and how to set them up with Ollama.',
    minutes: 20,
    author: 'Kai Okonkwo',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Research',
  },
  {
    type: 'Interview',
    title: 'Talking to the creator of Perplexity',
    summary:
      "45 minutes with Aravind Srinivas on citations, the answer-engine thesis, and why Google hasn't responded.",
    minutes: 28,
    author: 'Linh Nguyen',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Research',
  },
  {
    type: 'Cheatsheet',
    title: 'AI voice tools compared at a glance',
    summary:
      'One-page PDF comparing ElevenLabs, PlayHT, Resemble, and six more voice cloning tools by price and quality.',
    minutes: 3,
    author: 'Maya Rodríguez',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Audio',
  },
  {
    type: 'Guide',
    title: 'Building an AI video pipeline on a budget',
    summary:
      'How to stitch Runway, Pika, ElevenLabs and Descript together into a repeatable short-form video workflow.',
    minutes: 16,
    author: 'Aarav Patel',
    image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Video',
  },
  // ───── new additions ─────
  {
    type: 'Tutorial',
    title: 'Your first autonomous agent — with a free stack',
    summary:
      'End-to-end walkthrough of building a research agent with Ollama, LangGraph and a local vector store. No cloud needed.',
    minutes: 30,
    author: 'Maya Rodríguez',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Coding',
  },
  {
    type: 'Report',
    title: 'Image models benchmarked — Flux, Midjourney, Ideogram',
    summary:
      'We ran 1,400 prompts across the big three image models. Here is where each one is objectively better (and where it hallucinates).',
    minutes: 24,
    author: 'Tomás Oliveira',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Image',
  },
  {
    type: 'Guide',
    title: 'The 2026 AI privacy audit checklist',
    summary:
      'A 40-point checklist we use before recommending any AI tool to enterprise readers. GDPR, CCPA, SOC2, data residency.',
    minutes: 18,
    author: 'Sofia Laurent',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Research',
  },
  {
    type: 'Template',
    title: 'Prompt library — 120 proven prompts across domains',
    summary:
      "Every prompt we've copy-pasted into ChatGPT, Claude and Gemini more than ten times, organized by job-to-be-done.",
    minutes: 6,
    author: 'Linh Nguyen',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Writing',
  },
  {
    type: 'Video',
    title: 'Generating an album in an afternoon — Suno vs Udio',
    summary:
      'Live-stream recording: Maya and Aarav attempt to generate, mix and master a 5-track EP in under 4 hours.',
    minutes: 44,
    author: 'Neural editorial',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Audio',
  },
  {
    type: 'Interview',
    title: 'The Cursor founders on agentic IDEs',
    summary:
      "Michael and Sualeh on why they forked VS Code, what 'agent mode' actually means, and what's next for dev tools.",
    minutes: 32,
    author: 'Aarav Patel',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Coding',
  },
  {
    type: 'Cheatsheet',
    title: 'One-pager: AI tool tax deductions for freelancers',
    summary:
      'Which AI subscriptions qualify as business expenses — with tax forms, limits and edge cases for the US, UK and India.',
    minutes: 4,
    author: 'Sofia Laurent',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Productivity',
  },
  {
    type: 'Guide',
    title: 'Selling AI-assisted services without losing your soul',
    summary:
      "A practical essay on pricing, disclosure and positioning for designers and writers integrating AI into client work.",
    minutes: 15,
    author: 'Linh Nguyen',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Marketing',
  },
  {
    type: 'Report',
    title: 'Which AI tools actually saved teams money last year?',
    summary:
      'Survey results from 430 companies: ROI, adoption, and the AI categories where the math did not pencil out.',
    minutes: 19,
    author: 'Aarav Patel',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=75',
    link: '#',
    topic: 'Marketing',
  },
];

const TYPES = ['All', 'Guide', 'Tutorial', 'Report', 'Video', 'Template', 'Interview', 'Cheatsheet'];

const PATHS = [
  {
    level: 'Beginner',
    title: 'Complete beginner to AI power-user in 2 weeks',
    desc: 'A hand-picked learning path if you\'ve never used an AI tool beyond ChatGPT. Sequential, opinionated, time-boxed.',
    steps: [
      'Day 1 — Set up three accounts that matter (ChatGPT, Claude, Perplexity)',
      'Day 2-4 — Prompt engineering fundamentals (our free 90-min course)',
      'Day 5-8 — Pick your creative side (image OR video OR audio)',
      'Day 9-12 — Build one real project end-to-end with AI',
      'Day 13-14 — Write up and share what you built — the actual learning step',
    ],
    hours: 14,
    tier: 'Free',
  },
  {
    level: 'Intermediate',
    title: 'The 30-day AI workflow overhaul',
    desc: 'For product managers, founders and designers already using AI, but not yet stacking it into real workflows.',
    steps: [
      'Week 1 — Audit where you already waste time',
      'Week 2 — Pair-test three AI writers against your current process',
      'Week 3 — Set up meeting notes, CRM sync and calendar automations',
      'Week 4 — Measure, prune, document — the only step most people skip',
    ],
    hours: 22,
    tier: 'Free',
  },
  {
    level: 'Advanced',
    title: "Shipping an AI product — from idea to first paying user",
    desc: 'Our most-requested path. Seven weeks, live reviews from the Neural team, and a private Slack of 40 builders.',
    steps: [
      'Week 1-2 — Validate with customer interviews (our script included)',
      'Week 3-4 — Build the thinnest end-to-end prototype possible',
      'Week 5 — Pricing, positioning, legal — the boring stuff that decides outcomes',
      'Week 6 — Ship a beta to 10 design partners',
      'Week 7 — Charge the first ten users, retro, iterate',
    ],
    hours: 80,
    tier: 'Paid · $199',
  },
];

export default function Resources() {
  const [type, setType] = useState('All');
  const filtered = type === 'All' ? RESOURCES : RESOURCES.filter((r) => r.type === type);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Reveal><span className="eyebrow"><FiBookOpen /> Learn</span></Reveal>
          <Reveal delay={1}><h1>Resources for people who ship</h1></Reveal>
          <Reveal delay={2}>
            <p>
              Guides, benchmarks, tutorials, interviews and cheatsheets — written by the same
              editors who curate the directory. No affiliate links, no AI filler.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ───────── Learning paths ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow"><FiAward /> Learning paths</span>
            <h2>Three sequential paths, three levels</h2>
            <p>Stop jumping between random tutorials. Pick a path, commit, ship something real.</p>
          </Reveal>

          <div className="path-grid">
            {PATHS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) + 1}>
                <div className="path-card">
                  <div className="path-level">{p.level}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul>
                    {p.steps.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <div className="path-meta">
                    <span><FiClock /> ~{p.hours} hrs total</span>
                    <span>{p.tier}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── All resources ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow"><FiPlayCircle /> Library</span>
            <h2>Everything we&apos;ve published</h2>
            <p>18 guides, reports, interviews and templates — freshly refreshed every month.</p>
          </Reveal>

          <Reveal>
            <div className="chips" style={{ justifyContent: 'center', marginBottom: 40 }}>
              {TYPES.map((t) => (
                <button
                  key={t}
                  className={`chip ${type === t ? 'active' : ''}`}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="resource-grid">
            {filtered.map((r, i) => (
              <Reveal key={r.title} delay={(i % 4) + 1}>
                <article className="resource-card">
                  <div className="resource-image">
                    <img src={r.image} alt={r.title} loading="lazy" />
                  </div>
                  <div className="resource-body">
                    <span className="resource-type">{r.type} · {r.topic}</span>
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                    <div className="resource-meta">
                      <span>By {r.author}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <FiClock /> {r.minutes} min
                      </span>
                    </div>
                    <a
                      href={r.link}
                      className="btn btn-ghost btn-sm"
                      style={{ alignSelf: 'flex-start', marginTop: 4 }}
                    >
                      Read <FiArrowUpRight />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Free downloads strip ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow"><FiDownload /> Free downloads</span>
            <h2>Grab these and go</h2>
            <p>Three popular freebies — no email required, no paywall behind them.</p>
          </Reveal>

          <div className="features-grid">
            {[
              {
                icon: <FiDownload />,
                title: 'AI Tool Scorecard (Notion)',
                body: 'The exact template we use internally to grade new submissions. Fork and customize.',
              },
              {
                icon: <FiDownload />,
                title: 'Prompt Library (Markdown)',
                body: '120 prompts across writing, coding, research and design — every one battle-tested.',
              },
              {
                icon: <FiDownload />,
                title: 'AI Buyer\'s Checklist (PDF)',
                body: 'A 40-point checklist covering privacy, pricing, support and vendor risk before you commit.',
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) + 1}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="eyebrow">Stay in the loop</span>
              <h2>The Sunday brief</h2>
              <p>
                One email, every Sunday. The three AI tools we found this week worth paying for,
                plus one lesson from our review pipeline. Free, 12,000+ readers.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Subscribe <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
