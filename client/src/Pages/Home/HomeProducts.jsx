import Bannerbox from "../../assets/images/Banner-box.jpg";
import React from "react";
import SwiperSlider from "./SwiperSlider";
const HomeProducts = () => {
    return (
        <section className='Homeproducts'>
            <div className='container Homeproducts-container'>
                <div className='row Main-Product-Row'>
                    <div className='col-md-2 cursor banner'>
                        <img src={Bannerbox} alt='Bannerbox' className='img-fluid' />
                      
                    </div>
                   
                    <div className='col-md-10 Info-Block'>
                        <div className='d-flex align-items-center Homeproducts-part2'>
                            <div className='info col-md-5'>
                                <h3 className='info2'>Find Your Deals</h3>
                                <p className='tagline'>Popular items this season</p>
                            </div>
                        </div>
                      
                            <SwiperSlider/>
                  
                       
                    </div>
                   
                </div>
            </div>
        </section>
    );
};

export default HomeProducts;