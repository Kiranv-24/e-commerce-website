import React, { useState } from "react";
import { IoIosCart } from "react-icons/io";

const CartIcon = () => {
    const [cartCount, setCartCount] = useState(0);

    const handleCartClick = () => {
        setCartCount(cartCount + 1); 
    };

    return (
        <div className="col-sm-1 d-flex align-items-center justify-content-center part4 text-center">
            <div className="position-relative">
                <button className="circle" onClick={handleCartClick}>
                    <IoIosCart />
                    {cartCount > 0 && (
                        <span className="cart-count position-absolute">{cartCount}</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CartIcon;
