import React, {useState} from 'react';
import classes from "./AdminLogin.module.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminPart, {AdminPage} from "./AdminPart/AdminPart"

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/signin';

const AdminLogin = () => {

    const [state, setState] = useState({
        isLoading: false
    });

    function login(e) {
        e.preventDefault();
        // setState((prev => {
        //         return {
        //             ...prev,
        //             isLoading: true
        //         }
        //     }
        // ))

        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('login').value.trim(),
            password: document.getElementById('password').value.trim(),


        })
            .then(function (response) {
                localStorage.setItem('cool-jwt', response.data.accessToken);
                // setState((prev => {
                //         return {
                //             ...prev,
                //             isLoading: false
                //         }
                //     }
                //
                // ))
                // window.location.reload(false);
                window.location.reload();
            })
            .catch(function (error) {
                try{
                console.log(error.response.data);
                alert(error.response.data.message);}
                catch (err){
                    alert(err.message);
                }
                // setState((prev => {
                //         return {
                //             ...prev,
                //             isLoading: false
                //         }
                //     }
                // ))
                // window.location.reload();

            });
    }
    // console.log(state.isLoading);
    //
    // setTimeout(()=> {
    //         if (state.isLoading === true) {
    //             setState((prev => {
    //                     return {
    //                         ...prev,
    //                         isLoading: false
    //                     }
    //                 }
    //             ))
    //         }
    //     }, 200
    // )

   // if (state.isLoading == false) {
        return (
            <>
                <form className={classes.form} onSubmit={login}>
                    <span className={classes.Header}>Вход</span>
                    <input id="login" placeholder={"Логин"} className={classes.Login} type={"text"}/>
                    <input id="password" placeholder={"Пароль"} className={classes.Password} type={"password"}/>
                    <input value={"Войти"} className={classes.Button} type={"submit"}/>
                </form>

            </>
        )
   // }else{
      //  return (
        //    <h1></h1>
        //)
    //}

}

export default AdminLogin;