import React, {useCallback} from 'react';
import classes from "./Layout.module.scss";
import Header from "../../Header/Header";
import Botter from "../../Botter/Botter";


import ScrollTrigger from 'react-scroll-trigger';
import TrackVisibility  from "react-on-screen";


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