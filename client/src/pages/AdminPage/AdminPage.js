import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import TopBar from '../../components/AdminComponents/TopBar/TopBar';
import './AdminPage.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, logout} from '../../features/auth/authSlice';
import SideBar from '../../components/AdminComponents/SideBar/SideBar';
import Users from '../../components/AdminComponents/Users/Users';
import Products from '../../components/AdminComponents/Products/Products';
import Suppliers from '../../components/AdminComponents/Suppliers/Suppliers';
import Ingredients from '../../components/AdminComponents/Ingredients/Ingredients';
import { selectUsers, getUsers, deleteUser, deleteRedUser } from '../../features/user/user';
import { getAllProducts, selectAllProducts, deleteProduct, deleteRedPro } from '../../features/pizzas/pizzaSlice'
import { getAllSupplier, selectSuppliers, deleteSupplier, deleteRedSupp, getSupplier } from '../../features/supplier/supplierSlice';
import { getAllIngredient, selectIngredients, deleteIngredient, deleteRedIngre, getIngredient } from '../../features/ingredient/ingredientSlice';

const AdminPage = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const users = useSelector(selectUsers);
    const products = useSelector(selectAllProducts);
    const suppliers = useSelector(selectSuppliers);
    const ingredients = useSelector(selectIngredients);
    const id = Number.parseInt(location.search.slice(17));
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const [type, setType] = useState("user");
    const [usersState, setUsersState] = useState(users);
    const [productsState, setProductsState] = useState(products);
    const [suppliersState, setSuppliersState] = useState(suppliers);
    const [ingredientsState, setIngredientsState] = useState(ingredients);

    useEffect(() => {
        if(temp === null || !auth) {
            history.push("/");
        };
    }, [history, temp, auth]);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllProducts());
    }, [dispatch, usersState, productsState, suppliersState]);

    useEffect(() => {
        dispatch(getAllSupplier());
    }, [suppliersState, dispatch]);

    useEffect(() => {
        dispatch(getAllIngredient());
    }, [ingredientsState, dispatch]);

    useEffect(() => {
        if(id) {
            dispatch(getSupplier(id));
            dispatch(getIngredient(id));
        };
    }, [id, dispatch]);

    const userLogout = () => {
        localStorage.removeItem("pern_food_auth");
        dispatch(logout());
    };

    const handleMenu = (type) => {
        setType(type);
    };

    const handleDeleteUser = async (id) => {
        await dispatch(deleteUser(id));
        await dispatch(deleteRedUser(id));
        // setUsersState(users.filter(user => user.userid !== id));
    };

    const handleDeleteProduct = async (id) => {
        await dispatch(deleteProduct(id));
        await dispatch(deleteRedPro(id));
        // setProductsState(products.filter(product => product.productid !== id));
    };

    const handleDeleteSupplier = async (id) => {
        await dispatch(deleteSupplier(id));
        await dispatch(deleteRedSupp(id));
        // setProductsState(products.filter(product => product.productid !== id));
    };

    const handleDeleteIngredient = async (id) => {
        await dispatch(deleteIngredient(id));
        await dispatch(deleteRedIngre(id));
        // setProductsState(products.filter(product => product.productid !== id));
    };

    return (
        <div className="admin">
            <TopBar logout={userLogout} />
            <div className="admin-section">
                <SideBar menu={handleMenu} />
                {
                    type === "user" ? <Users users={users} remove={handleDeleteUser} /> :
                    (
                        type === "product" ? <Products products={products} remove={handleDeleteProduct} /> : 
                        (
                            type === "supplier" ? <Suppliers setSuppliersState={setSuppliersState} suppliers={suppliers} remove={handleDeleteSupplier} /> :
                            (
                                type === "ingredient" ? <Ingredients setIngredientsState={setIngredientsState} ingredients={ingredients} remove={handleDeleteIngredient} /> : null
                            )
                        )
                    )
                }
            </div>
        </div>
    )
}

export default AdminPage;
