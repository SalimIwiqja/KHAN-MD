FROM node:lts-buster

# Set working directory
WORKDIR /app

# Copy all files into container
COPY . .

# Install dependencies
RUN npm install

# Expose port if needed (optional)
EXPOSE 9090

# Start the bot
CMD ["node", "start"]
