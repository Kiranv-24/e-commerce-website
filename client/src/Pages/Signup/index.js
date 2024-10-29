import { useContext, useEffect, useState } from "react";
import Mycontext from "../../Mycontext";
import "../../Css-files/Login.css";
import Loginbg from "../../assets/images/Login-bg.jpg";
import { postData, sendOtp, verifyOtp } from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const context = useContext(Mycontext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const history = useNavigate();

  const [formfields, setFormfields] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    isAdmin: false,
  });

  // Handle input changes
  const onChangeInput = (e) => {
    setFormfields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const { email, password, confirmpassword } = formfields;
    if (!email.includes("@")) {
      return "Please enter a valid email.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmpassword) {
      return "Passwords do not match.";
    }
    return null; // No validation errors
  };

  // Send OTP
  const onSendOtp = async () => {
    const response = await sendOtp("/api/user/sendOtp", formfields.email);
    if (response?.success) {
      toast.success("OTP sent to your email");
      setIsOtpSent(true);
    } else {
      toast.error("Failed to send OTP");
    }
  };
  // console.log("ishklsk");
  // Verify OTP and create account
  const onVerifyOtp = async (e) => {
  e.preventDefault();
  if (!otp) {
    toast.error("Please enter the OTP");
    return;
  }

  const response = await postData("api/user/verifyOtp", {
    email: formfields.email,
    otp,
  });

  if (response?.success) {
    const createAccountResponse = await postData("api/user/signup", formfields);
    console.log("createAccountResponse:", createAccountResponse); // Log the full response

    if (createAccountResponse?.success) {
      toast.success("Account created successfully. Login to continue");

      // Delay navigation for the success toast to appear
      setTimeout(() => {
        history("/Login");
      }, 2000);
    } else {
      toast.error(createAccountResponse.message || 'Failed to create account');
    }
  } else {
    toast.error("Invalid OTP");
  }
};


  const onSignupSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    onSendOtp();
  };

  useEffect(() => {
    if (context && typeof context.setisHeaderFooter === "function") {
      context.setisHeaderFooter(true);
    }
  }, [context]);

  return (
    <section
      className="section"
      style={{
        backgroundImage: `url(${Loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            zIndex: 99999,
            top: "20%",
          },
        }}
      />
      <div className="container Login-container">
        <form
          className="signup-form"
          onSubmit={isOtpSent ? onVerifyOtp : onSignupSubmit}
        >
          {/* Name */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="formName"
              className="form-control"
              name="name"
              onChange={onChangeInput}
              value={formfields.name}
              required
            />
            <label className="form-label" htmlFor="formName">
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="formEmail"
              className="form-control"
              name="email"
              required
              onChange={onChangeInput}
              value={formfields.email}
            />
            <label className="form-label" htmlFor="formEmail">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="formPassword"
              className="form-control"
              name="password"
              required
              onChange={onChangeInput}
              value={formfields.password}
            />
            <label className="form-label" htmlFor="formPassword">
              Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="formConfirmPassword"
              className="form-control"
              name="confirmpassword"
              required
              onChange={onChangeInput}
              value={formfields.confirmpassword}
            />
            <label className="form-label" htmlFor="formConfirmPassword">
              Confirm Password
            </label>
          </div>

          {/* OTP Field - shown only if OTP is sent */}
          {isOtpSent && (
            <div className="form-outline mb-4">
              <input
                type="text"
                id="formOtp"
                className="form-control"
                name="otp"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
              <label className="form-label" htmlFor="formOtp">
                Enter OTP
              </label>
            </div>
          )}

          {/* Sign-up button */}
          <Button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isOtpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </Button>

          {/* Social sign-up buttons */}
          <div className="text-center">
            <p>
              Already have an account? <Link to="/Login">Sign in</Link>
            </p>
            <p>or sign up with:</p>
            {/* Social icons can be added here */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
