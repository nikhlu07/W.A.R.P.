import express from 'express';
// Use relative path to source since we are using tsx and local packages are not built
import { warpGate } from '../../packages/middleware/src/index';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies (optional but good practice)
app.use(express.json());

// 🛡️ PROTECTED ROUTE: Costs 1000 micro-STX (0.001 STX) to access
// This uses the warpGate wrapper around x402-stacks paymentMiddleware
app.use('/secret-data', warpGate({
    recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', // Using a well-known address or your own
    price: 1000, // 0.001 STX
    network: 'testnet'
}));

app.get('/secret-data', (req, res) => {
    res.json({
        msg: "You paid! Here is the secret data.",
        secret: "The treasure is buried under the palm tree."
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Try accessing http://localhost:${port}/secret-data directly to see 402 error.`);
});
