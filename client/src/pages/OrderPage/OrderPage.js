/* eslint-disable no-unused-expressions */
import React, {useEffect} from 'react';
import './OrderPage.css';
import Header from '../../components/Header/Header';
import Order from '../../components/Order/Order';
import none from '../../assets/noData.png'
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth} from '../../features/auth/authSlice';
import {selectOrders, getUserOrder, selectDetailsOrders, getDetailsUserOrder} from '../../features/order/orderSlice';
import OrderProduct from '../../components/OrderProduct/OrderProduct';
import { getAllProducts, selectAllProducts } from '../../features/pizzas/pizzaSlice';

const OrderPage = ({history}) => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const orders = useSelector(selectOrders);
    const orderDetails = useSelector(selectDetailsOrders);
    const products = useSelector(selectAllProducts);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    let arrPro = [];

    useEffect(() => {
        if(temp!== null) {
            dispatch(getUserOrder(temp.userid));
        };
        dispatch(getAllProducts());
        // eslint-disable-next-line
    }, [dispatch]);

    const showDetails = (orderid) => {
        dispatch(getDetailsUserOrder(orderid));
    };

    const pushDetails = () => {
        for(let i = 0; i < products.length; i++) {
            for(let j = 0; j < orderDetails.length; j++) {
                if(products[i].productid === orderDetails[j].productid) {
                    let obj = {...products[i], ...orderDetails[j]};
                    arrPro.push(obj)
                };
            };
        };
    };

    return (
        <div className="order-page">
            <Header />
            {
                (auth && temp !== null) ? 
                <>
                    {
                        orders.length !== 0 ? 
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
                                            <th>More Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, index) => {
                                                return <Order key={index} order={order} showDetails={showDetails} />
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
            {
                pushDetails()
            }
            {
                arrPro.map((product, index) => {
                    return <OrderProduct key={index} product={product} />
                })
            }
        </div>
    )
}

export default OrderPage;
