import { TextField, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { editData } from "../../api";
// const username =req.params.username;
 const username = localStorage.getItem("username");
const ChangePassword = () => {
      // const { username } = useParams(); 
   
  const [formFields, setFormFields] = useState({
    password: "",
    confirmPassword: "",
  });
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
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formFields.password || !formFields.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formFields.password !== formFields.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    try {
      const response = await editData(`/api/user/${username}`, {
        password: formFields.password,
      });
    
      localStorage.removeItem("username");
      // setUsername("");
      setSuccess(true);
      setFormFields({ password: "", confirmPassword: "" });
       setTimeout(() => {
           window.location.replace("/Login");
        }, 2000);
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="container ChangePassword-container">
      <div className="ChangePassword">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formFields.password}
            onChange={onChangeInput}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            name="confirmPassword"
            value={formFields.confirmPassword}
            onChange={onChangeInput}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Change Password
          </Button>
        </form>
      </div>

      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={() => setError("")}
        message={error}
      />

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        message="Password changed successfully!"
      />
    </div>
  );
};

export default ChangePassword;
