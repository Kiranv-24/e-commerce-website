
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BannerGif1 from "../../assets/images/scrollGif1.gif"; 
import BannerGif2 from "../../assets/images/scrollGif2.gif";


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};


const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <div className="HomeBannerSection">
      <div className="banner-content">
        <Slider {...settings} className="gif-slider">
          <div className="item">
            <img src={BannerGif1} className="w-100" alt="Banner GIF 1" />
          </div>
          <div className="item">
            <img src={BannerGif2} className="w-100" alt="Banner GIF 2" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;