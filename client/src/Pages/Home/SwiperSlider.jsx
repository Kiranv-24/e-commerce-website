import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Rating from "@mui/material/Rating";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../api";
import ItemDetailsPage from "../../Components/ItemDetailsPage";

const SwiperSlider = () => {
  const [open, setOpen] = useState(false);
  const [proData, setProData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store clicked product details
  const navigate = useNavigate();

  const ProductDetails1 = (product) => {
    // console.log(product._id)
    setSelectedProduct(product); // Set the clicked product as selected
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedProduct(null); // Reset selected product
  };

  const ProductDetails = (id) => {
    navigate(`/product/${id}`); // Navigate to product detail page with product ID
  };

  useEffect(() => {
    fetchDataFromApi("/api/product/").then((res) => {
      if (res && res.length > 0) {
        setProData(res);
      }
    });
  }, []);

  return (
    <div className="Product_row">
      <Swiper
        slidesPerView={proData.length < 6 ? proData.length : 5}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {proData?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="item ProductItem">
              <button className="imgWrapper">
                <span className="badge badge-primary zindex-1000">28%</span>

                <div className="actions">
                  <Button onClick={() => ProductDetails1(product)}>
                    <AiOutlineFullscreen />
                  </Button>
                  <Button>
                    <FcLike />
                  </Button>
                </div>

                <img
                  onClick={() => ProductDetails(product._id)} // Pass the product ID
                  src={product.images[0] || "fallbackImageURL"}
                  className="w-100"
                  alt={product.name}
                  style={{ objectFit: "contain", maxHeight: "200px" }}
                />
                <h5>{product.name}</h5>

                <h6
                  className={
                    product.countofstocks > 0 ? "text-success" : "text-danger"
                  }
                >
                  {product.countofstocks > 0
                    ? `In Stock (${product.countofstocks})`
                    : "Out of Stock"}
                </h6>

                <Rating
                  name="read-only"
                  value={product.rating || 0}
                  readOnly
                  size="small"
                />
                <h6>{`₹${product.price}`}</h6>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Render ItemDetailsPage as a modal */}
      {open && (
        <ItemDetailsPage product={selectedProduct} onClose={handleClose} />
      )}
    </div>
  );
};

export default SwiperSlider;
