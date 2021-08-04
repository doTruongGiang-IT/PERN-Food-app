import React from 'react';
import './Order.css';
import { Link } from 'react-router-dom';

const Order = () => {
    return (
        <tr className="order">
            <Link to="/status" id="orderID"><td>1</td></Link>
            <td>main street</td>
            <td>today</td>
        </tr>
    )
}

export default Order;
