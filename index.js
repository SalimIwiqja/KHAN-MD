const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const express = require("express");

console.log("🚀 Bot starting...");

// Setup session file
const { state, saveState } = useSingleFileAuthState("./session.json");

// Initialize WhatsApp client
const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
});

// Auto-save session on update
sock.ev.on("creds.update", saveState);

// Connection updates
sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if(connection === "close") {
        const reason = lastDisconnect.error?.output?.statusCode;
        console.log(`❌ Disconnected: ${reason}`);
        // Auto-reconnect logic can be added here if needed
    } else if(connection === "open") {
        console.log("✅ Bot ready!");
    }
});

// Listen for new messages
sock.ev.on("messages.upsert
