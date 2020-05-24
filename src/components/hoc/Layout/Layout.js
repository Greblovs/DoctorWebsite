import React from 'react';
import classes from "./Layout.module.scss";
import Header from "../../Header/Header";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className={classes.Layout}>
                {children}
            </div>
        </>
    );
};

export default Layout;