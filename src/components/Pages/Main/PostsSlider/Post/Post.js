import React, {useCallback, useEffect, useRef} from 'react';
import classes from "./Post.module.scss";
import {NavLink} from "react-router-dom";


const Post = ({title, text, isOpen, id, translationY, openPost, hasToUpdate, disAnim}) => {


    const postCls = [classes.Post];

    const postRef = useRef();

    if (isOpen){
        postCls.push(classes.open);
    }

    if (disAnim){
        postCls.push(classes.disAnim);
    }


    return (
        <div className={classes.PostWrap}>
            <div className={postCls.join(" ")} ref={postRef} style={{transform: `translate3d(0px,${(-translationY)}px,0)`}}>
                <div className={classes.Title}>
                    {title}
                </div>
                <div className={classes.Text}>
                    {text}
                </div>
                <div onClick={()=>{openPost(postRef, id)}}>

                    {!isOpen ?
                        <NavLink className={classes.Button} to={"/post/"+id}>
                            Читать дальше
                        </NavLink>
                        :
                        <NavLink className={classes.Button} to={"/"}>
                            Читать дальше
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen && prevProps.translationY === nextProps.translationY;
});