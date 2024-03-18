// Server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let subscribers = {
    'new_payment': [],
    'payment_updated': [],
    'payment_deleted': []
};

app.post('/subscribe/:endpoint', (req, res) => {
    const { endpoint } = req.params;
    const { url } = req.body;

    if (!subscribers[endpoint]) {
        return res.status(404).send({ message: 'Endpoint not found' });
    }

    subscribers[endpoint].push(url);
    console.log(`Client ${url} subscribed to ${endpoint}`);
    res.status(200).send({ message: 'Subscribed successfully' });
});

app.post('/unsubscribe/:endpoint', (req, res) => {
    const { endpoint } = req.params;
    const { url } = req.body;

    if (!subscribers[endpoint]) {
        return res.status(404).send({ message: 'Endpoint not found' });
    }

    subscribers[endpoint] = subscribers[endpoint].filter(subscriber => subscriber !== url);
    console.log(`Client ${url} unsubscribed from ${endpoint}`);
    res.status(200).send({ message: 'Unsubscribed successfully' });
});

app.post('/new_payment', async (req, res) => {
    const paymentData = { message: 'A new payment has been made' };
    const paymentSubscribers = subscribers['new_payment'] || [];

    await Promise.all(paymentSubscribers.map(url => {
        return axios.post(url, paymentData);
    }));

    res.status(200).send({ message: 'New payment info sent to subscribers' });
});

app.post('/payment_updated', async (req, res) => {
    const paymentData = { message: 'A payment has been updated' };
    const paymentSubscribers = subscribers['payment_updated'] || [];

    await Promise.all(paymentSubscribers.map(url => {
        return axios.post(url, paymentData);
    }));

    res.status(200).send({ message: 'Payment update info sent to subscribers' });
});

app.post('/payment_deleted', async (req, res) => {
    const paymentData = { message: 'A payment has been deleted' };
    const paymentSubscribers = subscribers['payment_deleted'] || [];

    await Promise.all(paymentSubscribers.map(url => {
        return axios.post(url, paymentData);
    }));

    res.status(200).send({ message: 'Payment deletion info sent to subscribers' });
});

app.get('/ping/:clientUrl', (req, res) => {
    const { clientUrl } = req.params;
    const subscriptions = {};

    for (let endpoint in subscribers) {
        subscriptions[endpoint] = subscribers[endpoint].includes(clientUrl);
    }

    res.status(200).send(subscriptions);
});

app.listen(3000, () => console.log('Server started on port 3000'));