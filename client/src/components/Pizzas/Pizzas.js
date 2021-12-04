import React, {useState} from 'react';
import Pizza from '../Pizza/Pizza';
import './Pizzas.css';

const Pizzas = ({pizzas, handleFilter, handleSearch}) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const sendSearch = () => {
        handleSearch(search);
        setSearch("");
    };

    return (
        <div className="pizzas">
            <div className="search_filter">
                <h3 id="all">All Pizzas</h3>
                <div id="search_filter">
                    <input type="text" placeholder="Enter key search..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button onClick={sendSearch}>Search</button>
                    <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} onClick={() => handleFilter(filter)}>
                        <option value="all">All</option>
                        <option value="large">Large</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                    </select>
                </div>
            </div>
            <div>
                {
                    pizzas ? 
                    pizzas.map((pizza, index) => {
                        pizza = {...pizza, qty: 1, moreCheese: false};
                        return <Pizza key={index} pizza={pizza} />
                    }) : null
                }
            </div>
        </div>
    )
}

export default Pizzas;
