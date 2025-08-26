FROM node:lts-buster

# Set working directory
WORKDIR /app

# Install Chromium for whatsapp-web.js
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy all files into container
COPY . .

# Install dependencies
RUN npm install

# Expose port (Railway will assign its own, but expose for clarity)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
