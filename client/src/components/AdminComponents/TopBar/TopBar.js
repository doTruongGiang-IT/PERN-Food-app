import React from 'react';
import './TopBar.css';
import logo from '../../../assets/logo.png';
import authentication from '../../../assets/hau.png';
import profile from '../../../assets/profile.png';

const TopBar = ({logout}) => {
    let temp = JSON.parse(localStorage.getItem("pern_food_auth"));

    return (
        <div className="topBar">
            <div className="topBarWrapper">
                <div className="topLeft">
                    <img src={logo} alt="logo" />
                </div>
                <div className="topRight">
                    <div className="topBarIcons">
                        {
                            (temp !== null) ? <img onClick={logout} src={temp.profile ? temp.profile : authentication} alt="user" /> : <img src={profile} alt="user" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;
