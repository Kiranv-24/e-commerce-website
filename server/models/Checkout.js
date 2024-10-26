const mongoose = require("mongoose");

const CheckoutSchema = mongoose.Schema({
  orderDetails: {
    fullname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
  },
  shippingDetails: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Assuming you have a Product model
      images: [{ type: String }], // Array of image URLs
      subtotal: { type: Number, required: true },
      shipping: { type: Number, required: true, default: 10 }, // Default shipping fee
      total: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true }, // To capture the quantity
    },
  ],
}, { timestamps: true }); // Optionally, you can add timestamps for createdAt and updatedAt

// Export the model

exports.Checkout = mongoose.model("Checkout", CheckoutSchema);
exports.CheckoutSchema = CheckoutSchema;;
