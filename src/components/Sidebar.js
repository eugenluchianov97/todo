import {NavLink} from "react-router-dom";
import {getCookie} from "../helpers";
import axios from "axios";
import config from "../config/app";
import { useNavigate } from 'react-router-dom';
import React, {useState,useContext} from "react";
import AuthContext from "../contexts/authContext";


import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./Switcher";




const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const { user, setUser } = useContext(AuthContext);


    const token = getCookie('XSRF-TOKEN');
    const navigate = useNavigate();

    const logout = () => {
        axios.post(config.host + '/api/auth/logout', {},{headers: { 'Accept': 'application/json',"Authorization": "Bearer "+ token} }).then(response => {
            setUser(null)
            return navigate('/');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li  className="nav-item">
                            <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"} to="/">{t('home')}</NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"} to="/users">Users</NavLink>
                        </li>

                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <LanguageSwitcher/>

                    </ul>
                </div>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {user === null && (
                            <>
                                <li  className="nav-item">
                                <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"} to="/login">Login</NavLink>
                                </li>

                                <li  className="nav-item">
                                <NavLink className={({ isActive}) => isActive ? "nav-link active" : "nav-link"} to="/register">Register</NavLink>
                                </li>
                            </>
                        )}
                        {user !== null && (
                            <>
                                <li  className="nav-item">
                                    <a className="btn nav-link" onClick={logout} type="button">Logout</a>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default Sidebar;