import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./Post.module.scss";
import {NavLink} from "react-router-dom";

function getElementOffset(element) {
    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top + window.pageYOffset - de.clientTop;
    const left = box.left + window.pageXOffset - de.clientLeft;
    return {top: top, left: left};
}


const Post = ({index, title, text, someAdditor}) => {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })}
        window.addEventListener('resize', handleResize)

    })


    const [state, setState] = useState({
        isOpen: false,
        translation: {transform: "translate3d(0,0,0)"}
    })

    const postCls = [classes.Post];

    const postRef = useRef();

    const openPost = useCallback(() => {
        const offset = getElementOffset(postRef.current)
        const top = offset.top;
        const left = offset.left;
        someAdditor();
        setState((prev) => {
            let translation = {transform: `translate3d(${-offset.left + 10}px,${-offset.top + 10}px,0)`}
            if (prev.isOpen){
                translation = {}
            }
            return {
                ...prev,
                isOpen: !prev.isOpen,
                translation
            }
        })


    }, []);

    if (state.isOpen) {
        postCls.push(classes.open);
    }

    if (window.innerWidth > 660) {
        postCls.push(classes.fullscreen)
    }

    let marg = index * 50;

    marg = marg + "vw";


    return (
        <div style={window.innerWidth < 660 ? {float: "left"} :
            window.innerWidth > 660 && index % 2 === 0 ?
                index === 2 ?
                    {float: "left", marginLeft: marg, marginTop: "-310px"}
                    :
                    {float: "left", marginLeft: marg}
                :
                index === 3 ?
                    {marginLeft: marg, marginTop: "-310px"}
                    :
                    {marginLeft: marg}} className={classes.PostWrap}>
            <div className={postCls.join(" ")} ref={postRef} style={state.translation}>
                <div className={classes.Title}>
                    {title}
                </div>
                <div className={classes.Text}>
                    {text}
                </div>
                <button onClick={openPost} className={classes.Button}>
                    Читать дальше
                </button>
            </div>
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen && prevProps.translationY === nextProps.translationY;
});