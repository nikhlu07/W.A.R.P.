export default function Card({ children, active = false, className = '', ...props }) {
  const activeClass = active ? 'card-warp--active' : '';

  return (
    <div className={`card-warp ${activeClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
