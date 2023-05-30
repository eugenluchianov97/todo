import {useEffect,useState} from 'react';
import {Route, Routes, BrowserRouter, Navigate, useNavigate} from 'react-router-dom';

import axios from "axios";
import config from "./config/app";
import {getCookie, setCookie,clearCookie} from "./helpers";

import AuthContext from "./contexts/authContext";
import LanguageContext from "./contexts/languageContext";

import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
import Sidebar from "./components/Sidebar";
import Loading  from "./components/Loading";
import Dashboard  from "./components/Dashboard";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";



import './i18n'


function App() {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState({})


    useEffect(() => {
        const token = getCookie('XSRF-TOKEN');
        axios.post(config.host + '/api/check-auth', {},{headers: { 'Accept': 'application/json',"Authorization": "Bearer "+ token} }).then(response => {
            setUser(response.data.user);
            setLoading(false);
            return response.data.user
        }).catch(error => {
            console.log('here' + error);
            setUser(null);
            setLoading(false);
           console.log(user);
            return null;
        });
        }, [])
    const [language, setLanguage] = useState("en");

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            <AuthContext.Provider value={{user, setUser}}>
                {loading && (
                    <Loading/>
                )}
                {!loading && (
                    <BrowserRouter>
                        <Sidebar/>
                        <Routes>
                            <Route exact path='/' element={<Home/>} />
                            <Route exact path='/login' element={<Login/>} />
                            <Route exact path='/users' element={<User/>} />
                        </Routes>

                    </BrowserRouter>
                )
                }

            </AuthContext.Provider>
        </LanguageContext.Provider>
    );

}

export default App;
