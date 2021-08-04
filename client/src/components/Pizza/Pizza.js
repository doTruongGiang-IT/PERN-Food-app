import React from 'react';
import './Pizza.css';
import pizza from '../../assets/pizza.png';

const Pizza = () => {
    return (
        <div className="pizza">
            <img src={pizza} alt="pizza" />
            <h3>Name</h3>
            <p>Size</p>
            <div className="pizza-action">
                <h3>$123</h3>
                <button type="button">+ Add</button>
            </div>
        </div>
    )
}

export default Pizza;
