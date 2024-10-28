import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api";
import "../../Css-files/PaymentAccepted.css";

const SuccessfulPayment = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const sessionId = new URLSearchParams(window.location.search).get(
          "session_id"
        );

        if (!sessionId) {
          setError("Session ID not found in URL.");
          return;
        }

        const response = await postData(
          `/api/orderpayment/payment/complete?session_id=${sessionId}`
        );
        setOrderDetails(response.order);
      } catch (error) {
        setError("Failed to fetch order details. Please try again.");
      }
    };

    fetchPaymentData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/OrderHistory");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="successful-payment">
      <div className="success-message">
        <h1>Payment Accepted Successfully!</h1>
        <p>Redirecting to your order page in {countdown} seconds...</p>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
