const { Category } = require("../models/Category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});


router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();
    res.send(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "The product with the given ID was not found." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

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


router.post("/create", async (req, res) => {
  const limit = pLimit(2);


  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      try {
        const result = await cloudinary.uploader.upload(image);
        return result;
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw new Error("Image upload failed"); 
      }
    });
  });

  try {
    const uploadStatus = await Promise.all(imagesToUpload);
    const imgurl = uploadStatus.map((item) => item.secure_url);
    

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      countofstocks: req.body.countofstocks,
      rating: req.body.rating,
      images: imgurl,
      specifications:req.body.specifications
    });


    product = await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: error.message || "An error occurred while creating the product.",
      success: false,
    });
  }
});


module.exports = router;
