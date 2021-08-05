import React, {useEffect} from 'react';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Pizzas from '../../components/Pizzas/Pizzas';
import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import {getPizzas, selectPizzas} from '../../features/pizzas/pizzaSlice';

const HomePage = () => {
    const pizzas = useSelector(selectPizzas);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPizzas());
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="home-page">
            <Header />
            <Banner />
            <Pizzas pizzas={pizzas} />
        </div>
    )
}

export default HomePage;
