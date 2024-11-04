import React, { useState, useEffect, useContext } from "react";
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import "../../Css-files/Cart.css";
import { fetchDataFromApi, deleteData } from "../../api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toaster, toast } from "react-hot-toast";
import { CircularProgress, Button, TextField } from "@mui/material";

import MyContext from "../../Mycontext/index.js";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { setCartCount } = useContext(MyContext);
  useEffect(() => {
    if (!username) {
      console.error("Username not found");
      return;
    }

    fetchDataFromApi(`/api/Cart/${username}`)
      .then((res) => {
        if (res && res.cartitems && res.cartitems.length > 0) {
          setCartItems(res.cartitems);
          setQuantities(res.cartitems.map((item) => item.quantity || 1));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch cart items:", error);
      });
  }, [username]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    if (value === "" || isNaN(value)) {
      newQuantities[index] = "";
    } else {
      newQuantities[index] = Math.max(1, parseInt(value));
    }
    setQuantities(newQuantities);
  };

  const handleBlur = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] =
      newQuantities[index] === "" ? 1 : Math.max(1, newQuantities[index]);
    setQuantities(newQuantities);
  };

  const total = cartItems.reduce(
    (sum, item, index) =>
      sum + (quantities[index] > 0 ? quantities[index] * item.price : 0),
    0
  );

  const handleRemoveItem = async (index) => {
    const itemId = cartItems[index]._id;
    try {
      await deleteData(`/api/Cart/${username}/${itemId}`);
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      const updatedQuantities = quantities.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      setQuantities(updatedQuantities);

      setCartCount(updatedCartItems.length);
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleRemoveAllItems = async () => {
    try {
      await Promise.all(
        cartItems.map((item) => deleteData(`/api/Cart/${username}/${item._id}`))
      );
      setCartItems([]);
      setQuantities([]);
      setCartCount(0);
      toast.success("All items removed from cart!");
    } catch (error) {
      console.error("Failed to remove all items from cart:", error);
    }
  };

  const orderDetails = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Please login to proceed to checkout.");
      navigate("/login");
    } else {
      if (cartItems.length == 0) {
        toast.error("Add item to cart");
        return;
      }

      navigate(`/Checkout?ref=nav_cart`, {
        state: {
          cartItems: cartItems,
          quantities: quantities,
        },
      });
      toast.success("Proceeding to checkout!");
    }
  };
  const goBack = () => {
    navigate("/");
  };

  return (
    <section className="Cart-section">
      <Button className="back-button" onClick={goBack}>
        Go Back
      </Button>
      <div className="row row-section row-section-cart ">
        <div className="col-md-8 Shopping-Cart">
          <h4 className="hd">Shopping Cart</h4>
          <button className="remove-all-btn" onClick={handleRemoveAllItems}>
            Remove All
          </button>
          <div className="Table">
            <table>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center CartimgWrapper">
                        <div className="imgWrapper">
                          <img
                            src={item.images?.[0] || MicrosoftSurfacePro}
                            className="w-100"
                            alt={item.name}
                          />
                        </div>
                        <div className="Description d-flex flex-column align-items-center">
                          <h4>{item.name}</h4>
                          <p>by Microsoft</p>
                        </div>
                      </div>
                    </td>
                    <td className="quantity-column">
                      <input
                        type="number"
                        min="1"
                        value={quantities[index]}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        onBlur={() => handleBlur(index)}
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="price-column">
                      ₹{item.price * (quantities[index] || 0)}
                    </td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <DeleteIcon
                          style={{ fontSize: "1.2rem", color: "#e74c3c" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-3 summary-section">
          <h4>Order Summary</h4>
          <div className="summary-content">
            <p>
              Subtotal (
              {quantities.reduce((a, b) => parseInt(a) + parseInt(b || 0), 0)}{" "}
              items): ₹{total}
            </p>
            <button className="checkout-btn" onClick={orderDetails}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
