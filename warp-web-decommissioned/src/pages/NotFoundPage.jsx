import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';
import GlitchText from '../components/shared/GlitchText';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const [cost, setCost] = useState(0.000001);

  useEffect(() => {
    const interval = setInterval(() => {
      setCost(prev => prev + 0.000001);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">
          <GlitchText as="h1">402</GlitchText>
        </h1>
        <h2 className="not-found-subtitle">PAYMENT REQUIRED</h2>
        <p className="not-found-text">
          Just kidding. This page doesn't exist. But if it did, it would cost you 1 STX.
        </p>
        <Link to="/">
          <Button>WARP HOME →</Button>
        </Link>
        <p className="not-found-counter">
          Estimated cost: {cost.toFixed(6)} STX
        </p>
      </div>
    </div>
  );
}
