const { Cart } = require("../models/Cart"); // Import the Cart model
const { Product } = require("../models/product"); // For fetching product details when adding to the cart
const express = require("express");
const router = express.Router();

// POST to add a product to the cart
router.post("/add", async (req, res) => {
  try {
    // Fetch product details based on the product ID
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Create a new cart item
    const cartItem = new Cart({
      name: product.name,
      quantity: req.body.quantity || 1, // Default to 1 if no quantity is provided
      price: product.price,
      images: product.images, // Save the product images to cart
    });

    // Save the cart item to the database
    await cartItem.save();

    res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET all items in the cart
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find(); // Fetch all items in the cart
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE an item from the cart by its ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found!" });
    }
    res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// UPDATE the quantity of an item in the cart
router.put("/:id", async (req, res) => {
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true } // Return the updated cart item
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      updatedCartItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
