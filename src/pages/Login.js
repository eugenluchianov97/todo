import React, { useState ,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {setCookie} from "../helpers";

import axios from 'axios';

import config from '../config/app'




import AuthContext from "./../contexts/authContext";


const Login = () => {
    const { t, i18n } = useTranslation();

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const makeRequest = (e) => {
        e.preventDefault();
        axios.post(config.host+'/api/auth/login', {email, password}, {headers: { 'Accept': 'application/json' } }).then(response => {
            if(response.data.access_token) {
                console.log('LOGIN')
                //setUser(response.data.user);
                setCookie('XSRF-TOKEN', response.data.access_token)
                setCookie('token_type', response.data.token_type)
                return navigate('/');
            }
        }).catch(error => {

        });
    };
    const emailOnChange = (e) => {
        setEmail(e.target.value)
    }

    const passwordOnChange = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className="container">

            <div className="container-fluid">
                <div className="form-wrap d-flex align-items-center justify-content-center">
                    <form method="POST" className="customFrom" onSubmit={makeRequest}>
                        <div className="form-group mb-2">
                            <input type="email" onChange={emailOnChange} value={email} name="email" className="form-control"  placeholder="Enter email"/>

                            {emailError !== '' &&
                                <span className="error text-danger">{emailError}</span>
                            }
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" onChange={passwordOnChange} value={password} name="password" className="form-control " placeholder="Password"/>
                            {passwordError !== '' &&
                                <span className="error text-danger">{passwordError}</span>
                            }
                        </div>


                        <button type="submit" className="btn btn-primary">{t('submit')}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;