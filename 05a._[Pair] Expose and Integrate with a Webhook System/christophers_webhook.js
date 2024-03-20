const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;
const webhookUrl = 'https://webhook.site/38fc2464-dfd3-4058-9185-7adda5095896';

app.post('/register', async (req, res) => {
    const response = await axios.post(webhookUrl, {
        eventType: 'payment_received',
        url: webhookUrl
    });
    console.log(response.data);
    res.send(response.data);
});

app.post('/unregister', async (req, res) => {
    const response = await axios.post(webhookUrl, {
        eventType: 'payment_received',
        url: webhookUrl
    });
    console.log(response.data);
    res.send(response.data);
});

app.post('/payment', async (req, res) => {
    console.log('Received payment');
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});