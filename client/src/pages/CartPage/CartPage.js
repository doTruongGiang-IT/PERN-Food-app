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

    const orderNow = () => {
        cart.map((item) => arrID.push(item.id));
        arrID.forEach((id) => {
            console.log(id);
            let order = {
                address,
                customer_id: temp.id,
                food_id: id
            };
            dispatch(createOrder(order));
            dispatch(removeFromCart(id));
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
