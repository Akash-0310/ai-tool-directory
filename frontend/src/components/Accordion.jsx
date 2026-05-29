import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className={`accordion-item ${openIdx === i ? 'open' : ''}`}>
          <button
            className="accordion-header"
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            aria-expanded={openIdx === i}
          >
            <span>{item.q}</span>
            <span className="accordion-icon"><FiPlus /></span>
          </button>
          <div className="accordion-body">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
