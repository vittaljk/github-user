import React from 'react';
import './SearchBar.scss';

function SearchBar() {
    return (
        <div>
            <input className="search-input" type="text" placeholder="Search repositories..."/>
        </div>
    )
}

export default SearchBar
