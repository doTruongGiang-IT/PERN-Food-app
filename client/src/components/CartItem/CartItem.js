import React from 'react';
import './CartItem.css';
import pizza from '../../assets/pizza.png';
import { useDispatch } from 'react-redux';
import {removeFromCart} from '../../features/cart/cartSlice';
import arrowUp from '../../assets/up-arrow.png';
import arrowDown from '../../assets/down-arrow.png';

const CartItem = ({item, moreCheese, handleQuantity}) => {
    const dispatch = useDispatch();

    const handleCheck = () => {
        item = {...item, moreCheese: !item.moreCheese};
        moreCheese(item);
    };

    return (
        <tr className="order">
            <td>
            <div className="item-info">
                 <img src={item.product_image} alt="pizza" />
                 <div className="sub-info">
                     <h3>{item.product_name}</h3>
                     <p>{item.product_size}</p>
                 </div>
             </div>
            </td>
            <td>
                <div className="item-quantity">
                    <p>{item.qty} Pcs</p>
                    <div id="item-quantity-btn">
                        <button onClick={() => handleQuantity(item, "up")}><img src={arrowUp} alt="up" width="20" height="20" /></button>
                        <button onClick={() => handleQuantity(item, "down")}><img src={arrowDown} alt="down" width="20" height="20" /></button>
                    </div>
                </div>
            </td>
            <td>
                <div className="item-price">
                    <p>${item.product_price}</p>
                </div>
            </td>
            <td>
                {
                    item.product_type === "pizza" ?
                    <div className="item-cheese">
                        <input type="checkbox" value={item.moreCheese} onClick={() => handleCheck()} /> More Cheese
                    </div> : null
                }
            </td>
            <td>
                <div className="item-remove">
                    <i onClick={() => dispatch(removeFromCart(item.productid))} className="far fa-trash-alt"></i>
                </div>
            </td>
        </tr>
        // <div className="cart-item">
        //     <div className="item-info">
        //         <img src={item.product_image} alt="pizza" />
        //         <div className="sub-info">
        //             <h3>{item.product_name}</h3>
        //             <p>{item.product_size}</p>
        //         </div>
        //     </div>
            // <div className="item-quantity">
            //     <p>{item.qty} Pcs</p>
            //     <div id="item-quantity-btn">
            //         <button onClick={() => handleQuantity(item, "up")}><img src={arrowUp} alt="up" width="20" height="20" /></button>
            //         <button onClick={() => handleQuantity(item, "down")}><img src={arrowDown} alt="down" width="20" height="20" /></button>
            //     </div>
            // </div>
            // <div className="item-price">
            //     <p>${item.product_price}</p>
            // </div>
            // {
            //     item.product_type === "pizza" ?
            //     <div className="item-cheese">
            //         <input type="checkbox" value={item.moreCheese} onClick={() => handleCheck()} /> More Cheese
            //     </div> : null
            // }
            // <div className="item-remove">
            //     <i onClick={() => dispatch(removeFromCart(item.productid))} className="far fa-trash-alt"></i>
            // </div>
        // </div>
    )
}

export default CartItem;