const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDetails: {
    fullname: String,
    lastname: String,
    phone: String,
    address: String,
    email: String,
  },
  shippingDetails: [
    {
      name: String,
      quantity: Number,
      subtotal: Number,
      shipping: Number,
      total: Number,
    },
  ],
  paymentStatus: { type: String, default: "pending" },
  stripeSessionId: String,
});

module.exports = mongoose.model("Order", orderSchema);
