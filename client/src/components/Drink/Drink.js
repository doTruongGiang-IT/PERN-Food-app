import React from 'react';
import '../Pizza/Pizza.css';
import pizzaImg from '../../assets/pizza.png';
import { addToCart } from '../../features/cart/cartSlice';
import {useDispatch} from 'react-redux';

const Drink = ({drink}) => {
    const dispatch = useDispatch();

    return (
        <div className="pizza">
            <img src={drink.product_image} alt="drink" />
            <h3>{drink.product_name}</h3>
            <div className="pizza-action">
                <h3>${drink.product_price}</h3>
                <button onClick={() => dispatch(addToCart(drink))} type="button">+ Add</button>
            </div>
        </div>
    )
}

export default Drink;
