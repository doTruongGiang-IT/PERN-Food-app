import React from 'react';
import './Order.css';
import { Link } from 'react-router-dom';

const Order = ({order}) => {
    return (
        <tr className="order">
            <td><Link onClick={() => localStorage.setItem("statusID", JSON.stringify(order.id))} to={`/status/${order.id}?status=${order.status}`} id="orderID">{order.id}</Link></td>
            <td>{order.address}</td>
            <td>{order.placed_at}</td>
        </tr>
    )
}

export default Order;
