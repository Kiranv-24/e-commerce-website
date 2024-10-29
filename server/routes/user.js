const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Otp} = require("../models/Otp");
const sendEmail = require("../Utils/sendEmail");
const crypto = require('crypto');
require("dotenv").config();
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // Save cookie for 7 days
  httpOnly: true,
};


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
  console.log("Password:", password);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }



    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY || "default_secret_key",
      { expiresIn: '1h' } // Optional: Set expiration time for the token
    );

    // Respond with user data and token
    res.status(201).json({
      success: true,
      user: result,
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, msg: "Something went wrong", error: error.message });
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
router.put("/:username", async (req, res) => {
  const {password} = req.body;
  const username=req.params.username;
  try {
    const userExist = await User.findOne({email:username});
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    let newPassword = userExist.password;
    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      userExist._id,
      {
       
        username,
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

router.post("/sendOtp", async (req, res) => {
  const { email } = req.body;

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // Generate a random 6-digit OTP and set expiry (e.g., 5 minutes from now)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    const newOtp = new Otp({
      email,
      otp,
      expiresAt,
    });
     const subject ="Verify your account "
     
     
      const message =`Your one time password for registering is  ${otp}`
     sendEmail(email,subject,message);
    await newOtp.save();
    res.status(201).json({ success: true, message: "OTP generated", otp });
  } catch (error) {
    console.error("Error generating OTP:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp } = req.body;

  // console.log("Email:", email);
  // console.log("OTP:", otp);

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const storedOtp = await Otp.findOne({ email, otp });
  // console.log(storedOtp);
    if (!storedOtp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
console.log(storedOtp);
    if (storedOtp.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    
    await Otp.deleteOne({ _id: storedOtp._id });

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to verify OTP', error: error.message });
  }
});










module.exports = router;