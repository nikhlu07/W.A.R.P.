export default function GlitchText({ children, className = '', as: Component = 'span' }) {
  return (
    <Component className={`glitch-text ${className}`} data-text={children}>
      {children}
    </Component>
  );
}
