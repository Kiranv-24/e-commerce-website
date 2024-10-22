import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material"; 
import { MdClose } from 'react-icons/md';
import InnerImageZoom from 'react-inner-image-zoom';
import AsusProart from "../../assets/images/Asusproart.jpg";
import "../../Css-files/ProductDetails.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'; 

const ItemDetailsPage = ({ onClose }) => {
    const [quantity, setQuantity] = useState(1); 

   
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

   
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="DialogBox">
            <div className="dialog-content">
                <button className='close' onClick={onClose}>
                    <MdClose />
                </button>
                <div className="ProductDetail">
                    <div className="ProductDetail-image">
                
                        <InnerImageZoom
                            src={AsusProart}  
                            zoomSrc={AsusProart} 
                            alt="AsusProart"
                            zoomScale={2}  
                            zoomType="hover"  
                        />
                    </div>
                    <div className="detailBox">
                        <h4>ASUS Proart Display PA278QV WQHD, 27 Inch Monitor</h4>
                        <h4 className="Price-tag">₹27,890</h4>
                        <div className="button-group">
                            <Button className="action-btn" style={{ color: "black" }}>ADD TO CART</Button>
                            <Button className="buy-now" style={{ color: "black" }}>BUY NOW</Button>

                           
                            <div className="quantity-group">
                                <Button className="quantity-btn" onClick={decrementQuantity}><FaMinus /></Button>
                                <input type="text" value={quantity} readOnly className="quantity-input" />
                                <Button className="quantity-btn" onClick={incrementQuantity}><FaPlus /></Button>
                            </div>
                        </div>
                        <ul className="product-specs">
                            <li><strong>Brand:</strong> ASUS</li>
                            <li><strong>Screen Size:</strong> 27 Inches</li>
                            <li><strong>Resolution:</strong> QHD Wide 1440p</li>
                            <li><strong>Aspect Ratio:</strong> 16:9</li>
                            <li><strong>Screen Surface:</strong> Flat</li>
                            <li><strong>Color Gamut:</strong> 100% sRGB, 100% Rec. 709</li>
                            <li><strong>Viewing Angle:</strong> 178°/178°</li>
                            <li><strong>ProArt Palette:</strong> Adjustable color parameters</li>
                            <li><strong>Calman Verified:</strong> Delta E color accuracy</li>
                            <li><strong>Ergonomic Stand:</strong> Tilt, swivel, pivot, and height adjustments</li>
                            <li><strong>Connectivity:</strong> Mini DisplayPort, DisplayPort, HDMI, DVI-D, USB 3.0 ports</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ItemDetailsPage;
