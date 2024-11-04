import React, { useEffect, useState } from "react";
import "../../Css-files/OrderHistory.css";
import { fetchDataFromApi } from "../../api";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const generateInvoicePDF = (order) => {
  try {
    const doc = new jsPDF();
    doc.setFont("Helvetica");
    doc.setFontSize(18);
    doc.text("Ecommerce Surface", 10, 10);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${order.orderId}`, 10, 20);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 10, 30);
    doc.setFontSize(10);
    doc.text("Bill from:", 10, 50);
    doc.text("Company Name", 10, 55);
    doc.text("Street Address, Zip Code", 10, 60);
    doc.text("Phone Number", 10, 65);
    doc.text("Bill to:", 100, 50);
    doc.text(
      `${order.orderDetails.fullname} ${order.orderDetails.lastname}`,
      100,
      55
    );
    doc.text(`${order.orderDetails.address}`, 100, 60);
    doc.text(`Phone: ${order.orderDetails.phone}`, 100, 65);

    const numberOfProducts = order.shippingDetails.length;
    let fontSize = numberOfProducts > 5 ? 8 : numberOfProducts === 1 ? 12 : 10;

    doc.setFontSize(fontSize);
    const tableData = order.shippingDetails.map((item) => [
      item.name,
      item.quantity,
      `₹${(item.total / item.quantity).toFixed(2)}`,
      `₹${item.total.toFixed(2)}`,
    ]);

    const tableHeaders = [["Item", "Quantity", "Rate", "Amount"]];

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 75,
      theme: "grid",
      styles: { fontSize: fontSize, cellPadding: 4 },
      headStyles: { fillColor: [60, 141, 188], textColor: [255, 255, 255] },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    const subtotal = order.shippingDetails
      .reduce((acc, item) => acc + item.total, 0)
      .toFixed(2);

    doc.text("Subtotal:", 140, finalY);
    doc.text(`₹${subtotal}`, 180, finalY);
    doc.text("Discount:", 140, finalY + 10);
    doc.text("₹0.00", 180, finalY + 10);
    doc.text("Paid:", 140, finalY + 30);
    doc.text(`₹${subtotal}`, 180, finalY + 30);

    doc.setFillColor(60, 141, 188);
    doc.rect(140, finalY + 40, 50, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Total", 145, finalY + 47);
    doc.text(`₹${subtotal}`, 180, finalY + 47);

    doc.setFontSize(10);
    doc.text("Product Confirmation:", 10, finalY + 60);
    doc.text(
      "Thank you for your purchase! Your order will be processed shortly.",
      10,
      finalY + 65
    );
    doc.setTextColor(0, 0, 0);
    doc.save(`invoice-${order.orderId}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const OrderHistory = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchDataFromApi(
          `/api/OrderHistory/orders/${username}`
        );
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("Username not found in local storage.");
    }
  }, [username]);

  const standardizeOrderId = (orderId) => {
    return orderId.slice(0, 5) + "-" + orderId.slice(-5);
  };

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(orders)) {
    return <div>No orders available</div>;
  }

  return (
    <div className="order-history">
      <Button className="back-button" onClick={goBack}>
        Go Back
      </Button>
      <h2>Order History</h2>
      <table className="order-table">
        <thead>
          <tr className="first-row">
            <th>Order ID</th>
            <th>View Products</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Download Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.orderId}>
              <tr>
                <td>{standardizeOrderId(order.orderId)}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleRow(order.orderId)}
                  >
                    View
                  </Button>
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  ₹
                  {order.shippingDetails
                    .reduce((acc, item) => acc + item.total, 0)
                    .toFixed(2)}
                </td>
                <td>{order.paymentStatus}</td>
                <td>
                  <button
                    onClick={() => generateInvoicePDF(order)}
                    className="invoice-button"
                  >
                    Download Invoice
                  </button>
                </td>
              </tr>
              {expandedRows[order.orderId] && (
                <tr className="expanded-row">
                  <td colSpan={6}>
                    <div>
                      {order.shippingDetails.map((item) => (
                        <div key={item.id} className="product-detail">
                          <strong>{item.name}</strong> - Quantity:{" "}
                          {item.quantity} - Price: ₹{item.total.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
