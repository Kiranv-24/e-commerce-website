import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

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
                    <li>
                     New Customer? 
                      <t />
                        <b style={{ color: "#0202aa", fontWeight: 700 }}>Signup</b>
                    </li>
                    <li>Login</li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    );
};

export default AccountButton;
