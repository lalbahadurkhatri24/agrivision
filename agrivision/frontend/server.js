const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Replace with your actual webhook URL
const WEBHOOK_URL = "https://viraj0707.app.n8n.cloud/webhook-test/04a061be-4c3d-4988-823b-84d9a4f25041";

app.use(cors());
app.use(bodyParser.json());

app.post('/search', async (req, res) => {
  const { message } = req.body;
  try {
    // Send the query to the webhook
    const webhookRes = await axios.post(WEBHOOK_URL, { message });
    // Return the webhook's response to the frontend
    res.json({ result: webhookRes.data });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ error: "Failed to connect to webhook." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


// Client-side code (to be run in the browser)
const query = "Your search query here"; // Replace with the actual query
const res = await fetch('http://localhost:5000/search', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: query })
});
const data = await res.json();
document.getElementById("response").innerText = data.result;
