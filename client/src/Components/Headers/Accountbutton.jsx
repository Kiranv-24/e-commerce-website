import React, { useState, useEffect, useRef } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Css-files/Account.css";

const AccountButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingToastId, setLoadingToastId] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
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
    // localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("username");
    // localStorage.removeItem("cartCount");
    // Clear all items from localStorage
    localStorage.clear();

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

  const handleAccountNavigation = () => {
    handleNavigation("/Account", "Navigating to Account...");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".account-button")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="col-sm-1 d-flex align-items-center part3">
      <div className="part3">
        <button
          className="circle d-flex justify-content-evenly account-button position-relative"
          onClick={toggleDropdown}
        >
          <VscAccount />
          {isDropdownOpen ? (
            <IoMdArrowDropup className="Arrow" />
          ) : (
            <IoMdArrowDropdown className="Arrow" />
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="Dropdown" ref={dropdownRef}>
          {isLoggedIn ? (
            <ul style={{ height: "auto" }}>
              <button
                className="btn btn-link p-0 w-100 "
                onClick={handleAccountNavigation}
              >
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
              <button
                className="btn btn-link p-0 w-100"
                onClick={handleSignupNavigation}
              >
                <Link
                  to="/Signup"
                  className="no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <li className="Newconstumer">
                    New Customer?
                    <b style={{ color: "#0202aa", fontWeight: 700 }}> Signup</b>
                  </li>
                </Link>
              </button>
              <button
                className="btn btn-link p-0 w-100"
                onClick={handleLoginNavigation}
              >
                <Link to="/Login" className="no-underline">
                  <li className="Newconstumer">Login</li>
                </Link>
              </button>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountButton;
