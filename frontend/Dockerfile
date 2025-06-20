# ----------- Build Stage -----------
# Using official Node 22 Alpine image to keep the image small and clean
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (helps with Docker caching)
COPY package*.json ./

# Rollup bug workaround: install, wipe, and re-install clean
RUN npm install && \
    rm -rf node_modules package-lock.json && \
    npm install

# Copy the rest of the app source code
COPY . .

# Build the production-ready app
RUN npm run build

# ----------- Production Stage -----------
# Use NGINX to serve the built files
FROM nginx:alpine

# Replace default NGINX config to support React Router routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for NGINX)
EXPOSE 80

# Start NGINX when the container launches
CMD ["nginx", "-g", "daemon off;"]
