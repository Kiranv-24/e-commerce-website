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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [swiperKey, setSwiperKey] = useState(0); // To refresh Swiper on data reload
  const navigate = useNavigate();

  const ProductDetails1 = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const ProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    fetchDataFromApi("/api/product/").then((res) => {
      if (res && res.length > 0) {
        setProData(res);
        setSwiperKey(prevKey => prevKey + 1); // Update swiperKey to refresh Swiper
      }
    });
  }, []);

  return (
    <div className="Product_row">
      <Swiper
        key={swiperKey} // Force Swiper to re-render
        slidesPerView={proData.length < 6 ? proData.length : 5}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {proData?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="item ProductItem">
              <button className="imgWrapper">
                <span className="badge badge-primary zindex-1000">28%</span>
                <div className="actions">
                  <Button onClick={() => ProductDetails(product._id)} >
                    <AiOutlineFullscreen />
                  </Button>
                  <Button>
                    <FcLike />
                  </Button>
                </div>
                <img
                  onClick={() => ProductDetails(product._id)}
                  src={product.images[0] || "fallbackImageURL"}
                  className="w-100"
                  alt={product.name}
                  style={{ objectFit: "contain", maxHeight: "200px" }}
                />
                <h5>{product.name}</h5>
                <h6 className={product.countofstocks > 0 ? "text-success" : "text-danger"}>
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

      {open && (
        <ItemDetailsPage product={selectedProduct} onClose={handleClose} />
      )}
    </div>
  );
};

export default SwiperSlider;
