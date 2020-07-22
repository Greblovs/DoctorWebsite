import classes from "./contact.module.scss"
import React, {useCallback, useRef, useState} from "react";


const contacts = (props) =>{

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState({
        viber: "viber",
        phone: "+38022222222",
        email: "example@example.com"

    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const viberUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                viber: viber.current.value
            }
        })
    },[]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const phoneUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                phone: phone.current.value
            }
        })
    },[]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const emailUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                email: email.current.value
            }
        })
    },[]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const viber = useRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const phone = useRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const email = useRef()

    return(
        <>
            <form className={classes.form}>
                <p className={classes.title}>Вайбер</p>
                <input className={classes.input} value={state.viber} ref={viber} onChange={viberUpdate}/>
                <input className={classes.submitButton} type={"submit"} value={"Сохранить"}/>
            </form>
            <form  className={classes.form}>
                <p className={classes.title}>Телефон</p>
                <input className={classes.input} ref={phone} onChange={phoneUpdate} value={state.phone} />
                <input className={classes.submitButton} type={"submit"} value={"Сохранить"}/>
            </form>
            <form  className={classes.form}>
                <p className={classes.title}>Е-Мейл</p>
                <input className={classes.input} ref={email} onChange={emailUpdate} value={state.email} />
                <input className={classes.submitButton} type={"submit"} value={"Сохранить"}/>
            </form>
        </>
    )

};

export default contacts;