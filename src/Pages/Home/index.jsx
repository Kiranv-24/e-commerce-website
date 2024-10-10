import HomeBanner from '../../Components/HomeBanner';
import "../../Css-files/Home.css";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeProducts from "./HomeProducts";
const Home = () => {
    return (
        <>
            <HomeBanner />
            <HomeProducts/>
            <HomeProducts/>
            
        </>
    );
}

export default Home;
