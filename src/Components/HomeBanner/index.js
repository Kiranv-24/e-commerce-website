import React from "react";
import Slider from "react-slick";
import Banner1 from "../../assets/images/scroll1.jpg";
import Banner2 from "../../assets/images/scroll2.jpg";
import Banner3 from "../../assets/images/scroll3.jpg";
import CategoryDisplay from "../../Components/Headers/CategoryDisplay";
const HomeBanner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Autoplay the slides
    autoplaySpeed: 3000, // 3 seconds per slide
    arrows: true, // Enable navigation arrows
    adaptiveHeight: true, // Adjust height based on content
  };

  return (
    <div className="HomeBannerSection">
      <Slider {...settings}>
        <div className="item">
          <img src={Banner1} className="w-100" alt="Banner 1" />
        </div>
        <div className="item">
          <img src={Banner2} className="w-100" alt="Banner 2" />
        </div>
        <div className="item">
          <img src={Banner3} className="w-100" alt="Banner 3" />
        </div>
        {/* Add more banners as needed */}
      </Slider>
      <div className="CategoryDisplay">
        <CategoryDisplay />
      </div>
    </div>
  );
};

export default HomeBanner;
