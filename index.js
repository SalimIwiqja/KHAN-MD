const { default: makeWASocket } = require("@whiskeysockets/baileys");
const express = require("express");

console.log("🚀 Bot starting...");

// Initialize WhatsApp client
const sock = makeWASocket({
    printQRInTerminal: true
});

sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === "close") {
        console.log("❌ Disconnected");
    } else if(connection === "open") {
        console.log("✅ Bot ready!");
    }
});

// Listen for messages
sock.ev.on("messages.upsert", async (m) => {
    if(m.messages && m.messages[0].message) {
        const message = m.messages[0];
        const sender = message.key.remoteJid;
        const text = message.message.conversation;

        console.log(`📩 Message from ${sender}: ${text}`);

        // Simple auto-reply
        if(text === "ping") {
            await sock.sendMessage(sender, { text: "pong 🏓" });
        }
    }
});

// Express server to keep Railway alive
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT || 3000, () => console.log("🌐 Server started"));
