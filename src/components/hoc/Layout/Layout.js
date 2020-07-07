import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import classes from "./Layout.module.scss";
import Header from "../Header/Header";
import Botter from "../Botter/Botter";
import ScrollingContext from "../ScrollingContext";


const Layout = ({children}) => {

    const [state, setState] = useState({
       scrollable: false
    });

    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    const layoutCls = [classes.Layout];


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
    let style = {};

    if (state.scrollable === true){
        layoutCls.push(classes.unscrollable)
        style = {paddingRight: `${scrollWidth}px`}
        console.log(style);
    }

    return (
        <>
            <ScrollingContext.Provider value={()=>{changeScrolling()}}>
            <div className={layoutCls.join(" ")} ref={layoutRef}>
                <Header/>
                <div className={classes.Wrapper} style={style}>
                    {children}
                </div>
                <Botter/>
            </div>
            </ScrollingContext.Provider>

        </>
    );
};

export default Layout;