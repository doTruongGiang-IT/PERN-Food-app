import React, {useEffect, useRef} from 'react';
import ReactToPrint from 'react-to-print';
import './StatisticsPage.css';
import Header from '../../components/Header/Header';
import { getAllProducts, selectAllProducts } from '../../features/pizzas/pizzaSlice';
import { getAllOrder, selectCusOrders } from '../../features/order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectAuth } from '../../features/auth/authSlice';
import AreaChartComponent from '../../components/AreaChart/AreaChart';
import PieChartComponent from '../../components/PieChart/PieChart';
import BarChartComponent from '../../components/BarChart/BarChart';
import { getStatisticsOrders, selectOrderStatus, selectDataPizza, getStatisticsPizza } from '../../features/statistics/statistics';
// import { statisticsBestSeller, statisticsIncome, selectDataPizza } from '../../features/statistics/statistics';

const StatisticsPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectCusOrders);
    const products = useSelector(selectAllProducts);
    const history = useHistory();
    const auth = useSelector(selectAuth);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const statisticsOrder = useSelector(selectOrderStatus);
    const statisticsPizza = useSelector(selectDataPizza);
    let dataPizza = [];
    let dataOrder = [];
    const areaRef = useRef();
    const barRef = useRef();

    dataPizza = statisticsPizza.length > 0 ? statisticsPizza.map(pizza => {
        return {"name": pizza.productid, "value": Number.parseInt(pizza.number)};
    }) : [];

    if(products.length > 0) {
        for(let i in products) {
            for(let j in dataPizza) {
                if(products[i].productid === dataPizza[j].name) {
                    dataPizza[j].name = products[i].product_name;
                }
            };
        };
    };

    dataOrder = statisticsOrder.length > 0 ? statisticsOrder.map(status => {
        return {"name": status.status, "value": Number.parseInt(status.number)};
    }) : [];

    useEffect(() => {
        dispatch(getAllOrder());
        dispatch(getAllProducts());
        dispatch(getStatisticsOrders());
        dispatch(getStatisticsPizza());
    }, [dispatch]);

    useEffect(() => {
        if(temp === null && !auth) {
            history.push("/");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history, temp, auth]);

    if(temp === null) {
        history.push("/");
    };

    const dataIncome = [
        {
            "name": "Jan",
            "profits - USD": 2521,
            "sales - USD": 4000,
        },
        {
            "name": "Feb",
            "profits - USD": 1021,
            "sales - USD": 3000,
        },
        {
            "name": "March",
            "profits - USD": 521,
            "sales - USD": 2000,
        },
        {
            "name": "April",
            "profits - USD": 1521,
            "sales - USD": 2780,
        },
        {
            "name": "May",
            "profits - USD": 239,
            "sales - USD": 1890,
        },
        {
            "name": "June",
            "profits - USD": 921,
            "sales - USD": 2390,
        },
        {
            "name": "July",
            "profits - USD": 1821,
            "sales - USD": 3490,
        },
        {
            "name": "Aug",
            "profits - USD": 521,
            "sales - USD": 2490,
        },
        {
            "name": "Sep",
            "profits - USD": 1243,
            "sales - USD": 2990,
        },
        {
            "name": "Oct",
            "profits - USD": 1645,
            "sales - USD": 3190,
        },
        {
            "name": "Nov",
            "profits - USD": 1221,
            "sales - USD": 4490,
        },
        {
            "name": "Dec",
            "profits - USD": 2121,
            "sales - USD": 4190,
        },
    ];

    return (
        <div className="statistics_page">
            <Header />
            <div className="statistics">
                <div className="statistics_part">
                    <h2><strong>Order Statistics and Products Statistics</strong></h2>
                    <div className="statistics_print">
                        <div className="statistics_order">
                            <PieChartComponent data={dataOrder}/>
                        </div>
                        <div className="statistics_bestSeller">
                            <PieChartComponent data={dataPizza} />
                            <strong>Best Seller: {dataPizza.length > 0 ? dataPizza[0].name : ""}</strong>
                        </div>
                    </div>
                </div>
                <div className="statistics_part">
                    <h2><strong>Revenue Statistics</strong></h2>
                    <div className="statistics_income">
                        <div>
                            <ReactToPrint
                                trigger={() => <button className="print-btn">Print area chart</button>}
                                content={() => areaRef.current}
                            />
                            <AreaChartComponent dataIncome={dataIncome} ref={areaRef} />
                        </div>
                        <div>
                            <ReactToPrint
                                trigger={() => <button className="print-btn">Print bar chart</button>}
                                content={() => barRef.current}
                            />
                            <BarChartComponent dataIncome={dataIncome} ref={barRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatisticsPage;
