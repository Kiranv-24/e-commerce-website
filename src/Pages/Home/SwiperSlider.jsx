import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation } from 'swiper/modules'; 
import Rating from '@mui/material/Rating';
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import Asus from "../../assets/images/Asus.png";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import ItemDetailsPage from '../../Components/ItemDetailsPage';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../assets/images/Loading.gif";
const SwiperSlider = () => {
    const [Open, SetOpen] = useState(false);

    const ProductDetails1 = (id) => {
        SetOpen(true);
    };

    const handleClose = () => {
        SetOpen(false);
    };
    const navigate = useNavigate();  
   
    const ProductDetails = (id) => {
        navigate(`/cat/${id}`);  
    };
    return (
        <div className='Product_row'>
            <Swiper
                slidesPerView={5}
                spaceBetween={0}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                   
                    <div className="actions">
                    <Button onClick={() => ProductDetails1(1)}>
                                    <AiOutlineFullscreen />
                                </Button>
                        <Button >
                        <FcLike />
                        </Button>
                       </div>
                    <img onClick={() => ProductDetails(1)} src={Asus} className="w-100" alt="Product" />
                    <h5>Asus ProArt</h5>
                    <h6 className="text-success">In Stock</h6>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <h6>₹27,999</h6>
                    </button>
                </div>
                </SwiperSlide>
                {/* Repeat other SwiperSlide components */}
                {Open && <ItemDetailsPage onClose={handleClose} />}
                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                   
                    <div className="actions">
                    <Button onClick={() => ProductDetails(1)}>
                                    <AiOutlineFullscreen />
                                </Button>
                        <Button >
                        <FcLike />
                        </Button>
                       </div>
                    <img src={Asus} className="w-100" alt="Product" />
                    <h5>Asus ProArt</h5>
                    <h6 className="text-success">In Stock</h6>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <h6>₹27,999</h6>
                    </button>
                </div>
                </SwiperSlide>
                {/* Repeat other SwiperSlide components */}
                {Open && <ItemDetailsPage onClose={handleClose} />}
            </Swiper>
            
        </div>
    );
};

export default SwiperSlider;
