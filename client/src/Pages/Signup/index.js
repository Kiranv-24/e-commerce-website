import { useContext, useEffect } from "react";
import Mycontext from "../../Mycontext"; 
import "../../Css-files/Login.css";
import Loginbg from "../../assets/images/Login-bg.jpg"; // Ensure the image path is correct

const Signup = () => {
    const context = useContext(Mycontext);

    useEffect(() => {
        context.setisHeaderFooter(true);
    }, [context]);

    return (
        <section
            className="section"
            style={{
                backgroundImage: `url(${Loginbg})`,  // Setting the background image in JSX
                backgroundSize: "contain",           // Use "contain" or "cover" depending on how you want it
                backgroundPosition: "center center", // Center the background image
                backgroundRepeat: "no-repeat"        // Prevent the background image from repeating
            }}
        >
            <div className="container Login-container">
                <form>
                    {/* Name field */}
                    <div className="form-outline mb-4">
                        <input type="text" id="formName" className="form-control" />
                        <label className="form-label" htmlFor="formName">Full Name</label>
                    </div>

                    {/* Email field */}
                    <div className="form-outline mb-4">
                        <input type="email" id="formEmail" className="form-control" />
                        <label className="form-label" htmlFor="formEmail">Email Address</label>
                    </div>

                    {/* Password field */}
                    <div className="form-outline mb-4">
                        <input type="password" id="formPassword" className="form-control" />
                        <label className="form-label" htmlFor="formPassword">Password</label>
                    </div>

                    {/* Confirm Password field */}
                    <div className="form-outline mb-4">
                        <input type="password" id="formConfirmPassword" className="form-control" />
                        <label className="form-label" htmlFor="formConfirmPassword">Confirm Password</label>
                    </div>

                    {/* Sign-up button */}
                    <button type="button" className="btn btn-primary btn-block mb-4">Sign up</button>

                    {/* Social sign-up options */}
                    <div className="text-center">
                        <p>Already have an account? <a href="#!">Sign in</a></p>
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
