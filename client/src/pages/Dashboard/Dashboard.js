import React from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import CusOrder from '../../components/CusOrder/CusOrder';

const Dashboard = () => {
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
                        <CusOrder />
                        <CusOrder />
                        <CusOrder />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;
