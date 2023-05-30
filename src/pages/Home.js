import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {getCookie} from "../helpers";
import config from '../config/app'
import AuthContext from "../contexts/authContext";
import {Navigate, useNavigate} from "react-router-dom";

const Home = () => {
     const { user, setUser } = useContext(AuthContext);

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

export default Home;