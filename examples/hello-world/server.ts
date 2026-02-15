import express from 'express';
import cors from 'cors';
import { warpGate } from '../../packages/middleware/src/index';
import { WarpAgent } from '../../packages/client/src/index';
import dotenv from 'dotenv';
import path from 'path';

// Force load .env from root if not present (although Render sets env vars)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for dashboard
app.use(cors());
app.use(express.json());

// 🛡️ PROTECTED ROUTE
app.use('/secret-data', warpGate({
    recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    price: 1000,
    network: 'testnet'
}));

app.get('/secret-data', (req, res) => {
    res.json({
        msg: "You paid! Here is the secret data.",
        secret: "The treasure is buried under the palm tree."
    });
});

// 🤖 SIMULATION ENDPOINT (For Dashboard Demo)
app.post('/simulate-agent', async (req, res) => {
    try {
        console.log("🤖 Simulation requested...");

        const privateKey = process.env.WARP_TEST_KEY;
        if (!privateKey) {
            return res.status(500).json({ error: "Server missing WARP_TEST_KEY" });
        }

        const agent = new WarpAgent({
            privateKey: privateKey,
            network: 'testnet'
        });

        // Agent calls the protected route on THIS server
        // Use localhost if running locally or get the public URL if needed
        // Since we are inside the server, we can target localhost port
        const targetUrl = `http://localhost:${port}/secret-data`;

        console.log(`🤖 Agent fetching: ${targetUrl}`);
        const data = await agent.fetch(targetUrl);

        console.log("✅ Simulation success!");
        res.json({ success: true, data });
    } catch (error: any) {
        console.error("❌ Simulation failed:", error);
        res.status(500).json({
            error: "Simulation failed",
            details: error.message,
            stack: error.stack
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
