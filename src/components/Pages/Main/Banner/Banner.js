import React from 'react';
import classes from "./Banner.module.scss"

const Banner = () => {
    return (
        <div className={classes.Banner}>
            <div className={classes.Title + " " + classes.small}>
                Лор врач
            </div>
            <div className={classes.Title}>
                Кот Вячеслав Федорович
            </div>
            <button>
                Задайте вопрос
            </button>
        </div>
    );
};

export default Banner;