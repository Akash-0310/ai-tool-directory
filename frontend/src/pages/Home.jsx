import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FiSearch, FiArrowUpRight, FiZap, FiTrendingUp, FiShield, FiLayers,
  FiCpu, FiStar, FiPenTool, FiImage, FiVideo, FiCode, FiMusic, FiBriefcase,
  FiBookOpen, FiActivity, FiCompass, FiFilter, FiCheckCircle, FiPlay,
  FiMessageSquare,
} from 'react-icons/fi';
import api from '../utils/api.js';
import ToolCard from '../components/ToolCard.jsx';
import Filters from '../components/Filters.jsx';
import Reveal from '../components/Reveal.jsx';

const CATEGORY_ICONS = {
  Writing: <FiPenTool />,
  Image: <FiImage />,
  Video: <FiVideo />,
  Coding: <FiCode />,
  Audio: <FiMusic />,
  Productivity: <FiActivity />,
  Marketing: <FiBriefcase />,
  Research: <FiBookOpen />,
};

const FEATURES = [
  {
    icon: <FiZap />,
    title: 'Curated, not scraped',
    body: 'Every tool is hand-reviewed and scored. No SEO spam, no abandoned projects, no AI slop.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Weekly refresh',
    body: 'A small team updates ratings, prices, and adds new tools every Sunday so nothing rots.',
  },
  {
    icon: <FiShield />,
    title: 'Privacy-respecting',
    body: 'No trackers, no ads, no dark patterns. We rank tools based on quality, not affiliate deals.',
  },
  {
    icon: <FiLayers />,
    title: 'Compare in seconds',
    body: 'Filter by price, category, and use-case. Stop doom-scrolling Product Hunt at 2am.',
  },
  {
    icon: <FiCpu />,
    title: 'Built by engineers',
    body: 'We stress-test every tool on real workflows — writing, rendering, shipping — before listing.',
  },
  {
    icon: <FiStar />,
    title: '10k+ makers trust us',
    body: 'From solo founders to engineering teams at Fortune 500s. We serve over 2M searches a month.',
  },
];

const STEPS = [
  {
    icon: <FiCompass />,
    step: '01',
    title: 'Start with a goal',
    body: 'Tell us what you\'re trying to ship — a blog post, a logo, an explainer video — not the technology.',
  },
  {
    icon: <FiFilter />,
    step: '02',
    title: 'Narrow with filters',
    body: 'Stack category, pricing and keywords until you\'re looking at a shortlist of five, not fifty.',
  },
  {
    icon: <FiCheckCircle />,
    step: '03',
    title: 'Compare, then commit',
    body: 'Every card shows the rating, key features and pricing tier upfront. Click through and start free.',
  },
  {
    icon: <FiPlay />,
    step: '04',
    title: 'Ship something today',
    body: 'The whole flow takes 30 seconds. The goal is never research — it\'s getting back to making.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Neural is the only AI directory I trust. Every tool I found here has stayed in my workflow for more than a month — which is rare.",
    name: 'Priya Sharma',
    role: 'Design Lead, Airbyte',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=75',
  },
  {
    quote:
      "I used to spend Sunday mornings reading five AI newsletters. Now I read one page on Neural and my weekend back. Worth every second.",
    name: 'Marcus Chen',
    role: 'Indie founder · Rivet.app',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=75',
  },
  {
    quote:
      "The review quality here is genuinely better than the NYT. Our whole engineering team uses Neural when evaluating new AI tools for our stack.",
    name: 'Sofia Reyes',
    role: 'VP Engineering, Launchlane',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=75',
  },
  {
    quote:
      "What I love is the opinionated editorial voice. They'll call out when a tool's pricing turns hostile and I've saved hours because of that.",
    name: 'James O\'Brien',
    role: 'Product Manager, Ramp',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=75',
  },
  {
    quote:
      "I shipped my SaaS MVP in four days using tools I found on Neural. The directory is less a reference and more a launch checklist.",
    name: 'Anika Patel',
    role: 'Founder · Thread.so',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=75',
  },
  {
    quote:
      "Finally an AI directory that doesn't feel like a referral farm. The rejection rate alone tells you they care about quality.",
    name: 'David Kim',
    role: 'CTO, Basalt Labs',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=75',
  },
];

const TRENDING = [
  'voice cloning',
  'image upscaler',
  'code review',
  'video avatar',
  'meeting notes',
  'resume builder',
  'background remover',
  'logo generator',
  'lead enrichment',
  'text-to-video',
  'blog writer',
  'transcription',
];

