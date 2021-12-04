import React from 'react';
import './Pizza.css';
import pizzaImg from '../../assets/pizza.png';
import { addToCart } from '../../features/cart/cartSlice';
import {useDispatch} from 'react-redux';

const Pizza = ({pizza}) => {
    const dispatch = useDispatch();

    return (
        <div className="pizza">
            <img src={pizza.product_image} alt="pizza" />
            <h3>{pizza.product_name}</h3>
            <p>Size: {pizza.product_size}</p>
            <div className="pizza-action">
                <h3>${pizza.product_price}</h3>
                <button onClick={() => dispatch(addToCart(pizza))} type="button">+ Add</button>
            </div>
            <div className="description">
                {pizza.product_desc}
            </div>
        </div>
    )
}

export default Pizza;
