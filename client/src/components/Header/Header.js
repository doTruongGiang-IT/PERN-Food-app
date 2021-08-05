import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import profile from '../../assets/profile.png';
import authentication from '../../assets/hau.png';
import cart from '../../assets/cart.png'
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, logout} from '../../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));

    const userLogout = () => {
        localStorage.removeItem("pern_food_auth");
        dispatch(logout());
    };
    
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
                    {
                        (temp !== null && temp.role === "admin") ?
                        (
                            
                            <li className="menu-list-item">
                                <Link className="link" to="/dashboard">Dashboard</Link>
                            </li>
                        ) : (
                            <li className="menu-list-item">
                                <Link className="link" to="/order">Orders</Link>
                            </li>
                        )
                    }
                    <li className="menu-list-item">
                        {
                            (auth && temp !== null) ? <img onClick={userLogout} src={temp.profile ? temp.profile : authentication} alt="user" /> : <Link to="/login"><img src={profile} alt="user" /></Link>
                        }
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
