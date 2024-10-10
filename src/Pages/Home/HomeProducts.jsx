import Bannerbox from "../../assets/images/Banner-box.jpg";
import MobileProducts from "../../assets/images/mobile-product.jpg";
import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import { Navigation } from 'swiper/modules'; // Import necessary modules
import Rating from '@mui/material/Rating';

const HomeProducts = () => {
    return (
        <section className='Homeproducts'>
            <div className='container Homeproducts-container'>
                <div className='row'>
                    <div className='col-md-2 cursor banner'>
                        <img src={Bannerbox} alt='Bannerbox' className='img-fluid' />
                    </div>
                    <div className='col-md-8 Info-Block'>
                        <div className='d-flex align-items-center Homeproducts-part2'>
                            <div className='info col-md-5'>
                                <h3 className='info2'>Find Your Deals</h3>
                                <p className='tagline'>Popular items this season</p>
                            </div>
                        </div>
                        <div className='Product_row'>
                            <Swiper
                                slidesPerView={5} // Show 4 products per slide
                                spaceBetween={0} // Reduce space between slides
                                navigation={true}
                                modules={[Navigation]}
                              
                                className="mySwiper"
                            >
                                {[...Array(12)].map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='item ProductItem'>
                                            <div className="imgWrapper">
                                                <img src={MobileProducts} className="w-100" alt="Product" />
                                            
                                            <h5>Product {index + 1}</h5>
                                            <h6 className="text-success">In Stock</h6>
                                            <Rating name="read-only" value={5} readOnly size="small" />
                                            <h6>Price</h6>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className='col-md-1 View-all-button'>
                        <Button
                            className='View-all'
                            style={{ textTransform: 'none' }}
                        >
                            View all
                            <div className="arrow">
                                <span></span><span></span><span></span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeProducts;
