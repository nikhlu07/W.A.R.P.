# W.A.R.P. Protocol Specification v1.0

> **Technical Reference for HTTP 402 Payment Required Implementation on Stacks**

---

## Table of Contents

1. [Overview](#overview)
2. [HTTP 402 Flow](#http-402-flow)
3. [Header Specification](#header-specification)
4. [Transaction Verification](#transaction-verification)
5. [Error Codes](#error-codes)
6. [Security Considerations](#security-considerations)
7. [Edge Cases](#edge-cases)

---

## Overview

W.A.R.P. (Web Agent Revenue Protocol) is an implementation of the HTTP 402 status code that enables autonomous payment negotiation between API servers and AI agents using the Stacks blockchain as the settlement layer.

### Design Goals

1. **Zero Human Interaction**: Agents must be able to discover price, pay, and retry autonomously
2. **Blockchain Agnostic**: Protocol should be portable to other chains (though Stacks is optimal)
3. **Backward Compatible**: Non-W.A.R.P. clients should receive a standard 402 response
4. **Replay Protection**: Prevent transaction reuse attacks
5. **Fast Settlement**: Confirm payments within acceptable latency (<10s)

---

## HTTP 402 Flow

### Step 1: Initial Request (Unpaid)

**Client Request:**

```http
GET /api/premium-data HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Server Response:**

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json
X-WARP-Version: 1.0
X-WARP-Price: 1000000
X-WARP-Currency: STX
X-WARP-Address: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7
X-WARP-Network: mainnet
X-WARP-Nonce: 7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c
X-WARP-Expires: 300

{
  "error": "payment_required",
  "message": "This endpoint requires payment",
  "price": {
    "amount": 1000000,
    "currency": "STX",
    "human_readable": "1.0 STX"
  },
  "recipient": "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  "network": "mainnet",
  "nonce": "7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c",
  "expires_in": 300
}
```

### Step 2: Payment Transaction

The client constructs and broadcasts a Stacks STX transfer transaction:

**Transaction Parameters:**

- **Type**: `token-transfer`
- **Recipient**: Value from `X-WARP-Address`
- **Amount**: Value from `X-WARP-Price` (in micro-STX)
- **Memo**: `WARP:{nonce}` (for replay protection)
- **Network**: Value from `X-WARP-Network`

**Example (using @stacks/transactions):**

```javascript
import { makeSTXTokenTransfer } from '@stacks/transactions';

const txOptions = {
  recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  amount: 1000000, // micro-STX
  memo: 'WARP:7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c',
  senderKey: agentPrivateKey,
  network: mainnet,
  anchorMode: AnchorMode.Any
};

const transaction = await makeSTXTokenTransfer(txOptions);
const txId = await broadcastTransaction(transaction, network);
// txId: "0xABC123..."
```

### Step 3: Retry Request with Proof-of-Payment

**Client Request:**

```http
GET /api/premium-data HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: WARP 0xABC123DEF456...
X-WARP-Nonce: 7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c
```

**Server Verification:**

1. Extract `txId` from `Authorization` header
2. Query Stacks blockchain for transaction details
3. Verify:
   - ✅ Transaction exists and is confirmed
   - ✅ `recipient` matches `X-WARP-Address`
   - ✅ `amount` ≥ `X-WARP-Price`
   - ✅ `memo` contains matching nonce
   - ✅ Transaction timestamp within expiry window
   - ✅ Nonce has not been used before (replay check)

**Server Response (Success):**

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-WARP-TxID: 0xABC123DEF456...
X-WARP-Paid: 1000000

{
  "data": { ... }, // The actual API response
  "payment": {
    "status": "confirmed",
    "tx_id": "0xABC123DEF456...",
    "amount_paid": 1000000,
    "timestamp": "2026-02-11T06:29:13Z"
  }
}
```

---

## Header Specification

### Request Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `Authorization` | Yes (retry) | WARP token containing Stacks `txId` | `WARP 0xABC123...` |
| `X-WARP-Nonce` | Yes (retry) | Nonce from initial 402 response | `7f8a9b2c-4d3e...` |
| `X-WARP-Max-Price` | Optional | Client's maximum acceptable price (micro-STX) | `5000000` |

### Response Headers (402 Payment Required)

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `X-WARP-Version` | Yes | Protocol version | `1.0` |
| `X-WARP-Price` | Yes | Price in micro-STX | `1000000` |
| `X-WARP-Currency` | Yes | Payment currency | `STX` or `sBTC` |
| `X-WARP-Address` | Yes | Recipient Stacks address | `SP2J6ZY...` |
| `X-WARP-Network` | Yes | Stacks network | `mainnet` or `testnet` |
| `X-WARP-Nonce` | Yes | Unique payment identifier (UUID v4) | `7f8a9b2c...` |
| `X-WARP-Expires` | Yes | Payment window in seconds | `300` |
| `X-WARP-Min-Confirmations` | Optional | Required confirmations (default: 1) | `1` |

### Response Headers (200 OK - Paid)

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `X-WARP-TxID` | Yes | Transaction ID used for payment | `0xABC123...` |
| `X-WARP-Paid` | Yes | Amount paid (micro-STX) | `1000000` |
| `X-WARP-Timestamp` | Optional | Payment confirmation timestamp | `2026-02-11T06:29:13Z` |

---

## Transaction Verification

### Verification Algorithm

```javascript
async function verifyPayment(txId, expectedPrice, expectedRecipient, expectedNonce) {
  // 1. Fetch transaction from Stacks blockchain
  const tx = await fetchTransaction(txId, network);
  
  // 2. Check transaction exists and is confirmed
  if (!tx || tx.tx_status !== 'success') {
    throw new Error('Transaction not found or not confirmed');
  }
  
  // 3. Verify transaction type
  if (tx.tx_type !== 'token_transfer') {
    throw new Error('Invalid transaction type');
  }
  
  // 4. Verify recipient
  if (tx.token_transfer.recipient_address !== expectedRecipient) {
    throw new Error('Payment sent to wrong address');
  }
  
  // 5. Verify amount
  const amountPaid = parseInt(tx.token_transfer.amount);
  if (amountPaid < expectedPrice) {
    throw new Error(`Insufficient payment: ${amountPaid} < ${expectedPrice}`);
  }
  
  // 6. Verify memo contains nonce (replay protection)
  const memo = Buffer.from(tx.token_transfer.memo, 'hex').toString();
  if (!memo.includes(expectedNonce)) {
    throw new Error('Invalid or missing nonce in transaction memo');
  }
  
  // 7. Check nonce has not been used before
  if (await isNonceUsed(expectedNonce)) {
    throw new Error('Nonce already used (replay attack detected)');
  }
  
  // 8. Verify transaction is within expiry window
  const txTimestamp = new Date(tx.burn_block_time_iso);
  const now = new Date();
  if ((now - txTimestamp) > EXPIRY_SECONDS * 1000) {
    throw new Error('Payment expired');
  }
  
  // 9. Mark nonce as used
  await markNonceUsed(expectedNonce, txId);
  
  return {
    valid: true,
    txId: tx.tx_id,
    amount: amountPaid,
    timestamp: txTimestamp
  };
}
```

### Nonce Storage (Replay Protection)

The server MUST maintain a persistent store of used nonces:

**Schema:**

```javascript
{
  nonce: "7f8a9b2c-4d3e-4f5a-9b8c-7d6e5f4a3b2c",
  txId: "0xABC123...",
  usedAt: "2026-02-11T06:29:13Z",
  expiresAt: "2026-02-11T06:34:13Z" // For cleanup
}
```

**Implementation Options:**

- Redis (recommended for high-throughput)
- PostgreSQL/MySQL
- In-memory (for development only)

---

## Error Codes

### 402 Payment Required Errors

| Code | Message | Description |
|------|---------|-------------|
| `payment_required` | This endpoint requires payment | Standard 402 response |
| `price_changed` | Price has changed since quotation | Dynamic pricing adjustment |
| `payment_expired` | Payment window has expired | Nonce is too old |

### 400 Bad Request Errors

| Code | Message | Description |
|------|---------|-------------|
| `invalid_tx_id` | Transaction ID is malformed | Not a valid Stacks txId |
| `invalid_nonce` | Nonce is malformed or missing | Client error |
| `max_price_exceeded` | Price exceeds client's maximum | Server price > `X-WARP-Max-Price` |

### 403 Forbidden Errors

| Code | Message | Description |
|------|---------|-------------|
| `payment_failed_verification` | Payment verification failed | Amount/recipient mismatch |
| `replay_attack_detected` | Nonce has already been used | Duplicate payment attempt |
| `insufficient_amount` | Payment amount is insufficient | Paid amount < required price |

### 503 Service Unavailable Errors

| Code | Message | Description |
|------|---------|-------------|
| `blockchain_unavailable` | Cannot verify payment at this time | Stacks API down |
| `verification_timeout` | Payment verification timed out | Blockchain query too slow |

---

## Security Considerations

### 1. Replay Attack Prevention

**Threat:** Agent reuses the same `txId` for multiple requests.

**Mitigation:**

- Use unique nonces (UUID v4) for each 402 response
- Require nonce in transaction memo
- Store used nonces in persistent database
- Expire old nonces after payment window

### 2. Amount Verification

**Threat:** Agent pays less than required price.

**Mitigation:**

- Verify `tx.token_transfer.amount >= X-WARP-Price`
- Reject transactions with insufficient amounts
- Log underpayment attempts for monitoring

### 3. Recipient Verification

**Threat:** Agent sends payment to wrong address (typo or malicious redirect).

**Mitigation:**

- Verify `tx.token_transfer.recipient_address === X-WARP-Address`
- Use checksummed addresses
- Display recipient address in client UI before signing

### 4. Race Conditions

**Threat:** Multiple concurrent requests with same payment.

**Mitigation:**

- Use database transactions with row-level locking
- Check-and-mark nonce atomically
- Return 429 if duplicate request detected during verification

### 5. Blockchain Reorganization

**Threat:** Payment transaction gets orphaned due to chain reorg.

**Mitigation:**

- Require minimum confirmations (default: 1)
- For high-value payments, require 2+ confirmations
- Monitor for transaction reversals (rare on Stacks)

### 6. Time Synchronization

**Threat:** Client/server clock skew causes false expiry.

**Mitigation:**

- Use blockchain timestamp as source of truth
- Set generous expiry windows (300s = 5 minutes)
- Log timestamp mismatches for debugging

---

## Edge Cases

### Case 1: Transaction Pending (Not Yet Confirmed)

**Scenario:** Agent broadcasts payment but retries before confirmation.

**Response:**

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
Retry-After: 10

{
  "status": "pending",
  "message": "Payment transaction is pending confirmation",
  "tx_id": "0xABC123...",
  "estimated_wait": 10
}
```

**Client Behavior:** Retry after `Retry-After` seconds.

---

### Case 2: Overpayment

**Scenario:** Agent sends more STX than required.

**Behavior:** Accept the transaction (do not reject). The excess is considered a tip.

**Response:**

```http
HTTP/1.1 200 OK
X-WARP-Paid: 2000000
X-WARP-Overpayment: 1000000

{
  "data": { ... },
  "payment": {
    "status": "confirmed",
    "amount_paid": 2000000,
    "amount_required": 1000000,
    "overpayment": 1000000
  }
}
```

---

### Case 3: Price Changed During Payment

**Scenario:** Server raises price while agent is broadcasting transaction.

**Behavior:** Accept the transaction if it meets the *original* nonce's price.

**Implementation:**

- Store nonce → price mapping
- Verify against nonce-specific price, not current price

---

### Case 4: Network Switch (Testnet → Mainnet)

**Scenario:** Agent sends testnet transaction to mainnet endpoint.

**Response:**

```http
HTTP/1.1 400 Bad Request

{
  "error": "network_mismatch",
  "message": "Transaction is on testnet, but endpoint requires mainnet",
  "expected_network": "mainnet",
  "received_network": "testnet"
}
```

---

## Future Extensions

### 1. sBTC Support (Phase 3)

Replace `X-WARP-Currency: STX` with `X-WARP-Currency: sBTC`.

### 2. Subscriptions

Allow agents to pre-pay for N requests:

```http
X-WARP-Subscription: true
X-WARP-Subscription-Count: 100
X-WARP-Subscription-Price: 50000000
```

### 3. WebSocket Streaming

Extend protocol to ws:// connections for pay-per-token LLM streaming:

```
ws://api.example.com/llm?warp_payment=0xABC123...
```

### 4. Multi-Currency

Support multiple payment currencies:

```http
X-WARP-Accepted-Currencies: STX,sBTC,USDA
X-WARP-Price-STX: 1000000
X-WARP-Price-sBTC: 2500
X-WARP-Price-USDA: 1500000
```

---

## Compliance & Standards

### HTTP/1.1 RFC 7231

W.A.R.P. complies with [RFC 7231 Section 6.5.2](https://tools.ietf.org/html/rfc7231#section-6.5.2):

> "The 402 (Payment Required) status code is reserved for future use."

W.A.R.P. is a proposed standardization of this "future use."

### ISO 20022

W.A.R.P. transaction memos follow ISO 20022 messaging standards for payment identifiers.

---

## Reference Implementations

- **Middleware (Node.js):** `/packages/middleware`
- **Client SDK (TypeScript):** `/packages/client`
- **Examples:** `/examples`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-11 | Initial specification |

---

**End of Protocol Specification**

For integration guide, see [INTEGRATION.md](./INTEGRATION.md).
