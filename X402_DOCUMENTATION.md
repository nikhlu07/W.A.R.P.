# x402 Stacks Documentation

## 1. Welcome to x402-stacks

x402-stacks is an open payment standard that enables services to charge for access to their APIs and content directly over HTTP using the Stacks blockchain with STX or sBTC. It utilizes the **HTTP 402 Payment Required** status code for programmatic, account-less payments.

### Key Benefits:
- **Machine-to-machine compatibility:** Ideal for AI agents and automated services.
- **Micropayments:** Native support for low-friction, small-value transactions.
- **Stacks Ecosystem:** Built for STX and sBTC.
- **Standard Compliance:** Compatible with Coinbase's x402 protocol (v2).

---

## 2. Quickstart for Buyers (Clients)

This guide explains how to programmatically discover and complete payments to access protected resources.

### Process:
1.  **Install Dependencies:**
    ```bash
    npm install x402-stacks axios dotenv
    ```
2.  **Setup Wallet:**
    Initialize a wallet using your private key.
    ```javascript
    import { privateKeyToAccount } from 'x402-stacks';
    // or generate a new one
    // import { generateKeypair } from 'x402-stacks';
    ```
3.  **Automated Requests:**
    Use `wrapAxiosWithPayment` to automatically intercept 402 responses, sign the required transaction, and retry the request.
    ```javascript
    import { wrapAxiosWithPayment } from 'x402-stacks';
    import axios from 'axios';

    const client = wrapAxiosWithPayment(axios.create(), wallet);
    const response = await client.get('https://api.example.com/premium-data');
    ```
4.  **Manual Handling (Optional):**
    If not using the wrapper, you can manually decode the `payment-response` header using `decodePaymentResponse` to get the transaction details, sign them, and resend the request with the `payment-signature` header.

---

## 3. Quickstart for Sellers (Servers)

Enables your API to charge for access using the provided middleware.

### Integration:
1.  **Setup Middleware:**
    Configure the `paymentMiddleware` on your routes.
    ```javascript
    import { paymentMiddleware } from 'x402-stacks';

    app.get('/api/data', paymentMiddleware({
        amount: 1000000, // 1 STX (in micro-STX)
        payTo: 'SP2J6ZY...', // Your wallet address
        network: 'testnet',
        facilitatorUrl: 'https://facilitator.stacksx402.com'
    }), (req, res) => {
        // Payment verified!
        res.json({ data: "Premium Content" });
    });
    ```
2.  **Verification:**
    The middleware automatically interacts with a facilitator to verify the payment signature and check for on-chain settlement (or mempool presence depending on config).
3.  **Access Payment Details:**
    Use `getPayment(req)` within your route handler to retrieve details about the verified payment (e.g., sender address, transaction ID).

---

## 4. Register with x402scan

To make your API discoverable by AI agents and other automated buyers, register it at `scan.stacksx402.com`.

### Requirements:
-   **HTTPS:** Your API must be served over HTTPS.
-   **Output Schema:** You must return a valid x402 JSON schema that includes an `outputSchema`. This defines your API's input parameters and response structure, allowing agents to understand how to interact with your service automatically.

---

## 5. Migration Guide (V1 to V2)

V2 introduces compatibility with the Coinbase/Coinbase Developer Platform x402 protocol and uses CAIP-2 network identifiers.

### Breaking Changes:
-   **Renamed Functions:**
    -   `withPaymentInterceptor` -> `wrapAxiosWithPayment`
    -   `x402PaymentRequired` -> `paymentMiddleware`
-   **Configuration:**
    -   `address` param -> `payTo`
-   **Headers:**
    -   V2 uses `payment-signature` request header and `payment-response` response header.
    -   Headers are now Base64 encoded JSON, replacing the simpler `X-PAYMENT` headers from V1.

---

## 6. HTTP 402 Core Protocol

The protocol is built on the standard HTTP 402 status code.

### Flow:
1.  **Client:** Requests a resource.
2.  **Server:** Returns `402 Payment Required`.
    -   Header: `payment-response` (Base64 encoded JSON) containing:
        -   `chainId`: CAIP-2 identifier (e.g., `stacks:1` for mainnet).
        -   `address`: Recipient address.
        -   `amount`: Cost in base units.
3.  **Client:**
    -   Decodes the header.
    -   Creates and signs a Stacks transaction matching the requirements.
    -   Retries the request with `payment-signature` header (Base64 encoded JSON) containing the signed transaction hash/signature.
4.  **Server:**
    -   Verifies the signature/transaction.
    -   Returns `200 OK` with the resource.

---

## 7. Client / Server Roles

-   **Client (Buyer):**
    -   Initiates requests.
    -   Handles 402 errors.
    -   Holds the wallet/private key.
    -   Signs transactions.
-   **Server (Seller):**
    -   Defines pricing and recipient.
    -   Gating access to resources.
    -   Verifies payments (often delegating the heavy lifting to a Facilitator).
-   **Facilitator:**
    -   A trusted (or trust-minimized) service that helps verify payments.
    -   Since checking blockchain state can be slow or complex for a simple API server, the Facilitator acts as a bridge.

---

## 8. Facilitator

The facilitator is a service (default: `facilitator.stacksx402.com`) that:
-   Verifies client signatures.
-   Checks the Stacks blockchain (mempool or confirmed blocks) for the transaction.
-   Provides a simple REST API (`/verify`, `/settle`) for the Server middleware to call.

### Resources
-   **npm package:** `x402-stacks`
-   **Official Facilitator:** `https://facilitator.stacksx402.com`
-   **Registry:** `https://scan.stacksx402.com`
