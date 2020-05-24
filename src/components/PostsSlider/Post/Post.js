import React from 'react';
import classes from "./Post.module.scss";

const Post = ({title, text}) => {
    return (
        <div className={classes.Post}>
            <div className={classes.Title}>
                {title}
            </div>
            <div className={classes.Text}>
                {text}
            </div>
            <button className={classes.Button}>
                Читать дальше
            </button>
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return true;
});