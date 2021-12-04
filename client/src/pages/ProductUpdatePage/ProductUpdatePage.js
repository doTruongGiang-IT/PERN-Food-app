import React, {useState, useEffect} from 'react';
import TopBar from '../../components/AdminComponents/TopBar/TopBar';
import SideBar from '../../components/AdminComponents/SideBar/SideBar';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, logout} from '../../features/auth/authSlice';
import { useHistory, useParams } from 'react-router';
import ProductUpdateForm from '../../components/AdminComponents/ProductUpdateForm/ProductUpdateForm';
import { updateProduct, getProduct, selectProduct } from '../../features/pizzas/pizzaSlice';

const ProductUpdatePage = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const [type, setType] = useState("product");
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if(temp === null || !auth) {
            history.push("/");
        };
    }, [history, temp, auth]);

    useEffect(() => {
        dispatch(getProduct(Number.parseInt(id)));
    }, [dispatch, id]);

    const userLogout = () => {
        localStorage.removeItem("pern_food_auth");
        dispatch(logout());
    };

    const handleMenu = (type) => {
        setType(type);
    };

    const handleUpdate = async (id, name, price, image, size, desc, type) => {
        await dispatch(updateProduct({id, name, price, image, size: type === "pizza" ? size : "", desc: type === "pizza" ? desc : ""}));
        history.push("/admin");
    };

    return (
        <div className="admin">
            <TopBar logout={userLogout} />
            <div className="admin-section">
                <SideBar menu={handleMenu} />
                <ProductUpdateForm product={product} update={handleUpdate} />
            </div>
        </div>
    )
}

export default ProductUpdatePage;
