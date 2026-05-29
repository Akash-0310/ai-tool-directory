import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';

export default function NotFound() {
  return (
    <section className="page-header" style={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <Reveal><span className="eyebrow">404 · lost in space</span></Reveal>
        <Reveal delay={1}>
          <h1 className="display" style={{ margin: '24px 0' }}>That page is not here.</h1>
        </Reveal>
        <Reveal delay={2}>
          <p style={{ color: 'var(--text-soft)', marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            The tool or page you were looking for might have moved. Head back to the directory and
            try searching instead.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <Link to="/" className="btn btn-primary btn-lg">
            <FiArrowLeft /> Back to directory
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
