const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = 3000;

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Track connected WebSocket clients
let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);
    ws.on('message', (message) => {
        console.log('Received: ' + message);
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

// HTTP endpoint to trigger an event
app.post('/trigger', (req, res) => {
    clients.forEach(client => client.send('Event triggered'));
    res.send('Event triggered and message sent to all clients');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
