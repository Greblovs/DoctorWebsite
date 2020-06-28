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

function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, arguments)
        }, ms)
    };
}


const Post = ({index, title, text, someAdditor}) => {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    React.useEffect(() => {
        let isMounted = true;

        const debouncedHandleResize = debounce(function handleResize() {
            if (isMounted) {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                })
            }
        }, 20);


        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            isMounted = false
        }
    });
    const marginLetPost = (window.innerWidth/2-660)-20

    const [state, setState] = useState({
        transform: "translate3d(0,0,0)",
        fullyOpen: false,
        canOpen: true,
        translation: {transform: "translate3d(0,0,0)"},
    });



    let postCls = [classes.Post];

    if (window.innerWidth < 660) {
        postCls = [classes.Post];
    }
    if (window.innerWidth >= 660) {
        if (window.innerWidth>1400){
            postCls.push(classes.PostFLoated)
        }else {
            postCls.push(classes.Fullscreen);
        }

    }

    if (state.canOpen === false) {
        postCls.push(classes.recentlyClosed);
    }
    const postRef = useRef();

    const openPost = useCallback(() => {

        const offset = getElementOffset(postRef.current);
        const top = offset.top;
        const left = offset.left;
        someAdditor();
        setState((prev) => {
            if (prev.canOpen) {
                let translation = {transform: `translate3d(${-offset.left + 10}px,${-offset.top + 10}px,0)`};
                let fullyOpen = prev.fullyOpen;
                if (prev.isOpen) {
                    translation = {transform: "translate3d(0,0,0)"};
                    fullyOpen = false;
                } else {
                    setTimeout(() => {
                        setState((prev) => {
                            return {
                                ...prev,
                                fullyOpen: true
                            }
                        })
                    }, 500)
                }
                setTimeout(() => {
                    setState((prev) => {
                        return {
                            ...prev,
                            canOpen: true
                        }
                    })
                }, 500);
                return {
                    ...prev,
                    isOpen: !prev.isOpen,
                    translation,
                    canOpen: false,
                    fullyOpen
                }
            } else {
                return {
                    ...prev
                }
            }
        })


    }, []);

    if (state.isOpen) {
        postCls.push(classes.open)
    }

    if (state.fullyOpen) {
        postCls.push(classes.fullyOpen)
    }




    let marg = index * 50;
    let widthWindow = window.innerWidth
    marg = marg + "vw";

    let styles = ()=>({
        float: widthWindow < 660 || (window.innerWidth >= 660 && index % 2 === 0) ? "left" : null,
        marginLeft: widthWindow >= 660 ? marg : null,
        marginTop: (window.innerWidth >= 660 && (index % 2 === 0 && index === 2 || index === 3)) ? "-310px" : null,
        width: window.innerWidth >= 660 ? "50vw" : "100vw"

    })

    console.log(styles)

    return (
        <div style={styles()} className={classes.PostWrap}>
            <div style={window.innerWidth>1400 && index%2 ===0? {marginLeft: marginLetPost}:window.innerWidth>1400 && index%2 ===1? {marginLeft: "10px"}:null}>
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
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen && prevProps.translationY === nextProps.translationY;
});