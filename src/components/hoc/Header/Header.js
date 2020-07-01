import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./Header.module.scss";
import MenuButton from "./MenuButton/MenuButton";
import logo from "../../../images/logo.png";
import PopupMenu from "./PopupMenu/PopupMenu";
import {NavLink, useLocation} from 'react-router-dom';

const Header = () => {

    const [state, setState] = useState({
        isMenuOpen: false,
        isTraceBackMenuOpen: false,
        page: "Главная",
        links : [
            {to: "/", label: "Главная", exact: true,},
            {to: "/Questions", label: "Вопросы", exact: false},
            {to: "/Posts", label: "Статьи", exact: false},
        ],
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

    const backTraceRef = useRef();

    useEffect(()=>{
        let vh = window.innerHeight * 0.01;
        backTraceRef.current.style.setProperty('--vh', `${vh}px`);
    });

    return (
        window.innerWidth <= 570?
                <div className={classes.SmartSize}>
                    <div className={window.innerWidth<1400? classes.BackTrace: classes.backTraceDesktop} onClick={toggleMenu} ref={backTraceRef}/>
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
                <div  className={window.innerWidth<1400? classes.BackTrace: classes.backTraceDesktop} onClick={toggleMenu} ref={backTraceRef}></div>
                <div className={backTraceMenu.join(' ')}>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                    <div className={window.innerWidth<1400? classes.backTraceLink: classes.backTraceLinkDesktop}/>
                </div>
                <div className={classes.Header}>
                    <img srcSet={logo} alt=""/>
                    <div className={classes.MenuButtons}>
                        <NavLink to={state.links[0].to} exact={state.links[0].to.exact}><div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop} style={{marginLeft: "50px"}}>Главная</div></NavLink>
                        <NavLink to={state.links[1].to} exact={state.links[1].to.exact}><div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop}>Вопросы</div></NavLink>
                        <NavLink to={state.links[2].to} exact={state.links[2].to.exact}><div className={window.innerWidth <= 1440 ? classes.ButtonSmart: classes.ButtonDesktop}>Статьи</div></NavLink>
                    </div>
                </div>
            </div>
    );
};

export default Header;