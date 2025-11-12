# Use Node.js 18 Alpine as the base image for a small footprint
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production
ENV PORT=5000

# Command to run the application
CMD ["node", "src/server.js"]
