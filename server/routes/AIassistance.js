const express = require("express");
const axios = require("axios");
require('dotenv').config();

const router = express.Router(); // Define the router here

// Define your route
router.post("/chat", async (req, res) => {
  let data = JSON.stringify({
    model: "gpt-3.5-turbo", // Updated model
    messages: [
      {
        role: "user",
        content: req.body.message,
      },
    ],
    max_tokens: 2048,
    temperature: 0.7,
  });

  const apiKey = process.env.YOUR_OPENAI_API_KEY;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "An error occurred while sending the message." });
  }
});

module.exports = router; // Ensure the router is exported
