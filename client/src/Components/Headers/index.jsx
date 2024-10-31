import React from 'react';
import Logo from "../../assets/images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';  
import Accountbutton from "./Accountbutton";
import CartIcon from "./Cart-icon";
import SearchButton from './SearchButton';
import "../../Css-files/CategoryDisplay.css";

const Header = () => {
  return (
    <>
      <header className='headerWrapper'>
        <div className='header container-fluid'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='logoWrapper d-flex align-items-center justify-content-center'>
              <Link to={'/'}>
                <img src={Logo} alt='logo' />
              </Link>
            </div>
            <div className="d-flex align-items-center justify-content-center part1 text-center">
              <h6 className="welcome-title">
                Welcome <br /> to <br /><b>Electronics</b>
              </h6>
            </div>
            <SearchButton />
            <Accountbutton />
            <CartIcon />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
