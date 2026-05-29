import { FiSearch } from 'react-icons/fi';

const CATEGORIES = [
  'All',
  'Writing',
  'Image',
  'Video',
  'Coding',
  'Audio',
  'Productivity',
  'Marketing',
  'Research',
];

export default function Filters({
  query,
  setQuery,
  category,
  setCategory,
  pricing,
  setPricing,
  sort,
  setSort,
  categoryCounts = {},
}) {
  return (
    <div className="filters">
      <div className="filter-bar">
        <label className="search-input">
          <FiSearch />
          <input
            type="search"
            placeholder="Search by name, tag, or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="select-group">
          <select
            className="select"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            aria-label="Pricing"
          >
            <option value="">All pricing</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
            <option value="Free Trial">Free Trial</option>
          </select>
          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort"
          >
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className="chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
            {categoryCounts[c] != null && <span className="count">{categoryCounts[c]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
