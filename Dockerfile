# Use Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy files
COPY . /app

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]
