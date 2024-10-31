import React, { useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const username=localStorage.getItem("username");
const AccountButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingToastId, setLoadingToastId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    useEffect(() => {
        // Dismiss the loading toast when the location changes
        if (loadingToastId) {
            toast.dismiss(loadingToastId);
            toast.success("Action completed!");
            setLoadingToastId(null);
        }
    }, [location, loadingToastId]);

    const showLoadingToast = (message) => {
        const toastId = toast.loading(message);
        setLoadingToastId(toastId);
    };

    const handleNavigation = (path, message) => {
        showLoadingToast(message);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        // setUsername("");
        setIsLoggedIn(false);
        handleNavigation("/login", "Logging out...");
    };

    const orderHistory = () => {
        handleNavigation("/OrderHistory", "Navigating to order history...");
    };

    const handleSignupNavigation = () => {
        handleNavigation("/Signup", "Navigating to Signup...");
    };

    const handleLoginNavigation = () => {
        handleNavigation("/Login", "Navigating to Login...");
    };

    return (
        <div className="col-sm-1 d-flex align-items-center part3">
            <div className="part3">
                <button
                    className='circle d-flex justify-content-evenly account-button position-relative'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <VscAccount />
                    {isHovered ? <IoMdArrowDropup className="Arrow" /> : <IoMdArrowDropdown className="Arrow" />}
                </button>
            </div>
            <div className='Dropdown'>
                {isLoggedIn ? (
                    <ul style={{ height: "auto" }}>
                        <button className="btn btn-link p-0 w-100">
                            <li className="w-100">Account</li>
                        </button>
                        <button className="btn btn-link p-0 w-100" onClick={orderHistory}>
                            <li className="w-100">Orders</li>
                        </button>
                        <button className="btn btn-link p-0 w-100" onClick={handleLogout}>
                            <li className="w-100">Logout</li>
                        </button>
                    </ul>
                ) : (
                    <ul>
                        <button className="btn btn-link p-0 w-100" onClick={handleSignupNavigation}>
                            <Link to="/Signup" className="no-underline" style={{ textDecoration: "none" }}>
                                <li>
                                    New Customer? 
                                    <b style={{ color: "#0202aa", fontWeight: 700 }}> Signup</b>
                                </li>
                            </Link>
                        </button>
                        <button className="btn btn-link p-0 w-100" onClick={handleLoginNavigation}>
                            <Link to="/Login" className="no-underline">
                                <li>Login</li>
                            </Link>
                        </button>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AccountButton;
