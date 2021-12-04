import React, {useEffect, useState} from 'react';
import './CusOrder.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {updateOrder} from '../../features/order/orderSlice';
import { getStaffs, selectStaffs } from '../../features/staff/staff';

const CusOrder = ({order, showDetails, arrPro}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const staffs = useSelector(selectStaffs);
    const [status, setStatus] = useState(order.status);
    const [staff, setStaff] = useState(order.staffid);

    useEffect( () => {
        const getUser = async() => {
            const res = await axios.get(`http://localhost:5000/api/user/${order.customerid}`);
            res.data && setUser(res.data);
        };
        getUser();
        dispatch(getStaffs());
    }, [order.customerid, order.staffid, order.status, dispatch]);

    const updateCusOrder = () => {
        let orderUpdate = {id: order.orderid, status, staffid: staff !== "0" ? staff : null};
        dispatch(updateOrder(orderUpdate));
    };

    const handleDetail = () => {
        let divDetail = document.getElementById(`detailRow${order.orderid}`);
        showDetails(order.orderid);
        if(divDetail !== null && (divDetail.style.display === "" || divDetail.style.display === "none")) {
            divDetail.style.display = "block";
        }else {
            divDetail.style.display = "none";
        };
    };

    return (
        <>
        <tr className="order">
            <td>
                {/* <p><Link id="cus_order" to={`/cus_order/${order.orderid}`}>{order.orderid}</Link></p> */}
                <button id="cus_order" onClick={handleDetail}>{order.orderid}</button>
                {/* <p id="food-name">{food.name} - {order.quantity}pcs</p> */}
            </td>
            <td>{user.username}</td>
            <td>
                <select id="status" value={order.staffid} onChange={e => setStaff(e.target.value)} onClick={updateCusOrder}>
                    <option selected hidden></option>
                    {
                        staffs.length > 0 ?
                        staffs.map((staff, index) => {
                            if(staff.role === "staff") {
                                return <option key={index} value={staff.staffid}>{staff.first_name} {staff.last_name}</option>
                            };
                        }): <option></option>
                    }
                </select>
            </td>
            <td>{order.address}</td>
            <td>{order.phone_number}</td>
            <td>
                <select id="status" value={order.status} onChange={e => {if(order.staffid !== null){setStatus(e.target.value)}}} onClick={updateCusOrder}>
                    <option>Order Placed</option>
                    <option>Order Confirmation</option>
                    <option>Preparation</option>
                    <option>Out for delivery</option>
                    <option>Complete</option>
                    <option>Cancel</option>
                </select>
            </td>
            <td>{order.placed_at}</td>
            <td><strong>${order.order_price}</strong></td>
        </tr>
        <tr id={`detailRow${order.orderid}`}>
            {
                arrPro.length > 0 ?
                arrPro.map((product, index) => {
                    if(product.id === order.orderid) {
                        return <td className="orderProductContainer" key={index}>
                                <div className="item-info">
                                    <img src={product.product_image} alt="pizza" />
                                    <div className="sub-info">
                                        <p>{product.product_name}</p>
                                        <p>{product.product_size}</p>
                                    </div>
                                </div>
                                <div className="orderProduct">
                                    <p>{product.quantity} Pcs</p>
                                </div>
                                <div className="orderProduct">
                                    <p>{product.accompanyingfoodid ? "More Cheese" : ""}</p>
                                </div>
                            </td>
                    };
                }): null
            }
        </tr>
        </>
    )
}

export default CusOrder;
