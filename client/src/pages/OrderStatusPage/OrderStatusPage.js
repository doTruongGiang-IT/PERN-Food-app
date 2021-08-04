import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './OrderStatusPage.css';

const OrderStatusPage = () => {
    return (
        <div className="status-tracker">
            <Header />
            <div className="status-section">
                <div className="status-bar">
                    <h3><strong>Track delivery status</strong></h3>
                    <div className="status-process">
                        <div className="status-details done">
                            <i class="far fa-calendar-check"></i>
                            <i id="dot" class="fas fa-circle"></i>
                            <p>Order Placed</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className="status-details done">
                            <i class="fas fa-check"></i>
                            <i id="dot" class="fas fa-circle"></i>
                            <p>Order Confirmation</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className="status-details coming">
                            <i class="fas fa-pizza-slice"></i>
                            <i id="dot" class="fas fa-circle"></i>
                            <p>Preparation</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className="status-details">
                            <i class="fas fa-truck"></i>
                            <i id="dot" class="fas fa-circle"></i>
                            <p>Out for delivery</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className="status-details">
                            <i class="far fa-laugh-beam"></i>
                            <i id="dot" class="fas fa-circle"></i>
                            <p>Complete</p>
                        </div>
                    </div>
                </div>
                <div className="status-info">
                    <Link className="status-link" to="/order"><p>afsfa1233543</p></Link>
                    <p><strong>Today</strong></p>
                </div>
            </div>
        </div>
    )
}

export default OrderStatusPage;
