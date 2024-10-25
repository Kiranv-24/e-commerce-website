import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material"; 
import { MdClose } from 'react-icons/md';
import InnerImageZoom from 'react-inner-image-zoom';
import "../../Css-files/ProductDetails.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { useParams } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../api";
const ItemDetailsPage = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1); 
  const id  = product._id;
  console.log(id);
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    const addToCart = async () => {
    const cartItem = {
      productId: id, // Include the product ID
      quantity: quantity,
    };
  console.log(id);
    const response = await postData("/api/cart/add", cartItem); // Make sure this endpoint is correct

    if (response.message) {
      alert(response.message); // Show a message based on the response
    }
    // <CartIcon />;
  };

    if (!product) {
        return null;  // If no product is passed, don't render anything
    }

    return (
        <Dialog open={true} onClose={onClose} className="DialogBox">
            <div className="dialog-content">
                <button className='close' onClick={onClose}>
                    <MdClose />
                </button>
                <div className="ProductDetail">
                    <div className="ProductDetail-image">
                        <InnerImageZoom
                            src={product.images[0]}  // Dynamic product image
                            zoomSrc={product.images[0]} 
                            alt={product.name}
                            zoomScale={2}  
                            zoomType="hover"  
                        />
                    </div>
                    <div className="detailBox">
                        <h4>{product.name}</h4>
                        <h4 className="Price-tag">₹{product.price}</h4>
                        <div className="button-group">
                           <Button
                              className="action-btn"
                              style={{ color: "black" }}
                              onClick={addToCart} // Call the addToCart function
                            >ADD TO CART</Button>
                            <Button className="buy-now" style={{ color: "black" }}>BUY NOW</Button>
                            <div className="quantity-group">
                                <Button className="quantity-btn" onClick={decrementQuantity}><FaMinus /></Button>
                                <input type="text" value={quantity} readOnly className="quantity-input" />
                                <Button className="quantity-btn" onClick={incrementQuantity}><FaPlus /></Button>
                            </div>
                        </div>
                        <ul className="product-specs">
                            {product.specifications &&
                                Object.entries(product.specifications).map(([key, value]) => (
                                    <li key={key}><strong>{key}:</strong> {value}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ItemDetailsPage;