const { Checkout } = require("../models/Checkout");
const express = require("express");
const router = express.Router();

// Create an order summary
router.post("/create", async (req, res) => {
  const { username, orderDetails, shippingDetails } = req.body;

  // Validate required fields
  if (
    !username ||
    !orderDetails ||
    !shippingDetails ||
    !Array.isArray(shippingDetails) ||
    shippingDetails.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: username, order details, and shipping details.",
    });
  }

  try {
    // Check if an order with the specified username already exists
    const existingOrder = await Checkout.findOne({ username });
    if (existingOrder) {
      return res
        .status(200)
        .json({ success: true, message: "Order already exists" });
    }

    // Create a new order summary if no existing order is found
    const newOrder = await Checkout.create({
      username,
      orderDetails,
      shippingDetails: shippingDetails.map((item) => ({
        id: item.id,
        name: item.name,
        subtotal: item.subtotal,
        shipping: item.shipping || 10,
        total: item.total,
        quantity: item.quantity,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Checkout.find();
    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found. Please add at least one item to proceed.",
      });
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
    });
  }
});

// Get a specific order by username
router.get("/:username", async (req, res) => {
  try {
    const order = await Checkout.findOne({ username: req.params.username });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order by username:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Update an order by username
router.put("/:username", async (req, res) => {
  const { orderDetails, shippingDetails } = req.body;
  const { username } = req.params;

  if (
    !orderDetails ||
    !shippingDetails ||
    !Array.isArray(shippingDetails) ||
    shippingDetails.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide both order details and shipping details to update.",
    });
  }

  try {
    const updatedOrder = await Checkout.findOneAndUpdate(
      { username },
      {
        orderDetails,
        shippingDetails: shippingDetails.map((item) => ({
          id: item.id,
          images: item.images,
          subtotal: item.subtotal,
          shipping: item.shipping || 10,
          total: item.total,
          name: item.name,
          quantity: item.quantity,
        })),
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the order.",
    });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await Checkout.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the order.",
    });
  }
});

module.exports = router;
