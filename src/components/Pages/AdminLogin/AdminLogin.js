import React from 'react';
import classes from "./AdminLogin.module.scss";

const AdminLogin = () => {
    return (
        <>
            <form className={classes.form}>
                <span className={classes.Header}>Вход</span>
                <input id = "login" placeholder={"Логин"} className = {classes.Login} type={"text"}/>
                <input id = "password" placeholder={"Пароль"} className={classes.Password} type={"password"} />
                <input  value={"Войти"} className={classes.Button} type = {"submit"} />
            </form>
        </>
    );
};

export default AdminLogin;