import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { fetchDataFromApi, postData } from "../../api"; // Ensure postData is imported
import { useParams } from "react-router-dom"; // To get the product ID from URL
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "../../Css-files/ProductDetails.css";
import CartIcon from "../../Components/Headers/Cart-icon";
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [proData, setProData] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Fetch product data by ID
  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res) {
        setProData(res); // Set the fetched product data
      }
    });
  }, [id]);

  // Function to add the product to the cart
  const addToCart = async () => {
    const cartItem = {
      productId: id, // Include the product ID
      quantity: quantity,
    };

    const response = await postData("/api/cart/add", cartItem); // Make sure this endpoint is correct

    if (response.message) {
      alert(response.message); // Show a message based on the response
    }
    <CartIcon />;
  };

  if (!proData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dialog-content">
      <div className="ProductDetail">
        <div className="ProductDetail-image">
          <InnerImageZoom
            src={proData.images[0]}
            zoomSrc={proData.images[0]}
            zoomScale={1.5}
            zoomType="hover"
            className="ProductDetail-image"
          />
        </div>
        <div className="detailBox">
          <h4>{proData.name}</h4>
          <h4 className="Price-tag">₹{proData.price}</h4>
          <div className="button-group">
            <Button
              className="action-btn"
              style={{ color: "black" }}
              onClick={addToCart} // Call the addToCart function
            >
              ADD TO CART
            </Button>
            <Button className="buy-now" style={{ color: "black" }}>
              BUY NOW
            </Button>

            <div className="quantity-group">
              <Button className="quantity-btn" onClick={decrementQuantity}>
                <FaMinus />
              </Button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="quantity-input"
              />
              <Button className="quantity-btn" onClick={incrementQuantity}>
                <FaPlus />
              </Button>
            </div>
          </div>
          <ul className="product-specs">
            {proData.specifications &&
              Object.entries(proData.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
