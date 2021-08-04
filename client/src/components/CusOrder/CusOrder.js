import React from 'react';
import './CusOrder.css';

const CusOrder = () => {
    return (
        <tr className="order">
            <td>
                <p>1</p>
                <p>Name - 2pcs</p>
                <p>Name - 2pcs</p>
                <p>Name - 2pcs</p>
            </td>
            <td>Giang</td>
            <td>main street</td>
            <td>
                <select id="status">
                    <option>Order Placed</option>
                    <option>Order Confirmation</option>
                    <option>Preparation</option>
                    <option>Out for delivery</option>
                    <option>Complete</option>
                </select>
            </td>
            <td>today</td>
        </tr>
    )
}

export default CusOrder;
