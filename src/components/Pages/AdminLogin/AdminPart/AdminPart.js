import classes from "./AdminPart.module.scss"
import React, {useState} from "react";
import AuthenticatedComponent from "../../../../AuthenticatedComponent";
import axios from "axios";
import contacts from "./subPages/contacts/contact";
import Questions from "./subPages/Questions/adminQuestions"
import Sliders from "./subPages/Slider/Sliders"
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import Posts from "./subPages/Posts/posts";
import Enter from "./subPages/Enter/enter"



const AdminPart = () => {
    let ip = require("ip");
    let string = "IP: " + ip.address()
    function logout(){
        localStorage.removeItem('cool-jwt');
        window.location.reload();
    }

    return (
        <>
            <div className={classes.Menu}>
                <div className={classes.ButtonWrapper}>
                    <NavLink to="/admin/Pages/Questions" className={classes.Button}>Вопросы</NavLink>
                    <NavLink to="/admin/Pages/Posts" className={classes.Button}>Посты</NavLink>
                    <NavLink to="/admin/Pages/Contacts" className={classes.Button}>Контакты</NavLink>
                    <NavLink to="/admin/Pages/Slider" className={classes.Button}>Слайдер</NavLink>
                    <NavLink to="/admin/Pages/Enter" className={classes.Button}>Пароль</NavLink>
                    <div style={{cursor: "pointer"}}   className={classes.Button} onClick={logout}>Выйти</div>
                </div>

            </div>
            <Switch>
                <Route exact path="/admin/Pages/Questions" component={Questions} >
                </Route>
                <Route exact path="/admin/Pages/Posts"  component={Posts} >
                </Route>
                <Route exact path = "/admin/Pages/Contacts" component={contacts}>
                </Route>
                <Route exact path = "/admin/Pages/Slider" component={Sliders}>
                </Route>
                <Route exact path = "/admin/Pages/Enter" component={Enter}>
            </Route>


                <Route  path = "/admin">
                    <>
                        <p className={classes.Title}>Добро пожаловать Кот Вячеслав Федоровичь</p>
                        <p className={classes.IP}>{string}</p>
                    </>

                </Route>

            </Switch>
        </>
    );
};

export default AdminPart;