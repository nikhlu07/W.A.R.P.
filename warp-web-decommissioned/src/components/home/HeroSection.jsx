import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import GlitchText from '../shared/GlitchText';
import Badge from '../shared/Badge';
import { Shield, Bitcoin, Globe, FileCode } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  const handleGetStarted = () => {
    document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-container container">
        <div className="hero-content">
          <h1 className="hero-title">
            <GlitchText as="span">PAYMENT REQUIRED</GlitchText>
          </h1>
          <p className="hero-subtitle">
            The first HTTP 402 implementation that actually works.
          </p>
          <p className="hero-tagline">
            Speed-of-light settlement for the Agent Economy. Built on Stacks. Secured by Bitcoin.
          </p>

          <div className="hero-cta">
            <Button onClick={handleGetStarted}>GET STARTED</Button>
            <Link to="/docs">
              <Button variant="secondary">READ THE DOCS</Button>
            </Link>
          </div>

          <div className="hero-badges">
            <Badge variant="black">
              <Shield size={12} style={{marginRight: '4px', display: 'inline'}} />
              Built on Stacks
            </Badge>
            <Badge variant="black">
              <Bitcoin size={12} style={{marginRight: '4px', display: 'inline'}} />
              Secured by Bitcoin
            </Badge>
            <Badge variant="yellow">
              <Globe size={12} style={{marginRight: '4px', display: 'inline'}} />
              HTTP 402
            </Badge>
            <Badge variant="default">
              <FileCode size={12} style={{marginRight: '4px', display: 'inline'}} />
              MIT License
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
