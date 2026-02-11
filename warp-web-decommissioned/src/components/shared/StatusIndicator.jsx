import './StatusIndicator.css';

export default function StatusIndicator({ status = 'confirmed', className = '' }) {
  return (
    <span className={`status-indicator status-indicator--${status} ${className}`}>
      <span className="status-dot"></span>
      <span className="status-label">{status}</span>
    </span>
  );
}
