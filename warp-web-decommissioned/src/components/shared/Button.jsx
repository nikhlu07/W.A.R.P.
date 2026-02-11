export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const baseClass = variant === 'primary' ? 'btn-warp' : 'btn-warp-secondary';

  return (
    <button
      className={`${baseClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
