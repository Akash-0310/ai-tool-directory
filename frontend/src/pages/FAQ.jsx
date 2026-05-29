import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiHelpCircle } from 'react-icons/fi';
import Accordion from '../components/Accordion.jsx';
import Reveal from '../components/Reveal.jsx';

const GENERAL = [
  {
    q: 'What is Neural?',
    a: 'Neural is a curated directory of 500+ AI tools across eight categories. Every tool is hand-reviewed by our editorial team before it shows up — we do not scrape or auto-list.',
  },
  {
    q: 'Is Neural free to use?',
    a: 'Yes. Browsing, searching, and comparing tools is completely free, and we run no ads. We occasionally launch paid guides and workshops, but the directory itself will always stay free.',
  },
  {
    q: 'How often is the directory updated?',
    a: 'We publish updates every Sunday. That includes new tools, re-reviews of existing ones, and price changes. Major launches (GPT, Claude, Gemini, etc.) get same-week coverage.',
  },
  {
    q: 'Do you make money from the tools listed?',
    a: 'No paid rankings, no affiliate kickbacks baked into scores. Our revenue comes from our newsletter sponsorships (labeled clearly) and paid workshops. Listings themselves are free.',
  },
  {
    q: 'Who runs Neural?',
    a: 'An 11-person team based across 7 timezones, led by Maya Rodríguez (ex-DeepMind) and Aarav Patel (built and sold two devtools). Full team is on the About page.',
  },
  {
    q: 'Why another AI directory?',
    a: 'Because most of them are SEO farms. We noticed the same ten AI tools ranking on every listicle, usually because they had affiliate programs. Neural was built to be the opposite — taste-driven, editorial, and unsponsored.',
  },
];

const SUBMIT = [
  {
    q: 'How do I submit my AI tool?',
    a: 'Head to the Contact page and pick "Submit a tool" as the subject. Include your website, a 2-sentence pitch, and one paragraph on your use-case. We respond within 7 days.',
  },
  {
    q: 'What are the criteria for being listed?',
    a: 'The tool must be live and stable (not vaporware), solve a real workflow problem, and have a working free trial or demo. We also check for basic safety, privacy, and customer support.',
  },
  {
    q: 'My tool was rejected — can I re-submit later?',
    a: 'Absolutely. About 40% of rejected tools get accepted on re-submission after six months. We send specific feedback with every rejection so you know what to improve.',
  },
  {
    q: 'Can I pay to be listed higher?',
    a: 'No. That would defeat the entire point of Neural. Rankings are based on rating, review volume, and editorial score — nothing else.',
  },
  {
    q: 'Is there a featured or sponsored spot?',
    a: 'The homepage "Editor\'s picks" section is purely editorial — sponsors cannot buy into it. Our newsletter has clearly-labeled sponsor spots separate from the directory.',
  },
  {
    q: 'How long does the review process take?',
    a: 'On average 9 days from submission to final decision. That covers editorial testing, security check, pricing review, and a full internal write-up.',
  },
];

const ACCOUNT = [
  {
    q: 'Do I need an account to use Neural?',
    a: 'No. You can browse and search anonymously. An optional free account lets you save favorites, get email alerts for new tools in your categories, and join the community Discord.',
  },
  {
    q: 'How do ratings work?',
    a: "Each tool gets a 1-5 score combining editorial review (60%) and verified user reviews (40%). Reviews are verified via their linked tool usage — no fake review farms.",
  },
  {
    q: 'Can I leave a review?',
    a: "Yes, after you log in and confirm you've used the tool. Anonymous drive-by reviews are not accepted, and reviews go through a light moderation layer.",
  },
  {
    q: 'What happens if a tool shuts down or degrades?',
    a: 'We flag it within the same week. Tools that go offline for 30+ days are removed. Tools that degrade (removed features, hostile pricing changes) get their scores updated publicly.',
  },
  {
    q: 'Can I save favorite tools?',
    a: "Yes — any tool you bookmark syncs across devices when you're signed in. You can export your bookmarks as JSON or Markdown.",
  },
  {
    q: 'Do you send spammy emails?',
    a: 'One optional weekly newsletter, that\'s it. No drip sequences, no re-engagement spam. Unsubscribe lives in every footer and works on the first click.',
  },
];

const PRICING = [
  {
    q: 'How does "Freemium" differ from "Free Trial"?',
    a: 'Freemium means the tool has a permanent free tier — features may be limited, but you can use it forever without paying. Free Trial means you get time-limited full access, then must pay.',
  },
  {
    q: 'Are prices on Neural kept up-to-date?',
    a: 'We refresh pricing every Sunday, and subscribers can opt-in to alerts when a tool they bookmarked changes its pricing.',
  },
  {
    q: 'Do you offer group discounts for teams?',
    a: 'On our paid workshops and guides, yes — teams of 5+ get a 30% discount. The directory itself is always free.',
  },
  {
    q: 'Are there student discounts?',
    a: "Every paid resource on Neural is free for anyone with an .edu (or equivalent) email. DM us on Discord and we'll flip a free lifetime code.",
  },
];

