import './SectionDivider.css';

export default function SectionDivider({ className = '' }) {
  return (
    <div className={`section-divider ${className}`}>
      <div className="barcode">
        <div className="bar" style={{width: '4px'}}></div>
        <div className="bar" style={{width: '2px'}}></div>
        <div className="bar" style={{width: '6px'}}></div>
        <div className="bar" style={{width: '3px'}}></div>
        <div className="bar" style={{width: '2px'}}></div>
        <div className="bar" style={{width: '5px'}}></div>
        <div className="bar" style={{width: '4px'}}></div>
        <div className="bar" style={{width: '2px'}}></div>
      </div>
    </div>
  );
}
