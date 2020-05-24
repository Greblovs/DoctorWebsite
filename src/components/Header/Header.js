import React, {useCallback, useState} from 'react';
import classes from "./Header.module.scss";
import MenuButton from "./MenuButton/MenuButton";
import logo from "../../images/logo.png";
import PopupMenu from "./PopupMenu/PopupMenu";

const Header = () => {

    const [state, setState] = useState({
        isMenuOpen: false,
        page: "Главная"
    });

    const openMenu = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                isMenuOpen: !prev.isMenuOpen
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
            <PopupMenu isOpen={state.isMenuOpen}  handleClick={openMenu}/>
        </>
    );
};

export default Header;