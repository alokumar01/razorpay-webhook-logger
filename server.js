const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxmxQbJBRlQzJH0l6avWdRQ99XwSRnwmhfOPpvBz9n3MLqDoLob9GakTRTd975h9bV6/exec';

// Root route for health check and info
app.get('/', (req, res) => {
  res.send(`
    <h2>Razorpay Webhook Logger Server</h2>
    <p>✅ Server is running.</p>
    <p>POST Razorpay webhooks to <code>/payment/webhook/razorpay</code></p>
  `);
});

// Razorpay webhook endpoint
app.post('/payment/webhook/razorpay', async (req, res) => {
  console.log('Received Razorpay webhook:', req.body);

  try {
    // Forward webhook payload to Google Apps Script
    const response = await axios.post(GOOGLE_SCRIPT_WEBHOOK_URL, req.body);

    console.log('Successfully forwarded webhook data to Google Sheets:', response.data);

    res.status(200).json({ message: 'Webhook received and logged successfully' });
  } catch (error) {
    console.error('Error forwarding webhook to Google Sheets:', error.message);

    res.status(500).json({ error: 'Failed to log webhook data' });
  }
});

// Use Render's port or 5050 locally
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
