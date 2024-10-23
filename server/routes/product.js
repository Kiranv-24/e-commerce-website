const { Category } = require("../models/Category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();
    res.send(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET category by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "The product with the given ID was not found." });
    }
    return res.status(200).json(product); // Use status(200) with json
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// DELETE category by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Category not found!", success: false });
    }
    return res.status(200).json({ success: true, message: "Category product" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// POST to create a new product
router.post("/create", async (req, res) => {
  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);
  const imgurl = uploadStatus.map((item) => item.secure_url);
  if (!uploadStatus) {
    return res.status(500).json({
      error: "images cannot upload!",
      status: false,
    });
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    price: req.body.price,
    countofstocks: req.body.countofstocks,
    rating: req.body.rating,
    images: imgurl,
  });

  // Save the product in the database
  product = await product.save();
  if (!product) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  res.status(201).json(product);
});

module.exports = router;
