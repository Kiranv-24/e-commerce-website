import React, { useState, useEffect } from "react";
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import "../../Css-files/Cart.css";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Store cart items
  const [quantities, setQuantities] = useState([]); // Store quantities
  const navigate = useNavigate();

  // Fetch cart items from API
  useEffect(() => {
    fetchDataFromApi("/api/Cart/").then((res) => {
      if (res && res.length > 0) {
        setCartItems(res);
        // Initialize quantities based on fetched cart items
        setQuantities(res.map((item) => item.quantity || 1)); // Ensure each quantity has a default
      }
    });
  }, []);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    // Allow empty input
    if (value === "") {
      newQuantities[index] = ""; // Set to empty string
    } else {
      newQuantities[index] = Math.max(1, value); // Ensure minimum is 1
    }
    setQuantities(newQuantities);
  };

  const handleBlur = (index) => {
    const newQuantities = [...quantities];
    // If quantity is empty, set it to 1
    newQuantities[index] =
      newQuantities[index] === "" ? 1 : Math.max(1, newQuantities[index]);
    setQuantities(newQuantities);
  };

  const total = cartItems.reduce(
    (sum, item, index) =>
      sum + (quantities[index] > 0 ? quantities[index] * item.price : 0),
    0
  );

  const ProductDetails = (id) => {
    navigate(`/product/${id}`); // Navigate to product detail page with product ID
  };

  return (
    <>
      <section className="Cart-section">
        <div className="row row-section">
          <div className="col-md-8 Shopping-Cart">
            <h4 className="hd">Shopping Cart</h4>
            <div className="Table">
              <table>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {/* <Link
                          onClick={() => ProductDetails(item.id)} // Correctly pass the function reference
                          style={{ textDecoration: "none" }}
                        > */}
                        <div className="d-flex align-items-center CartimgWrapper">
                          <div className="imgWrapper">
                            <img
                              src={item.images?.[0] || MicrosoftSurfacePro} // Use optional chaining and fallback image
                              className="w-100"
                              alt={item.name}
                            />
                          </div>
                          <div className="Description d-flex flex-column align-items-center">
                            <h4>{item.name}</h4>
                            <p>by Microsoft</p>
                          </div>
                        </div>
                        {/* </Link> */}
                      </td>
                      <td className="quantity-column">
                        <input
                          type="number"
                          min="1"
                          value={quantities[index]} // Bind to quantities state
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          } // Update correct index
                          onBlur={() => handleBlur(index)} // Validate on blur
                          placeholder="Quantity" // Optional placeholder for better UX
                        />
                      </td>
                      <td className="price-column">
                        ₹{item.price * (quantities[index] || 0)}
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
