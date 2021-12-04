import React, {useEffect} from 'react';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Drinks from '../../components/Drinks/Drinks';
import '../HomePage/HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import {getDrinks, selectDrinks} from '../../features/pizzas/pizzaSlice';
import {searchDrinks, selectSearchAndFilterDrinks} from '../../features/pizzas/pizzaSlice';

const DrinksPage = () => {
    const drinks = useSelector(selectDrinks);
    const searchAndFilter = useSelector(selectSearchAndFilterDrinks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDrinks());
    }, [dispatch]);

    const handleSearch = (searchKey) => {
        dispatch(searchDrinks(searchKey));
    };

    return (
        <div className="home-page">
            <Header />
            <Banner />
            <Drinks drinks={searchAndFilter.length > 0 ? searchAndFilter : drinks} handleSearch={handleSearch} />
        </div>
    )
}

export default DrinksPage;
