import React, {useEffect} from 'react';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Pizzas from '../../components/Pizzas/Pizzas';
import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import {getPizzas, selectPizzas, search, filter, selectSearchAndFilterPizzas} from '../../features/pizzas/pizzaSlice';

const HomePage = () => {
    const pizzas = useSelector(selectPizzas);
    const searchAndFilter = useSelector(selectSearchAndFilterPizzas);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPizzas());
    }, [dispatch]);

    const handleSearch = (searchKey) => {
        dispatch(search(searchKey));
    };

    const handleFilter = (filterKey) => {
        dispatch(filter(filterKey));
    };
    
    return (
        <div className="home-page">
            <Header />
            <Banner />
            <Pizzas pizzas={searchAndFilter.length > 0 ? searchAndFilter : pizzas} handleFilter={handleFilter} handleSearch={handleSearch} />
        </div>
    )
}

export default HomePage;
