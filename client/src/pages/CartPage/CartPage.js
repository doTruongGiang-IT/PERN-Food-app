/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import './CartPage.css';
import empty from '../../assets/empty-cart.png'
import cartImg from '../../assets/cart-black.png';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {selectCart, createOrder, removeFromCart, createOrderDetails, selectLatestOrder, addCheese, upQuantity, downQuantity} from '../../features/cart/cartSlice';
import axios from 'axios';
import { processToCheckOut } from '../../features/checkoutOnlie/checkout';

const CartPage = ({history}) => {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();
    let cart = useSelector(selectCart);
    // let temp_cart = cart;
    // const [newCart, setNewCart] = useState(cart);
    const [payment, setPayment] = useState("offline");
    let total = 0;
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    let user_cart = localStorage.getItem("user_cart") ? JSON.parse(localStorage.getItem("user_cart")) : [];

    // console.log(newCart);
    const orderNow = async () => {
        let order = {
            address,
            customer_id: temp.userid,
            price: total,
            phone
        };
        await dispatch(createOrder(order));
        await dispatch(selectLatestOrder(temp.userid));
        let Latestorder = await axios.get(`http://localhost:5000/api/order/latest/${temp.userid}`)
                            .then(res => res.data)
                            .then(data => createDetails(data.orderid))
                            .catch(err => console.log(err.message));

        if(payment === "online") {
            const checkoutContent = {
                "username": cart
            };
            await dispatch(processToCheckOut(checkoutContent));
        };
        
        if(payment === "offline") {
            history.push("/");
        };
    };
    
    const createDetails = (orderid) => {
        cart.forEach(async (item) => {
            let detail = {
                orderid: orderid,
                productid: item.productid,
                accompanyid: item.moreCheese ? 1 : null,
                quantity: item.qty
            };
            await dispatch(createOrderDetails(detail));
            const today = new Date();
            user_cart.push({cart, user_id: temp.userid, time: today});
            localStorage.setItem("user_cart", JSON.stringify(user_cart));
            dispatch(removeFromCart(item.productid));
        });
    };

    const isDisabled = () => {
        let result = true;
        let regex = "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$";
        if(temp !== null && address !== "" && phone !== "" && phone.match(regex)) result = false;
        return result;
    };

    const checkCheese = (item) => {
        dispatch(addCheese(item));
    };

    const handleQuantity = (item, type) => {
        type === "up" ? dispatch(upQuantity(item)) : dispatch(downQuantity(item));
    };
    
    return (
        <div className="cart-page">
            <Header />
            <div className="cart-section">
                {
                    cart && cart.length !== 0 ? 
                    (
                        <div className="cart-fill">
                            <div className="cart-logo">
                                <img src={cartImg} alt="cart" />
                                <h3>Order Summary</h3>
                            </div>
                            <hr />

                            {/* <div className="cart-list">
                                {
                                    cart.map((item, index) => {
                                        total += (item.product_price*item.qty+(item.moreCheese===true ? 1 : 0));
                                        return <CartItem  key={index} item={item} moreCheese={checkCheese} handleQuantity={handleQuantity} />
                                    })
                                }
                            </div> */}

                            <table className="cart-list">
                                <thead>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>More Cheese</th>
                                    <th>Remove</th>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => {
                                            total += (item.product_price*item.qty+(item.moreCheese===true ? 1 : 0));
                                            return <CartItem  key={index} item={item} moreCheese={checkCheese} handleQuantity={handleQuantity} />
                                        })
                                    }
                                </tbody>
                            </table>
                            <hr />
                            <div className="cart-total">
                                <p id="total"><strong>Total Amount:</strong> <span>${total}</span></p>
                                <div>
                                    <strong>Choose Payment Method</strong>
                                    <select id="paymentMethod" value={payment} onChange={e => setPayment(e.target.value)}>
                                        <option value="online">Thanh toán Online</option>
                                        <option value="offline">Thanh toán nhận hàng</option>
                                    </select>
                                </div>
                                <input type="text" placeholder="Address..." value={address} onChange={e => setAddress(e.target.value)} />
                                <input type="text" placeholder="Phone number..." value={phone} onChange={e => setPhone(e.target.value)} />
                                <button disabled={isDisabled()} onClick={orderNow} type="button">{temp === null ? "Sign in to order" : "Order now"}</button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="cart-empty">
                            <h2>Cart Empty</h2>
                            <p>Your probably haven't ordered a pizza yet.</p>
                            <p>To order a pizza go to the main page.</p>
                            <img id="empty" src={empty} alt="empty cart" />
                            <Link to=""><button type="button">Go back</button></Link>
                        </div>
                    )
                }
               
            </div>
        </div>
    )
}

export default CartPage;
