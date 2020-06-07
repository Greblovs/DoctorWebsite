import React from 'react';
import classes from "./Heading.module.scss";

const Heading = ({text}) => {
    return (
        <div className={classes.Heading}>
            <p>{text}</p>
        </div>
    );
};

export default Heading;