# Payment Setup Guide: Receiving Funds in Your Account

This guide explains how to configure the Always There Protocol so that all subscription revenues (Fiat and Crypto) go directly to your personal or business accounts.

## 1. Fiat Payments (Stripe / Razorpay)

To receive money in your local bank account via Credit/Debit cards:

### A. Stripe Setup
1.  **Create Account**: Sign up at [stripe.com](https://dashboard.stripe.com/register).
2.  **Get API Keys**: 
    - Copy your `Secret Key` (sk_live_...) from the Developers > API Keys section.
    - Add it to your `backend/.env` as:
      ```env
      STRIPE_SECRET_KEY=sk_live_your_key_here
      ```
3.  **Configure Webhooks**:
    - Go to Developers > Webhooks.
    - Add an endpoint: `https://api.yourdomain.com/stripe/webhook` (use [Stripe CLI](https://stripe.com/docs/stripe-cli) for local testing).
    - Select events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_succeeded`.
    - Copy the `Webhook Signing Secret` (whsec_...) and add it to `.env`:
      ```env
      STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
      ```
4.  **Bank Payouts**: In your Stripe dashboard, link your Bank Account. Stripe will automatically deposit collected funds according to your payout schedule (usually 2-7 days).

### B. Razorpay Setup (Optional)
If you prefer Razorpay (common in India):
1.  Install `@razorpay/razorpay` in the backend.
2.  Add a `RazorpayService` similar to `StripeService`.
3.  Update the `StripeController` or create a `RazorpayController`.

---

## 2. Crypto Payments (Smart Contract)

To receive USDC/ETH in your digital wallet:

### A. Contract Ownership
The `SubscriptionManager.sol` contract is designed to split fees:
- **Immediate Share**: 50% of the subscription fee is sent *instantly* to the `owner()` address during the transaction.
- **Contract Share**: The other 50% stays in the contract and can be withdrawn later by the owner.

### B. How to change the receiving Wallet
1.  **Deployment**: When you deploy the contract from your wallet (e.g., MetaMask), *your* wallet address becomes the `owner` automatically.
2.  **Transferring Ownership**: If you want the money to go to a different wallet, call the `transferOwnership(newAccountAddress)` function on the deployed contract.
3.  **Withdrawing Funds**: 
    - Call the `withdraw(tokenAddress, amount)` function.
    - If `tokenAddress` is `0x00...0` (zero address), it withdraws Native ETH.
    - Otherwise, pass the USDC/USDT contract address to withdraw stablecoins.

### C. Update Supported Tokens
Ensure you call `addSupportedToken(tokenAddress)` for the tokens you want to accept (e.g., USDC address on your chosen network).

---

## 3. Deployment Checklist
- [ ] Backend is running with verified `.env` keys.
- [ ] Frontend `create-checkout-session` points to the correct backend URL.
- [ ] Smart contracts are deployed on a production-ready network (e.g., Polygon, Mainnet).
- [ ] You have verified access to the Stripe Dashboard and the Owner Wallet.
