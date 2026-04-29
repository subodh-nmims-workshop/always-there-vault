# ─── STAGE 1: Builder ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Compile contracts
RUN npx hardhat compile

# ─── STAGE 2: Runner ──────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user (Security Best Practice)
RUN addgroup --system --gid 1001 hardhatgroup && \
    adduser --system --uid 1001 hardhat_user

# Copy built files and dependencies from builder
COPY --from=builder --chown=hardhat_user:hardhatgroup /app /app

# Set correct permissions
USER hardhat_user

# Expose Hardhat node port
EXPOSE 8545

# Start Hardhat node
CMD ["npx", "hardhat", "node", "--hostname", "0.0.0.0"]
