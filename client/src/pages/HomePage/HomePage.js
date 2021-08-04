import React from 'react';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Pizzas from '../../components/Pizzas/Pizzas';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <Banner />
            <Pizzas />
        </div>
    )
}

export default HomePage;
