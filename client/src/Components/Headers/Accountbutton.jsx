import React, { useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {OrderHistory} from "../../"
const username=localStorage.getItem("username");
const AccountButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        // Check login status from localStorage
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        // Clear login state from localStorage
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        localStorage.removeItem("username");
        // Redirect to login page
        history("/login");
    };
   const orderHistory=()=>{
    history(`/OrderHistory/${username}`)
   }
  
    return (
        <div className="col-sm-1 d-flex align-items-center part3">
            <div className="part3">
                <button
                    className='circle d-flex justify-content-evenly account-button position-relative'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <VscAccount />
                    {isHovered ? <IoMdArrowDropup className="Arrow" /> : <IoMdArrowDropdown className="Arrow" />}
                </button>
            </div>
            <div className='Dropdown ' >
          
                {isLoggedIn&&<ul style={{height:"auto"}}>
                <button className="btn btn-link p-0 w-100">
                    <li  className="w-100">
                                    
                                        Account
                                    
                                </li>
                                </button>
                <button className="btn btn-link p-0 w-100" onClick={orderHistory}>
                    <li  className="w-100">
                                    
                                        Orders
                                    
                                </li>
                                </button>
                <button className="btn btn-link p-0 w-100">
                    <li onClick={handleLogout} className="w-100">
                                    
                                        Logout
                                    
                                </li>
                                </button>

                        
                      
                </ul>}
          
                {!isLoggedIn&&<ul>
                <button className="btn btn-link p-0 w-100" >
                <Link to="/Signup" className="no-underline" style={{textDecoration:"none"}} >
                    <li>
                     New Customer? 
                      <t/>
                        <b style={{ color: "#0202aa", fontWeight: 700 }}>Signup</b>
                    </li>
                    </Link>
                    </button>
                    <button className="btn btn-link p-0 w-100" >
                        <Link to="/Login" className="no-underline" >
                        <li>
                        Login
                        </li>
                        </Link>
                       
                    </button>
   
                </ul>}
            </div>
        </div>
    );
};

export default AccountButton;
