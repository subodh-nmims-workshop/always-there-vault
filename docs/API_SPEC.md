# Last Wish Protocol API Specification (v1.0)

This document provides a summary of the core API endpoints for the Last Wish Protocol Backend.

## Authentication
### POST `/api/auth/wallet/challenge`
- **Goal**: Get a nonce for wallet signature verification.
- **Payload**: `{ "walletAddress": "string" }`
- **Response**: `{ "nonce": "string" }`

### POST `/api/auth/wallet/verify`
- **Goal**: Verify signature and get JWT.
- **Payload**: `{ "walletAddress": "string", "signature": "string" }`
- **Response**: `{ "accessToken": "JWT_TOKEN", "user": { "id": "...", "walletAddress": "..." } }`

## Asset management
### POST `/api/assets/upload` (Multipart)
- **Goal**: Upload an encrypted file to IPFS.
- **Parameters**: `file` (binary), `walletAddress` (query string).
- **Security**: Rate limited, max 50MB.

### GET `/api/assets`
- **Goal**: List all asset metadata for the user.
- **Query**: `walletAddress`

## Heartbeat System
### POST `/api/heartbeat/ping`
- **Goal**: Submit a proof-of-life on-chain and in-DB.
- **Head**: `Authorization: Bearer <token>`
- **Response**: `{ "success": true, "timestamp": "..." }`

## Payments & Subscriptions
### POST `/api/stripe/create-checkout`
- **Goal**: Create Stripe checkout session for plan upgrade.
- **Payload**: `{ "planType": "professional|enterprise", "mode": "centralized|decentralized" }`
- **Response**: `{ "sessionId": "string", "url": "STRIPE_URL" }`

### POST `/api/stripe/webhook`
- **Goal**: Handle Stripe payment completion and subscription updates.
- **Authentication**: Requires `Stripe-Signature` verification.

## Port and Documentation
- **API Documentation**: `http://localhost:7001/api/docs` (Swagger UI)
- **Base URL**: `http://localhost:7001`
