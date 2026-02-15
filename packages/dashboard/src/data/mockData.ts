export const features = [
  {
    title: "Invisible Paywall",
    description: "Zero UI friction. Agents never see a checkout page — they see a 402 status code and act on it autonomously.",
    tag: "UX",
  },
  {
    title: "3 Lines of Code",
    description: "Add W.A.R.P. middleware to any Express/Fastify server. One import, one function call, one config object.",
    tag: "DX",
  },
  {
    title: "Dynamic Pricing",
    description: "Set prices per-route, per-method, or per-byte. Adjust in real-time based on demand, load, or time-of-day.",
    tag: "PRICING",
  },
  {
    title: "Bitcoin-Secured",
    description: "Settlements on Stacks L2, anchored to Bitcoin. Finality in ~6 seconds. No chargebacks. No intermediaries.",
    tag: "SECURITY",
  },
  {
    title: "Replay Protection",
    description: "Every payment proof includes a nonce, timestamp, and block height. Double-spend attempts are rejected at the protocol level.",
    tag: "PROTOCOL",
  },
  {
    title: "Revenue Analytics",
    description: "Real-time dashboard showing revenue, top agents, request volume, and payment success rates.",
    tag: "ANALYTICS",
  },
];

export const techStack = [
  { layer: "Settlement", tech: "Stacks L2", description: "Bitcoin-anchored smart contract platform" },
  { layer: "Token", tech: "STX", description: "Native currency for gas and payments" },
  { layer: "Backend", tech: "Node.js", description: "Express/Fastify middleware" },
  { layer: "Protocol", tech: "HTTP 402", description: "Payment Required status code" },
  { layer: "Proof", tech: "Tx Receipt", description: "On-chain verification of payment" },
];

export const revenueData = [
  { date: "Jan", revenue: 12.4, payments: 89 },
  { date: "Feb", revenue: 28.7, payments: 203 },
  { date: "Mar", revenue: 45.2, payments: 312 },
  { date: "Apr", revenue: 38.9, payments: 278 },
  { date: "May", revenue: 67.3, payments: 456 },
  { date: "Jun", revenue: 89.1, payments: 612 },
  { date: "Jul", revenue: 124.5, payments: 834 },
  { date: "Aug", revenue: 156.8, payments: 1023 },
  { date: "Sep", revenue: 198.2, payments: 1345 },
  { date: "Oct", revenue: 234.6, payments: 1567 },
  { date: "Nov", revenue: 287.3, payments: 1892 },
  { date: "Dec", revenue: 342.1, payments: 2234 },
];

export const transactions = [
  { txId: "0x7a3f...e4b2", agent: "GPT-4-Agent", amount: 0.25, time: "2 min ago", status: "confirmed" },
  { txId: "0x8b2c...f1a9", agent: "Claude-Scraper", amount: 0.10, time: "5 min ago", status: "confirmed" },
  { txId: "0x9d1e...a3c7", agent: "DataBot-v3", amount: 0.50, time: "8 min ago", status: "confirmed" },
  { txId: "0x1f4a...b8d6", agent: "ResearchAI", amount: 0.15, time: "12 min ago", status: "confirmed" },
  { txId: "0x2e5b...c9e3", agent: "PriceOracle", amount: 1.00, time: "15 min ago", status: "confirmed" },
  { txId: "0x3c6d...d2f1", agent: "NewsAggr", amount: 0.05, time: "18 min ago", status: "pending" },
  { txId: "0x4d7e...e3g2", agent: "WeatherBot", amount: 0.02, time: "22 min ago", status: "confirmed" },
  { txId: "0x5e8f...f4h3", agent: "TradingAI", amount: 2.50, time: "25 min ago", status: "confirmed" },
];

export const docsContent = {
  overview: {
    title: "Overview",
    content: `W.A.R.P. (Web Agent Revenue Protocol) is the world's first functional implementation of HTTP 402 Payment Required. It enables API providers to monetize their endpoints by requiring AI agents to pay in STX (Stacks) for access.

The protocol works by intercepting requests at the middleware level. When an unpaid request arrives, the server responds with a 402 status code containing payment instructions. The agent's W.A.R.P. client automatically constructs and broadcasts a Stacks transaction, then retries the original request with proof of payment.`,
  },
  quickstart: {
    title: "Quick Start",
    serverCode: `import express from 'express';
import { warp } from 'warp-protocol';

const app = express();

// That's it. 3 lines.
app.use(warp({
  address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9V6CET',
  price: 0.1  // STX per request
}));

app.get('/api/data', (req, res) => {
  res.json({ premium: 'content' });
});`,
    clientCode: `import { WarpAgent } from 'warp-protocol/client';

const agent = new WarpAgent({
  privateKey: process.env.STX_PRIVATE_KEY,
  network: 'mainnet'
});

// Automatic 402 handling
const data = await agent.fetch(
  'https://api.example.com/api/data'
);
console.log(data); // { premium: 'content' }`,
  },
  apiReference: {
    title: "API Reference",
    headers: [
      { name: "X-WARP-Price", description: "Required payment amount in STX", example: "0.1" },
      { name: "X-WARP-Address", description: "Seller's STX address for payment", example: "SP2J6ZY..." },
      { name: "X-WARP-Token", description: "Token type (currently only STX)", example: "STX" },
      { name: "X-WARP-Network", description: "Stacks network (mainnet/testnet)", example: "mainnet" },
      { name: "X-WARP-Expiry", description: "Invoice expiry in seconds", example: "300" },
      { name: "X-WARP-TxProof", description: "Transaction ID proving payment", example: "0x7a3f..." },
    ],
  },
  errorCodes: {
    title: "Error Codes",
    codes: [
      { code: 402, name: "Payment Required", description: "Request requires payment. Check X-WARP headers for invoice." },
      { code: 403, name: "Payment Invalid", description: "Transaction proof was rejected. Insufficient amount or wrong address." },
      { code: 503, name: "Network Congestion", description: "Stacks network is congested. Retry with higher fee." },
    ],
  },
};
