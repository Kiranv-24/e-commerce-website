import React, { useEffect, useState } from "react";
import "../../Css-files/OrderHistory.css";
import { fetchDataFromApi } from "../../api";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Add a font with support for the Rupee symbol
// const addRupeeFont = () => {
//   // Only add this if you need the font; otherwise, you can skip this part
//   const rupeeFont = "BASE64_ENCODED_FONT_HERE"; // Replace this with the actual base64 encoded font
//   if (rupeeFont) {
//     jsPDF.API.addFileToVFS("Arial.ttf", rupeeFont);
//     jsPDF.API.addFont("Arial.ttf", "Arial", "normal");
//   }
// };


const generateInvoicePDF = (order) => {
  try {
    const doc = new jsPDF();

    // Use default font
    doc.setFont("Helvetica");

    // Title and Header Section
    doc.setFontSize(18);
    doc.text("Ecommerce Surface", 10, 10);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${order.orderId}`, 10, 20);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 10, 30);

    // Bill From Section
    doc.setFontSize(10);
    doc.text("Bill from:", 10, 50);
    doc.text("Company Name", 10, 55);
    doc.text("Street Address, Zip Code", 10, 60);
    doc.text("Phone Number", 10, 65);

    // Bill To Section
    doc.text("Bill to:", 100, 50);
    doc.text(`${order.orderDetails.fullname} ${order.orderDetails.lastname}`, 100, 55);
    doc.text(`${order.orderDetails.address}`, 100, 60);
    doc.text(`Phone: ${order.orderDetails.phone}`, 100, 65);

    // Table Headers and Data
    const tableData = order.shippingDetails.map((item) => [
      item.name,
      item.quantity,
      `₹${(item.total / item.quantity).toFixed(2)}`, // Rate
      `₹${item.total.toFixed(2)}` // Amount
    ]);

    const tableHeaders = [["Item", "Quantity", "Rate", "Amount"]];

    // Adding Table
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 75,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [60, 141, 188], textColor: [255, 255, 255] },
    });

    // Summary Section
    const finalY = doc.lastAutoTable.finalY + 10;
    const subtotal = order.shippingDetails.reduce((acc, item) => acc + item.total, 0).toFixed(2);

    doc.text("Subtotal:", 140, finalY);
    doc.text(`₹${subtotal}`, 180, finalY);
    doc.text("Discount:", 140, finalY + 10);
    doc.text("₹0.00", 180, finalY + 10);
    doc.text("Paid:", 140, finalY + 30);
    doc.text(`₹${subtotal}`, 180, finalY + 30);

    // Total Section with Highlighted Background
    doc.setFillColor(60, 141, 188);
    doc.rect(140, finalY + 40, 50, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Total", 145, finalY + 47);
    doc.text(`₹${subtotal}`, 180, finalY + 47);

    // Reset Text Color to Black
    doc.setTextColor(0, 0, 0);

    // Save the PDF
    doc.save(`invoice-${order.orderId}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};



const OrderHistory = () => {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchDataFromApi(`/api/OrderHistory/orders/${username}`);
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

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Download Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{standardizeOrderId(order.orderId)}</td>
              <td className="product-info">
                {order.shippingDetails.map((item, index) => (
                  <div key={index}>
                    <strong>{item.name}</strong>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>
                ₹{order.shippingDetails.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
              </td>
              <td>{order.paymentStatus}</td>
              <td>
                <button onClick={() => generateInvoicePDF(order)} className="invoice-button">
                  Download Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
