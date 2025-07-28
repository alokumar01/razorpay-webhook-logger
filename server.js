const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GOOGLE_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzw9r8gtY8888yBE8x8bK6A8SGXokf8L6ceWh8NxhKbqZW0S6OdrgQyb9q3tESMhy_9/exec';

app.post('/payment/webhook/razorpay', async (req, res) => {
  try {
    // Forward webhook payload to Google Sheets via Apps Script
    await axios.post(GOOGLE_SCRIPT_WEBHOOK_URL, req.body);

    console.log('Webhook data forwarded to Google Sheets');
    res.status(200).send('Webhook received and logged');
  } catch (error) {
    console.error('Error forwarding to Google Sheets:', error.message);
    res.status(500).send('Logging failed');
  }
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
