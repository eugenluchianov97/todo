
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {getCookie} from "../helpers";
import config from '../config/app'
import AuthContext from "../contexts/authContext";
import {Navigate} from "react-router-dom";

const Users = () => {
    const { user, setUser } = useContext(AuthContext);

    // const checkAuth = () => {
    //     const token = getCookie('XSRF-TOKEN');
    //     axios.post(config.host + '/api/check-auth', {},{headers: { 'Accept': 'application/json',"Authorization": "Bearer "+ token} }).then(response => {
    //         return response.data.user
    //     }).catch(error => {
    //         console.log(error);
    //         return null;
    //     });
    // }

    if (user === null) {
        return (<Navigate to="/login" />)
    } else {
        return (
            <div>
                <div className="card-body">
                    Home
                    {
                        user !== null && (
                            <>
                                <p>Signed in</p>
                                <div>Hi {user.name}</div>
                            </>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Users;