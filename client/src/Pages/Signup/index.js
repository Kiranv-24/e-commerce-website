import { useContext, useEffect, useState } from "react";
import Mycontext from "../../Mycontext";
import "../../Css-files/Login.css";
import { fetchDataFromApi, postData, sendOtp } from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress, Button, TextField } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import "../../Css-files/signup.css";

const Signup = () => {
  const context = useContext(Mycontext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const handleInputChange = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { email, password, confirmPassword, name } = formFields;

    if (!name.trim()) {
      return "Name is required.";
    }

    if (!email.includes("@gmail.com")) {
      return "Please enter a valid email.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };
  const handleSendOtp = async () => {
    const response = await sendOtp("/api/user/sendOtp", formFields.email);
    if (response?.success) {
      toast.success("OTP sent to your email");
      setIsOtpSent(true);
    } else {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    const response = await postData("api/user/verifyOtp", {
      email: formFields.email,
      otp,
    });

    if (response?.success) {
      const createAccountResponse = await postData(
        "api/user/signup",
        formFields
      );
      if (createAccountResponse?.success) {
        toast.success("Account created successfully. Login to continue");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      } else {
        toast.error(
          createAccountResponse.message || "Failed to create account"
        );
      }
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    // console.log(validationError);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    const response = await fetchDataFromApi(`api/user/${formFields.email}`);
    // console.log(response.success);
    if (response.success) {
      toast.error("User already exist");
      return;
    }
    handleSendOtp();
  };
  const goBack = () => {
    navigate("/");
  };
  useEffect(() => {
    if (context && typeof context.setisHeaderFooter === "function") {
      context.setisHeaderFooter(true);
    }

    document.body.classList.add("signup-page");

    return () => {
      document.body.classList.remove("signup-page");
    };
  }, [context]);

  return (
    <section className="signup-section">
      <div className="signup-container">
        <form
          className="signup-form"
          onSubmit={isOtpSent ? handleVerifyOtp : handleSignupSubmit}
        >
          <div className="form-field">
            <TextField
              type="text"
              id="inputName"
              className="input-control"
              name="name"
              variant="outlined"
              onChange={handleInputChange}
              value={formFields.name}
              required
              label="Full Name"
            />
          </div>

          <div className="form-field">
            <TextField
              type="email"
              id="inputEmail"
              className="input-control"
              name="email"
              required
              onChange={handleInputChange}
              value={formFields.email}
              variant="outlined"
              label="Email Address"
            />
          </div>

          <div className="form-field">
            <TextField
              type="password"
              id="inputPassword"
              className="input-control"
              name="password"
              required
              onChange={handleInputChange}
              value={formFields.password}
              variant="outlined"
              label="Password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-field">
            <TextField
              type="password"
              id="inputConfirmPassword"
              className="input-control"
              name="confirmPassword"
              required
              onChange={handleInputChange}
              value={formFields.confirmPassword}
              variant="outlined"
              label="Confirm Password"
              autoComplete="new-password"
            />
          </div>

          {isOtpSent && (
            <div className="form-field">
              <TextField
                type="text"
                id="inputOtp"
                className="input-control"
                name="otp"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                variant="outlined"
                label="Enter OTP"
              />
            </div>
          )}

          <Button
            type="submit"
            className="submit-button"
            variant="contained"
            color="primary"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={isOtpSent ? handleVerifyOtp : handleSignupSubmit}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isOtpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </Button>

          <div className="text-center">
            <p>
              Already have an account? <Link to="/Login">Sign in</Link>
            </p>
            <Button className="back-button" onClick={goBack}>
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
