import classes from "./contact.module.scss"
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/contacts';
const DEFAULT_QUERY1 = '/contact/';


const Contacts = (props) =>{


    const [state, setState] = useState({
        id: null,
        phoneNumber : null,
        email : null,
        isLoading:false

    })
    if(!state.isLoading){
        axios.get(API + DEFAULT_QUERY)
            .then(function (result) {
               // console.log(result.data.data[0]);
                setState((prev)=>{
                return {
                    ...prev,
                    id :result.data.data[0].id,
                    phoneNumber: result.data.data[0].phoneNumber,
                    email: result.data.data[0].email,
                    isLoading: true
                }
            })
            })

            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
    }
    function editContact(){

            axios.put(API + DEFAULT_QUERY1+state.id.toString(), {
            phoneNumber: state.phoneNumber,
                email: state.email

        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);


            })
            .catch(function (error) {

                console.log(error.response.data.error.errors);

            });}



    const phoneUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                phoneNumber: phone.current.value
            }
        })
    },[]);


    const emailUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                email: email.current.value
            }
        })
    },[]);

    //const viber = useRef();
    const phone = useRef();
    const email = useRef()

    return(
        <>

            <form  className={classes.form}>
                <p className={classes.title}>Телефон</p>
                <input className={classes.input} ref={phone} onChange={phoneUpdate} value={state.phoneNumber} />
                <input className={classes.submitButton} onClick={editContact} type={"submit"} value={"Сохранить"}/>
            </form>
            <form  className={classes.form}>
                <p className={classes.title}>Е-Мейл</p>
                <input className={classes.input} ref={email} onChange={emailUpdate}  value={state.email} />
                <input className={classes.submitButton} onClick={editContact} type={"submit"} value={"Сохранить"}/>
            </form>
        </>
    )

};

export default Contacts;