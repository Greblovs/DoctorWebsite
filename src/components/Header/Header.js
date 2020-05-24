import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./Header.module.scss";
import MenuButton from "./MenuButton/MenuButton";
import logo from "../../images/logo.png";
import PopupMenu from "./PopupMenu/PopupMenu";
import { useLocation } from 'react-router-dom';

const Header = () => {

    const [state, setState] = useState({
        isMenuOpen: false,
        page: "Главная"
    });

    const location = useLocation().pathname;
    if (location === "/" && state.page !== "Главная"){
        setState(prev => {
            return {
                ...prev,
                page: "Главная"
            }
        })
    }else if (location === "/Questions" && state.page !== "Вопросы"){
        setState(prev => {
            return {
                ...prev,
                page: "Вопросы"
            }
        })
    }else if (location === "/Posts" && state.page !== "Статьи"){
        setState(prev => {
            return {
                ...prev,
                page: "Статьи"
            }
        })
    }else if (location === "/Registration" && state.page !== "Регистрация"){
        setState(prev => {
            return {
                ...prev,
                page: "Регистрация"
            }
        })
    }

    const openMenu = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                isMenuOpen: !prev.isMenuOpen
            }
        })
    }, []);

    const chooseElement = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                isMenuOpen: false
            }
        })
    }, []);

    return (
        <>
            <div className={classes.Header}>
                <MenuButton isOpen={state.isMenuOpen} handleClick={openMenu}/>
                <img srcSet={logo} alt=""/>
                <div className={classes.Title}>
                    {state.page}
                </div>
            </div>
            <PopupMenu isOpen={state.isMenuOpen}  handleClick={chooseElement} page={state.page}/>
        </>
    );
};

export default Header;