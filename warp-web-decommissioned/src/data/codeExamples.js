export const serverExample = `import { warpGate } from 'warp-protocol';

app.use('/api/premium', warpGate({
  recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  price: 1000000, // 1 STX
}));`;

export const agentExample = `import { WarpAgent } from 'warp-protocol/client';

const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet'
});

const data = await agent.fetch('http://localhost:3000/api/premium');`;

export const dynamicPricingExample = `app.use('/api/surge', warpGate({
  recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  price: (req) => {
    const load = getServerLoad();
    if (load > 8.0) return 5000000; // 5 STX
    if (load > 4.0) return 2000000; // 2 STX
    return 1000000; // 1 STX
  }
}));`;

export const quickStartInstall = `npm install warp-protocol`;

export const quickStartServer = `import express from 'express';
import { warpGate } from 'warp-protocol';

const app = express();

app.use('/api/protected', warpGate({
  recipient: 'YOUR_STACKS_ADDRESS',
  price: 1000000 // 1 STX in micro-STX
}));

app.get('/api/protected/data', (req, res) => {
  res.json({ data: 'Premium content' });
});

app.listen(3000);`;

export const quickStartAgent = `import { WarpAgent } from 'warp-protocol/client';

const agent = new WarpAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  network: 'testnet',
  maxPrice: 5000000 // Max 5 STX
});

const response = await agent.fetch('http://localhost:3000/api/protected/data');
const data = await response.json();

console.log(data);`;

export const curlExample = `curl -X GET http://localhost:3000/api/premium

HTTP/1.1 402 Payment Required
X-WARP-Version: 1.0.0
X-WARP-Price: 1000000
X-WARP-Currency: STX
X-WARP-Address: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7
X-WARP-Network: testnet
X-WARP-Nonce: 550e8400-e29b-41d4-a716-446655440000`;

export const langchainExample = `from langchain.agents import initialize_agent
from warp_protocol import WarpHTTPClient

client = WarpHTTPClient(
    private_key=os.getenv("AGENT_PRIVATE_KEY"),
    network="testnet"
)

agent = initialize_agent(
    tools=[...],
    http_client=client
)

result = agent.run("Fetch premium data from API")`;
