import HomeBanner from '../../Components/HomeBanner';
import "../../Css-files/Home.css";
import "../../Css-files/HomeProducts.css";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeProducts from "./HomeProducts";
import NewProducts from './NewProducts';
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <HomeBanner />
            <HomeProducts/>
            <NewProducts/>
         
            
        </>
    );
}

export default Home;
