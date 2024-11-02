const express = require("express");
const Order = require("../models/Orderpayment");
const router = express.Router();


router.get("/orders/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userOrder = await Order.findOne({ username });

    if (!userOrder) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.json(userOrder.orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

module.exports = router;
