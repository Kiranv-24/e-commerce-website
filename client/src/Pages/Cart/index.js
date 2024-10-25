import React, { useState, useEffect } from "react";
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import "../../Css-files/Cart.css";
import { fetchDataFromApi, deleteData } from "../../api"; // Import deleteData function
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from API
  useEffect(() => {
    fetchDataFromApi("/api/Cart/").then((res) => {
      if (res && res.length > 0) {
        setCartItems(res);
        setQuantities(res.map((item) => item.quantity || 1));
      }
    });
  }, []);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    if (value === "") {
      newQuantities[index] = "";
    } else {
      newQuantities[index] = Math.max(1, value);
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
    const itemId = cartItems[index]._id; // Assuming _id is the unique identifier
    try {
      await deleteData(`/api/Cart/${itemId}`); // Call API to delete the item
      // Remove item from cartItems and quantities based on index
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      const updatedQuantities = quantities.filter((_, i) => i !== index);

      // Update the state
      setCartItems(updatedCartItems);
      setQuantities(updatedQuantities);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

// Add this function inside your Cart component
const handleRemoveAllItems = async () => {
  try {
    // Loop through cartItems to delete each item
    await Promise.all(cartItems.map(item => deleteData(`/api/Cart/${item._id}`)));
    setCartItems([]);
    setQuantities([]);
  } catch (error) {
    console.error("Failed to remove all items from cart:", error);
  }
};

return (
  <>
    <section className="Cart-section">
      <div className="row row-section">
        <div className="col-md-8 Shopping-Cart">
          <h4 className="hd">Shopping Cart</h4>
          {/* Add the Remove All button */}
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </section>
  </>
);
};

export default Cart;
