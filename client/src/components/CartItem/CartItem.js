import React from 'react';
import './CartItem.css';
import pizza from '../../assets/pizza.png';
import { useDispatch } from 'react-redux';
import {removeFromCart} from '../../features/cart/cartSlice';

const CartItem = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <div className="item-info">
                <img src={pizza} alt="pizza" />
                <div className="sub-info">
                    <h3>{item.name}</h3>
                    <p>{item.size}</p>
                </div>
            </div>
            <div className="item-quantity">
                <p>{item.qty} Pcs</p>
            </div>
            <div className="item-price">
                <p>${item.price}</p>
            </div>
            <div className="item-remove">
                <i onClick={() => dispatch(removeFromCart(item.id))} className="far fa-trash-alt"></i>
            </div>
        </div>
    )
}

export default CartItem;