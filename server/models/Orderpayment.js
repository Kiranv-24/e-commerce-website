const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  orders: [
    {
      orderId: String,
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
      date: { type: Date, default: Date.now }, // Automatically sets the date
      time: { type: String, default: () => new Date().toLocaleTimeString() } // Sets the current time
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
