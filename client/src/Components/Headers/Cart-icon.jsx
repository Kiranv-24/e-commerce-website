import React, { useState, useEffect } from "react";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../api";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0); // State for the cart count
  const username = localStorage.getItem("username"); // Get username from local storage

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!username) return; // Avoid fetching if username is not available

      try {
        const res = await fetchDataFromApi(`/api/Cart/${username}`); // Fetch based on username
        if (res && res.cartitems && res.cartitems.length > 0) {
          setCartCount(res.cartitems.length); // Set the cart count based on the number of items
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [username]); // Fetch cart items whenever username changes

  return (
    <div className="col-sm-1 d-flex align-items-center justify-content-center part4 text-center">
      <div className="position-relative">
        <Link to={`/Cart/${username}`}>
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
