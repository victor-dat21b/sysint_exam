const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = 3001; // Ensure this is different from the server's port

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('Connected to the WebSocket server');
});

ws.on('message', (data) => {
    console.log('Message from server:', data);
});

ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

// HTTP server to receive commands and send messages to WebSocket server
app.post('/send', express.text(), (req, res) => {
    const message = req.body || 'Hello from Client!';
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        res.send(`Message sent to WebSocket server: ${message}`);
    } else {
        res.status(500).send("WebSocket is not connected.");
    }
});

app.listen(PORT, () => {
    console.log(`Client HTTP server running on http://localhost:${PORT}`);
});
