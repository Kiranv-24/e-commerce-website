import  SwiperSlider from './SwiperSlider'; 
import Boat from "../../assets/images/boat.jpg";
const NewProducts=()=>{
    return (
        <section className='Homeproducts'>
           
                <div className='row Main-Product-Row'>
                    <div className='col-md-2 cursor banner'>
                        <img src={Boat} alt='Bannerbox' className='img-fluid' />
                      
                    </div>
                   
                    <div className='col-md-10 Info-Block'>
                        <div className='d-flex align-items-center Homeproducts-part2'>
                            <div className='info col-md-5'>
                                <div className='Info-Block-2'>
                                <h3 className='info2'>Latest Products</h3>
                                <p className='tagline'>Popular items this season</p>
                                </div>
                            </div>
                        </div>
                        <div className='Product_row'>
                           <SwiperSlider/>
                        </div>
              
                    
                </div>
            </div>
        </section>

    );
}
export default NewProducts; 