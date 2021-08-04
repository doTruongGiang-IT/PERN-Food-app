import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import profile from '../../assets/profile.png';
import cart from '../../assets/cart.png'

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="menu">
                <ul className="menu-list">
                    <li className="menu-list-item">
                        <a className="link" href="#all">Menu</a>
                    </li>
                    <li className="menu-list-item">
                        <a className="link" href="#all">Offers</a>
                    </li>
                    <li className="menu-list-item">
                        <Link className="link" to="/order">Orders</Link>
                    </li>
                    <li className="menu-list-item">
                        <img src={profile} alt="user" />
                    </li>
                    <li className="menu-list-item">
                        {/* <Link className="link" to="/cart"><i class="fas fa-cart-arrow-down"></i></Link> */}
                        <Link className="link" to="/cart"><img id="cart" src={cart} alt="cart" /></Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;
