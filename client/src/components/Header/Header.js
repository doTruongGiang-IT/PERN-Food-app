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

    const openMenuMobile = () => {
        let menu = document.querySelector(".menu-mobile");
        if(menu.style.display === "" || menu.style.display === "none") menu.style.display = "block"
    };

    const closeMenuMobile = () => {
        let menu = document.querySelector(".menu-mobile");
        if(menu.style.display === "block") menu.style.display = "none"
    };
    
    return (
        <>
        <header className="header">
            <div className="logo">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="menu">
                <ul className="menu-list">
                    
                    {
                        (temp !== null && temp.role === "manager") ?
                        (
                            <>
                            <li className="menu-list-item">
                                <Link className="link" to="/statistics">Statistics</Link>
                            </li>
                            <li className="menu-list-item">
                                <Link className="link" to="/dashboard">Dashboard</Link>
                            </li>
                            </>
                            
                        ) : (
                            <>
                            <li className="menu-list-item">
                                <Link className="link" to="/">Pizza</Link>
                            </li>
                            <li className="menu-list-item">
                                <Link className="link" to="/drinks">Drinks</Link>
                            </li>
                            <li className="menu-list-item">
                                <Link className="link" to="/order">Orders</Link>
                            </li>
                            </>
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
                <div className="header-mobile">
                    <i onClick={openMenuMobile} className="header-icon-mobile fas fa-bars"></i>
                </div>
            </div>
        </header>
        <div className="menu-mobile w3-container w3-center w3-animate-right">
            <h2 onClick={closeMenuMobile} className="close-menu">X</h2>
            <ul className="menu-list-mobile">
                    
                {
                    (temp !== null && temp.role === "manager") ?
                    (
                        <>
                        <li className="menu-list-item-mobile">
                            <Link className="link-mobile" to="/statistics">Statistics</Link>
                        </li>
                        <li className="menu-list-item-mobile">
                            <Link className="link-mobile" to="/dashboard">Dashboard</Link>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="menu-list-item">
                            <Link className="link" to="/">Pizza</Link>
                        </li>
                        <li className="menu-list-item">
                            <Link className="link" to="/drinks">Drinks</Link>
                        </li>
                        <li className="menu-list-item-mobile">
                            <Link className="link" to="/order">Orders</Link>
                        </li>
                        </>
                    )
                }
                <li className="menu-list-item-mobile">
                    {
                        (auth && temp !== null) ? <img id="auth-mobile" onClick={userLogout} src={temp.profile ? temp.profile : authentication} alt="user" /> : <Link to="/login"><img src={profile} alt="user" /></Link>
                    }
                </li>
                <li className="menu-list-item-mobile">
                    {/* <Link className="link" to="/cart"><i class="fas fa-cart-arrow-down"></i></Link> */}
                    <Link className="link-mobile" to="/cart"><img id="cart" src={cart} alt="cart" /></Link>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header;
