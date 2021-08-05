import React, {useEffect} from 'react';
import './OrderPage.css';
import Header from '../../components/Header/Header';
import Order from '../../components/Order/Order';
import none from '../../assets/noData.png'
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth} from '../../features/auth/authSlice';
import {selectOrders, getOrder} from '../../features/order/orderSlice';

const OrderPage = ({history}) => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const order = useSelector(selectOrders);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));

    useEffect(() => {
        if(temp!== null) {
            dispatch(getOrder(temp.id));
        };
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <div className="order-page">
            <Header />
            {
                (auth && temp !== null) ? 
                <>
                    {
                        order.length !== 0 ? 
                        (
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
                                        {
                                            order.map((item, index) => {
                                                return <Order key={index} order={item} />
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : <img id="none" src={none} alt="none" />
                    }
                </>
                : history.push("/")
            }
            
        </div>
    )
}

export default OrderPage;
