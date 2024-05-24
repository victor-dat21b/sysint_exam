import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to read the .env file
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8').split('\n');
  envConfig.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

// Initialize the Stripe object with your secret key from the .env file
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests and puts the parsed data in req.body

// Manually set CORS headers instead of using a package
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow specific methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  next();
});

// Route to handle payment
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.html'));
});

// Endpoint to send the publishable key to the frontend
app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
