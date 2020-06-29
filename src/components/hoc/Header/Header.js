import React, {useCallback, useState} from 'react';
import classes from "./Header.module.scss";
import MenuButton from "./MenuButton/MenuButton";
import logo from "../../../images/logo.png";
import PopupMenu from "./PopupMenu/PopupMenu";
import { useLocation } from 'react-router-dom';

const Header = () => {

    const [state, setState] = useState({
        isMenuOpen: false,
        isTraceBackMenuOpen: false,
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

    let backTraceMenu = [classes.BackTraceMenu, classes.backTraceMenuClosed];

    if (window.innerWidth>=1400){
        backTraceMenu= [classes.BackTraceMenuDesktop, classes.backTraceMenuClosed]
    }

    const toggleMenu = useCallback(()=>{
        setState(prev => {
            return {
                ...prev,
                isTraceBackMenuOpen: !prev.isTraceBackMenuOpen
            }
        })



    }, []);
    if (state.isTraceBackMenuOpen === true){
        backTraceMenu.pop();
        if (window.innerWidth<1400){
            backTraceMenu.push(classes.backTraceMenuOpen);
        }else{
            backTraceMenu.push(classes.backTraceMenuOpenDesktop);
        }

        console.log(backTraceMenu)
    }else{
        backTraceMenu.pop();
    }



    return (
        window.innerWidth <= 570?
                <div className={classes.SmartSize}>
                    <div className={window.innerWidth<1400? classes.BackTrace: classes.backTraceDesktop} onClick={toggleMenu}/>
                    <div className={backTraceMenu.join(' ')}>
                        <div className={classes.backTraceLink}/>
                        <div className={classes.backTraceLink}/>
                        <div className={classes.backTraceLink}/>
                    </div>
                    <div className={classes.Header}>
                        <MenuButton isOpen={state.isMenuOpen} handleClick={openMenu}/>
                        <img srcSet={logo} alt=""/>
                        <div className={classes.Title}>
                            {state.page}
                        </div>
                    </div>
                    <PopupMenu isOpen={state.isMenuOpen}  handleClick={chooseElement} page={state.page}/>
                </div>
            :
            <div className={ classes.TabletSize}>
                <div  className={window.innerWidth<1400? classes.BackTrace: classes.backTraceDesktop} onClick={toggleMenu}></div>
                <div className={backTraceMenu.join(' ')}>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                </div>
                <div className={classes.Header}>
                    <img srcSet={logo} alt=""/>
                    <div className={classes.MenuButtons}>
                        <div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop} style={{marginLeft: "6vw"}}>Главная</div>
                        <div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop}>Вопросы</div>
                        <div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop}>Статьи</div>
                    </div>
                </div>
            </div>
    );
};

export default Header;