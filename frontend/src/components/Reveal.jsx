import useScrollReveal from '../hooks/useScrollReveal.js';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, visible] = useScrollReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${visible ? 'revealed' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
