import React, {useState, useEffect} from 'react';
import TopBar from '../../components/AdminComponents/TopBar/TopBar';
import SideBar from '../../components/AdminComponents/SideBar/SideBar';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, logout} from '../../features/auth/authSlice';
import { useHistory } from 'react-router';
import ProductAddForm from '../../components/AdminComponents/ProductAddForm/ProductAddForm';

const ProductAddPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [type, setType] = useState("product");
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if(temp === null || !auth) {
            history.push("/");
        };
    }, [history, temp, auth]);

    const userLogout = () => {
        localStorage.removeItem("pern_food_auth");
        dispatch(logout());
    };

    const handleMenu = (type) => {
        setType(type);
    };

    return (
        <div className="admin">
            <TopBar logout={userLogout} />
            <div className="admin-section">
                <SideBar menu={handleMenu} />
                <ProductAddForm />
            </div>
        </div>
    )
}

export default ProductAddPage;
