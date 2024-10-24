import React, { useState, useEffect } from "react";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../api";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0); // State for the cart count
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetchDataFromApi("/api/Cart/");
      if (res && res.length > 0) {
        setCartCount(res.length); // Set the cart count based on the number of items
        setCartItems(res); // Store the cart items
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="col-sm-1 d-flex align-items-center justify-content-center part4 text-center">
      <div className="position-relative">
        <Link to="/Cart">
          <button className="circle">
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