const TECH = [
  {
    q: 'Is my search history private?',
    a: 'Yes. We do not log individual search queries to your identity. Aggregate, anonymized stats inform our category roadmap, nothing more.',
  },
  {
    q: 'Do you offer an API?',
    a: "A read-only public API is in private beta. Join the waitlist from the contact form — we're onboarding 5 teams a week.",
  },
  {
    q: 'Is Neural open-source?',
    a: "The frontend is MIT-licensed on GitHub. The editorial backend and review scoring is private so it can't be gamed.",
  },
  {
    q: "What's your tech stack?",
    a: 'MERN — MongoDB, Express, React, Node. Deployed on Fly.io with Cloudflare in front. The whole site is under 100kb gzipped on first load.',
  },
  {
    q: 'Where is my data stored?',
    a: "User data lives in MongoDB Atlas in the eu-west region. We're GDPR-compliant and can export or delete your data within 72 hours on request.",
  },
  {
    q: 'Do you share data with third parties?',
    a: 'No. Not with sponsors, analytics vendors, or anyone else. We run self-hosted Plausible for basic traffic analytics and that\'s the only third party that sees anything about you.',
  },
];

const DATA = [
  {
    q: 'Can I export my favorite tools?',
    a: 'Yes — favorites can be exported as JSON, CSV, Markdown or a plain HTML page. Handy for team wikis or personal knowledge bases.',
  },
  {
    q: 'Can I embed a Neural widget on my blog?',
    a: "Yes. Embedded cards are available for any tool — a lightweight iframe you can drop in. They count toward the tool's view stats.",
  },
  {
    q: 'Do you provide category RSS feeds?',
    a: 'Each category has a dedicated RSS feed. Point your feed reader at /feed/<category> and you\'ll get every new entry in that category automatically.',
  },
  {
    q: 'What about GDPR / CCPA compliance?',
    a: "Fully compliant with both. Data export, deletion, or correction requests go to privacy@neural.directory — we respond within 72 hours as required.",
  },
];

const COMMUNITY = [
  {
    q: 'How do I join the Discord?',
    a: "It's linked from the Contact page. Free to join, 6,200+ members of founders, researchers, and hobbyists. We ask for a 1-sentence intro before approving — no lurkers or bots.",
  },
  {
    q: 'What are office hours?',
    a: 'Every Thursday at 5pm UTC, our editorial team jumps on a Discord voice channel for a 45-minute Q&A. Bring your tool questions — we also show works-in-progress.',
  },
  {
    q: 'Do you run real-life events?',
    a: "Twice a year — a small summit in Lisbon (our HQ) and one rotating city. Tickets are free but capped at 80 attendees. The 2026 events are in Lisbon (May) and Tokyo (November).",
  },
  {
    q: 'Can I contribute to Neural?',
    a: "Yes. We accept community-submitted reviews, category moderators, and beta reviewers. Start a thread in Discord's #contribute channel.",
  },
];

const SECTIONS = [
  { id: 'general', label: 'General', data: GENERAL },
  { id: 'submit', label: 'Submissions', data: SUBMIT },
  { id: 'account', label: 'Accounts & reviews', data: ACCOUNT },
  { id: 'pricing', label: 'Pricing', data: PRICING },
  { id: 'tech', label: 'Technical', data: TECH },
  { id: 'data', label: 'Data & exports', data: DATA },
  { id: 'community', label: 'Community', data: COMMUNITY },
];

export default function FAQ() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Reveal><span className="eyebrow"><FiHelpCircle /> FAQ</span></Reveal>
          <Reveal delay={1}><h1>Questions &amp; answers</h1></Reveal>
          <Reveal delay={2}>
            <p>
              Everything you might want to know about Neural — how we curate, how to submit,
              how ratings work, and what happens when a tool goes bad.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Pills nav */}
      <section style={{ padding: '0 0 24px' }}>
        <div className="container">
          <Reveal>
            <div className="faq-pills">
              {SECTIONS.map((s) => (
                <button key={s.id} className="faq-pill" onClick={() => scrollTo(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          className="section"
          style={{ paddingTop: idx === 0 ? 0 : undefined }}
        >
          <div className="container">
            <Reveal className="section-header">
              <span className="eyebrow">{s.label}</span>
              <h2>
                {s.id === 'general' && 'The basics'}
                {s.id === 'submit' && 'Getting your tool listed'}
                {s.id === 'account' && 'Using the directory'}
                {s.id === 'pricing' && 'Pricing & plans'}
                {s.id === 'tech' && 'Under the hood'}
                {s.id === 'data' && 'Exports & integrations'}
                {s.id === 'community' && 'Community & events'}
              </h2>
              <p>
                {s.id === 'general' && 'What Neural is, who runs it, and how we make money.'}
                {s.id === 'submit' && 'Our review process, what we look for, and how to get unstuck.'}
                {s.id === 'account' && 'Accounts, ratings, and what happens when a tool changes.'}
                {s.id === 'pricing' && "How we read tool pricing and how ours works."}
                {s.id === 'tech' && 'Privacy, APIs, open-source, and how Neural is built.'}
                {s.id === 'data' && 'Everything you can export, embed, or subscribe to.'}
                {s.id === 'community' && 'Discord, office hours, and our twice-yearly real-life events.'}
              </p>
            </Reveal>
            <Accordion items={s.data} />
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="eyebrow">Still stuck?</span>
              <h2>Ask us directly</h2>
              <p>Our team responds to every message within two business days — in English, Spanish or Hindi.</p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact the team <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