const PRESS = ['TechCrunch', 'The Verge', 'Wired', 'Fast Company', 'Forbes', 'a16z', 'Hacker News', 'Product Hunt'];

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [tools, setTools] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('cat') || 'All');
  const [pricing, setPricing] = useState('');
  const [sort, setSort] = useState('rating');

  const PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    api.get('/tools/featured').then((r) => setFeatured(r.data.data || [])).catch(() => {});
    api
      .get('/tools/categories')
      .then((r) => {
        const counts = { All: 0 };
        (r.data.data || []).forEach((c) => {
          counts[c.name] = c.count;
          counts.All += c.count;
        });
        setCategoryCounts(counts);
      })
      .catch(() => {});
  }, []);

  // Reset to the first page whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [query, category, pricing, sort]);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const id = setTimeout(async () => {
      try {
        const res = await api.get('/tools', {
          params: {
            q: query || undefined,
            category: category === 'All' ? undefined : category,
            pricing: pricing || undefined,
            sort,
            page,
            limit: PER_PAGE,
          },
          signal: controller.signal,
        });
        setTools(res.data.data || []);
        setTotal(res.data.total ?? (res.data.data || []).length);
        setPages(res.data.pages || 1);
      } catch (_) {
        // swallow — keep last state
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(id);
    };
  }, [query, category, pricing, sort, page]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (category && category !== 'All') next.set('cat', category);
    setParams(next, { replace: true });
  }, [query, category, setParams]);

  const categoryList = useMemo(
    () => Object.keys(CATEGORY_ICONS).map((c) => ({
      name: c,
      icon: CATEGORY_ICONS[c],
      count: categoryCounts[c] || 0,
    })),
    [categoryCounts]
  );

  const jumpToDirectory = () => {
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPage = (p) => {
    const next = Math.min(Math.max(p, 1), pages);
    if (next === page) return;
    setPage(next);
    jumpToDirectory();
  };

  // Compact page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 12
  const pageItems = useMemo(() => {
    if (pages <= 1) return [];
    const items = new Set([1, pages, page, page - 1, page + 1]);
    const sorted = [...items].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    for (const n of sorted) {
      if (n - prev > 1) out.push(`gap-${n}`);
      out.push(n);
      prev = n;
    }
    return out;
  }, [page, pages]);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <div className="container hero-inner">
          <Reveal as="span" className="eyebrow">
            The AI tool directory · April 2026
          </Reveal>

          <Reveal>
            <h1 className="hero-title display">
              Find the <span className="grad">right AI tool</span>
              <br /> in thirty seconds.
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <p className="hero-subtitle">
              Neural is a curated, searchable database of 500+ AI tools across writing, image,
              video, coding, audio and research. Hand-reviewed, weekly-refreshed, ad-free.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="hero-cta-row">
              <a href="#directory" className="btn btn-primary btn-lg">
                Browse the directory <FiArrowUpRight />
              </a>
              <Link to="/about" className="btn btn-ghost btn-lg">How it works</Link>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <form
              className="hero-search"
              onSubmit={(e) => { e.preventDefault(); jumpToDirectory(); }}
            >
              <input
                type="search"
                placeholder="Try &ldquo;voice cloning&rdquo;, &ldquo;image upscale&rdquo;, &ldquo;code review&rdquo;…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <FiSearch /> Search
              </button>
            </form>
          </Reveal>

          <Reveal delay={4}>
            <div className="trending-row">
              <span className="trending-label">Trending:</span>
              <div className="trending-chips">
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    className="trending-chip"
                    onClick={() => { setQuery(t); jumpToDirectory(); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="hero-stats">
            {[
              { n: '500+', l: 'Tools reviewed' },
              { n: '8', l: 'Categories' },
              { n: '2M+', l: 'Monthly searches' },
              { n: '4.9★', l: 'User rating' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={(i % 4) + 1} className="hero-stat">
                <div className="hero-stat-num">{s.n}</div>
                <div className="hero-stat-label">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PRESS LOGOS ───────── */}
      <section className="press-band">
        <div className="container">
          <Reveal>
            <p className="press-caption">As featured in</p>
            <div className="press-row">
              {PRESS.map((p) => (
                <span key={p} className="press-name">{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CATEGORIES ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Browse</span>
            <h2>Explore by category</h2>
            <p>Eight first-class categories, each hand-maintained and ranked by quality.</p>
          </Reveal>

          <div className="category-grid">
            {categoryList.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) + 1}>
                <button
                  className="category-card"
                  onClick={() => { setCategory(c.name); jumpToDirectory(); }}
                >
                  <div className="category-card-top">
                    <span className="category-card-icon">{c.icon}</span>
                    <FiArrowUpRight className="category-card-arrow" />
                  </div>
                  <div className="category-card-body">
                    <h4>{c.name}</h4>
                    <p>
                      <span className="category-card-count">{c.count || '—'}</span> tools
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">How it works</span>
            <h2>From &ldquo;I need a tool&rdquo; to shipped — in 30 seconds</h2>
            <p>Four deliberate steps. No signup required to browse, ever.</p>
          </Reveal>

          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={(i % 4) + 1}>
                <div className="step-card">
                  <div className="step-number">{s.step}</div>
                  <div className="step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FEATURED ───────── */}
      {featured.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal className="section-header">
              <span className="eyebrow">Editor&apos;s picks</span>
              <h2>Featured this month</h2>
              <p>Tools our team actually uses every day. No sponsorships, no backroom deals.</p>
            </Reveal>

            <div className="tools-grid">
              {featured.map((t, i) => (
                <Reveal key={t._id || t.slug} delay={(i % 4) + 1}>
                  <ToolCard tool={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── DIRECTORY ───────── */}
      <section id="directory" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">The full directory</span>
            <h2>500+ AI tools, one filter away</h2>
            <p>Search by name, tag, or description. Stack filters to narrow down.</p>
          </Reveal>

          <Filters
            query={query} setQuery={setQuery}
            category={category} setCategory={setCategory}
            pricing={pricing} setPricing={setPricing}
            sort={sort} setSort={setSort}
            categoryCounts={categoryCounts}
          />

          {loading ? (
            <div className="loader-grid">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton" />)}
            </div>
          ) : tools.length === 0 ? (
            <div className="empty">
              <h3>No tools match that search.</h3>
              <p>Try different keywords, or clear the filters above.</p>
            </div>
          ) : (
            <>
              <div className="tools-grid">
                {tools.map((t) => <ToolCard key={t._id || t.slug} tool={t} />)}
              </div>

              {pages > 1 && (
                <nav className="pagination" aria-label="Directory pages">
                  <button
                    className="page-btn"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    Prev
                  </button>

                  {pageItems.map((it) =>
                    typeof it === 'number' ? (
                      <button
                        key={it}
                        className={`page-btn${it === page ? ' is-active' : ''}`}
                        onClick={() => goToPage(it)}
                        aria-current={it === page ? 'page' : undefined}
                      >
                        {it}
                      </button>
                    ) : (
                      <span key={it} className="page-gap">…</span>
                    )
                  )}

                  <button
                    className="page-btn"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= pages}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}

          <Reveal className="directory-count">
            <p>
              {total > 0 ? (
                <>
                  Showing <strong>{(page - 1) * PER_PAGE + 1}–{(page - 1) * PER_PAGE + tools.length}</strong>{' '}
                  of <strong>{total}</strong> tools · updated every Sunday.
                </>
              ) : (
                <>Showing <strong>0</strong> tools · updated every Sunday.</>
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── FEATURES ───────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow">Why Neural</span>
            <h2>The directory that doesn&apos;t waste your time</h2>
            <p>Six reasons 10,000+ makers made Neural their first stop when hunting for AI tools.</p>
          </Reveal>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) + 1}>
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

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-header">
            <span className="eyebrow"><FiMessageSquare /> Word of mouth</span>
            <h2>Loved by the people who ship</h2>
            <p>Six quick notes from the makers, founders and engineers using Neural every week.</p>
          </Reveal>

          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) + 1}>
                <figure className="testimonial-card">
                  <div className="testimonial-stars">
                    {Array.from({ length: 5 }).map((_, k) => <FiStar key={k} />)}
                  </div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <div className="testimonial-avatar">
                      <img src={t.img} alt={t.name} loading="lazy" />
                    </div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </figcaption>
                </figure>
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
              <span className="eyebrow">Launch yours</span>
              <h2>Built something amazing?</h2>
              <p>
                Submit your AI tool for review. If it clears our quality bar, it goes in the
                directory — free, permanently, no affiliate strings attached.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Submit a tool <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
