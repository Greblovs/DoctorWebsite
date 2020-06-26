import React, { useState, useEffect } from 'react'

import {Route, Switch} from 'react-router-dom'
import Registration from "./components/Pages/Registration"
import MainPage from "./components/Pages/Main/Main"
import Posts from "./components/Pages/Posts/Posts"
import Questions from "./components/Pages/Questions/Questions"
import Layout from "./components/hoc/Layout/Layout";







function App() {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })}
            window.addEventListener('resize', handleResize)

        })



    return (
        <>
        <Layout>
            <Switch>
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