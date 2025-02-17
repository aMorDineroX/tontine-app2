# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build both frontend and backend
RUN npm run build
RUN cd server && npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production
RUN cd server && npm ci --only=production

# Expose port
EXPOSE 3003

# Start the application
CMD ["npm", "start"]


