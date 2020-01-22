import React from 'react';
import './Header.scss';
import githubLogo from '../../../assets/github.png';

function Header() {
    return (
        <div className="header">
            <img className="logo" src={githubLogo} alt="githubLogo"/>
        </div>
    )
}

export default Header
