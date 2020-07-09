import React from 'react';
import Header from "../Header/Header";
import Botter from "../Botter/Botter";


const Layout = ({children}) => {

    return (
        <>
            <div className={"layout"}>
                <Header/>
                {children}
                <Botter/>
            </div>
        </>
    );
};

export default Layout;