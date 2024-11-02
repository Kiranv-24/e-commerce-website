const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countofstocks: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    specifications: { 
        type: Object,
        required: true,
    },
});


exports.Product = mongoose.model("Product", productSchema);
