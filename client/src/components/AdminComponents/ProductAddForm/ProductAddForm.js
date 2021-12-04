import React, {useState, useRef} from 'react';
import './ProductAddForm.css';
import useOnScreen from '../../../hooks/useOnScreen';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { createProduct } from '../../../features/pizzas/pizzaSlice';

const ProductAddForm = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("small");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("pizza");
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const isNameVisible = useOnScreen(nameRef);
    const isPriceVisible = useOnScreen(priceRef);
    const isImageVisible = useOnScreen(imageRef);
    const dispatch = useDispatch();

    const isDisabled = () => {
        let result = false;
        if(!name || !price || !image ||  isNameVisible || isPriceVisible || isImageVisible) result = true;
        return result;
    };

    const handleCreate = async () => {
        await dispatch(createProduct({name, price, image, size: type === "pizza" ? size : "", desc, type}));
        setName("");
        setPrice(0);
        setImage("");
        setSize("");
        setDesc("");
        setType("");
        history.push("/admin");
    };

    return (
        <div className="productAddForm">
            <div className="productAddFormWrapper">
                <h2>Product Add Form</h2>
                <form>
                    <div className="form-group-section">
                        <div className="form-group-user">
                            <label>Name</label>
                            <input 
                                className="form-input register-username" 
                                required="This field is required"
                                type="text" 
                                placeholder="Enter product name..."  
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <p ref={nameRef} className="register-username-errors">This field is required</p>
                        </div>
                        <div className="form-group-user">
                            <label>Price</label>
                            <input 
                                className="form-input register-username" 
                                required="This field is required"
                                type="number" 
                                placeholder="Enter product price..."  
                                min={0}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                            <p ref={priceRef} className="register-username-errors">This field is required</p>
                        </div>
                    </div>
                    <div className="form-group-section">
                        <div className="form-group-user">
                            <label>Image</label>
                            <input 
                                className="form-input register-email"
                                required="This field is required"
                                type="text" 
                                placeholder="Enter product image..."  
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                            <p ref={imageRef} className="register-email-errors">This field is required</p>
                        </div>
                        <div className="form-group-user">
                            <label>Description</label>
                            <input 
                                className="form-input register-email"
                                type="text" 
                                placeholder="Enter product description..."  
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group-section">
                        {
                            type === "pizza" ? 
                            <div className="form-group-user">
                                <label>Size</label>
                                <select style={{width: "290px"}} value={size} onChange={e => setSize(e.target.value)} >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div> : null
                        }
                        <div className="form-group-user">
                            <label>Type</label>
                            <select style={{width: "290px"}} value={type} onChange={e => setType(e.target.value)} >
                                <option value="pizza">Pizza</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group group-action">
                        <button disabled={isDisabled()} onClick={handleCreate} type="button">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductAddForm;
