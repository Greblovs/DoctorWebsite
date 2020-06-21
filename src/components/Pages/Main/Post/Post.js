import React, {useCallback, useEffect, useRef} from 'react';
import classes from "./Post.module.scss";
import {NavLink} from "react-router-dom";


const Post = ({index, title, text, isOpen, id, translationY, openPost, hasToUpdate, disAnim}) => {


    const postCls = [classes.Post];

    const postRef = useRef();

    if (isOpen){
        postCls.push(classes.open);
    }

    if (disAnim){
        postCls.push(classes.disAnim);
    }

    let marg = index*50;

    marg = marg + "vw";

    return(
        <div style={window.innerWidth < 660? {float :"left"}:
            window.innerWidth > 660 && index%2 === 0?
                index ===2?
                    {float :"left", marginLeft: marg, marginTop:"-310px"}
                :
                    {float :"left", marginLeft: marg}
            :
                index ===3?
                    {marginLeft: marg, marginTop:"-310px"}
                :
                    { marginLeft: marg }} className={classes.PostWrap}>
            <div style={ window.innerWidth<660? {width: "calc(100vw - 20px)"}: {width: "calc(50vw - 20px"}} className={postCls.join(" ")} ref={postRef}>
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