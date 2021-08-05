import React from 'react';
import Pizza from '../Pizza/Pizza';
import './Pizzas.css';

const Pizzas = ({pizzas}) => {
    return (
        <div className="pizzas">
            <h3 id="all">All Pizzas</h3>
            <div>
                {
                    pizzas ? 
                    pizzas.map((pizza, index) => {
                        pizza = {...pizza, qty: 1};
                        return <Pizza key={index} pizza={pizza} />
                    }) : null
                }
            </div>
        </div>
    )
}

export default Pizzas;
