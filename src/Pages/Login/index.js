import React, { useEffect, useContext, useRef } from "react";
import Mycontext from "../../Mycontext";
import "../../Css-files/Login.css";
import Loginbg from "../../assets/images/Login-bg.jpg";

const Login = () => {
    const context = useContext(Mycontext);
    const welcomeTextRef = useRef(null); // Create a reference for the welcome text element

    useEffect(() => {
        const text = ["WELCOME TO THE BEST", "EXPERIENCE, ASAD!"];
        let lineIndex = 0;
        let letterIndex = 0;

        const interval = setInterval(() => {
            const currentLine = text[lineIndex];
            const currentLetters = currentLine.slice(0, letterIndex);

            // Use the reference instead of document.getElementById
            if (welcomeTextRef.current) {
                welcomeTextRef.current.innerHTML = text
                    .slice(0, lineIndex)
                    .join("<br>") + `<br>${currentLetters}`;
            }

            letterIndex++;
            if (letterIndex > currentLine.length) {
                letterIndex = 0;
                lineIndex++;
            }

            if (lineIndex >= text.length) {
                clearInterval(interval); // Stop the animation after all lines are rendered
            }
        }, 150); // Speed of letter animation

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    // To disable header/footer in the context
    useEffect(() => {
        context.setisHeaderFooter(true);
    }, [context]);

    return (
        <section className="section" style={{ backgroundImage: `url(${Loginbg})` }}>
            <div className="welcome-message">
                {/* Assign the ref to this h1 tag */}
                <h1 ref={welcomeTextRef}></h1> 
            </div>
            <div className="container Login-container">
                <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="formEmail" className="form-control" />
                        <label className="form-label" htmlFor="formEmail">Email Address</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="form2Example31" defaultChecked />
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>
                        <div className="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
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
