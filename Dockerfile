# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.25-alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html/app

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]