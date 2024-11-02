const { Category } = require("../models/Category");
const express = require("express");
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
});


router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'The category with the given ID was not found.' });
        }
        return res.status(200).json(category); 
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found!', success: false });
        }
        return res.status(200).json({ success: true, message: "Category Deleted" });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/create', async (req, res) => {
    const limit = pLimit(2);
    
    if (!req.body.images || !Array.isArray(req.body.images)) {
        return res.status(400).json({ error: "No images provided." });
    }

    try {
        const imagesToUpload = req.body.images.map((image) => {
            return limit(async () => {
                const result = await cloudinary.uploader.upload(image);
                return result;
            });
        });

        const uploadStatus = await Promise.all(imagesToUpload);
        const imgurl = uploadStatus.map((item) => item.secure_url);

        const category = new Category({
            name: req.body.name,
            images: imgurl
        });

        const savedCategory = await category.save();
        return res.status(201).json(savedCategory); 
    } catch (err) {
        return res.status(500).json({
            error: err.message || "An error occurred while creating the category.",
            success: false
        });
    }
});

module.exports = router;
