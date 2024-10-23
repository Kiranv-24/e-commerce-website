import React, { useState } from "react";
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import "../../Css-files/Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
    const [quantities, setQuantities] = useState([1, 1]); 

    const handleQuantityChange = (index, value) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value !== "" ? value : "";
        setQuantities(newQuantities);
    };

    const handleBlur = (index) => {
        const newQuantities = [...quantities];
      
        newQuantities[index] = quantities[index] <= 0 ? 1 : quantities[index];
        setQuantities(newQuantities);
    };

    const priceList = [27999, 305]; 
    const total = quantities.reduce((sum, qty, index) => sum + (qty > 0 ? qty * priceList[index] : 0), 0);

    return (
        <>
            <section className="Cart-section">
                <div className="row row-section">
                    <div className="col-md-8 Shopping-Cart">
                        <h4 className="hd">Shopping Cart</h4>

                        <div className="Table">
                            <table>
                                <tbody>
                                    {/* First Product */}
                                    <tr>
                                        <td>
                                            <Link to="/cat/1" style={{ textDecoration: "none" }}>
                                                <div className="d-flex align-items-center CartimgWrapper">
                                                    <div className="imgWrapper">
                                                        <img
                                                            src={MicrosoftSurfacePro}
                                                            className="w-100"
                                                            alt="Microsoft Surface Pro"
                                                        />
                                                    </div>
                                                    <div className="Description d-flex flex-column align-items-center">
                                                        <h4>Microsoft Surface Pro</h4>
                                                        <p>by Microsoft</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="quantity-column">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantities[0]}
                                                onChange={(e) => handleQuantityChange(0, e.target.value)}
                                                onBlur={() => handleBlur(0)} // Validate on blur
                                            />
                                        </td>
                                        <td className="price-column">
                                            ₹{priceList[0] * (quantities[0] || 0)}
                                        </td>
                                    </tr>

                                    {/* Second Product */}
                                    <tr>
                                        <td>
                                            <Link to="/cat/2" style={{ textDecoration: "none" }}>
                                                <div className="d-flex align-items-center CartimgWrapper">
                                                    <div className="imgWrapper">
                                                        <img
                                                            src={MicrosoftSurfacePro}
                                                            className="w-100"
                                                            alt="ASUS Proart Display"
                                                        />
                                                    </div>
                                                    <div className="Description d-flex flex-column align-items-center">
                                                        <h4>ASUS Proart Display PA278QV WQHD, 27 Inch Monitor</h4>
                                                        <p>by ASUS</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="quantity-column">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantities[1]}
                                                onChange={(e) => handleQuantityChange(1, e.target.value)}
                                                onBlur={() => handleBlur(1)} // Validate on blur
                                            />
                                        </td>
                                        <td className="price-column">
                                            ₹{priceList[1] * (quantities[1] || 0)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="col-md-3 summary-section">
                        <h4>Order Summary</h4>
                        <div className="summary-content">
                            <p>Subtotal ({quantities.reduce((a, b) => parseInt(a) + parseInt(b || 0), 0)} items): ₹{total}</p>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
