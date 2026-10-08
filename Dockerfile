# Multi-stage Dockerfile for VOGUE – SOA Fashion Club
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm --prefix server install
RUN npm --prefix client install

# Copy source trees
COPY server/ ./server/
COPY client/ ./client/

# Build client and server
RUN npm --prefix client run build
RUN npm --prefix server run prisma:generate
RUN npm --prefix server run build

# Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Copy built artifacts
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/client/dist ./client/dist

# Create uploads and sqlite directories
RUN mkdir -p /app/server/uploads /app/server/prisma

EXPOSE 5000

# Push schema, seed if empty, and start single-port server
CMD ["sh", "-c", "cd server && npx prisma db push && npx prisma db seed && node dist/index.js"]
