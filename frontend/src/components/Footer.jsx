import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiArrowRight } from 'react-icons/fi';
import api from '../utils/api.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus({ loading: true });
    try {
      const res = await api.post('/subscribe', { email });
      setStatus({ success: res.data.message });
      setEmail('');
    } catch (err) {
      setStatus({ error: err?.response?.data?.message || 'Something went wrong.' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-mark">N</span>
              <span>Neural</span>
            </Link>
            <p>
              A curated directory of the best AI tools on the planet. Search, compare, and discover
              the ones worth your time — updated weekly.
            </p>
            <div className="social-row">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><Link to="/">Directory</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Categories</h5>
            <ul>
              <li><Link to="/?cat=Writing">Writing</Link></li>
              <li><Link to="/?cat=Image">Image</Link></li>
              <li><Link to="/?cat=Video">Video</Link></li>
              <li><Link to="/?cat=Coding">Coding</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Newsletter</h5>
            <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginBottom: 14 }}>
              The best new AI tools, every Sunday.
            </p>
            <form className="newsletter" onSubmit={subscribe}>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" type="submit" disabled={status?.loading}>
                {status?.loading ? '…' : <><FiArrowRight /></>}
              </button>
            </form>
            {status?.success && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginTop: 10 }}>
                {status.success}
              </p>
            )}
            {status?.error && (
              <p style={{ fontSize: '0.82rem', color: '#ff7676', marginTop: 10 }}>
                {status.error}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Neural Directory. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
