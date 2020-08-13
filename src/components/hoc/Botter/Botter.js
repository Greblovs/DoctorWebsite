import React, {useCallback, useState} from 'react';
import classes from "./Botter.module.scss";
import {NavLink} from 'react-router-dom';
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/contacts';

const Botter = ((props) => {
    const [state, setState] = useState({
        contacts: false,
        address: false,
        nav: false,
        links: [
            {to: "/", label: "Главная", exact: true,},
            {to: "/Questions", label: "Вопросы", exact: false},
            {to: "/Posts", label: "Статьи", exact: false},
        ],
        contact:[],
        isLoading:false
    });
    if(!state.isLoading){
        axios.get(API + DEFAULT_QUERY)

            .then(result  => setState((prev)=>{
                return {
                    ...prev,
                    contact: result.data.data[0],
                    isLoading: true
                }
            }))
            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
    }
    let contacts = [classes.Contacts];
    if (state.contacts === true) {
        contacts = [classes.ContactsOpen]
    }
    let address = [classes.Adress]
    if (state.address === true) {
        address = [classes.AdressOpen]
    }
    let nav = [classes.Nav]
    if (state.nav === true) {
        nav = [classes.NavOpen]
    }
    const openContacts = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                contacts: !prev.contacts
            }
        })
    }, [])
    const openAdress = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                address: !prev.address
            }
        })
    }, [])
    const openNav = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                nav: !prev.nav
            }
        })
    }, [])


    return (
        window.innerWidth < 1400 ?
            <div style={{marginTop: props.top, marginLeft: props.left}} className={classes.Botter}>
                <div className={classes.Wrapper}>
                    <div onClick={openContacts} className={classes.Button}>Контакты
                        <i className={state.contacts ? classes.open : null}/>
                    </div>
                    <div className={contacts.join(" ")}>
                        <p className={classes.name}>Кот Вячеслав Федорович</p>
                        <p className={classes.info}>{state.contact.phoneNumber}</p>
                        <p className={classes.info}>{state.contact.email}</p>
                        <p className={classes.info}>@theBestDoctor</p>
                        <p className={classes.info}>Задайте Вопрос</p>

                    </div>
                    <div onClick={openAdress} className={classes.Button}>Адресс
                        <i className={state.address ? classes.open : null}/></div>
                    <div className={address.join(" ")}>
                        <p className={classes.info}>клиника Медиком на Печерске</p>
                        <p className={classes.info}>ул. Василия Тютюнника (Анри Барбюса) 37/1</p>
                        <br/>
                        <p className={classes.info}>клиника Медиком на Оболони</p>
                        <p className={classes.info}>ул. Героев Сталинграда 6-Д</p>

                    </div>
                    <div onClick={openNav} className={classes.Button}>Навигация сайта
                        <i className={state.nav ? classes.open : null}/></div>
                    <div className={nav.join(" ")}>
                        <NavLink to={state.links[0].to} exact={state.links[0].exact}><p
                            className={classes.status}>Главная</p></NavLink>
                        <NavLink to={state.links[2].to} exact={state.links[2].exact}><p
                            className={classes.status}>Статьи</p></NavLink>
                        <NavLink to={state.links[1].to} exact={state.links[1].exact}><p
                            className={classes.status}>Вопросы</p></NavLink>

                    </div>
                </div>
                <p style={{fontWeight: "600", marginLeft: "20px", marginTop: "20px", paddingBottom: "30px"}}
                   className={classes.info}>@ALL RIGHTS RESERVED | 2020</p>
            </div>
            :
            <div className={classes.Botter}>
                <div style={{width: "1400px", margin: "0 auto"}}>
                    <div className={classes.Column}>
                        <div style={{width: "300px", height: "240px", textAlign: "left", marginLeft: "25px"}}>
                            <p className={classes.title}>Контакты</p>
                            <div style={{
                                width: "100%",
                                height: "4px",
                                backgroundColor: "white",
                                marginTop: "10px"
                            }}></div>
                            <p style={{paddingTop: "10px"}} className={classes.text}>{state.contact.phoneNumber}</p>
                            <p className={classes.text}>{state.contact.email}</p>
                            <p className={classes.text}>@theBestDoctor</p>
                            <p className={classes.text}>Задайте Вопрос</p>
                        </div>
                    </div>
                    <div className={classes.Column}>
                        <div style={{width: "400px", height: "240px", textAlign: "left", marginLeft: "25px"}}>
                            <p className={classes.title}>Где нас найти?</p>
                            <div style={{
                                width: "100%",
                                height: "4px",
                                backgroundColor: "white",
                                marginTop: "10px"
                            }}></div>
                            <p style={{paddingTop: "10px"}} className={classes.text}>клиника Медиком на Печерске</p>
                            <p className={classes.text}>ул. Василия Тютюнника (Анри Барбюса) 37/1</p>
                            <p style={{paddingTop: "20px"}} className={classes.text}>клиника Медиком на Оболони</p>
                            <p className={classes.text}>ул. Героев Сталинграда 6-Д</p>
                        </div>
                    </div>
                    <div className={classes.Column}>
                        <div style={{width: "300px", height: "240px", textAlign: "left", marginLeft: "125px"}}>
                            <p className={classes.title}>Навигация сайта</p>
                            <div style={{
                                width: "100%",
                                height: "4px",
                                backgroundColor: "white",
                                marginTop: "10px"
                            }}></div>
                            <NavLink to={state.links[0].to} exact={state.links[0].exact}><p style={{paddingTop: "10px"}}
                                                                                            className={classes.text}>Главная</p>
                            </NavLink>
                            <NavLink to={state.links[2].to} exact={state.links[2].exact}><p
                                className={classes.text}>Статьи</p></NavLink>
                            <NavLink to={state.links[1].to} exact={state.links[1].exact}><p
                                className={classes.text}>Вопросы</p></NavLink>
                        </div>
                    </div>
                </div>

            </div>

    );
});


export default Botter;