import React, {useCallback, useState} from 'react';
import classes from "./PopupMenu.module.scss"
import {NavLink} from "react-router-dom"
import Botter from "../../Botter/Botter";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/contacts';

const PopupMenu = ({isOpen, handleClick}) => {
    const [state, setState] = useState({
        links : [
            {to: "/", label: "Главная", exact: true,},
            {to: "/Questions", label: "Вопросы", exact: false},
            {to: "/Posts", label: "Статьи", exact: false},
        ],
        contacts:
            {link: "link", name: "Контакты"},
        contact:[],
        isLoading: false

    });
    if(!state.isLoading){
        axios.get(API + DEFAULT_QUERY)

            .then(result  => setState((prev)=>{
                return {
                    ...prev,
                    contact: result.data.data[0],
                    isLoading: true
                }
            }))
            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
    }
    const popupMenuCls = [classes.PopupMenu];

    if (isOpen) {
        popupMenuCls.push(classes.open);
    }

    let BotterTop = window.innerHeight - 420
    let menu  = state.links.map((element, index)=>{
        return (
            <div className={classes.element} key={index} onClick={handleClick}>
                <NavLink className={classes.link} to={element.to} exact={element.exact}>{element.label}</NavLink>
            </div>
        );
    });
    return (
        <div className={popupMenuCls.join(" ")}>
            <div className={classes.menuLinks}>
                {menu}

                <div style={{marginTop:BotterTop, marginLeft: "40px",zIndex: "1000"}} className={classes.Botter}>
                <div className={classes.Wrapper}>
                    <p className={classes.name}>Контакты:</p>
                    <p className={classes.info} >{state.contact.phoneNumber}</p>
                    <p className={classes.info}>{state.contact.email}</p>
                    <br/>
                    <p style={{fontWeight:"600"}} className={classes.info}>@ALL RIGHTS RESERVED | 2020</p>

                </div>
            </div>
            </div>


        </div>
    );
};

export default PopupMenu;