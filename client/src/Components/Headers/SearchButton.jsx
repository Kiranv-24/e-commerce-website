
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchButton = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
       
        if (onSearch) {
            onSearch(query); 
        }
    };

    return (
        <div className="col-sm-5 d-flex align-items-center justify-content-center part2 text-center">
            <div className='headerSearch d-flex justify-content-evenly'>
                <span className="BsSearch"><BsSearch /></span>
                <input 
                    type="text" 
                    placeholder="Search for products..." 
                    value={searchQuery}
                    onChange={handleChange} 
                />
            </div>
        </div>
    );
};

export default SearchButton;
