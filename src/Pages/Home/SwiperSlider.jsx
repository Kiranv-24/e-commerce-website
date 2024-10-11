import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation } from 'swiper/modules'; 
import Rating from '@mui/material/Rating';
import MicrosoftSurfacePro from "../../assets/images/MicrosoftSurfacePro.png";
import Asus from "../../assets/images/Asus.png";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

const SwiperSlider=()=>{
    return (
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
                       <Button >
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

                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                    <div className="actions">
                       <Button >
                        <AiOutlineFullscreen />
                        </Button>
                        <Button >
                        <FcLike />
                        </Button>
                       </div>
                    <img src={MicrosoftSurfacePro} className="w-100" alt="Product" />
                    <h5>Asus ProArt</h5>
                    <h6 className="text-success">In Stock</h6>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <h6>₹27,999</h6>
                    </button>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                    <div className="actions">
                       <Button >
                        <AiOutlineFullscreen />
                        </Button>
                        <Button >
                        <FcLike />
                        </Button>
                       </div>
                    <img src={MicrosoftSurfacePro} className="w-100" alt="Product" />
                    <h5>Asus ProArt</h5>
                    <h6 className="text-success">In Stock</h6>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <h6>₹27,999</h6>
                    </button>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                   
                    <div className="actions">
                       <Button >
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
                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                   
                    <div className="actions">
                       <Button >
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
                <SwiperSlide>
                <div className="item ProductItem">
                    <button className="imgWrapper">
                    <span className="badge badge-primary">28%</span>
                   
                    <div className="actions">
                       <Button >
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
    
    </Swiper>
    );
}
export default SwiperSlider;