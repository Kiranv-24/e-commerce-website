import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'; // Correctly navigate to App.css from the Components folder

const Header = () => {
    const [cartCount, setCartCount] = useState(0); // State to store cart count

    // Function to increment cart count
    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-header">
            <div className="container-fluid header-container">
                <div className='logo'>
                    <div className='logo-container'>
                        <img className="company-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJEsLucn6b9xPwccsc6dyYNBBCfpJ8-tVMUQ&s" alt="Company Logo" />
                    </div>
                </div>
                <div className='Shop-Name'><b>Electronics</b></div>

                <div className='Account-container'>
                    {/* Login Button */}
                    <button className='login-container' type="button">
                        <div className='Login'>
                            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="Login" width="24" height="24" />
                        </div>
                        <div>Login</div>
                    </button>

                    {/* Cart Button */}
                    <button className='Cart-container' style={{ display: 'flex', alignItems: 'center', position: 'relative' }} type="button">
                        <button type="button">
                            <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg' alt='Cart' />
                        </button>
                        {cartCount > 0 && (
                            <div className="cart-count">
                                {cartCount}
                            </div>
                        )}
                        <div>Cart</div>
                    </button>

                    {/* Orders Button */}
                    <button className='orders-container' type="button" style={{ display: 'flex', alignItems: 'center' }}>
                        <div>Orders</div>
                    </button>
                </div>
            </div>

            {/* Temporary button to simulate adding items to the cart */}
            <button onClick={addToCart} className="add-cart-btn">Add to Cart</button>
        </nav>
    );
};

export default Header;
