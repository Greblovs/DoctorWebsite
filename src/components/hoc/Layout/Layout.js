import React, {useCallback, useState} from 'react';
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
        console.log(123)
        setState((prev)=>{
           return{
               scrollable: !prev.scrollable
           }
        });
    },[]);

    return (
        <>
            <ScrollingContext.Provider value={()=>{changeScrolling()}}>
            <div className={layoutCls.join(" ")} >
                <Header/>
                {children}
                <Botter/>
            </div>
            </ScrollingContext.Provider>

        </>
    );
};

export default Layout;