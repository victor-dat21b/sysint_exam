import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 3000;

const server = createServer(app);
const wss = new WebSocketServer({ server });

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
app.get('/trigger', (req, res) => {
    clients.forEach(client => client.send('Event triggered'));
    res.send('Event triggered and message sent to all clients');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
