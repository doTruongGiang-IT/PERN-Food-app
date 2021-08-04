import React from 'react';
import Pizza from '../Pizza/Pizza';
import './Pizzas.css';

const Pizzas = () => {
    return (
        <div className="pizzas">
            <h3 id="all">All Pizzas</h3>
            <div>
                <Pizza />
                <Pizza />
                <Pizza />
                <Pizza />
                <Pizza />
                <Pizza />
                <Pizza />
                <Pizza />
            </div>
        </div>
    )
}

export default Pizzas;
