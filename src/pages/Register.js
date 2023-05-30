import React, { useState } from "react";
import axios from 'axios';

import {setCookie} from "../helpers";
import config from '../config/app'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const makeRequest = (e) => {
        e.preventDefault();
        axios.post(config.host + '/api/auth/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        },{headers: { 'Accept': 'application/json' } }).then(response => {
            setCookie('XSRF-TOKEN', response.data.access_token)
            setCookie('token_type', response.data.token_type)
        }).catch(error => {
            console.log(error);
            if(error.response) {
                console.log(error.response)
            }
        });;
    }
    return (
        <div className="container">
            <div className="container-fluid">
                <div className="form-wrap d-flex align-items-center justify-content-center">
                    <form method="POST" className="customFrom" onSubmit={makeRequest}>
                        <div className="form-group mb-2">
                            <input type="text" onChange={e => setName(e.target.value)} value={name} name="name" className="form-control"  placeholder="Full name"/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="email" onChange={e => setEmail(e.target.value)} value={email} name="email" className="form-control"  placeholder="Enter email"/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" onChange={e => setPassword(e.target.value)} value={password} name="password" className="form-control" placeholder="Password"/>
                        </div>

                        <div className="form-group mb-2">
                            <input type="password" onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} name="password_confirmation" className="form-control" placeholder="Password confirm"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register;