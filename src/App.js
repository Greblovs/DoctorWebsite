import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Registration from "./components/Pages/Registration"
import MainPage from "./components/Pages/Main"
import Posts from "./components/Pages/Posts"
import Questions from "./components/Pages/Questions"
import Layout from "./components/hoc/Layout/Layout";

function App() {
    return (
        <>
        <Layout>
            <Switch>
                <Route exact path = "/" component = {MainPage}/>
                <Route path = "/Posts" component = {Posts}/>
                <Route path = "/Questions" component = {Questions}/>
                <Route path = "/Registration" component = {Registration}/>
            </Switch>
         </Layout>
        </>
    );
}

export default App;