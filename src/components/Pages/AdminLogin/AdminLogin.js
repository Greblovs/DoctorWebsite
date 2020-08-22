import React, {useState} from 'react';
import classes from "./AdminLogin.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import Restore from "./AdminPart/subPages/restore/restore";

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/signin';

const AdminLogin = () => {



    function login(e) {
        e.preventDefault();
        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('login').value.trim(),
            password: document.getElementById('password').value.trim(),


        })
            .then(function (response) {
                localStorage.setItem('cool-jwt', response.data.accessToken);

                window.location.reload();
            })
            .catch(function (error) {
                try{
                console.log(error.response.data);
                alert(error.response.data.message);}
                catch (err){
                    alert(err.message);
                }


            });
    }

        return (
            <>


                <form className={classes.form} onSubmit={login}>
                    <span className={classes.Header}>Вход</span>
                    <input id="login" placeholder={"Логин"} className={classes.Login} type={"text"}/>
                    <input id="password" placeholder={"Пароль"} className={classes.Password} type={"password"}/>
                    <input value={"Войти"} className={classes.Button} type={"submit"}/>
                    <NavLink to="/admin/restore">
                    <div className={classes.Restore}>Восстановить пароль</div>
                    </NavLink>
                </form>

            </>
        )

}

export default AdminLogin;