import Card from '../shared/Card';
import GlitchText from '../shared/GlitchText';
import { X } from 'lucide-react';
import { problemStats } from '../../data/features';
import './ProblemSection.css';

export default function ProblemSection() {
  return (
    <section className="section problem-section">
      <div className="container">
        <h2 className="section-title">
          <GlitchText as="h2">THE INTERNET IS BROKEN FOR AI AGENTS</GlitchText>
        </h2>

        <div className="problem-comparison">
          <div className="comparison-box comparison-box--before">
            <h4>BEFORE</h4>
            <p className="comparison-flow">
              AI Agent → Free API → 429 Rate Limit → Dead End
            </p>
          </div>
          <div className="comparison-box comparison-box--after">
            <h4>AFTER</h4>
            <p className="comparison-flow">
              AI Agent → 402 Payment Required → Auto-Pay 0.5 STX → Access Granted
            </p>
          </div>
        </div>

        <div className="problem-stats">
          {problemStats.map((stat) => (
            <Card key={stat.id} className="problem-card">
              <div className="problem-icon">
                <X size={24} color="var(--warp-red)" />
              </div>
              <h4 className="problem-card-title">{stat.title}</h4>
              <p className="problem-card-description">{stat.description}</p>
              <span className="problem-card-status">{stat.status}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
