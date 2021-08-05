import React, {useEffect} from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import CusOrder from '../../components/CusOrder/CusOrder';
import { useSelector, useDispatch } from 'react-redux';
import {getAllOrder, selectCusOrders} from '../../features/order/orderSlice';

const Dashboard = ({history}) => {
    const dispatch = useDispatch();
    const cusOrder = useSelector(selectCusOrders);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));

    useEffect(() => {
        dispatch(getAllOrder());
        if(temp === null) {
            history.push("/");
        };
    }, [dispatch, history, temp]);

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-section">
                <h3>All orders</h3>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Orders</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Placed at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cusOrder ?
                            cusOrder.map((order, index) => {
                                return <CusOrder key={index} order={order} />
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;
