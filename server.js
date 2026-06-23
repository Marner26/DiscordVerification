const express = require('express');
const axios = require('axios');
const app = express();

// Handle the OAuth2 callback
app.get('/auth/callback', async (req, res) => {
  // Extract the authorization code from the query parameters
  const code = req.query.code;

  if (code) {
    try {
      // Exchange the code for an access token
      const response = await axios.post('https://discord.com/api/oauth2/token', null, {
        params: {
          client_id: '1518673928795721828',
          client_secret: '0SAhpBWRlBP_lOK5wLVulwjmbQz6jl3v',
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'https://reflector-evaporate-stem.ngrok-free.dev/auth/callback',
          scope: 'bot',
        },
      });
      
      // Extract the access token from the response
      const accessToken = response.data.access_token;

      // Send a success message with the access token
      res.send('OAuth2 callback received and access token obtained successfully!');
    } catch (error) {
      // Handle any errors that occur during the token exchange
      console.error('Error exchanging code for access token:', error);
      res.status(500).send('An error occurred while exchanging the code for an access token.');
    }
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
