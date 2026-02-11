import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/shared/Card';
import StatusIndicator from '../components/shared/StatusIndicator';
import Badge from '../components/shared/Badge';
import { generateRevenueData, mockTransactions, topAgents, getStats } from '../data/mockTransactions';
import { truncateAddress, formatSTX, getTimeAgo } from '../utils/formatSTX';
import './DashboardPage.css';

export default function DashboardPage() {
  const stats = getStats();
  const revenueData = generateRevenueData();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>WARP ANALYTICS DASHBOARD</h1>
        <div className="dashboard-badges">
          <Badge variant="yellow">TESTNET</Badge>
          <Badge variant="black">LIVE</Badge>
        </div>
      </div>

      <div className="stats-grid">
        <Card active className="stat-card">
          <div className="stat-label">TOTAL REVENUE</div>
          <div className="stat-value">{stats.totalRevenue.toFixed(1)} STX</div>
          <div className="stat-change stat-change--up">↑ 12% from last week</div>
        </Card>
        <Card active className="stat-card">
          <div className="stat-label">PAYMENTS TODAY</div>
          <div className="stat-value">{stats.paymentsToday}</div>
          <div className="stat-change stat-change--up">↑ 8% from yesterday</div>
        </Card>
        <Card active className="stat-card">
          <div className="stat-label">UNIQUE AGENTS</div>
          <div className="stat-value">{stats.uniqueAgents}</div>
          <div className="stat-change">Stable</div>
        </Card>
        <Card active className="stat-card">
          <div className="stat-label">CURRENT PRICE</div>
          <div className="stat-value">{stats.currentPrice} STX</div>
          <div className="stat-mode">Mode: {stats.priceMode}</div>
        </Card>
      </div>

      <Card className="chart-card">
        <h3 className="chart-title">REVENUE OVER TIME</h3>
        <p className="chart-subtitle">Last 30 days, daily resolution</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="0" stroke="#E5E5E5" />
            <XAxis dataKey="date" tick={{fontSize: 11, fontFamily: 'JetBrains Mono'}} />
            <YAxis tick={{fontSize: 11, fontFamily: 'JetBrains Mono'}} label={{value: 'STX', angle: -90, position: 'insideLeft'}} />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '2px solid #050505',
                borderRadius: 0,
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#D9FF00" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="table-card">
        <h3 className="table-title">RECENT TRANSACTIONS</h3>
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>TxID</th>
                <th>Agent</th>
                <th>Amount</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.txId}>
                  <td>
                    <a
                      href={`https://explorer.hiro.so/txid/${tx.txId}?chain=testnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tx-link"
                    >
                      {truncateAddress(tx.txId, 8, 6)}
                    </a>
                  </td>
                  <td>{truncateAddress(tx.agent)}</td>
                  <td>{formatSTX(tx.amount)}</td>
                  <td><code>{tx.endpoint}</code></td>
                  <td><StatusIndicator status={tx.status} /></td>
                  <td>{getTimeAgo(tx.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bottom-grid">
        <Card className="leaderboard-card">
          <h3 className="card-title">TOP AGENTS</h3>
          <div className="leaderboard">
            {topAgents.map((agent, index) => (
              <div key={agent.address} className={`leaderboard-item ${index === 0 ? 'leaderboard-item--top' : ''}`}>
                <span className="leaderboard-rank">{index + 1}.</span>
                <span className="leaderboard-address">{truncateAddress(agent.address)}</span>
                <span className="leaderboard-amount">{formatSTX(agent.totalSpent)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="pricing-card">
          <h3 className="card-title">PRICING MONITOR</h3>
          <div className="pricing-content">
            <div className="pricing-row">
              <span className="pricing-label">Server Load:</span>
              <div className="load-bar">
                <div className="load-fill" style={{width: '42%'}}></div>
              </div>
              <span className="pricing-value">4.2</span>
            </div>
            <div className="pricing-row">
              <span className="pricing-label">Current Price:</span>
              <span className="pricing-value pricing-value--large">2 STX</span>
            </div>
            <div className="pricing-row">
              <span className="pricing-label">Mode:</span>
              <Badge variant="yellow">SURGE</Badge>
            </div>
            <div className="pricing-info">
              Next tier: Load &gt; 8.0 → 5 STX
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
