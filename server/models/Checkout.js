const mongoose = require("mongoose");

const CheckoutSchema = mongoose.Schema(
  {
    username: { type: String, required: true }, 
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
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price:{type:Number, required:true},
        images: [{ type: String }],
        subtotal: { type: Number, required: true },
        shipping: { type: Number, required: true, default: 10 }, 
        total: { type: Number, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);


exports.Checkout = mongoose.model("Checkout", CheckoutSchema);
