# W.A.R.P. Integration Guide

> **Step-by-step guide to integrating W.A.R.P. into your application**  
> For API sellers and Agent builders

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server-Side Integration (API Sellers)](#server-side-integration-api-sellers)
3. [Client-Side Integration (Agent Builders)](#client-side-integration-agent-builders)
4. [Testing](#testing)
5. [Production Checklist](#production-checklist)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For API Sellers (Server-Side)

- Node.js 18+ or compatible runtime
- A Stacks wallet address (for receiving payments)
- Basic knowledge of Express.js or similar frameworks

### For Agent Builders (Client-Side)

- Node.js 18+ or compatible runtime
- A funded Stacks wallet (testnet STX for testing)
- Agent framework (LangChain, AutoGPT, custom, etc.)

### Common Requirements

- Stacks Testnet/Mainnet access
- `npm` or `yarn` package manager

---

## Server-Side Integration (API Sellers)

### Step 1: Install W.A.R.P. Middleware

```bash
npm install warp-protocol
# or
yarn add warp-protocol
```

### Step 2: Generate Your Stacks Wallet

If you don't have a Stacks wallet yet:

```javascript
// scripts/generate-wallet.js
import { generateSecretKey, getStxAddress } from '@stacks/wallet-sdk';
import { TransactionVersion } from '@stacks/transactions';

const secretKey = generateSecretKey();
const address = getStxAddress({ 
  secretKey, 
  transactionVersion: TransactionVersion.Testnet 
});

console.log('Private Key:', secretKey);
console.log('Address:', address);
console.log('\n⚠️  SAVE YOUR PRIVATE KEY SECURELY! ⚠️\n');
```

Run it:

```bash
node scripts/generate-wallet.js
```

**Output:**

```
Private Key: a1b2c3d4e5f6...
Address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

⚠️  SAVE YOUR PRIVATE KEY SECURELY! ⚠️
```

### Step 3: Basic Integration (Express.js)

Create `server.js`:

```javascript
import express from 'express';
import { warpGate } from 'warp-protocol';

const app = express();

// ✅ Public Route (No payment required)
app.get('/api/public', (req, res) => {
  res.json({ 
    message: "This is free data!",
    data: { temperature: 72 }
  });
});

// 🛡️ Protected Route (Requires 1 STX payment)
app.use('/api/premium', warpGate({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Your wallet
  price: 1000000, // 1 STX in micro-STX
  network: 'testnet', // or 'mainnet'
  expiry: 300 // Payment window: 5 minutes
}));

app.get('/api/premium', (req, res) => {
  res.json({ 
    message: "If you're reading this, you paid!",
    data: { 
      alpha: "BTC will hit $100K by EOY",
      confidence: 0.94 
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`⚡ WARP Gateway running on http://localhost:${PORT}`);
});
```

### Step 4: Advanced Configuration

#### Dynamic Pricing

```javascript
import os from 'os';

app.use('/api/premium', warpGate({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  
  // Dynamic pricing based on server load
  price: (req) => {
    const load = os.loadavg()[0];
    
    if (load > 8.0) return 5000000; // 5 STX (High load)
    if (load > 4.0) return 2000000; // 2 STX (Medium load)
    return 1000000; // 1 STX (Normal load)
  },
  
  network: 'testnet',
  
  // Custom verification logic
  onPaymentVerified: (req, payment) => {
    console.log(`💰 Payment received: ${payment.amount} micro-STX`);
    console.log(`📝 TxID: ${payment.txId}`);
  },
  
  // Handle verification failures
  onPaymentFailed: (req, error) => {
    console.error(`❌ Payment verification failed: ${error.message}`);
  }
}));
```

#### User-Based Pricing

```javascript
const TRUSTED_AGENTS = new Set([
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', // Trusted agent 1
  'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE'  // Trusted agent 2
]);

app.use('/api/premium', warpGate({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  
  price: (req) => {
    // Extract sender address from transaction
    const senderAddress = req.warpPayment?.sender;
    
    // Trusted agents get 50% discount
    if (TRUSTED_AGENTS.has(senderAddress)) {
      return 500000; // 0.5 STX
    }
    
    return 1000000; // 1 STX
  },
  
  network: 'testnet'
}));
```

#### Time-Based Pricing

```javascript
app.use('/api/premium', warpGate({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  
  price: (req) => {
    const hour = new Date().getHours();
    
    // Peak hours (9 AM - 5 PM): Premium pricing
    if (hour >= 9 && hour < 17) {
      return 2000000; // 2 STX
    }
    
    // Off-peak hours: Standard pricing
    return 1000000; // 1 STX
  },
  
  network: 'testnet'
}));
```

### Step 5: Add Analytics Dashboard (Optional)

W.A.R.P. includes a built-in analytics dashboard to track your revenue:

```javascript
import { warpDashboard } from 'warp-protocol/dashboard';

// Mount the dashboard at /warp-analytics
app.use('/warp-analytics', warpDashboard({
  // Database connection (stores payment records)
  dbUrl: process.env.DATABASE_URL,
  
  // Optional: Require authentication
  auth: {
    username: 'admin',
    password: process.env.DASHBOARD_PASSWORD
  }
}));
```

Visit `http://localhost:3000/warp-analytics` to see:

- Total revenue (STX)
- Payment count
- Top paying agents
- Revenue over time graph

---

## Client-Side Integration (Agent Builders)

### Step 1: Install W.A.R.P. Client SDK

```bash
npm install warp-protocol
# or
yarn add warp-protocol
```

### Step 2: Fund Your Agent Wallet

For testnet, get free STX from the [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet):

1. Generate wallet (see server step 2)
2. Visit faucet link
3. Enter your testnet address
4. Receive 500 STX

### Step 3: Basic Integration

Create `agent.js`:

```javascript
import { WarpAgent } from 'warp-protocol/client';

// Initialize agent with wallet
const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY, // From wallet generation
  network: 'testnet' // or 'mainnet'
});

async function main() {
  console.log('🤖 Agent starting...\n');
  
  try {
    // The agent automatically handles 402 responses
    const data = await agent.fetch('http://localhost:3000/api/premium');
    
    console.log('✅ Success! Data received:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
```

**Output:**

```
🤖 Agent starting...

⚡ 402 Payment Required detected
📋 Price: 1 STX (1000000 micro-STX)
💳 Recipient: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
🔐 Signing transaction...
📡 Broadcasting transaction...
⏳ Waiting for confirmation...
✅ Payment confirmed! TxID: 0x7f3a8b9c...
🔄 Retrying request with proof-of-payment...

✅ Success! Data received:
{
  "message": "If you're reading this, you paid!",
  "data": {
    "alpha": "BTC will hit $100K by EOY",
    "confidence": 0.94
  },
  "payment": {
    "status": "confirmed",
    "tx_id": "0x7f3a8b9c...",
    "amount_paid": 1000000
  }
}
```

### Step 4: Advanced Client Configuration

#### Set Maximum Price

```javascript
const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet',
  
  // Refuse to pay more than 2 STX
  maxPrice: 2000000,
  
  // Timeout for payment confirmation
  confirmationTimeout: 30000 // 30 seconds
});

try {
  const data = await agent.fetch(url);
} catch (error) {
  if (error.code === 'MAX_PRICE_EXCEEDED') {
    console.log('❌ Server wants too much! Refusing to pay.');
  }
}
```

#### Custom Payment Approval

```javascript
const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet',
  
  // Callback before payment
  onPaymentRequired: async (invoice) => {
    console.log(`\n💰 Payment Required:`);
    console.log(`   Price: ${invoice.price / 1000000} STX`);
    console.log(`   Recipient: ${invoice.recipient}`);
    
    // Custom logic (e.g., check budget, log to database)
    const budget = await checkAgentBudget();
    if (budget < invoice.price) {
      throw new Error('Insufficient budget');
    }
    
    // Approve payment
    return true;
  }
});
```

#### Retry Strategy

```javascript
const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet',
  
  retry: {
    attempts: 3, // Max retry attempts
    backoff: 'exponential', // or 'linear', 'fixed'
    delay: 1000 // Initial delay (ms)
  }
});
```

### Step 5: Integrate with LangChain

Example for LangChain agents:

```javascript
import { WarpAgent } from 'warp-protocol/client';
import { Tool } from 'langchain/tools';

class WarpAPITool extends Tool {
  constructor() {
    super();
    this.name = "premium_data_api";
    this.description = "Fetches premium market data (costs 1 STX per call)";
    
    this.agent = new WarpAgent({
      privateKey: process.env.AGENT_PRIVATE_KEY,
      network: 'testnet',
      maxPrice: 2000000
    });
  }
  
  async _call(input) {
    try {
      const data = await this.agent.fetch(
        'http://localhost:3000/api/premium'
      );
      return JSON.stringify(data);
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}

// Use in LangChain agent
const tools = [new WarpAPITool()];
const agent = new ZeroShotAgent({ llm, tools });
```

---

## Testing

### Test Environment Setup

Create `.env.test`:

```bash
# Server
WARP_RECIPIENT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
WARP_NETWORK=testnet

# Agent
AGENT_PRIVATE_KEY=a1b2c3d4e5f6...
```

### Unit Tests (Server)

```javascript
// tests/warp-gate.test.js
import request from 'supertest';
import app from '../server.js';

describe('WARP Gateway', () => {
  
  it('should return 402 for unpaid request', async () => {
    const res = await request(app).get('/api/premium');
    
    expect(res.status).toBe(402);
    expect(res.headers['x-warp-price']).toBe('1000000');
    expect(res.headers['x-warp-address']).toBeDefined();
  });
  
  it('should accept valid payment', async () => {
    // 1. Get invoice
    const invoice = await request(app).get('/api/premium');
    
    // 2. Make payment (using test helper)
    const txId = await makeTestPayment(invoice);
    
    // 3. Retry with proof-of-payment
    const res = await request(app)
      .get('/api/premium')
      .set('Authorization', `WARP ${txId}`)
      .set('X-WARP-Nonce', invoice.headers['x-warp-nonce']);
    
    expect(res.status).toBe(200);
    expect(res.headers['x-warp-paid']).toBe('1000000');
  });
  
});
```

### Integration Tests (End-to-End)

```javascript
// tests/e2e.test.js
import { WarpAgent } from 'warp-protocol/client';

describe('End-to-End Flow', () => {
  
  it('should complete full payment flow', async () => {
    const agent = new WarpAgent({
      privateKey: process.env.AGENT_PRIVATE_KEY,
      network: 'testnet'
    });
    
    const data = await agent.fetch('http://localhost:3000/api/premium');
    
    expect(data.message).toBe("If you're reading this, you paid!");
    expect(data.payment.status).toBe('confirmed');
  });
  
});
```

### Manual Testing with cURL

**Step 1: Get Invoice**

```bash
curl -i http://localhost:3000/api/premium
```

**Response:**

```
HTTP/1.1 402 Payment Required
X-WARP-Price: 1000000
X-WARP-Address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
X-WARP-Nonce: 7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c
...
```

**Step 2: Make Payment (via Stacks Explorer)**

1. Go to [Hiro Wallet](https://wallet.hiro.so/)
2. Send 1 STX to address from `X-WARP-Address`
3. Add memo: `WARP:7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c`
4. Copy transaction ID (e.g., `0x7f3a8b9c...`)

**Step 3: Retry with Proof**

```bash
curl -i http://localhost:3000/api/premium \
  -H "Authorization: WARP 0x7f3a8b9c..." \
  -H "X-WARP-Nonce: 7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c"
```

**Response:**

```
HTTP/1.1 200 OK
X-WARP-Paid: 1000000
...

{ "message": "If you're reading this, you paid!", ... }
```

---

## Production Checklist

### Server (API Sellers)

- [ ] **Switch to mainnet** (`network: 'mainnet'`)
- [ ] **Secure wallet private key** (use environment variables, never commit)
- [ ] **Set up Redis** for nonce storage (replace in-memory store)
- [ ] **Enable rate limiting** (prevent DoS attacks)
- [ ] **Add monitoring** (track failed verifications, payment trends)
- [ ] **Set up backup wallet** (for disaster recovery)
- [ ] **Configure HTTPS** (required for production)
- [ ] **Add CORS headers** (if serving web clients)
- [ ] **Set up logging** (ELK, DataDog, etc.)
- [ ] **Test failover** (what if Stacks API is down?)

### Client (Agent Builders)

- [ ] **Switch to mainnet** (`network: 'mainnet'`)
- [ ] **Secure agent private key** (use secrets manager)
- [ ] **Set budget limits** (`maxPrice` per request)
- [ ] **Implement retry logic** (handle network failures)
- [ ] **Add payment logging** (track total spend)
- [ ] **Monitor STX balance** (alert when low)
- [ ] **Test edge cases** (overpayment, network switch, etc.)

---

## Troubleshooting

### Issue: "Transaction not found"

**Cause:** Payment hasn't been broadcast or hasn't confirmed yet.

**Solution:**

- Wait 10-30 seconds for confirmation
- Check transaction on [Stacks Explorer](https://explorer.hiro.so/)
- Ensure you're on correct network (testnet vs mainnet)

---

### Issue: "Payment verification failed"

**Cause:** Amount, recipient, or nonce mismatch.

**Solution:**

```javascript
// Enable debug logging
const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet',
  debug: true // Logs detailed verification steps
});
```

Check logs for exact mismatch.

---

### Issue: "Nonce already used"

**Cause:** Attempting to reuse a payment (replay attack protection).

**Solution:** Make a new request to get a fresh nonce.

---

### Issue: "Max price exceeded"

**Cause:** Server is charging more than agent's `maxPrice`.

**Solution:**

- Increase `maxPrice` in agent config
- Contact API provider about pricing
- Check if dynamic pricing is active (server load, peak hours)

---

### Issue: "Blockchain unavailable"

**Cause:** Stacks API endpoint is down or slow.

**Solution:**

- Try again in a few seconds
- Use alternative Stacks API endpoint:

  ```javascript
  const agent = new WarpAgent({
    privateKey: process.env.AGENT_PRIVATE_KEY,
    network: 'testnet',
    stacksApiUrl: 'https://alternative-api.stacks.co' // Fallback
  });
  ```

---

## Support

- **Documentation:** [W.A.R.P. Docs](https://github.com/yourrepo/warp-protocol/docs)
- **Discord:** [Join Community](https://discord.gg/warp)
- **Issues:** [GitHub Issues](https://github.com/yourrepo/warp-protocol/issues)
- **Email:** <support@warp-protocol.xyz>

---

**Happy Building! ⚡**

For protocol details, see [PROTOCOL_SPEC.md](./PROTOCOL_SPEC.md).
