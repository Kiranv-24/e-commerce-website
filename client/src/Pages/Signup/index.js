import { useContext, useEffect, useState } from "react";
import Mycontext from "../../Mycontext"; 
import "../../Css-files/Login.css";
import Loginbg from "../../assets/images/Login-bg.jpg";
import { postData } from "../../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

const Signup = () => {
    const context = useContext(Mycontext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const [error, setError] = useState("");
    const [formfields, setFormfields] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        isAdmin: false
    });

    // Handle input changes
    const onChangeInput = (e) => {
        setFormfields((prevFields) => ({
            ...prevFields,
            [e.target.name]: e.target.value
        }));
    };

    // Form validation
    const validateForm = () => {
        const { email, password, confirmpassword } = formfields;
        if (!email.includes("@")) return "Please enter a valid email.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        if (password !== confirmpassword) return "Passwords do not match.";
        return "";
    };

    // Submit form
    const signup = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page'
        console.log("Form Submitted"); 
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            context.setAlertBox({
                open: true,
                error: true,
                msg: validationError,
            });
            return;
        }

        try {
            setIsLoading(true);
            const res = await postData("/api/user/signup", formfields);
            if (res.status === 400) {
                setError("User already exists");
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "User already exists",
                });
            } else {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Signup successful!",
                });
                history("/Login");
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        context.setisHeaderFooter(true);
    }, [context]);

    return (
        <section
            className="section"
            style={{
                backgroundImage: `url(${Loginbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="container Login-container">
                {error && <div className="alert alert-danger">{error}</div>}
                <form > {/* Correct use of onSubmit */}
                    
                    {/* Name */}
                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            id="formName"
                            className="form-control"
                            name="name"
                            onChange={onChangeInput}
                            value={formfields.name}
                        />
                        <label className="form-label" htmlFor="formName">Full Name</label>
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
                        <label className="form-label" htmlFor="formEmail">Email Address</label>
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
                        <label className="form-label" htmlFor="formPassword">Password</label>
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
                        <label className="form-label" htmlFor="formConfirmPassword">Confirm Password</label>
                    </div>

                    {/* Sign-up button */}
                    <Button 
                        type="submit" 
                        className="btn btn-primary btn-block mb-4" 
                        // disabled={isLoading} 
                        onClick={signup}
                        style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
                    </Button>

                    {/* Social sign-up buttons (Make sure these don't have `type="submit"`) */}
                    <div className="text-center">
                        <p>Already have an account? <a href="/Login">Sign in</a></p>
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

export default Signup;
