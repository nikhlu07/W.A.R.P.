import { paymentMiddleware } from 'x402-stacks';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Default Supabase config (should be overridden by environment variables)
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface WarpGateConfig {
    recipient: string;
    price: number | ((req: any) => number);
    network?: 'mainnet' | 'testnet';
    facilitatorUrl?: string;
}

export function warpGate(config: WarpGateConfig) {
    return (req: any, res: any, next: any) => {
        let amount: number;
        try {
            amount = typeof config.price === 'function' ? config.price(req) : config.price;
        } catch (e) {
            console.error("Error calculating dynamic price:", e);
            return res.status(500).json({ error: "Internal Server Error calculating price" });
        }

        const middlewareConfig = {
            amount: amount.toString(),
            payTo: config.recipient,
            network: config.network || 'mainnet',
            facilitatorUrl: config.facilitatorUrl
        };

        // Wrap the standard middleware to capture success
        const handler = paymentMiddleware(middlewareConfig);

        // Custom wrapper to log successful payments
        // Note: x402-stacks middleware calls next() on success, so we rely on that.
        // However, for robust logging, we ideally hook into the verification success.
        // Since the current middleware implementation doesn't expose a success callback directly in this version,
        // we can attach a property to the request object in a subsequent middleware or modify how we use it.
        // For now, we will just use the standard middleware. 
        // TODO: In a real implementation, we would fork/modify the middleware or contribute a 'onSuccess' hook to x402-stacks.

        // Simplified logging attempt (This might need adjustment based on library internals):
        // We can check if 'req.payment' exists after the middleware runs if we wrap it differently.

        return handler(req as any, res as any, (err: any) => {
            if (!err) {
                // Success! Log the payment if available
                if ((req as any).payment) {
                    const payment = (req as any).payment;
                    // Fire and forget logging
                    supabase.from('transactions').insert({
                        tx_id: payment.txId,
                        sender: payment.senderAddress,
                        amount: amount,
                        recipient: config.recipient,
                        status: 'confirmed',
                        created_at: new Date().toISOString()
                    }).then(({ error }) => {
                        if (error) console.error("Error logging payment to Supabase:", error);
                    });
                }
            }
            if (next) next(err);
        });
    };
}
