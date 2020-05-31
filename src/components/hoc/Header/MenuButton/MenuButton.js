import React from 'react';
import classes from "./MenuButton.module.scss"

const MenuButton = ({isOpen, handleClick}) => {

    const menuButtonCLs = [classes.MenuButton];
    const firstLineCls = [classes.Line, classes.first];
    const secondLineCls = [classes.Line, classes.second];
    const thirdLineCls = [classes.Line, classes.third];

    if (isOpen){
        menuButtonCLs.push(classes.open);
        firstLineCls.push(classes.open);
        secondLineCls.push(classes.open);
        thirdLineCls.push(classes.open);
    }


    return (
        <div className={menuButtonCLs.join(" ")} onClick={handleClick}>
            <div className={firstLineCls.join(" ")}/>
            <div className={secondLineCls.join(" ")}/>
            <div className={thirdLineCls.join(" ")}/>
        </div>
    );
};

export default MenuButton;