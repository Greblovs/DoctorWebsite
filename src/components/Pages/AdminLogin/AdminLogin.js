import React from 'react';
import classes from "./AdminLogin.module.scss";
import { useHistory } from "react-router-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminPart, {AdminPage} from "./AdminPart/AdminPart"

const AdminLogin = () => {
    const history = useHistory();
    const nextPath = () => {
        history.push("./admin/Pages");
    }
    

    return (
        <>
            <Switch>
                <Route path="/admin/Pages">
                    <AdminPart/>
                </Route>
                <Route path="/admin">
                    <form className={classes.form}>
                        <span className={classes.Header}>Вход</span>
                        <input id = "login" placeholder={"Логин"} className = {classes.Login} type={"text"}/>
                        <input id = "password" placeholder={"Пароль"} className={classes.Password} type={"password"} />
                        <input onClick={nextPath} value={"Войти"} className={classes.Button} type = {"submit"} />
                    </form>
                </Route>
            </Switch>
        </>
    );
};

export default AdminLogin;