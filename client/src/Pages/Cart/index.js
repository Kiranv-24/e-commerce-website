import React, { useState, useEffect } from "react";
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import "../../Css-files/Cart.css";
import { fetchDataFromApi, deleteData } from "../../api"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Get username from local storage

  // Fetch cart items from API
  useEffect(() => {
    if (!username) {
      console.error("Username not found");
      return;
    }
    
    fetchDataFromApi(`/api/Cart/${username}`) // Include username in API call
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
    const itemId = cartItems[index]._id; // Use the correct identifier
    const id=cartItems.id;
    console.log(id);
    try {
      await deleteData(`/api/Cart/${username}/${itemId}`); // Update the API call to use username and itemId
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      const updatedQuantities = quantities.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      setQuantities(updatedQuantities);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };


const handleRemoveAllItems = async () => {
  try {
    // Use Promise.all to delete each item by its unique ID
    await Promise.all(
      cartItems.map(item => deleteData(`/api/Cart/${username}/${item._id}`))
    );
    // Clear state after successful deletion of all items
    setCartItems([]);
    setQuantities([]);
  } catch (error) {
    console.error("Failed to remove all items from cart:", error);
  }
};


  const orderDetails = () => {
    navigate("/Checkout", {
      state: {
        cartItems: cartItems,
        quantities: quantities,
      },
    });
  };

  return (
    <section className="Cart-section">
      <div className="row row-section">
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
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
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
