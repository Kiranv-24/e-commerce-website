import React, { useState, useEffect, useContext } from "react";
import { IoIosCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import MyContext from "../../Mycontext/index.js";
import { toast, Toaster } from "react-hot-toast";
const username = localStorage.getItem("username");
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CartIcon = () => {
  // const [cartCount, setCartCount] = useState(0);
  // const { cartCount } = useContext(MyContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const username = localStorage.getItem("username");
  const cartCount = localStorage.getItem("cartCount");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     if (!username) return;

  //     try {
  //       const res = await fetchDataFromApi(`/api/Cart/${username}`);
  //       if (res && res.cartitems && res.cartitems.length > 0) {
  //         setCartCount(res.cartitems.length);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, [username]);

  const handleCartClick = () => {
    if (username) {
      toast.success("Cart opened successfully");
      navigate("/cart");
    } else {
      toast.error("Please Login to continue..");
      navigate("/Login");
    }
  };

  return (
    <div className="col-sm-1 d-flex align-items-center justify-content-center part4 text-center ">
      <div className="position-relative">
        <button
          className="circle cart-button"
          onClick={handleCartClick}
          // onMouseEnter={() => setSnackbarMessage("Hovering over cart")}
        >
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
