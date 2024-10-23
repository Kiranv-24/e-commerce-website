import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
const AccountButton = () => {
    const [isHovered, setIsHovered] = useState(false);

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
            <div className='Dropdown'>
                <ul>
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
                 
                    
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    );
};

export default AccountButton;
