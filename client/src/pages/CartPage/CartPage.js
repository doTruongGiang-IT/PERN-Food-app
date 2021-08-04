import React from 'react';
import Header from '../../components/Header/Header';
import './CartPage.css';
import empty from '../../assets/empty-cart.png'
import cart from '../../assets/cart-black.png';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';

const CartPage = () => {
    return (
        <div className="cart-page">
            <Header />
            <div className="cart-section">
                {/* <div className="cart-empty">
                    <h2>Cart Empty</h2>
                    <p>Your probably haven't ordered a pizza yet.</p>
                    <p>To order a pizza go to the main page.</p>
                    <img id="empty" src={empty} alt="empty cart" />
                    <Link to=""><button type="button">Go back</button></Link>
                </div> */}
                <div className="cart-fill">
                    <div className="cart-logo">
                        <img src={cart} alt="cart" />
                        <h3>Order Summary</h3>
                    </div>
                    <hr />
                    <div className="cart-list">
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>
                    <hr />
                    <div className="cart-total">
                        <p id="total">Total Amount: <h3>$123</h3></p>
                        <input type="text" placeholder="Address..." />
                        <button type="button">Order now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
