import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png';

function Header() { 
    return (
        <div className="header-container">
            <div>
                <a href="#home">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="header-logo" 
                    />
                </a>
            </div>
            <ul className="header-nav">
                <li>
                    <a href="#home">Home</a>
                </li>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
                <li>
                    <a href="#services">Services</a>
                </li>
            </ul>
        </div>
    );
}

export default Header;
