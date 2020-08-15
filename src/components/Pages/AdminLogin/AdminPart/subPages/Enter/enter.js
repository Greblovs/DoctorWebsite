import classes from "./enter.module.scss"
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/checkPass';
const DEFAULT_QUERY1 = '/admin/';

const Enter = ()=> {


    function updatePass(id){
        const jwt = localStorage.getItem('cool-jwt');
        console.log(id);
        if (id !== null) {
            axios.put(API + DEFAULT_QUERY1 + id.toString(), {
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('newPass').value.trim(),
            },{
                headers: {authorization: `Bearer ${jwt}`},
            })
                .then(function (response) {
                    console.log(response.data);
                    alert(response.data.message+'\nПовторите вход на страницу');
                    window.location.reload();
                })

                .catch(function (error) {
                    try{
                    console.log(error.response);
                    alert(error.response.data.message);}
                    catch (err){
                        alert(err.message);
                    }


                });
        }

    }
    function enter(e) {
        e.preventDefault();
        const jwt = localStorage.getItem('cool-jwt');

        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('oldPass').value.trim(),
        },{
            headers: {authorization: `Bearer ${jwt}`},
            }
        )
            .then(function (response) {
                console.log(response.data.success);
                console.log(response.data.id);
                if (response.data.success == true) {

                    updatePass(response.data.id);
                }else{window.location.reload();}

            })
            .catch(function (error) {
                try{
                console.log(error.response);
                alert(error.response.data.message);}
                catch (err){
                    alert(err.message);
                }
            });

    };

        return (
            <>
                <form className={classes.form} onSubmit={enter}>
                    <p className={classes.title}>Изменить пароль и логин</p>
                    <input className={classes.input} placeholder={"Введите старый пароль"} type={"password"}
                           id={'oldPass'}/>
                    <input className={classes.input} placeholder={"Введите новый пароль"} type={"password"}
                           id={'newPass'}/>
                    <input className={classes.input} placeholder={"Введите новый логин (почту)"} type={"text"}
                           id={'email'}/>
                    <input className={classes.submitButton} value={"Изменить"} type={"submit"}/>
                </form>
            </>
        )

}
export default Enter;