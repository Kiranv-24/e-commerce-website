import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { fetchDataFromApi, postData, deleteData } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "../../Css-files/ProductDetails.css";
import CartIcon from "../../Components/Headers/Cart-icon";
import { Toaster, toast } from "react-hot-toast";
import MyContext from "../../Mycontext/index.js";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { setCartCount, cartCount } = useContext(MyContext);
  const [proData, setProData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [addeditem, detaddeditem] = useState(null);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;

    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setQuantity(value === "" ? "" : parseInt(value));
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res) {
        setProData(res);
      }
    });
  }, [id]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addToCart = async () => {
    if (!username) {
      toast.error("Login to your account");
      navigate("/login");
      return;
    }

    const cartItem = {
      productId: id,
      quantity: quantity,
      username,
    };

    const response = await postData("/api/cart/add", cartItem);
    if (response) {
      const res = await fetchDataFromApi(`/api/cart/${username}`);
      localStorage.setItem("cartCount", res.cartitems.length);
      setCartCount(res.cartitems.length);

      toast.success("Item added to cart");
    }
    // <CartIcon />;
  };

  if (!proData) {
    return <div>Loading...</div>;
  }
  const goBack = () => {
    navigate("/");
  };
  const buyNow = async () => {
    if (!username) {
      toast.error("Login to your account");
      navigate("/login");
      return;
    }

    try {
      await addToCart();
      const result = await fetchDataFromApi(`/api/cart/${username}`);
      localStorage.setItem("cartCount", result.cartitems.length);
      setCartCount(result.cartitems.length);

      // const res = await fetchDataFromApi(`/api/Cart/${username}`);
      // console.log(res);
      // console.log(cartItem);
      await deleteData(`/api/checkout/clear-shipping/${username}`);
      const cartitems = [
        {
          name: proData.name,
          price: proData.price,
        },
      ];
      // console.log(response.status);
      // if (response.success) {
      navigate(`/Checkout?ref=nav_cart`, {
        state: {
          cartItems: cartitems,
          quantities: [1],
        },
      });
      // }
    } catch (error) {
      toast.error("Error in sending data", error);
    }
  };

  return (
    <div className="dialog-content">
      <div className="go-back-button-container">
        <Button onClick={goBack} className="go-back-button">
          Go Back
        </Button>
      </div>
      <div className="ProductDetail">
        <div className="ProductDetail-image">
          {windowWidth < 768 ? (
            <img
              src={proData.images[0]}
              alt={proData.name}
              style={{ maxWidth: "80%", borderRadius: "10px" }}
            />
          ) : (
            <InnerImageZoom
              src={proData.images[0]}
              zoomSrc={proData.images[0]}
              zoomScale={1.5}
              zoomType="hover"
              className="ProductDetail-image"
            />
          )}
        </div>
        <div className="detailBox">
          <h4>{proData.name}</h4>
          <h4 className="Price-tag">₹{proData.price}</h4>
          <div className="button-group">
            <Button
              className="action-btn"
              style={{ color: "black" }}
              onClick={addToCart}
            >
              ADD TO CART
            </Button>
            <Button
              className="buy-now"
              style={{ color: "black" }}
              onClick={buyNow}
            >
              BUY NOW
            </Button>
            <div className="quantity-group">
              <Button className="quantity-btn" onClick={decrementQuantity}>
                <FaMinus />
              </Button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
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
