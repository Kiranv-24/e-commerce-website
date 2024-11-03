const { Checkout } = require("../models/Checkout");
const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { username, orderDetails, shippingDetails } = req.body;

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
    const existingOrder = await Checkout.findOne({ username });

    if (existingOrder) {
      for (const newItem of shippingDetails) {
        const existingItem = existingOrder.shippingDetails.find(
          (item) => item.name === newItem.name
        );

        if (existingItem) {
          if (existingItem.quantity != newItem.quantity) {
            existingItem.quantity = newItem.quantity;
            existingItem.subtotal = newItem.subtotal;
            existingItem.total = newItem.total;
          }
        } else {
          existingOrder.shippingDetails.push({
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            subtotal: newItem.subtotal,
            shipping: newItem.shipping || 10,
            total: newItem.total,
            quantity: newItem.quantity,
          });
        }
      }

      await existingOrder.save();
      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: existingOrder,
      });
    }

    const newOrder = await Checkout.create({
      username,
      orderDetails,
      shippingDetails: shippingDetails.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
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
    // console.log(shippingDetails);
    const updatedOrder = await Checkout.findOneAndUpdate(
      { username },
      {
        orderDetails,
        shippingDetails: shippingDetails.map((item) => ({
          id: item.id,
          images: item.images,
          price: item.price,
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
router.delete("/delete/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Checkout.deleteMany({ username: username });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user." });
    }

    res
      .status(200)
      .json({ success: true, message: "Orders deleted successfully." });
  } catch (error) {
    console.error("Error deleting orders:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the orders.",
    });
  }
});
router.delete("/clear-shipping/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const updatedUser = await Checkout.findOneAndUpdate(
      { username },
      { $set: { shippingDetails: [] } },
      { new: true }
    );

    // if (!updatedUser) {
    //  res.status(200).json({ message: "Shipping details cleared successfully" });
    // }

    res.status(200).json({ message: "Shipping details cleared successfully" });
  } catch (error) {
    console.error("Error clearing shipping details:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
