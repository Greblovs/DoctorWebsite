import React from 'react';
import classes from "./Question.module.scss";

const Question = ({shortTitle}) => {
    return (
        <div className={classes.Question}>
            <div className={classes.Text}>
                {shortTitle}
            </div>
            <button className={classes.Button}>
                Читать дальше
            </button>
        </div>
    );
};

export default Question;