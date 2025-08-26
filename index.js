const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const express = require("express");

console.log("🚀 Bot starting...");

// Use a single file for storing WhatsApp session
const { state, saveState } = useSingleFileAuthState("session.json");

// Create the WhatsApp client
const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
});

// Listen for connection updates
sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === "close") {
        console.log("❌ Disconnected");
    } else if(connection === "open") {
        console.log("✅ Bot ready!");
    }
});

// Listen for incoming messages
sock.ev.on("messages.upsert", async (m) => {
    console.log("📩 New message:", m);
    // Example auto-reply
    if(m.messages && m.messages[0].message) {
        const message = m.messages[0];
        const sender = message.key.remoteJid;
        if(message.message.conversation === "ping") {
            await sock.sendMessage(sender, { text: "pong 🏓" });
        }
    }
});

// Express server so Railway keeps the container alive
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT || 3000, () => console.log("🌐 Server started"));
