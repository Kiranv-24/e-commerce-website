import React, { useEffect, useContext, useRef, useState } from "react";
import Mycontext from "../../Mycontext";
import { postData } from "../../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const Login = ({ setUsername }) => {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(Mycontext);
  const welcomeTextRef = useRef(null);
  const [formfields, setFormfields] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const onChangeInput = (e) => {
    setFormfields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const goBack = () => {
    history("/");
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const fields = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        password: null,
      };
      const res = await postData("api/user/authWithGoogle", fields);
      if (!res.error) {
        localStorage.setItem("token", res.token);
        toast.success("User Login Successful");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.providerData[0].email);
        setTimeout(() => {
          window.location.href("/");
        }, 1000);
      } else {
        toast.error("Google Login Failed");
      }
    } catch (error) {
      toast.error(`Google Login Error: ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formfields.email || !formfields.password) {
      toast.error("Please fill out all fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/user/Login", formfields);
      if (res && res.message) {
        toast.error("Username or password is incorrect");
      } else {
        toast.success("User Login Successful");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", formfields.email);
        setUsername(formfields.email);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    } catch {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToForgotPassword = () => {
    window.location.replace("/ForgetPassword");
  };

  useEffect(() => {
    context.setisHeaderFooter(true);
    document.body.classList.add("signup-page");

    return () => {
      document.body.classList.remove("signup-page");
    };
  }, [context]);

  return (
    <div className="login-wrapper">
      <div className="Login-container">
        <div className="welcome-message">
          <h1 ref={welcomeTextRef}>Welcome Back!</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-outline mb-4">
            <TextField
              label="Email Address"
              type="email"
              name="email"
              variant="outlined"
              fullWidth
              onChange={onChangeInput}
              value={formfields.email}
              required
              className="mb-4 textfield"
            />
          </div>
          <div className="form-outline mb-">
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              onChange={onChangeInput}
              value={formfields.password}
              required
              className="mb-4 textfield"
            />
          </div>
          <Button
            type="submit"
            className="Submit"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign in"}
          </Button>
          <div className="text-center">
            <p>
              Not a member? <a href="/signup">Register</a>
            </p>
            <p>
              Forgot your password?{" "}
              <span
                onClick={navigateToForgotPassword}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Reset it here
              </span>
            </p>
            <p>or sign in with:</p>
            <Button
              className="loginWithGoogle mt-2"
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <i className="fab fa-google"></i>
            </Button>
            <Button className="back-button" onClick={goBack}>
              Go Back
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
