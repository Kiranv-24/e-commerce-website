import React from "react";
import { BsSearch } from "react-icons/bs";
const SearchButton=()=>{
    return (
    <div className="col-sm-5 d-flex align-items-center justify-content-center part2 text-center">
        <div className='headerSearch d-flex justify-content-evenly'>
          <span className="BsSearch"><BsSearch /></span>
          <input type="text" placeholder="Search for products..." />
        </div>
      </div>
      );
}
export default SearchButton;