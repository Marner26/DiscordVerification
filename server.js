const express = require('express');
const app = express();

// Handle the OAuth2 callback
app.get('/auth/callback', (req, res) => {
  // Extract the authorization code from the query parameters
  const code = req.query.code;

  if (code) {
    // Here you would typically exchange the code for an access token
    // For example, using a library like `axios` to make a POST request to Discord's token endpoint
    // Example:
    // const axios = require('axios');
    // const response = await axios.post('https://discord.com/api/oauth2/token', {
    //   client_id: 'YOUR_CLIENT_ID',
    //   client_secret: 'YOUR_CLIENT_SECRET',
    //   code: code,
    //   grant_type: 'authorization_code',
    //   redirect_uri: 'https://reflector-evaporate-stem.ngrok-free.dev/auth/callback',
    //   scope: 'bot',
    // });
    // const accessToken = response.data.access_token;

    // For now, we'll just send a success message
    res.send('OAuth2 callback received and code extracted successfully!');
  } else {
    res.status(400).send('Authorization code not found in the request.');
  }
});

// Handle the root path
app.get('/', (req, res) => {
  res.send('Server is running and ready to handle OAuth2 callbacks!');
});

// Handle other routes (optional, but good for debugging)
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
