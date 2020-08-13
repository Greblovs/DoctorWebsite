import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./components/Pages/Main/Main";


import AuthenticatedComponent from "./AuthenticatedComponent";
import AdminPart from "./components/Pages/AdminLogin/AdminPart/AdminPart";


const app = (

    <BrowserRouter>

        <Switch>
            <Route path = "/admin">

                <AuthenticatedComponent>
                    <AdminPart/>
                </AuthenticatedComponent>
            </Route>
            <Route path="/">
                <App/>
            </Route>
        </Switch>
    </BrowserRouter>

)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();