import { Link } from 'react-router-dom';
import SectionDivider from '../shared/SectionDivider';
import { Zap } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <SectionDivider />
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-column">
            <div className="footer-brand">
              <Zap size={20} />
              <span>W.A.R.P.</span>
            </div>
            <p className="footer-tagline">Web Agent Revenue Protocol</p>
            <p className="footer-subtitle">Made with ⚡ for the Stacks x402 Challenge</p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">PROTOCOL</h4>
            <Link to="/docs" className="footer-link">Docs</Link>
            <Link to="/playground" className="footer-link">Playground</Link>
            <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">COMMUNITY</h4>
            <a href="https://discord.com" className="footer-link" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://forum.stacks.org" className="footer-link" target="_blank" rel="noopener noreferrer">Forum</a>
            <a href="mailto:team@warp-protocol.io" className="footer-link">Email</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Team W.A.R.P. &bull; MIT License</p>
        </div>
      </div>
    </footer>
  );
}
