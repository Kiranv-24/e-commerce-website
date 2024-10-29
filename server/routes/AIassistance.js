const express = require("express");
const axios = require("axios");

const router = express.Router(); // Define the router here

// Define your route
router.post("/chat", async (req, res) => {
  // Create the data object to send in the request
  let data = JSON.stringify({
    model: "gpt-4", // Update to the desired model
    messages: [
      {
        role: "user",
        content: req.body.message, // Use the message from the request body
      },
    ],
    max_tokens: 2048,
    temperature: 0.7,
  });

  // Directly insert your API key here
  const apiKey = process.env.YOUR_OPENAI_API_KEY;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Properly format the Authorization header
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while sending the message." });
  }
});

module.exports = router; // Ensure the router is exported
