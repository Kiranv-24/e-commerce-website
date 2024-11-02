import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Rating from "@mui/material/Rating";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../api";
import ItemDetailsPage from "../../Components/ItemDetailsPage";
import SearchButton from "../../Components/Headers/SearchButton";
import MyContext from "../../Mycontext/index.js";
const SwiperSlider = () => {
  const [open, setOpen] = useState(false);
  const [proData, setProData] = useState([]);
  const { productquery } = useContext(MyContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [swiperKey, setSwiperKey] = useState(0);
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

        setSwiperKey((prevKey) => prevKey + 1);
      }
    });
  }, []);
  useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1);
  }, [productquery, proData]);
  const filteredProducts =
    productquery && productquery.trim() !== ""
      ? proData.filter((product) =>
          product.name.toLowerCase().includes(productquery.toLowerCase())
        )
      : proData;
  return (
    <div className="Product_row">
      <Swiper
        key={swiperKey}
        slidesPerView={
          filteredProducts.length < 6 ? filteredProducts.length : 5
        }
        spaceBetween={1}
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
        {(filteredProducts.length > 0 ? filteredProducts : proData)?.map(
          (product, index) => (
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
                    onClick={() => ProductDetails(product._id)}
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
          )
        )}
      </Swiper>

      {open && (
        <ItemDetailsPage product={selectedProduct} onClose={handleClose} />
      )}
    </div>
  );
};

export default SwiperSlider;
