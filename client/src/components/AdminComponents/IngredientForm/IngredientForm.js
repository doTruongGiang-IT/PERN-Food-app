import React, {useState, useRef, useEffect} from 'react';
import './IngredientForm.css';
import useOnScreen from '../../../hooks/useOnScreen';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { selectSuppliers } from '../../../features/supplier/supplierSlice';
import { createIngredient, updateIngredient, selectIngredient, resetIngredient } from '../../../features/ingredient/ingredientSlice';

const IngredientForm = ({setIngredientsState}) => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [supp_id, setSuppId] = useState(0);
    const nameRef = useRef();
    const priceRef = useRef();
    const isNameVisible = useOnScreen(nameRef);
    const isPriceVisible = useOnScreen(priceRef);
    const dispatch = useDispatch();
    const ingredient = useSelector(selectIngredient);
    const suppliers = useSelector(selectSuppliers);

    useEffect(() => {
        if(ingredient) {
            setName(ingredient.ingredient_name);
            setPrice(ingredient.ingredient_price);
            setSuppId(ingredient.supplierid);
        };
    }, [ingredient]);

    const isDisabled = () => {
        let result = false;
        if(!name || !price || isNameVisible || isPriceVisible) result = true;
        return result;
    };

    const handleCreate = async () => {
        await dispatch(createIngredient({name, price: Number.parseInt(price), supp_id: Number.parseInt(supp_id)}));
        setName("");
        setPrice(0);   
        setSuppId(0);   
        setIngredientsState([]);     
    };

    const handleUpdate = async () => {
        await dispatch(updateIngredient({id: ingredient.ingredientid, name, price, supp_id}));
        setName("");
        setPrice(0);
        setSuppId(0);
        await dispatch(resetIngredient());
        setIngredientsState([]);
        history.push("/admin");
    };

    return (
        <div className="ingredientForm">
            <div className="ingredientFormWrapper">
                <h2>{Object.keys(ingredient).length > 0 ? "Ingredient Update Form" : "Ingredient Add Form"}</h2>
                <form>
                    <div className="form-group-user">
                        <label>Ingredient Name</label>
                        <input 
                            className="form-input register-username" 
                            required="This field is required"
                            type="text" 
                            placeholder="Enter ingredient name..."  
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <p ref={nameRef} className="register-username-errors">This field is required</p>
                    </div>
                    <div className="form-group-user">
                        <label>Ingredient Price</label>
                        <input 
                            className="form-input register-email"
                            required="This field is required"
                            type="number"
                            min={0} 
                            placeholder="Enter ingredient price..."  
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <p ref={priceRef} className="register-email-errors">This field is required</p>
                    </div>
                    <div className="form-group-user">
                        <label>Supplier</label>
                        <select value={supp_id} onChange={e => setSuppId(e.target.value)} >
                            <option value={0} hidden>Choose supplier</option>
                            {
                                suppliers.map((supplier, index) => {
                                    return <option key={index} value={supplier.supplierid}>{supplier.supplier_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group group-action">
                        {
                            Object.keys(ingredient).length > 0 ? 
                            <button disabled={isDisabled()} onClick={handleUpdate} type="button">Update</button>
                            : <button disabled={isDisabled()} onClick={handleCreate} type="button">Create</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IngredientForm;
