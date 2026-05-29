import { FiStar, FiArrowUpRight } from 'react-icons/fi';

export default function ToolCard({ tool }) {
  return (
    <article className="tool-card">
      <div className="tool-card-image">
        <span className="tool-card-pricing">{tool.pricing}</span>
        <img src={tool.image} alt={tool.name} loading="lazy" />
      </div>

      <div className="tool-card-body">
        <div className="tool-card-head">
          <h3 className="tool-card-name">{tool.name}</h3>
          <div className="tool-card-rating" title={`${tool.reviews || 0} reviews`}>
            <FiStar /> {Number(tool.rating).toFixed(1)}
          </div>
        </div>
        <p className="tool-card-description">{tool.description}</p>

        <div className="tool-card-tags">
          {(tool.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="tag">#{t}</span>
          ))}
        </div>

        <div className="tool-card-footer">
          <span className="tool-card-category">{tool.category}</span>
          <a
            href={tool.website}
            target="_blank"
            rel="noreferrer"
            className="visit-btn"
            aria-label={`Visit ${tool.name}`}
          >
            Visit <FiArrowUpRight />
          </a>
        </div>
      </div>
    </article>
  );
}
