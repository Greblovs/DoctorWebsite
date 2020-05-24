import React, {useCallback, useState} from 'react';
import classes from "./PopupMenu.module.scss"
import {NavLink} from "react-router-dom"


const PopupMenu = ({isOpen, handleClick, page}) => {
    const [state, setState] = useState({
        links : [
            {to: "/", label: "Главная", exact: true,},
            {to: "/Questions", label: "Вопросы", exact: false},
            {to: "/Posts", label: "Статьи", exact: false},
            {to: "/Registration", label: "Регистрация", exact: false},
        ],
        contacts:
            {link: "link", name: "Контакты"}

    });
    const popupMenuCls = [classes.PopupMenu];

    if (isOpen) {
        popupMenuCls.push(classes.open);
    }


    let menu  = state.links.map((element, index)=>{
        if (element.label !== page) {
            const label = element.label;
            return (
                <div className={classes.element} key={index} onClick={handleClick}>
                    <NavLink className={classes.link} to={element.to} exact={element.exact}>{element.label}</NavLink>
                </div>
            );
        }else{
            return (
                <React.Fragment key={index}/>
            )
        }
    });
    return (
        <div className={popupMenuCls.join(" ")}>
            <div className={classes.menuLinks}>
                {menu}
                <div className={classes.line}></div>
                <div className={classes.contacts}>
                    <p>{state.contacts.name}</p>
                </div>
            </div>
        </div>
    );
};

export default PopupMenu;