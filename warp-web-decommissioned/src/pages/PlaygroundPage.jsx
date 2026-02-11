import { useState, useEffect } from 'react';
import Button from '../components/shared/Button';
import './PlaygroundPage.css';

const STATES = {
  IDLE: 'idle',
  SENDING: 'sending',
  RECEIVED_402: '402_received',
  PAYING: 'paying',
  CONFIRMING: 'confirming',
  RETRYING: 'retrying',
  SUCCESS: 'success',
};

export default function PlaygroundPage() {
  const [state, setState] = useState(STATES.IDLE);
  const [logs, setLogs] = useState([]);
  const [walletBalance, setWalletBalance] = useState(500);
  const [spent, setSpent] = useState(0);
  const [txCount, setTxCount] = useState(0);
  const [speed, setSpeed] = useState(1);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms / speed));

  const runSimulation = async () => {
    setLogs([]);
    setState(STATES.SENDING);
    addLog('> GET /api/premium-data HTTP/1.1', 'request');
    await delay(1000);

    setState(STATES.RECEIVED_402);
    addLog('< 402 Payment Required', 'payment');
    addLog('X-WARP-Price: 1000000 (1 STX)', 'payment');
    addLog('X-WARP-Address: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', 'payment');
    addLog('⚡ Invoice received: 1 STX', 'payment');
    await delay(1500);

    setState(STATES.PAYING);
    addLog('💳 Signing transaction...', 'info');
    await delay(1000);
    addLog('📡 Broadcasting to Stacks testnet...', 'info');
    await delay(2000);

    setState(STATES.CONFIRMING);
    addLog('⏳ Waiting for block confirmation...', 'info');
    await delay(2000);
    addLog('Block #45231 confirmed', 'success');
    setWalletBalance(prev => prev - 1);
    setSpent(prev => prev + 1);
    setTxCount(prev => prev + 1);
    await delay(1000);

    setState(STATES.RETRYING);
    addLog('🔄 Retrying request with proof-of-payment...', 'info');
    addLog('> GET /api/premium-data HTTP/1.1', 'request');
    addLog('Authorization: WARP 0xABC123...', 'request');
    await delay(1000);

    setState(STATES.SUCCESS);
    addLog('✅ 200 OK — Data received!', 'success');
    addLog('Response: {"data": "Premium market signals..."}', 'success');
  };

  const reset = () => {
    setState(STATES.IDLE);
    setLogs([]);
  };

  const isRunning = state !== STATES.IDLE && state !== STATES.SUCCESS;

  return (
    <div className="playground-page">
      <div className="playground-header">
        <h1 className="playground-title">W.A.R.P. PLAYGROUND</h1>
        <div className="playground-controls">
          <Button onClick={reset} variant="secondary" disabled={isRunning}>RESET</Button>
          <div className="speed-control">
            <label>SPEED:</label>
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>
        </div>
      </div>

      <div className="playground-content">
        <div className="playground-left">
          <div className="request-panel panel">
            <h3 className="panel-title">REQUEST</h3>
            <div className="panel-body">
              <div className="input-group">
                <label>URL</label>
                <input
                  type="text"
                  className="input-warp"
                  value="http://localhost:3000/api/premium-data"
                  readOnly
                />
              </div>
              <div className="input-group">
                <label>METHOD</label>
                <select className="input-warp">
                  <option>GET</option>
                </select>
              </div>
              <Button onClick={runSimulation} disabled={isRunning}>
                {isRunning ? 'RUNNING...' : 'SEND REQUEST'}
              </Button>
            </div>
          </div>

          <div className={`response-panel panel ${state === STATES.RECEIVED_402 ? 'panel--payment' : ''} ${state === STATES.SUCCESS ? 'panel--success' : ''}`}>
            <h3 className="panel-title">RESPONSE</h3>
            <div className="panel-body">
              {state === STATES.IDLE && (
                <p className="panel-placeholder">Click "SEND REQUEST" to begin</p>
              )}
              {state === STATES.SENDING && (
                <p className="panel-placeholder">Sending request...</p>
              )}
              {(state === STATES.RECEIVED_402 || state === STATES.PAYING || state === STATES.CONFIRMING || state === STATES.RETRYING) && (
                <div className="response-content">
                  <div className="response-status">402 PAYMENT REQUIRED</div>
                  <div className="response-headers">
                    <div className="header-line">X-WARP-Price: 1000000</div>
                    <div className="header-line">X-WARP-Currency: STX</div>
                    <div className="header-line">X-WARP-Address: SP2J6ZY...</div>
                  </div>
                </div>
              )}
              {state === STATES.SUCCESS && (
                <div className="response-content">
                  <div className="response-status response-status--success">200 OK</div>
                  <div className="response-body">
                    {`{\n  "data": "Premium market signals..."\n}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="playground-right">
          <div className="terminal panel">
            <h3 className="panel-title">TERMINAL OUTPUT</h3>
            <div className="terminal-body">
              {logs.map((log, index) => (
                <div key={index} className={`terminal-line terminal-line--${log.type}`}>
                  <span className="terminal-timestamp">{log.timestamp}</span>
                  {log.message}
                </div>
              ))}
              {logs.length === 0 && (
                <div className="terminal-line">Waiting for simulation...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="wallet-simulator">
        <div className="wallet-stat">
          <label>Balance</label>
          <span>{walletBalance} STX</span>
        </div>
        <div className="wallet-stat">
          <label>Spent</label>
          <span>{spent} STX</span>
        </div>
        <div className="wallet-stat">
          <label>Transactions</label>
          <span>{txCount}</span>
        </div>
      </div>
    </div>
  );
}
