import React, {useEffect, useState} from 'react';
import './CusOrder.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {updateStatus} from '../../features/order/orderSlice';

const CusOrder = ({order}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [food, setFood] = useState({});
    const [status, setStatus] = useState("Order Placed");

    useEffect( () => {
        const getUser = async() => {
            const res = await axios.get(`http://localhost:5000/api/user/${order.customer_id}`);
            res.data && setUser(res.data);
        };
        const getFood = async() => {
            const res = await axios.get(`http://localhost:5000/api/pizzas/${order.food_id}`);
            res.data && setFood(res.data);
        };
        getUser();
        getFood();
    }, [order.customer_id, order.food_id]);

    const changeStatus = () => {
        let updateOrder = {id: order.id, status};
        dispatch(updateStatus(updateOrder));
    };

    return (
        <tr className="order">
            <td>
                <p>{order.id}</p>
                <p id="food-name">{food.name} - {order.quantity}pcs</p>
            </td>
            <td>{user.username}</td>
            <td>{order.address}</td>
            <td>
                <select id="status" value={order.status} onChange={e => setStatus(e.target.value)} onClick={changeStatus}>
                    <option>Order Placed</option>
                    <option>Order Confirmation</option>
                    <option>Preparation</option>
                    <option>Out for delivery</option>
                    <option>Complete</option>
                </select>
            </td>
            <td>{order.placed_at}</td>
        </tr>
    )
}

export default CusOrder;
