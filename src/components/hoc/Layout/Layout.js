import React from 'react';
import classes from "./Layout.module.scss";
import Header from "../../Header/Header";
import Botter from "../../Botter/Botter";


const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className={classes.Layout} >
                {children}
                <Botter/>
            </div>
        </>
    );
};

export default Layout;