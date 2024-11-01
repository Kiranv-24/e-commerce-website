import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css-files/ForgetPassword.css";
import { postData } from "../../api";
import toast from "react-hot-toast";

const ForgetPassword = ({setUsername}) => {
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    username: "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected typo here
    setLoading(true);
    setError("");

    try {
      if (!formFields.username) {
        throw new Error("Please fill in all fields.");
      }

   
      const response = await postData("/api/user/sendOtp", { email: formFields.username });
   

      if (response?.success) {
        toast.success("OTP sent successfully!");
        setSuccess(true); 
      } else {
        throw new Error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault(); 
    if (!formFields.otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await postData("/api/user/verifyOtp", {
        email: formFields.username, 
        otp: formFields.otp,
      });

      if (response?.success) {
        toast.success("OTP verified successfully!");
        localStorage.setItem("username", formFields.username);
        setTimeout(() => {
           window.location.replace("/ChangePassword");
        }, 2000);

        setFormFields({ username: "", otp: "" });
        setSuccess(false); 
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ForgotPassword-container">
      <div className="Heading-Password">
        <h2>Please Enter the Username or Email Used During Signup</h2>
      </div>
      <div className="ForgotPassword">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={formFields.username}
          name="username"
          onChange={onChangeInput}
          style={{ marginBottom: "20px" }}
        />
        {success && (
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={formFields.otp}
            name="otp"
            onChange={onChangeInput}
            style={{ marginBottom: "20px" }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={success ? onVerifyOtp : handleSubmit}
          // disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </div>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        message={error}
      />
   
      <Snackbar
        open={success}
        autoHideDuration={6000}
      
        message="OTP sent successfully!"
      />
    </div>
  );
};

export default ForgetPassword;
