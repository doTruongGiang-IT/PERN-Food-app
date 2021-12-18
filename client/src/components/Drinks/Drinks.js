import React, {useState} from 'react';
import '../Pizzas/Pizzas.css';
import Drink from '../Drink/Drink';

const Drinks = ({drinks, handleSearch}) => {
    const [search, setSearch] = useState("");

    const sendSearch = () => {
        handleSearch(search);
        setSearch("");
    };

    return (
        <div className="pizzas">
            <div className="search_filter">
                <h3 id="all">All Drinks</h3>
                <div id="search_filter">
                    <input type="text" placeholder="Enter key search..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button onClick={sendSearch}>Search</button>
                </div>
            </div>
            <div>
                {
                    drinks ? 
                    drinks.map((drink, index) => {
                        drink = {...drink, qty: 1};
                        return <Drink key={index} drink={drink} />
                    }) : null
                }
            </div>
        </div>
    )
}

export default Drinks
