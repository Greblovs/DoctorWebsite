import React, { useState, useEffect } from 'react'
import Ask from "./components/Pages/AskForm/Ask"
import {Route, Switch} from 'react-router-dom'
import Registration from "./components/Pages/Registration"
import MainPage from "./components/Pages/Main/Main"
import Posts from "./components/Pages/Posts/Posts"
import Questions from "./components/Pages/Questions/Questions"
import Layout from "./components/hoc/Layout/Layout";






function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}




function App() {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        let isMounted = true
        const debouncedHandleResize = debounce(function handleResize() {
            if(isMounted ) {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                })
            }
        }, 20)

        window.addEventListener('resize', debouncedHandleResize)
        return()=>{isMounted=false}
    })


    return (
        <>
        <Layout>
            <Switch>
                <Route path= "/Ask" component = {Ask}/>
                <Route path = "/post/:id" component = {MainPage}/>
                <Route path = "/Posts" component = {Posts}/>
                <Route path = "/Questions" component = {Questions}/>
                <Route path = "/Registration" component = {Registration}/>
                <Route path = "/" component = {MainPage}/>


            </Switch>
         </Layout>
        </>
    );
}

export default App;

