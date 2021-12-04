import React from 'react';
import './SideBar.css';
import {PersonOutlined, LocalPizzaOutlined, LocalDiningOutlined, SettingsInputSvideoOutlined} from '@material-ui/icons';

const SideBar = ({menu}) => {
    const handleMenu = (type) => {
        let userMenu = document.querySelector("li:nth-child(1)");
        let productMenu = document.querySelector("li:nth-child(2)");
        let supplierMenu = document.querySelector("li:nth-child(3)");
        let ingredientMenu = document.querySelector("li:nth-child(4)");
        if(type === "user") {
            userMenu.classList.add("active");
            productMenu.classList.remove("active");
            supplierMenu.classList.remove("active");
            ingredientMenu.classList.remove("active");
        };
        if(type === "product") {
            userMenu.classList.remove("active");
            productMenu.classList.add("active");
            supplierMenu.classList.remove("active");
            ingredientMenu.classList.remove("active");
        };
        if(type === "supplier") {
            userMenu.classList.remove("active");
            productMenu.classList.remove("active");
            supplierMenu.classList.add("active");
            ingredientMenu.classList.remove("active");
        };
        if(type === "ingredient") {
            userMenu.classList.remove("active");
            productMenu.classList.remove("active");
            supplierMenu.classList.remove("active");
            ingredientMenu.classList.add("active");
        };
        menu(type);
    };

    return (
        <div className="sideBar">
            <div className="sideBarWrapper">
                <ul className="sideBarList">
                    <li className="sideBarListItem active" onClick={() => handleMenu("user")}>
                        <PersonOutlined />
                        Users
                    </li>
                    <li className="sideBarListItem" onClick={() => handleMenu("product")}>
                        <LocalPizzaOutlined />
                        Products
                    </li>
                    <li className="sideBarListItem" onClick={() => handleMenu("supplier")}>
                        <LocalDiningOutlined />
                        Suppliers
                    </li>
                    <li className="sideBarListItem" onClick={() => handleMenu("ingredient")}>
                        <SettingsInputSvideoOutlined />
                        Ingredients
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;
