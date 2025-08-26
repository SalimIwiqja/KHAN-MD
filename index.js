const { default: makeWASocket } = require("@whiskeysockets/baileys");
const express = require("express");

// Load session from Railway environment variable
let authState;
if(process.env.SESSION_JSON) {
    try {
        authState = JSON.parse(process.env.SESSION_JSON);
        console.log("✅ Session loaded from environment variable");
    } catch (err) {
        console.error("❌ Failed to parse SESSION_JSON:", err);
        process.exit(1);
    }
} else {
    console.error("❌ SESSION_JSON is not set. Bot cannot login.");
    process.exit(1);
}

// Initialize WhatsApp client
const sock = makeWASocket({
    auth: authState
});

// Optional: auto-save updated credentials (just logs them)
sock.ev.on("creds.update", (creds) => {
    console.log("🔄 Credentials updated. You can update your SESSION_JSON if needed.");
});

// Connection updates
sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === "close") {
        console.log("❌ Disconnected:", lastDisconnect?.error?.output?.statusCode);
    } else if(connection === "open") {
        console.log("✅ Bot ready!");
    }
});

// Listen for new messages
sock.ev.on("messages.upsert", async (m) => {
    if(m.messages && m.messages[0].message) {
        const message = m.messages[0];
        const sender = message.key.remoteJid;
        const text = message.message.conversation;

        console.log(`📩 Message from ${sender}: ${text}`);

        // Simple auto-reply
        if(text === "ping") {
            await sock.sendMessage(sender, { text: "pong 🏓
