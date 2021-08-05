import React from 'react';
import './Pizza.css';
import pizzaImg from '../../assets/pizza.png';
import { addToCart } from '../../features/cart/cartSlice';
import {useDispatch} from 'react-redux';

const Pizza = ({pizza}) => {
    const dispatch = useDispatch();

    return (
        <div className="pizza">
            <img src={pizzaImg} alt="pizza" />
            <h3>{pizza.name}</h3>
            <p>{pizza.size}</p>
            <div className="pizza-action">
                <h3>${pizza.price}</h3>
                <button onClick={() => dispatch(addToCart(pizza))} type="button">+ Add</button>
            </div>
        </div>
    )
}

export default Pizza;
