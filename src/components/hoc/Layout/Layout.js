import React from 'react';
import classes from "./Layout.module.scss";
import Header from "../Header/Header";
import Botter from "../Botter/Botter";


const Layout = ({children}) => {
    return (
        <>
            <div className={classes.Layout} >
                <Header/>
                {children}
                <Botter/>
            </div>

        </>
    );
};

export default Layout;