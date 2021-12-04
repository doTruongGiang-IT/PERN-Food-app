import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './OrderStatusPage.css';
import { useLocation } from 'react-router';

const OrderStatusPage = ({history}) => {
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const status = new URLSearchParams(useLocation().search).get("status");
    const [statusID, setStatusID] = useState({id: 0, class: ""});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const statusList = [{class: 'Order-Placed', id: 1}, {class: 'Order-Confirmation', id: 2}, 
                        {class: 'Preparation', id: 3}, {class: 'Out-for-delivery', id: 4}, {class: 'Complete', id: 5}];

    useEffect(() => {
        const res = statusList.find((item) => {
            item.class = item.class.replaceAll("-", " ");
            return item.class.includes(status)
        });
        setStatusID(res);
        
        if(temp === null) {
            history.push("/");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [temp]);

    return (
        <div className="status-tracker">
            <Header />
            <div className="status-section">
                <div className="status-bar">
                    <h3><strong>Track delivery status</strong></h3>
                    <div className="status-process">
                        <div className={`status-details ${statusID.id > statusList[0].id ? 'done' : (statusID.id === statusList[0].id ? 'coming' : '')}`}>
                            <i className="far fa-calendar-check"></i>
                            <i id="dot" className="fas fa-circle"></i>
                            <p>Order Placed</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className={`status-details ${statusID.id > statusList[1].id ? 'done' : (statusID.id === statusList[1].id ? 'coming' : '')}`}>
                            <i className="fas fa-check"></i>
                            <i id="dot" className="fas fa-circle"></i>
                            <p>Order Confirmation</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className={`status-details ${statusID.id > statusList[2].id ? 'done' : (statusID.id === statusList[2].id ? 'coming' : '')}`}>
                            <i className="fas fa-pizza-slice"></i>
                            <i id="dot" className="fas fa-circle"></i>
                            <p>Preparation</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className={`status-details ${statusID.id > statusList[3].id ? 'done' : (statusID.id === statusList[3].id ? 'coming' : '')}`}>
                            <i className="fas fa-truck"></i>
                            <i id="dot" className="fas fa-circle"></i>
                            <p>Out for delivery</p>
                            <p id="transaction">|</p>
                        </div>
                        <div className={`status-details ${statusID.id > statusList[4].id ? 'done' : (statusID.id === statusList[4].id ? 'coming' : '')}`}>
                            <i className="far fa-laugh-beam"></i>
                            <i id="dot" className="fas fa-circle"></i>
                            <p>Complete</p>
                        </div>
                    </div>
                </div>
                <div className="status-info">
                    <Link className="status-link" to="/order"><p>Go back</p></Link>
                    <p><strong>Today</strong></p>
                </div>
            </div>
        </div>
    )
}

export default OrderStatusPage;
