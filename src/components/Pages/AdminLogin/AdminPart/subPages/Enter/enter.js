import classes from "./enter.module.scss"
import React, {useCallback, useRef, useState} from "react";


const Enter = ()=>{



    return(
        <>
            <form className={classes.form}>
                <p className={classes.title}>Изменить пароль и логин</p>
                <input className={classes.input} placeholder={"Введите старый пароль"} type={"password"}/>
                <input className={classes.input} placeholder={"Введите новый пароль"} type={"password"}/>
                <input className={classes.input} placeholder = {"Введите новый логин (почту)"} type = {"text"}/>
                <input className={classes.submitButton} value={"Изменить"} type={"submit"}/>
            </form>
        </>
    )
}

export default Enter;