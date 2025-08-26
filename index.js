const { default: makeWASocket } = require("@whiskeysockets/baileys");

// Load session from Railway environment variable
let authState;
try {
    authState = JSON.parse(process.env.SESSION_JSON);
    console.log("✅ Session loaded from environment variable");
} catch (err) {
    console.error("❌ Failed to parse SESSION_JSON:", err);
    process.exit(1);
}

// Initialize WhatsApp client
const sock = makeWASocket({ auth: authState });

// Optional: log when credentials update
sock.ev.on("creds.update", (creds) => {
    console.log("🔄 Credentials updated. Update SESSION_JSON if needed.");
});

// Keep the bot alive with Express (Railway needs this)
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT || 3000, () => console.log("🌐 Server started"));
