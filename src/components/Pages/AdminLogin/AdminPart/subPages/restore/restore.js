
import React, {useCallback, useRef, useState} from "react";
import classes from "./restore.module.scss"
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";


const Restore = () =>{
    return(
        <>
            <h2 className={classes.title}>Востановить пароль</h2>
            <form>
                <input className={classes.Restore} type={"password"} placeholder={"Введите електронную почту"}/>
                <NavLink to="/admin/Pages/Enter" ><div className={classes.Back}>Вернуться назад</div></NavLink>

            </form>
        </>
    )
}

export default Restore