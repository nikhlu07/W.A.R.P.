export const mockTransactions = [
  {
    txId: '0x7f3a8b9c4d2e1f0a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
    agent: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    amount: 1000000,
    endpoint: '/api/premium',
    status: 'confirmed',
    timestamp: Date.now() - 120000,
  },
  {
    txId: '0x8a4b9c0d5e3f2a1b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
    agent: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
    amount: 2000000,
    endpoint: '/api/alpha',
    status: 'confirmed',
    timestamp: Date.now() - 300000,
  },
  {
    txId: '0x9b5c0d1e6f4a3b2c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
    agent: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    amount: 1000000,
    endpoint: '/api/premium',
    status: 'confirmed',
    timestamp: Date.now() - 600000,
  },
  {
    txId: '0xac6d1e2f7a5b4c3d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
    agent: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    amount: 5000000,
    endpoint: '/api/bulk',
    status: 'confirmed',
    timestamp: Date.now() - 900000,
  },
  {
    txId: '0xbd7e2f3a8b6c5d4e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
    agent: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
    amount: 1000000,
    endpoint: '/api/premium',
    status: 'pending',
    timestamp: Date.now() - 30000,
  },
  {
    txId: '0xce8f3a4b9c7d6e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',
    agent: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    amount: 3000000,
    endpoint: '/api/enterprise',
    status: 'confirmed',
    timestamp: Date.now() - 1200000,
  },
  {
    txId: '0xdf9a4b5c0d8e7f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
    agent: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    amount: 1000000,
    endpoint: '/api/premium',
    status: 'confirmed',
    timestamp: Date.now() - 1800000,
  },
  {
    txId: '0xea0b5c6d1e9f8a7b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
    agent: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
    amount: 2000000,
    endpoint: '/api/alpha',
    status: 'confirmed',
    timestamp: Date.now() - 2400000,
  },
  {
    txId: '0xfb1c6d7e2f0a9b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',
    agent: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    amount: 1000000,
    endpoint: '/api/premium',
    status: 'confirmed',
    timestamp: Date.now() - 3000000,
  },
  {
    txId: '0x0c2d7e8f3a1b0c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',
    agent: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    amount: 4000000,
    endpoint: '/api/enterprise',
    status: 'confirmed',
    timestamp: Date.now() - 3600000,
  },
];

export const generateRevenueData = () => {
  const data = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * dayMs);
    const revenue = Math.floor(Math.random() * 3000000 + 500000 + (29 - i) * 100000);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: revenue / 1000000,
      fullDate: date,
    });
  }

  return data;
};

export const topAgents = [
  { address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', totalSpent: 12000000, requestCount: 12 },
  { address: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE', totalSpent: 8000000, requestCount: 8 },
  { address: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', totalSpent: 5000000, requestCount: 5 },
  { address: 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS', totalSpent: 3000000, requestCount: 3 },
  { address: 'SP3T0K7Z3JX1XKDB2NS1EQ7XYE48KQV5Q8D9D3KY6', totalSpent: 2000000, requestCount: 2 },
];

export const getStats = () => {
  const totalRevenue = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const todayStart = Date.now() - 24 * 60 * 60 * 1000;
  const paymentsToday = mockTransactions.filter(tx => tx.timestamp > todayStart).length;
  const uniqueAgents = new Set(mockTransactions.map(tx => tx.agent)).size;

  return {
    totalRevenue: totalRevenue / 1000000,
    paymentsToday,
    uniqueAgents,
    currentPrice: 1.0,
    priceMode: 'Normal',
  };
};
