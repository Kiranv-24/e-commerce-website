const { Checkout } = require("../models/Checkout"); // Import your order summary model
const express = require("express");
const router = express.Router();

// Create an order summary
router.post("/create", async (req, res) => {
  const { username, orderDetails, shippingDetails } = req.body;

  // Validate required fields
  if (
    !shippingDetails ||
    !Array.isArray(shippingDetails) ||
    shippingDetails.length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Shipping details are required." });
  }

  try {
    // Check if an order with the specified username already exists
    const existingOrder = await Checkout.findOne({ username });
    if (existingOrder) {
      //   const updatedOrder = await Checkout.findOneAndUpdate(
      //     { username }, // Filter by username
      //     {
      //       orderDetails,
      //       shippingDetails: shippingDetails.map((item) => ({
      //         id: item.id,
      //         images: item.images,
      //         subtotal: item.subtotal,
      //         shipping: item.shipping || 10,
      //         total: item.total,
      //         name: item.name,
      //         quantity: item.quantity,
      //       })),
      //     },
      //     { new: true, runValidators: true } // Return the updated document and run validators
      //   );
      //   if (!updatedOrder) {
      //     return res
      //       .status(404)
      //       .json({ success: false, message: "Order not found." });

      res.status(200).json({ success: true });
      // Send success response without creating a new order
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

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});
// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Checkout.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Get a specific order by username
router.get("/:username", async (req, res) => {
  try {
    const order = await Checkout.findOne({ username: req.params.username }); // Fetch order by username
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    // console.log(order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order by username:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Update an order by ID
router.put("/:username", async (req, res) => {
  const { orderDetails, shippingDetails } = req.body;
  const { username } = req.params; // Get username from URL params
  // console.log(orderDetails);
  // Validate required fields
  if (
    !orderDetails ||
    !Array.isArray(shippingDetails) ||
    shippingDetails.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Order details and shipping details are required.",
    });
  }

  try {
    // Find and update the order by username
    const updatedOrder = await Checkout.findOneAndUpdate(
      { username }, // Filter by username
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
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
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
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
