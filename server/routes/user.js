const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error fetching all users:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});


// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY || "default_secret_key"
    );

     res.status(200).json({
      user: result,
      token,
    });
  } catch (error) {
    console.log("Error during signup:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});


// Login route
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const matchedPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchedPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY || "default_secret_key"
    );
    res.status(200).json({
      user: existingUser,
      token,
      msg: "User authenticated",
    });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json({ success: true, message: "User is deleted" });
    }
    return res.status(404).json({ success: false, message: "User not found" });
  } catch (err) {
    console.log("Error deleting user:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

// Get user count
router.get("/get/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ userCount });
  } catch (error) {
    console.log("Error fetching user count:", error);
    res.status(500).json({ success: false });
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findById(req.params.id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    let newPassword = userExist.password;
    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: newPassword,
      },
      { new: true }
    );

    if (!user) {
      return res.status(500).json({ msg: "User cannot be updated" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
