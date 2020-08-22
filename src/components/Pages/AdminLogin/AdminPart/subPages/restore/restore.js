import React, {useCallback, useRef, useState} from "react";
import classes from "./restore.module.scss"
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/forgotPass';

const Restore = () =>{

    function forgotPassword(e) {
        e.preventDefault();

        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('email').value.trim(),

        })
            .then(function (response) {
                alert(response.data.message);
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
    return(
        <>
            <h2 className={classes.title}>Восстановить пароль</h2>
            <form onSubmit={forgotPassword}>
                <input id ="email" className={classes.Restore} placeholder={"Введите електронную почту"}/>
                <input  value={"Восстановить"} className={classes.Button} type={"submit"}/>
            </form>
            <NavLink to="/admin/Pages/Enter" ><div className={classes.Back}>Вернуться назад</div></NavLink>
        </>
    )
}

export default Restore