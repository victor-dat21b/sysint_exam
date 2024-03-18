// Client.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/new_payment', (req, res) => {
    console.log('Received new payment info', req.body);
    res.status(200).send({ message: 'New payment info received' });
});

app.post('/payment_updated', (req, res) => {
    console.log('Received payment update info', req.body);
    res.status(200).send({ message: 'Payment update info received' });
});

app.post('/payment_deleted', (req, res) => {
    console.log('Received payment deletion info', req.body);
    res.status(200).send({ message: 'Payment deletion info received' });
});

app.post('/subscribe', async (req, res) => {
    const { serverUrl, endpoint } = req.body;
    await axios.post(`${serverUrl}/subscribe/${endpoint}`, { url: 'http://localhost:4000/' + endpoint });
    console.log(`Subscribed to ${serverUrl}/${endpoint}`);
    res.status(200).send({ message: 'Subscribed to server endpoint' });
});

app.post('/unsubscribe', async (req, res) => {
    const { serverUrl, endpoint } = req.body;
    await axios.post(`${serverUrl}/unsubscribe/${endpoint}`, { url: 'http://localhost:4000/' + endpoint });
    console.log(`Unsubscribed from ${serverUrl}/${endpoint}`);
    res.status(200).send({ message: 'Unsubscribed from server endpoint' });
});

app.get('/ping/:clientUrl', (req, res) => {
    const clientUrl = 'http://' + req.params.clientUrl;
    const subscriptions = {};

    for (let endpoint in subscribers) {
        subscriptions[endpoint] = subscribers[endpoint].includes(clientUrl);
    }

    res.status(200).send(subscriptions);
});

app.listen(4000, () => console.log('Client started on port 4000'));