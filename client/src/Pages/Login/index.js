import React, { useEffect, useContext, useRef, useState } from "react";
import Mycontext from "../../Mycontext";
import "../../Css-files/Login.css";
import Loginbg from "../../assets/images/Login-bg.jpg";
import { postData } from "../../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import ForgetPassword from "../ForgetPassword";
const Login = () => {
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

  const handleLogin = async (e) => {
    if (formfields.email) {
      localStorage.setItem("username", formfields.email);
    }
    e.preventDefault();
    setIsLoading(true); // Start loading indicator

    if (formfields.email === "") {
      toast.error("Please fill the email", {
        style: { fontSize: "18px" },
      });
      setIsLoading(false); // Stop loading indicator
      return;
    }
    if (formfields.password === "") {
      toast.error("Please fill the password", {
        style: { fontSize: "18px" },
      });
      setIsLoading(false); // Stop loading indicator
      return;
    }

    try {
      const res = await postData("/api/user/Login", formfields);
      console.log(res);
      if (res && res.message) {
        toast.error("username or passowrd is wrong", {
          style: { fontSize: "18px" },
        });
      } else {
        toast.success("User Login Successful", {
          style: { fontSize: "18px" },
        });
        localStorage.setItem("isLoggedIn", "true");
        
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("An error occurred during login.", {
        style: { fontSize: "18px" },
      });
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    const text = ["WELCOME TO THE BEST", "EXPERIENCE, ASAD!"];
    let lineIndex = 0;
    let letterIndex = 0;

    const interval = setInterval(() => {
      const currentLine = text[lineIndex];
      const currentLetters = currentLine.slice(0, letterIndex);

      if (welcomeTextRef.current) {
        welcomeTextRef.current.innerHTML =
          text.slice(0, lineIndex).join("<br>") + `<br>${currentLetters}`;
      }

      letterIndex++;
      if (letterIndex > currentLine.length) {
        letterIndex = 0;
        lineIndex++;
      }

      if (lineIndex >= text.length) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    context.setisHeaderFooter(true);
  }, [context]);

  return (
    <section className="section" style={{ backgroundImage: `url(${Loginbg})` }}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: "18px", 
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "400px",
          },
        }}
      />
      <div className="welcome-message">
        <h1 ref={welcomeTextRef}></h1>
      </div>
      <div className="container Login-container">
        <form>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="formEmail"
              className="form-control"
              name="email"
              onChange={onChangeInput}
              value={formfields.email}
            />
            <label className="form-label" htmlFor="formEmail">
              Email Address
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              onChange={onChangeInput}
              value={formfields.password}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example31"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>
            <div className="col">
              <a href='/ForgetPassword'>Forgot password?</a>
            </div>
          </div>
          <Button
            type="Submit"
            className="btn btn-primary btn-block mb-4"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleLogin}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign in"}
          </Button>
          <div className="text-center">
            <p>
              Not a member? <a href="/signup">Register</a>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
