import React from 'react';
import classes from "./Heading.module.scss";

const Heading = ({text, marginL}) => {
    return (
        <div style={window.innerWidth>=1400? {marginLeft: marginL}: {marginLeft: "0px"}} className={classes.Heading}>
            <p>{text}</p>
        </div>
    );
};

export default Heading;