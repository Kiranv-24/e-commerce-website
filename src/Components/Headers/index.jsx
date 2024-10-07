import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import GeneralButton from './GeneralButton '; // Import the GeneralButton component

const Header = () => {
    const [cartCount, setCartCount] = useState(0); // State to store cart count

    // Function to increment cart count
    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-header">
            <div className="container-fluid header-container">
                <div className="logo">
                    <div className="logo-container">
                        <img className="company-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJEsLucn6b9xPwccsc6dyYNBBCfpJ8-tVMUQ&s" alt="Company Logo" />
                    </div>
                </div>
                <div className="Shop-Name"><b>Electronics</b></div>

                <div className="Account-container">
                    {/* Render the Login button */}
                    <GeneralButton
                        label="Login"
                        icon="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        onClick={() => console.log("Login clicked")}
                    />

                    {/* Render the Cart button */}
                    <GeneralButton
                        label="Cart"
                        icon="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
                        count={cartCount}
                        onClick={() => console.log("Cart clicked")}
                    />

                    {/* Render the Orders button */}
                    <GeneralButton
                        label="Orders"
                        onClick={() => console.log("Orders clicked")}
                    />
                </div>
            </div>

            {/* Temporary button to simulate adding items to the cart */}
            <button onClick={addToCart} className="add-cart-btn">Add to Cart</button>
        </nav>
    );
};

export default Header;
