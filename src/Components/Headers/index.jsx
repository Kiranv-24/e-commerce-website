import React from 'react';
import Logo from "../../assets/images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Css-files/Header.css";
import { Link } from 'react-router-dom';  
import Accountbutton from "./Accountbutton";
import CartIcon from "./Cart-icon";
import SearchButton from './SearchButton';
import CategoryDisplay from './CategoryDisplay';
const Header = () => {
  return (
    <>
    <header className='headerWrapper'>
        <div className='header'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-1'></div>
              <div className='logoWrapper col-sm-1 d-flex align-items-center justify-content-center'>
                <Link to={'/'}>
                  <img src={Logo} alt='logo' />
                </Link>
              </div>
              <div className="col-sm-2 d-flex align-items-center justify-content-center part1 text-center">
                <h6 className="welcome-title">
                  Welcome <br /> to <br /><b>Electronics</b>
                </h6>
              </div>
              <SearchButton/>
              <Accountbutton />
              <CartIcon/>
              
            </div>
          </div>
        </div>
       </header>
       <CategoryDisplay/>
    
      
    </>
  );
}

export default Header;
