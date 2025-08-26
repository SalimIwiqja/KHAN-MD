const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");

// Log startup
console.log("🚀 Bot starting...");

// Setup WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(), // stores session automatically
  puppeteer: {
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
});

client.on("ready", () => {
  console.log("✅ WhatsApp bot is ready!");
});

// Example: reply to messages
client.on("message", (msg) => {
  if (msg.body.toLowerCase() === "ping") {
    msg.reply("pong 🏓");
  }
});

client.initialize();

// Express server (to keep Railway alive)
const app = express();
app.get("/", (req, res) => res.send("WhatsApp bot is running!"));
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Server started on port " + (process.env.PORT || 3000));
});
