import React from 'react';
import classes from "./AdminLogin.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminPart, {AdminPage} from "./AdminPart/AdminPart"


const API = 'http://localhost:3001/api';
const DEFAULT_QUERY = '/signin';



const AdminLogin = (props) => {


     const login = (event) =>{

        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('login').value.trim(),
            password: document.getElementById('password').value.trim(),
    
        })
            .then(function (res){
                console.log(res.data);
                localStorage.setItem('cool-jwt',res.data);
                props.refresh();
            })

    }



    return (
        <>
            <form className={classes.form} onSubmit={login}>
                            <span className={classes.Header}>Вход</span>
                            <input id = "login" placeholder={"Логин"} className = {classes.Login} type={"text"}/>
                            <input id = "password" placeholder={"Пароль"} className={classes.Password} type={"password"} />
                            <input  value={"Войти"} className={classes.Button} type = {"submit"} />
            </form>

    =

        </>
    )
}

export default AdminLogin;