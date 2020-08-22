import React, {useCallback, useRef, useState} from "react";
import classes from "../restore/restore.module.scss"
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/resetPass';

const NewPassword = (props) =>{

    function resetPassword(e) {
        e.preventDefault();
        console.log(props.match.params.token)
        axios.put(API + DEFAULT_QUERY, {
            password: document.getElementById('password').value.trim(),

        }, {headers :{authorization : `Bearer ${props.match.params.token}`}})
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
            <h2 className={classes.title}>Новый пароль</h2>
            <form onSubmit={resetPassword}>
                <input id ="password" type={"password"} className={classes.Restore} placeholder={"Введите новый пароль"}/>
                <input  value={"Подтвердить"} className={classes.Button} type={"submit"}/>
            </form>

        </>
    )
}

export default NewPassword