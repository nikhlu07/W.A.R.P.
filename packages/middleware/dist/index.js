"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warpGate = warpGate;
const x402_stacks_1 = require("x402-stacks");
function warpGate(config) {
    return (req, res, next) => {
        let amount;
        try {
            amount = typeof config.price === 'function' ? config.price(req) : config.price;
        }
        catch (e) {
            console.error("Error calculating dynamic price:", e);
            return res.status(500).json({ error: "Internal Server Error calculating price" });
        }
        const middlewareConfig = {
            amount: amount.toString(),
            payTo: config.recipient,
            network: config.network || 'mainnet',
            facilitatorUrl: config.facilitatorUrl
        };
        return (0, x402_stacks_1.paymentMiddleware)(middlewareConfig)(req, res, next);
    };
}
