const { Checkout } = require("../models/Checkout"); // Import your order summary model
const express = require("express");
const router = express.Router();

// Create an order summary
router.post("/create", async (req, res) => {
  const { orderDetails, shippingDetails } = req.body;

  try {
    // Create a new order summary
    const newOrder = await Checkout.create({
      orderDetails: {
        fullname: orderDetails.fullname,
        lastname: orderDetails.lastname,
        phone: orderDetails.phone,
        address: orderDetails.address,
        country: orderDetails.country,
        state: orderDetails.state,
        city: orderDetails.city,
        email: orderDetails.email,
      },
      shippingDetails: shippingDetails.map(item => ({
        id: item.id,
        images: item.images,
        subtotal: item.subtotal,
        shipping: item.shipping || 10, // Use the default if shipping is not provided
        total: item.total,
        name: item.name,
        quantity: item.quantity,
      })),
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Checkout.find(); // Fetch all orders
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Get a specific order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Checkout.findById(req.params.id); // Fetch order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("Error fetching order by ID:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  const { orderDetails, shippingDetails } = req.body;

  try {
    // Find and update the order
    const updatedOrder = await Checkout.findByIdAndUpdate(
      req.params.id,
      {
        orderDetails: {
          fullname: orderDetails.fullname,
          lastname: orderDetails.lastname,
          phone: orderDetails.phone,
          address: orderDetails.address,
          country: orderDetails.country,
          state: orderDetails.state,
          city: orderDetails.city,
          email: orderDetails.email,
        },
        shippingDetails: shippingDetails.map(item => ({
          id: item.id,
          images: item.images,
          subtotal: item.subtotal,
          shipping: item.shipping || 10, // Use the default if shipping is not provided
          total: item.total,
          name: item.name,
          quantity: item.quantity,
        })),
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log("Error updating order:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await Checkout.findByIdAndDelete(req.params.id); // Delete order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.log("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
