import React, {useState, useEffect} from 'react';
import TopBar from '../../components/AdminComponents/TopBar/TopBar';
import SideBar from '../../components/AdminComponents/SideBar/SideBar';
import {useSelector, useDispatch} from 'react-redux';
import {selectAuth, logout} from '../../features/auth/authSlice';
import { useHistory, useParams } from 'react-router';
import UserUpdateForm from '../../components/AdminComponents/UserUpdateForm/UserUpdateForm';
import { getUser, selectUser, updateUser } from '../../features/user/user';

const UserUpdatePage = () => {
    const history = useHistory();
    const {id} = useParams();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [type, setType] = useState("user");
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));
    const auth = useSelector(selectAuth);

    useEffect(() => {
        if(temp === null || !auth) {
            history.push("/");
        };
    }, [history, temp, auth]);

    useEffect(() => {
        dispatch(getUser(Number.parseInt(id)));
    }, [dispatch, id]);

    const userLogout = () => {
        localStorage.removeItem("pern_food_auth");
        dispatch(logout());
    };

    const handleMenu = (type) => {
        setType(type);
    };

    const handleUpdate = async (id, username, email, is_active) => {
        await dispatch(updateUser({id, username, email, is_active}));
        history.push("/admin");
    };

    return (
        <div className="admin">
            <TopBar logout={userLogout} />
            <div className="admin-section">
                <SideBar menu={handleMenu} />
                <UserUpdateForm user={user} update={handleUpdate} />
            </div>
        </div>
    )
}

export default UserUpdatePage;
