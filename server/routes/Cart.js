const { Cart } = require("../models/Cart");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();


router.post("/add", async (req, res) => {
  const { username, productId, quantity } = req.body; 
  try {
    if (!username)
      return res.status(401).json({ message: "Login to your account" });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    const existingCart = await Cart.findOne({ username });
    const itemIndex = existingCart?.cartitems.findIndex(
      (item) => item.name === product.name
    );

    if (existingCart && itemIndex >= 0) {
     
      existingCart.cartitems[itemIndex].quantity += quantity || 1;
      await existingCart.save();
      res.status(200).json({
        message: "Product quantity updated in cart",
        cart: existingCart,
      });
    } else {
      
      const cart = existingCart || new Cart({ username, cartitems: [] });
      cart.cartitems.push({
        name: product.name,
        quantity: quantity || 1,
        price: product.price,
        images: product.images,
        id:productId
      });
      await cart.save();
      res
        .status(201)
        .json({ message: "Product added to cart successfully", cart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const userCart = await Cart.findOne({ username });
    res.status(200).json(userCart.cartitems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get("/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const userCart = await Cart.findOne({ username });

    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/updateQuantity", async (req, res) => {
  const { username, productName, quantity } = req.body;

  if (!username) {
    return res.status(401).json({ message: "Login to your account" });
  }

  try {
    const userCart = await Cart.findOne({ username });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = userCart.cartitems.find((item) => item.name === productName);
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    item.quantity = quantity;
    await userCart.save();

    res.status(200).json({
      message: "Cart item quantity updated successfully",
      cart: userCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.delete("/:username/:productId", async (req, res) => {
  const { username, productId } = req.params;

  try {

    const userCart = await Cart.findOne({ username });

    if (!userCart) {
      // console.log("No cart found for this user.");
      return res.status(404).send("Cart not found");
    }


    const updatedCart = await Cart.findOneAndUpdate(
      { username: username },
      { $pull: { cartitems: { _id: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).send("Product not found in cart");
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
