import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BannerGif1 from "../../assets/images/scrollGif1.gif"; // Import your GIF here
import BannerGif2 from "../../assets/images/scrollGif2.gif"; // Import your GIF here
import CategoryDisplay from "../../Components/Headers/CategoryDisplay";

// Custom Next Arrow component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

// Custom Prev Arrow component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

const HomeBanner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />, // Use custom Next arrow
    prevArrow: <PrevArrow />, // Use custom Prev arrow
    adaptiveHeight: true,
  };

  return (
    <div className="HomeBannerSection">
      <div className="banner-content">
        <div className="category-block">
          <CategoryDisplay />
        </div>
        <Slider {...settings} className="gif-slider">
          <div className="item">
            <img src={BannerGif1} className="w-100" alt="Banner GIF 1" />
          </div>
          <div className="item">
            <img src={BannerGif2} className="w-100" alt="Banner GIF 1" />
          </div>
          {/* You can add more GIFs here if needed */}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
