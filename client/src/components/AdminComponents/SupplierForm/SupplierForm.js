import React, {useState, useRef, useEffect} from 'react';
import './SupplierForm.css';
import useOnScreen from '../../../hooks/useOnScreen';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { createSupplier, updateSupplier, selectSupplier, resetSupplier } from '../../../features/supplier/supplierSlice';

const SupplierForm = ({setSuppliersState}) => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const nameRef = useRef();
    const addressRef = useRef();
    const isNameVisible = useOnScreen(nameRef);
    const isAddressVisible = useOnScreen(addressRef);
    const dispatch = useDispatch();
    const supplier = useSelector(selectSupplier);

    useEffect(() => {
        if(supplier) {
            setName(supplier.supplier_name);
            setAddress(supplier.supplier_address);
        };
    }, [supplier]);

    const isDisabled = () => {
        let result = false;
        if(!name || !address || isNameVisible || isAddressVisible) result = true;
        return result;
    };

    const handleCreate = async () => {
        await dispatch(createSupplier({name, address}));
        setName("");
        setAddress("");   
        setSuppliersState([]);     
    };

    const handleUpdate = async () => {
        await dispatch(updateSupplier({id: supplier.supplierid, name, address}));
        setName("");
        setAddress("");
        await dispatch(resetSupplier());
        setSuppliersState([]);
        history.push("/admin");
    };

    return (
        <div className="supplierForm">
            <div className="supplierFormWrapper">
                <h2>{Object.keys(supplier).length > 0 ? "Supplier Update Form" : "Supplier Add Form"}</h2>
                <form>
                    <div className="form-group-user">
                        <label>Supplier Name</label>
                        <input 
                            className="form-input register-username" 
                            required="This field is required"
                            type="text" 
                            placeholder="Enter supplier name..."  
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <p ref={nameRef} className="register-username-errors">This field is required</p>
                    </div>
                    <div className="form-group-user">
                        <label>Supplier Address</label>
                        <input 
                            className="form-input register-email"
                            required="This field is required"
                            type="text" 
                            placeholder="Enter supplier address..."  
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <p ref={addressRef} className="register-email-errors">This field is required</p>
                    </div>
                    <div className="form-group group-action">
                        {
                            Object.keys(supplier).length > 0 ? 
                            <button disabled={isDisabled()} onClick={handleUpdate} type="button">Update</button>
                            : <button disabled={isDisabled()} onClick={handleCreate} type="button">Create</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SupplierForm;
