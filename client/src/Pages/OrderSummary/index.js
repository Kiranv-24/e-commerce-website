import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css-files/OrderSummary.css";
import { fetchDataFromApi } from "../../api";
import { loadStripe } from "@stripe/stripe-js";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingDetails, setShippingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetchDataFromApi("/api/checkout/");
        if (res && res.success && res.orders.length > 0) {
          const order = res.orders[0];
          setOrderDetails(order.orderDetails);
          setShippingDetails(order.shippingDetails || []);
        } else {
          setError("Failed to load order details.");
        }
      } catch (err) {
        setError("Error fetching order details: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleEditOrder = () => {
    navigate("/checkout", {
      state: {
        formFields: orderDetails,
        cartItems: shippingDetails,
        quantities: shippingDetails.map((item) => item.quantity || 1),
      },
    });
  };

const handlePayment = async () => {
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  if (!stripe) {
    console.error("Stripe not initialized.");
    return;
  }

//   const userData = JSON.parse(localStorage.getItem("user"));
//   const userId = userData ? userData.userId : 123;

  const Products = shippingDetails.map((item) => ({
    productTitle: item.name,
    price: item.subtotal,
    quantity: item.quantity,
  }));
   console.log("Products to be sent:", Products);
  const body = {
    products: Products,
    // userId: userId,
  };


   
   const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orderpayment/create-checkout-session`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    
});

  

const session = await response.json();
    console.log("Session response:", session);

    
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if(result.error){
        console.log(result.error);
      }
};



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails || shippingDetails.length === 0) {
    return <div>No order details available.</div>;
  }

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>

      <div className="shipping-info">
        <h3 className="order-summary-subtitle">Shipping Information</h3>
        <p><strong>Name:</strong> {orderDetails.fullname} {orderDetails.lastname}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
      </div>

      <div className="order-details">
        <h3 className="order-summary-subtitle">Order Details</h3>
        <table className="order-summary-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Shipping</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {shippingDetails.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.subtotal.toFixed(2)}</td>
                <td>₹{item.shipping.toFixed(2)}</td>
                <td>₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-summary">
        <h3 className="order-summary-subtitle">Total Summary</h3>
        <p><strong>Total Amount:</strong> ₹{shippingDetails.reduce((acc, item) => acc + item.total, 0).toFixed(2)}</p>
      </div>

      <div className="edit-order">
        <button className="order-summary-button" onClick={handleEditOrder}>
          Edit Order
        </button>
      </div>

      <div className="payment-container">
        <button className="order-summary-button pay-button" onClick={handlePayment}>
          Click Here to Pay via Stripe
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
