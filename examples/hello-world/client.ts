import { WarpAgent } from '../../packages/client/src/index';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Or just process.env if set globally

const PRIVATE_KEY = process.env.WARP_TEST_KEY;

if (!PRIVATE_KEY) {
    console.error("Error: WARP_TEST_KEY not set in environment variables.");
    console.error("Please create a .env file in the root directory with WARP_TEST_KEY set to a Stacks testnet private key.");
    process.exit(1);
}

const agent = new WarpAgent({
    privateKey: PRIVATE_KEY,
    network: 'testnet'
});

async function main() {
    try {
        console.log("🤖 Agent attempting to fetch premium data...");
        // initial request -> 402 -> sign tx -> retry with payment headers -> 200
        const data = await agent.fetch('http://localhost:3000/secret-data');

        console.log("✅ Payment successful! Data received:");
        console.log(data);
    } catch (error: any) {
        console.error("❌ Request failed:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${JSON.stringify(error.response.data)}`);
            if (error.response.status === 402) {
                console.log("Note: 402 payment required - the agent should have handled this automatically if key and balance are sufficient.");
            }
        } else {
            console.error(error.message);
        }
    }
}

main();
