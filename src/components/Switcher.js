import React, {useContext} from "react";
import LanguageContext from './../contexts/languageContext'
import i18n from "i18next";
import {NavLink} from "react-router-dom";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    const ru = () => {
        setLanguage('ru')
        i18n.changeLanguage('ru');
    }
    const en = () => {
        setLanguage('en');
        i18n.changeLanguage('en');
    }
    return (
        <>
            <ul className="navbar-nav">
                <li  className="nav-item" onClick={ru}>
                    <a className={language === 'ru' ? 'nav-link active' : 'nav-link disabled'}>RU</a>
                </li>
                <li  className="nav-item" onClick={en}>
                    <a className={language === 'en' ? 'nav-link active' : 'nav-link disabled'} >EN</a>
                </li>

            </ul>

        </>


    );
};

export default LanguageSwitcher;