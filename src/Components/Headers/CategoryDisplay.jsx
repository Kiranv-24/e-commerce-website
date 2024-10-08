import React from "react";
import MobilePhoto from "../../assets/images/Mobile.jpg";
import LaptopPhoto from "../../assets/images/Laptop.jpg";
// import TVPhoto from "../../assets/images/TV.jpg"; // Adding another product image
import { Link } from "react-router-dom";
import "../../Css-files/CategoryDisplay.css";

const CategoryDisplay = () => {
  return (
    <div className="CategoryWrapper">
      <div className="Category">
        <div className="container">
          <div className="Category-row row d-flex justify-content-evenly">
            <div className="MobileWrapper col-sm-3 d-flex align-items-center justify-content-center">
              <div className="MobileCategory d-flex flex-column align-items-center">
                <Link to={"/"}>
                  <img
                    src={MobilePhoto}
                    alt="MobilePhoto"
                    className="category-img"
                  />
                </Link>
                <p>Mobiles</p>
              </div>
            </div>

            <div className="MobileWrapper col-sm-3 d-flex align-items-center justify-content-center">
              <div className="MobileCategory d-flex flex-column align-items-center">
                <Link to={"/"}>
                  <img
                    src={LaptopPhoto}
                    alt="LaptopPhoto"
                    className="category-img"
                  />
                </Link>
                <p>Laptops</p>
              </div>
            </div>

            <div className="MobileWrapper col-sm-3 d-flex align-items-center justify-content-center">
              <div className="MobileCategory d-flex flex-column align-items-center">
                <Link to={"/"}>
                  <img
                    src={MobilePhoto}
                    alt="TVPhoto"
                    className="category-img"
                  />
                </Link>
                <p>Televisions</p>
              </div>
            </div>

            <div className="MobileWrapper col-sm-3 d-flex align-items-center justify-content-center">
              <div className="MobileCategory d-flex flex-column align-items-center">
                <Link to={"/"}>
                  <img
                    src={MobilePhoto}
                    alt="MobilePhoto"
                    className="category-img"
                  />
                </Link>
                <p>Mobiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplay;
