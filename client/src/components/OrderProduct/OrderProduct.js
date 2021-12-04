import React from 'react';
import './OrderProduct.css';

const OrderProduct = (product) => {
    return (
        <div className="orderProductContainer">
            <div className="item-info">
                <img src={product.product.product_image} alt="pizza" />
                <div className="sub-info">
                    <h3>{product.product.product_name}</h3>
                    <p>{product.product.product_size}</p>
                </div>
            </div>
            <div className="orderProduct">
                <p>{product.product.quantity} Pcs</p>
            </div>
            <div className="orderProduct">
                <p>{product.product.accompanyingfoodid ? "More Cheese" : "None"}</p>
            </div>
        </div>
    )
}

export default OrderProduct;
