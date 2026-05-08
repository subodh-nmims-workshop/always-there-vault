# ─── STAGE 1: Dependencies ────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Check if libc6-compat is needed for alpine
RUN apk add --no-cache libc6-compat

COPY package*.json ./
# Install ALL dependencies (including devDeps) so we can build
RUN npm install --legacy-peer-deps

# ─── STAGE 2: Builder ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the NestJS app
RUN npm run build

# Remove development dependencies to keep the image small
RUN npm prune --production

# ─── STAGE 3: Production Runner ──────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security (Best Practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy only what is needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set correct permissions
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 7001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/main.js"]
