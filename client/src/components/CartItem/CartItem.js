import React from 'react';
import './CartItem.css';
import pizza from '../../assets/pizza.png';

const CartItem = () => {
    return (
        <div className="cart-item">
            <div className="item-info">
                <img src={pizza} alt="pizza" />
                <div className="sub-info">
                    <h3>Name</h3>
                    <p>Size</p>
                </div>
            </div>
            <div className="item-quantity">
                <p>2 Pcs</p>
            </div>
            <div className="item-price">
                <p>$123</p>
            </div>
        </div>
    )
}

export default CartItem;