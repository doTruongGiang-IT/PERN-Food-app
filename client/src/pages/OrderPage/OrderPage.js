import React from 'react';
import './OrderPage.css';
import Header from '../../components/Header/Header';
import Order from '../../components/Order/Order';
import none from '../../assets/noData.png'

const OrderPage = () => {
    return (
        <div className="order-page">
            <Header />
            {/* <img id="none" src={none} alt="none" /> */}
            <div className="order-section">
                <h3>All orders</h3>
                {/* <div className="notification">
                    <p><i class="fas fa-info"></i> Order placed successfully.</p>
                </div> */}
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Orders</th>
                            <th>Address</th>
                            <th>Placed at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Order />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderPage;
