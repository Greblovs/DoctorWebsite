import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import classes from "./Layout.module.scss";
import Header from "../Header/Header";
import Botter from "../Botter/Botter";
import ScrollingContext from "../ScrollingContext";


const Layout = ({children}) => {

    const [state, setState] = useState({
       scrollable: false
    });

    const layoutCls = [classes.Layout];

    if (state.scrollable === true){
        layoutCls.push(classes.unscrollable)
    }

    const changeScrolling = useCallback(()=>{
        setState((prev)=>{
           return{
               scrollable: !prev.scrollable
           }
        });
    },[]);

    const layoutRef = useRef();

    useEffect(()=>{
        let vh = window.innerHeight * 0.01;
        layoutRef.current.style.setProperty('--vh', `${vh}px`);
    });

    return (
        <>
            <ScrollingContext.Provider value={()=>{changeScrolling()}}>
            <div className={layoutCls.join(" ")} ref={layoutRef}>
                <Header/>
                {children}
                <Botter/>
            </div>
            </ScrollingContext.Provider>

        </>
    );
};

export default Layout;