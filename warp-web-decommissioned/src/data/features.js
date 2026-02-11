export const features = [
  {
    id: 1,
    title: 'The Invisible Paywall',
    description: 'Operates entirely in HTTP headers. The Agent never sees a paywall—it just pays.',
    details: 'Traditional paywalls block access. W.A.R.P. negotiates payment autonomously in the background using standard HTTP headers.',
  },
  {
    id: 2,
    title: '3 Lines of Code',
    description: 'Add W.A.R.P. to your Express, Next.js, or FastAPI app in under 60 seconds.',
    details: 'Drop-in middleware that requires minimal configuration. Start earning from AI agent traffic immediately.',
  },
  {
    id: 3,
    title: 'Dynamic Pricing',
    description: 'Adjust prices based on server load, time of day, or user reputation.',
    details: 'Implement surge pricing during peak hours or offer discounts to trusted agents. Full control over pricing logic.',
  },
  {
    id: 4,
    title: 'Agent-Agnostic',
    description: 'Works with any agent framework: LangChain, AutoGPT, BabyAGI, custom builds.',
    details: 'Universal SDK that integrates with any AI agent framework. Standard HTTP protocol means maximum compatibility.',
  },
  {
    id: 5,
    title: 'Built-in Receipts',
    description: 'Immutable receipts on Stacks blockchain. Proof of payment, revenue analytics, dispute resolution.',
    details: 'Every transaction is recorded on-chain. Query transaction history, generate reports, and resolve disputes with cryptographic proof.',
  },
  {
    id: 6,
    title: 'Bitcoin Security',
    description: 'Settled on Stacks L2 with Bitcoin finality. No rug pulls. No 51% attacks.',
    details: 'Inherits Bitcoin\'s security model through Stacks\' Proof of Transfer mechanism. Transactions achieve Bitcoin finality.',
  },
];

export const problemStats = [
  {
    id: 1,
    title: 'FREE-RIDING AGENTS',
    description: 'LLMs scrape trillions of tokens without compensation',
    status: 'Unsustainable',
    icon: 'X',
  },
  {
    id: 2,
    title: 'API SHUTDOWNS',
    description: '67% of free APIs shut down due to bot abuse',
    status: 'Growing',
    icon: 'X',
  },
  {
    id: 3,
    title: 'SUBSCRIPTION FATIGUE',
    description: 'You can\'t ask an AI to enter a credit card',
    status: 'Broken UX',
    icon: 'X',
  },
  {
    id: 4,
    title: 'LOST REVENUE',
    description: 'Developers lose ~$2.3M/year per popular API',
    status: 'Unfixed',
    icon: 'X',
  },
];

export const stakeholders = [
  {
    id: 1,
    title: 'FOR API SELLERS',
    description: 'Drop in 3 lines of middleware. Start earning STX from Agent traffic immediately.',
    icon: 'Shield',
  },
  {
    id: 2,
    title: 'FOR AGENT BUYERS',
    description: 'A standardized SDK that detects invoices, signs transactions, and retries requests—fully autonomous.',
    icon: 'Bot',
  },
  {
    id: 3,
    title: 'FOR THE STACKS ECOSYSTEM',
    description: 'Creates immediate utility for STX and sBTC as the native currency of AI labor.',
    icon: 'Layers',
  },
];

export const roadmapItems = [
  {
    id: 1,
    title: 'Core Protocol Design',
    status: 'completed',
    date: 'Jan 2026',
  },
  {
    id: 2,
    title: 'Functional MVP with STX settlement',
    status: 'current',
    date: 'Feb 2026',
    highlight: true,
  },
  {
    id: 3,
    title: 'Optimistic Clearing (0-conf for micro-payments <0.1 STX)',
    status: 'planned',
    date: 'Q2 2026',
  },
  {
    id: 4,
    title: 'sBTC Integration (Direct Bitcoin payments)',
    status: 'planned',
    date: 'Q3 2026',
  },
  {
    id: 5,
    title: 'WebSocket Streaming (Pay-per-token for LLM APIs)',
    status: 'planned',
    date: 'Q4 2026',
  },
  {
    id: 6,
    title: 'Agent Reputation System (Trusted agents get discounts)',
    status: 'planned',
    date: '2027',
  },
];
