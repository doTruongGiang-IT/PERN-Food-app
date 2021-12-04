import React from 'react';
import './Order.css';
import { Link } from 'react-router-dom';

const Order = ({order, showDetails, detail}) => {
    return (
        <tr className="order" style={{textDecoration: `${(order.status === 'Complete' || order.status === 'Cancel') ? 'line-through' : 'none'}`}}>
            <td><Link onClick={() => localStorage.setItem("statusID", JSON.stringify(order.orderid))} to={`${order.status !== 'Cancel' ? `/status/${order.orderid}?status=${order.status}` : '/'}`} id="orderID">{order.orderid}</Link></td>
            <td>{order.address}</td>
            <td>{order.placed_at}</td>
            <td><button id="btnDetails" onClick={() => showDetails(order.orderid)}>{order.status !== "Cancel" ? "Order Details" : "Your order has been canceled"}</button></td>
        </tr>
    )
}

export default Order;
