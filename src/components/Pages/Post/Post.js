import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import classes from "./Post.module.scss";
import {NavLink} from "react-router-dom";
import ScrollingContext from "../../hoc/ScrollingContext";

function getElementOffset(element) {

    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top;
    const left = box.left;
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

let scrollable = true;

const changeScrolling = ()=>{
    if (scrollable) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";

        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        console.log(scrollWidth);
        document.getElementsByClassName("layout")[0].style.paddingRight = `${scrollWidth}px`;
        scrollable = false;
    }else{
        document.getElementsByTagName("html")[0].style.overflowY = "auto";
        document.getElementsByClassName("layout")[0].style.paddingRight = `0px`;
        scrollable = true;
    }
}


const Post = (props) => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    useEffect(() => {
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
        isOpen: false,
        translation: {transform: "translate3d(0,0,0)"},
        tabClicked: -1
    });

    let postCls = [classes.Post];
    let buttonCls = [classes.Button];

    let tabClss = [[classes.Tab, classes.firstColor],[classes.Tab, classes.secondColor],[classes.Tab, classes.thirdColor],[classes.Tab, classes.fourthColor],[classes.Tab, classes.fifthColor]];

    let textCls = [classes.Text];

    if (state.canOpen === false) {
        postCls.push(classes.recentlyClosed);
    }
    const postRef = useRef();

    useEffect(()=>{
        let vh = window.innerHeight * 0.01;
        postRef.current.style.setProperty('--vh', `${vh}px`);
    });

    const openPost = useCallback(() => {

        const offset = getElementOffset(postRef.current);
        props.someAdditor();
        setState((prev) => {
            if (prev.canOpen) {
                changeScrolling();
                let translation = {transform: `translate3d(${-offset.left + 10}px,${-offset.top}px,0)`};
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
        if (props.notSimple){
            buttonCls.push(classes.plus);
            textCls.push(classes.notSimple);
        }
        tabClss[0].push(classes.first);
        tabClss[1].push(classes.second);
        tabClss[2].push(classes.third);
        tabClss[3].push(classes.fourth);
        tabClss[4].push(classes.fifth);
    }

    if (state.fullyOpen) {
        postCls.push(classes.fullyOpen)
    }

    if (props.notSimple){
        postCls.push(classes.notSimple)
    }

    if (state.tabClicked >= 0){
        const id = state.tabClicked
        for (let i = 0; i <= id; i++) {
            tabClss[i].push(classes.top)
        }
        tabClss[id].push(classes.focused)
        for (let i = id + 1; i < tabClss.length; i++) {
            tabClss[i].push(classes.bottom)
        }
    }

    const tabClick = useCallback((id)=>{
        setState((prev)=>{
            if (prev.tabClicked >= 0){
                id = -1
            }
            return{
                ...prev,
                tabClicked: id
            };
        });
    },[])

    const postWrapCls = [classes.PostWrap];
    if (props.isPost){
        postWrapCls.push(classes.margin)
    }
    if (props.isSliding){
        postWrapCls.push(classes.sliding)
    }

    return (
        <div className={postWrapCls.join(" ")}>
                <div className={postCls.join(" ")} ref={postRef} style={state.translation}>
                    <div className={classes.Title}>
                        {props.title}
                    </div>
                    <div className={textCls.join(" ")}>
                        {!props.notSimple? props.fullText: props.text}
                    </div>
                    {props.notSimple ?
                        <>
                            <div className={tabClss[0].join(" ")} onClick={()=>{tabClick(0)}}>
                                <div className={classes.Title}>
                                    Заболевание
                                </div>
                                <div className={classes.Text}>
                                    {props.illnes}
                                </div>
                            </div>
                            <div className={tabClss[1].join(" ")} onClick={()=>{tabClick(1)}}>
                                <div className={classes.Title}>
                                    Классификация
                                </div>
                                <div className={classes.Text}>
                                    {props.classif}
                                </div>
                            </div>
                            <div className={tabClss[2].join(" ")} onClick={()=>{tabClick(2)}}>
                                <div className={classes.Title}>
                                    Практика
                                </div>
                                <div className={classes.Text}>
                                    {props.practicy}
                                </div>
                            </div>
                            <div className={tabClss[3].join(" ")} onClick={()=>{tabClick(3)}}>
                                <div className={classes.Title}>
                                    Важно
                                </div>
                                <div className={classes.Text}>
                                    {props.important}
                                </div>
                            </div>
                            <div className={tabClss[4].join(" ")} onClick={()=>{tabClick(4)}}>
                                <div className={classes.Title}>
                                    Рекомендации
                                </div>
                                <div className={classes.Text}>
                                    {props.recomendations}
                                </div>
                            </div>
                        </>
                        : null}
                    <button onClick={openPost} className={buttonCls.join(" ")}>
                        {state.isOpen ? props.notSimple ? "X" : "закрыть" : "Читать дальше"}
                    </button>

                </div>
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen && prevProps.translationY === nextProps.translationY && prevProps.title === nextProps.title;
});