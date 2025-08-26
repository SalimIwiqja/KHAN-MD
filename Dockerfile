FROM node:20-bullseye

WORKDIR /app

# Install Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
