// import React from "react";
import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


const AccountButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="col-sm-1 d-flex align-items-center part3">
            
                <button className='circle d-flex justify-content-evenly'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                ><VscAccount  />
               
                {isHovered ? <IoMdArrowDropup className="Arrow" /> : <IoMdArrowDropdown className="Arrow" />}
                </button>
            </div>
       
    );
};

export default AccountButton;
