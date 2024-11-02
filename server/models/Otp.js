const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});


otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });





exports.Otp = mongoose.model("Otp", otpSchema);