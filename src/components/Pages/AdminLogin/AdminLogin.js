import React from 'react';
import classes from "./AdminLogin.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminPart, {AdminPage} from "./AdminPart/AdminPart"


const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/signin';

function login(props){

    axios.post(API + DEFAULT_QUERY, {
        email: document.getElementById('login').value.trim(),
        password: document.getElementById('password').value.trim(),

    })
        .then(function (res){
            console.log(res.data);
            localStorage.setItem('cool-jwt',res.data);

        })
        // .then(function (response) {
        //
        //     console.log(response);
        //     console.log(response.data);
        //     console.log(response.status);
        //     console.log(response.statusText);
        //     console.log(response.headers);
        //    // console.log(response.config);
        //
        // })
        // .catch(function (error) {
        //
        //     console.log(error.response.data);
        //   //  console.log(error.response.config);
        //
        // }
        // )
}



const AdminLogin = () => {

    // const history = useHistory();
    // const nextPath = () => {
    //     history.push("./admin/Pages");
    // }



    return (
        <>
            <form onSubmit={login}>
                <span className={classes.Header}>Вход</span>
                <input id = "login" placeholder={"Логин"} className = {classes.Login} type={"text"}/>
                <input id = "password" placeholder={"Пароль"} className={classes.Password} type={"password"} />
                <input  value={"Войти"} className={classes.Button} type = {"submit"} />
            </form>

            {/*<Switch>*/}
            {/*    <Route path="/admin/Pages">*/}
            {/*        <AdminPart/>*/}
            {/*    </Route>*/}
            {/*    <Route path="/admin">*/}
            {/*        <form className={classes.form}>*/}
            {/*            <span className={classes.Header}>Вход</span>*/}
            {/*            <input id = "login" placeholder={"Логин"} className = {classes.Login} type={"text"}/>*/}
            {/*            <input id = "password" placeholder={"Пароль"} className={classes.Password} type={"password"} />*/}
            {/*            <input onClick={nextPath} value={"Войти"} className={classes.Button} type = {"submit"} />*/}
            {/*        </form>*/}
            {/*    </Route>*/}
            {/*</Switch>*/}

        </>
    )
}

export default AdminLogin;