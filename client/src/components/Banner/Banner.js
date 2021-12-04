import React from 'react';
import './Banner.css';
import banner from '../../assets/hero-pizza.png';
import banner2 from '../../assets/pepsi.png';

const Banner = () => {

    return (
        <div className="banner">
            <div className="brief">
                <p>Are you hungry ?</p>
                <h1>Don't Wait !</h1>
                <a href="#all">Order now</a>
            </div>
            <div className="banner-logo">
                <img src={window.location.pathname === "/" ? banner : banner2} alt="banner logo" />
            </div>
        </div>
    )
}

export default Banner;
