import { useState } from 'react';
import CodeBlock from '../components/shared/CodeBlock';
import Card from '../components/shared/Card';
import { quickStartInstall, quickStartServer, quickStartAgent, curlExample } from '../data/codeExamples';
import { requestHeaders, responseHeaders402, responseHeaders200, errorCodes } from '../data/errorCodes';
import './DocsPage.css';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'api', label: 'API Reference' },
  { id: 'errors', label: 'Error Codes' },
  { id: 'security', label: 'Security' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="docs-page">
      <div className="docs-sidebar">
        <h3 className="docs-sidebar-title">DOCUMENTATION</h3>
        <nav className="docs-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`docs-nav-item ${activeSection === section.id ? 'docs-nav-item--active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="docs-content">
        {activeSection === 'overview' && (
          <div className="docs-section">
            <h1>W.A.R.P. Protocol Overview</h1>
            <p>
              W.A.R.P. (Web Agent Revenue Protocol) is the first functional implementation of HTTP 402 Payment Required.
              It enables AI agents to autonomously pay for API access using STX, the native token of the Stacks blockchain.
            </p>
            <h2>The Problem</h2>
            <p>
              The current internet economy is built on the Attention Economy (advertising). But AI agents don't view ads.
              They need a way to pay for data and compute directly. Traditional payment methods (credit cards, OAuth flows)
              are designed for humans, not autonomous agents.
            </p>
            <h2>The Solution</h2>
            <p>
              W.A.R.P. weaponizes the forgotten HTTP 402 status code and transforms it into a negotiation protocol
              between APIs and AI Agents. When an agent requests a protected resource, the server responds with 402
              and payment details in HTTP headers. The agent autonomously signs and broadcasts a blockchain transaction,
              then retries the request with proof of payment.
            </p>
            <h2>Key Benefits</h2>
            <ul>
              <li><strong>For API Providers:</strong> Monetize agent traffic with 3 lines of code</li>
              <li><strong>For Agent Developers:</strong> Standardized payment SDK that works everywhere</li>
              <li><strong>For Stacks Ecosystem:</strong> Creates constant demand for STX as the currency of AI labor</li>
            </ul>
          </div>
        )}

        {activeSection === 'quickstart' && (
          <div className="docs-section">
            <h1>Quick Start</h1>
            <h2>Installation</h2>
            <CodeBlock code={quickStartInstall} language="bash" showLineNumbers={false} />

            <h2>Server Setup (API Seller)</h2>
            <p>Add W.A.R.P. middleware to your Express server:</p>
            <CodeBlock code={quickStartServer} language="javascript" />

            <h2>Agent Setup (API Buyer)</h2>
            <p>Use the W.A.R.P. Agent SDK to automatically handle payments:</p>
            <CodeBlock code={quickStartAgent} language="javascript" />

            <h2>Testing with cURL</h2>
            <p>You can test the 402 response manually:</p>
            <CodeBlock code={curlExample} language="bash" />
          </div>
        )}

        {activeSection === 'api' && (
          <div className="docs-section">
            <h1>API Reference</h1>

            <h2>Request Headers</h2>
            <Card>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Format</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {requestHeaders.map((header, index) => (
                    <tr key={index}>
                      <td><code>{header.header}</code></td>
                      <td>{header.format}</td>
                      <td>{header.required}</td>
                      <td>{header.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <h2>Response Headers (402 Payment Required)</h2>
            <Card>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Example</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {responseHeaders402.map((header, index) => (
                    <tr key={index}>
                      <td><code>{header.header}</code></td>
                      <td><code>{header.example}</code></td>
                      <td>{header.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <h2>Response Headers (200 OK)</h2>
            <Card>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Example</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {responseHeaders200.map((header, index) => (
                    <tr key={index}>
                      <td><code>{header.header}</code></td>
                      <td><code>{header.example}</code></td>
                      <td>{header.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeSection === 'errors' && (
          <div className="docs-section">
            <h1>Error Codes</h1>
            {Object.entries(errorCodes).map(([statusCode, errors]) => (
              <div key={statusCode}>
                <h2>HTTP {statusCode}</h2>
                <Card>
                  {errors.map((error, index) => (
                    <div key={index} className="error-item">
                      <h4>{error.message}</h4>
                      <p>{error.description}</p>
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'security' && (
          <div className="docs-section">
            <h1>Security Considerations</h1>

            <h2>Replay Attack Prevention</h2>
            <p>
              Each invoice includes a unique nonce (UUID). The server must track used nonces and reject
              transactions that reuse a nonce. Store nonces with a TTL matching your invoice expiration time.
            </p>

            <h2>Amount Verification</h2>
            <p>
              Always verify that the transaction amount is greater than or equal to the required price.
              Accept overpayments (agents may round up to simplify UX).
            </p>

            <h2>Recipient Verification</h2>
            <p>
              Verify that the transaction was sent to the correct Stacks address. An agent sending payment
              to a different address should be rejected.
            </p>

            <h2>Blockchain Reorganization</h2>
            <p>
              For high-value transactions, consider requiring multiple confirmations (X-WARP-Min-Confirmations).
              Most APIs can safely use 1 confirmation. For micro-payments, consider optimistic clearing (accept 0-conf).
            </p>

            <h2>Time Synchronization</h2>
            <p>
              Invoice expiration (X-WARP-Expires) should be enforced server-side. Typical values are 5-10 minutes.
              This prevents agents from holding invoices indefinitely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
