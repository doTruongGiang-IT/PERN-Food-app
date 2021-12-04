import React, {useState, useEffect} from 'react';
// import 'rsuite/dist/rsuite.min.css';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import CusOrder from '../../components/CusOrder/CusOrder';
import { useSelector, useDispatch } from 'react-redux';
import {filter, getAllOrder, selectCusOrders, selectSearchAndFilterOrders} from '../../features/order/orderSlice';
import { getAllProducts, selectAllProducts } from '../../features/pizzas/pizzaSlice';
import {selectDetailsOrders, getDetailsUserOrder} from '../../features/order/orderSlice';
import { getStaffs, selectStaffs } from '../../features/staff/staff';
import {DateRangePickerComponent} from "@syncfusion/ej2-react-calendars";
import { selectAuth } from '../../features/auth/authSlice';
import { useHistory } from 'react-router';
// import { DateRangePicker } from 'rsuite';

const Dashboard = () => {
    const dispatch = useDispatch();
    let cusOrder = useSelector(selectCusOrders);
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const products = useSelector(selectAllProducts);
    const orderDetails = useSelector(selectDetailsOrders);
    const searchAndFilter = useSelector(selectSearchAndFilterOrders);
    let arrPro = [];
    const [idDetail, setIdDetail] = useState(0);
    const [filterStatusKey, setFilterStatusKey] = useState("all");
    const [filterStaffKey, setFilterStaffKey] = useState("0");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const staffs = useSelector(selectStaffs);
    const [dateRange, setDateRange] = useState();
    const auth = useSelector(selectAuth);
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllOrder());
        if(temp === null && !auth) {
            history.push("/");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history, temp, auth]);

    useEffect(() => {
        dispatch(getStaffs());
    }, [dispatch]);

    useEffect(() => {
        let dateArr = [];
        if(dateRange !== undefined && dateRange !== "") {
            dateArr =  dateRange.date.split(" - ");
            setEndDate(dateArr[1]);
            setStartDate(dateArr[0]);
            dispatch(filter({status: filterStatusKey, staffid: filterStaffKey, startDate: dateArr[0], endDate: dateArr[1]}));
        };
        setDateRange();
        // setEndDate("");
        // setStartDate("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dateRange, dispatch]);

    const showDetails = async (orderid) => {
        setIdDetail(orderid);
        await dispatch(getDetailsUserOrder(orderid));
        await dispatch(getAllProducts());
    };

    const handleFilter = async () => {
        await dispatch(filter({status: filterStatusKey, staffid: filterStaffKey, startDate, endDate}));
    };

    const pushDetails = () => {
        if(products.length > 0) {
            for(let i = 0; i < products.length; i++) {
                for(let j = 0; j < orderDetails.length; j++) {
                    if(products[i].productid === orderDetails[j].productid) {
                        let obj = {...products[i], ...orderDetails[j], id: idDetail};
                        arrPro.push(obj)
                    };
                };
            };
        };
    };
    pushDetails();

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-section">
                <div className="search_filter">
                    <h3>All Orders</h3>
                    <div id="date_range">
                        {/* <DateRangePicker placeholder="Select Date Range" value={dateRange} onChange={setDateRange}/> */}
                        <DateRangePickerComponent placeholder="Enter date range" width="300px" openOnFocus={true} close={setDateRange} />
                    </div>
                    <div id="search_filter_orders">
                        <select id="filter_status" value={filterStatusKey} onChange={e => setFilterStatusKey(e.target.value)} onClick={handleFilter}>
                            <option value="all">All Status</option>
                            <option value="order placed">Order Placed</option>
                            <option value="order confirmation">Order Confirmation</option>
                            <option value="preparation">Preparation</option>
                            <option value="out for delivery">Out for delivery</option>
                        </select>
                        <select id="filter_staff" value={filterStaffKey} onChange={e => setFilterStaffKey(e.target.value)} onClick={handleFilter}>
                            <option value="0">All Staff</option>
                            {
                                staffs.length > 0 ?
                                staffs.map((staff, index) => {
                                    if(staff.role === "staff") {
                                        return <option key={index} value={staff.staffid}>{staff.first_name} {staff.last_name}</option>
                                    };
                                }): <option></option>
                            }
                        </select>
                    </div>
                </div>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Orders</th>
                            <th>Customer</th>
                            <th>Staff</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Placed at</th>
                            <th>Order Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (searchAndFilter.length === 0 && cusOrder) ?
                            cusOrder.map((order, index) => {
                                if(order.status !== "Complete" && order.status !== "Cancel") {
                                    return <CusOrder key={index} order={order} showDetails={showDetails} arrPro={arrPro} />
                                };
                            }) : searchAndFilter.map((order, index) => {
                                if(order.status !== "Complete" && order.status !== "Cancel") {
                                    return <CusOrder key={index} order={order} showDetails={showDetails} arrPro={arrPro} />
                                };
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;
