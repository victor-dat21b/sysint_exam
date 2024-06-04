//Efter Node.js version 18 behøver man ikke bruge dotenv package. Dette er nu en indbygget funktion i Node.js

import express from 'express';
import { Issuer } from 'openid-client'; //openid-client is a server side OpenID Relying Party (RP, Client) OpenID Connect/OAuth2.0 specifications are implemented by openid-client.

const app = express();

let client;

(async () => {
  const issuer = await Issuer.discover(`https://${process.env.AUTH0_DOMAIN}`);
  client = new issuer.Client({
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    redirect_uris: [process.env.AUTH0_CALLBACK_URL],
    response_types: ['code'],
  });
})();

app.get('/login', (req, res) => {
  const authUrl = client.authorizationUrl({ //client.authorizationUrl method generates an authorization URL based on the client configuration
    scope: 'openid profile email'
  });
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const params = client.callbackParams(req);
  try {
    const tokenSet = await client.callback(process.env.AUTH0_CALLBACK_URL, params);
    const userInfo = await client.userinfo(tokenSet.access_token);

    res.send(`User info: ${JSON.stringify(userInfo)}`);
  } catch (error) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
