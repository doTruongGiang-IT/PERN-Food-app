import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import './CartPage.css';
import empty from '../../assets/empty-cart.png'
import cartImg from '../../assets/cart-black.png';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {selectCart, createOrder, removeFromCart} from '../../features/cart/cartSlice';

const CartPage = ({history}) => {
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    let total = 0;
    let arrID = [];
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    let user_cart = localStorage.getItem("user_cart") ? JSON.parse(localStorage.getItem("user_cart")) : [];

    const orderNow = () => {
        cart.map((item) => arrID.push({id: item.id, qty: item.qty}));
        cart.map((item) => console.log(item));
        arrID.forEach((item) => {
            let order = {
                address,
                customer_id: temp.id,
                food_id: item.id,
                quantity: item.qty
            };
            dispatch(createOrder(order));
            const today = new Date();
            let dd = today.getDay();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hh = today.getHours();
            let MM = today.getMinutes();
            user_cart.push({cart, user_id: temp.id, time: `${dd}/${mm}/${yyyy} - ${hh}:${MM}`});
            localStorage.setItem("user_cart", JSON.stringify(user_cart));
            dispatch(removeFromCart(item.id));
        });
        history.push("/");
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
                            <div className="cart-list">
                                {
                                    cart.map((item, index) => {
                                        total += item.price*item.qty;
                                        return <CartItem  key={index} item={item} />
                                    })
                                }
                            </div>
                            <hr />
                            <div className="cart-total">
                                <p id="total">Total Amount: <span>${total}</span></p>
                                <input type="text" placeholder="Address..." value={address} onChange={e => setAddress(e.target.value)} />
                                <button onClick={orderNow} type="button">Order now</button>
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
