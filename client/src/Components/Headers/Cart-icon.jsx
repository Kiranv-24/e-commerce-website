import React, { useState } from "react";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";

const CartIcon = () => {
    const [cartCount, setCartCount] = useState(0);

    const handleCartClick = () => {
        setCartCount(cartCount + 1); 
    };

    return (
        <div className="col-sm-1 d-flex align-items-center justify-content-center part4 text-center">
            <div className="position-relative">
                <Link to="/Cart">
                    <button className="circle" >
                        <IoIosCart />
                        {cartCount > 0 && (
                            <span className="cart-count position-absolute">{cartCount}</span>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartIcon;
