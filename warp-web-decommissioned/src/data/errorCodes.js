export const errorCodes = {
  '402': [
    {
      code: '402',
      message: 'Payment Required',
      description: 'Initial invoice response. Client must pay the specified amount to the specified address.',
    },
  ],
  '400': [
    {
      code: '400',
      message: 'Missing Authorization Header',
      description: 'The Authorization header is required for paid endpoints but was not provided.',
    },
    {
      code: '400',
      message: 'Invalid Transaction ID',
      description: 'The provided transaction ID format is invalid.',
    },
    {
      code: '400',
      message: 'Nonce Mismatch',
      description: 'The nonce in the Authorization header does not match the issued invoice.',
    },
  ],
  '403': [
    {
      code: '403',
      message: 'Payment Not Found',
      description: 'No transaction found on the blockchain with the provided ID.',
    },
    {
      code: '403',
      message: 'Insufficient Payment',
      description: 'The transaction amount is less than the required price.',
    },
    {
      code: '403',
      message: 'Wrong Recipient',
      description: 'The transaction was sent to a different address than specified.',
    },
    {
      code: '403',
      message: 'Expired Invoice',
      description: 'The invoice has expired. Request a new invoice.',
    },
    {
      code: '403',
      message: 'Transaction Already Used',
      description: 'This transaction ID has already been used for a previous request (replay attack prevention).',
    },
  ],
  '503': [
    {
      code: '503',
      message: 'Blockchain Connection Error',
      description: 'Unable to connect to the Stacks blockchain to verify the transaction.',
    },
  ],
};

export const requestHeaders = [
  {
    header: 'Authorization',
    format: 'WARP <txId>:<nonce>',
    required: 'After payment',
    description: 'Contains the blockchain transaction ID and the invoice nonce.',
  },
  {
    header: 'X-WARP-Max-Price',
    format: 'Integer (micro-STX)',
    required: 'No',
    description: 'Maximum price the agent is willing to pay. If server demands more, agent rejects.',
  },
];

export const responseHeaders402 = [
  {
    header: 'X-WARP-Version',
    format: 'String',
    example: '1.0.0',
    description: 'Protocol version. Clients should verify compatibility.',
  },
  {
    header: 'X-WARP-Price',
    format: 'Integer (micro-STX)',
    example: '1000000',
    description: 'Required payment amount in micro-STX (1 STX = 1,000,000 micro-STX).',
  },
  {
    header: 'X-WARP-Currency',
    format: 'String',
    example: 'STX',
    description: 'Currency type. Currently only STX is supported.',
  },
  {
    header: 'X-WARP-Address',
    format: 'Stacks Address',
    example: 'SP2J6ZY...',
    description: 'The Stacks address where payment must be sent.',
  },
  {
    header: 'X-WARP-Network',
    format: 'String',
    example: 'testnet',
    description: 'Blockchain network (testnet or mainnet).',
  },
  {
    header: 'X-WARP-Nonce',
    format: 'UUID',
    example: '550e8400-e29b...',
    description: 'Unique invoice identifier to prevent replay attacks.',
  },
  {
    header: 'X-WARP-Expires',
    format: 'ISO 8601 Timestamp',
    example: '2026-02-11T12:00:00Z',
    description: 'Invoice expiration time. Typically 5-10 minutes.',
  },
  {
    header: 'X-WARP-Min-Confirmations',
    format: 'Integer',
    example: '1',
    description: 'Minimum blockchain confirmations required before accepting payment.',
  },
];

export const responseHeaders200 = [
  {
    header: 'X-WARP-TxID',
    format: 'Transaction Hash',
    example: '0xABC123...',
    description: 'The blockchain transaction ID that was used to pay for this request.',
  },
  {
    header: 'X-WARP-Paid',
    format: 'Integer (micro-STX)',
    example: '1000000',
    description: 'The actual amount paid (may be more than required if overpaid).',
  },
  {
    header: 'X-WARP-Timestamp',
    format: 'ISO 8601 Timestamp',
    example: '2026-02-11T12:00:00Z',
    description: 'Timestamp when payment was verified.',
  },
];
