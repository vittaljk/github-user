import React from 'react';
import './SearchBar.scss';

function SearchBar({ searchHandler }) {
    return (
        <div>
            <input className="search-input" type="text" placeholder="Search repositories..." onChange={searchHandler}/>
        </div>
    )
}

export default SearchBar
