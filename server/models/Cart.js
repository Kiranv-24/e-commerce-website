const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
   username: { type: String, required: true },
   cartitems: [
      {
         name: { type: String, required: true },
         quantity: { type: Number, required: true, default: 1 },
         price: { type: Number, required: true },
         images: [{ type: String, required: true }],
         id:{type:String}
      },
   ],
});

CartSchema.index({ username: 1 }, { unique: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
module.exports = { Cart };
