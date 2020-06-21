import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./PostsSlider.module.scss"
import {Swipeable} from "react-touch";
import Post from "../Post/Post";
import { useParams, useLocation } from 'react-router-dom';
import {getWindowDimensions} from '../../../../scripts/SupportScripts'

function getElementOffset(element) {
    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top + window.pageYOffset - de.clientTop;
    const left = box.left + window.pageXOffset - de.clientLeft;
    return {top: top, left: left};
}

const PostsSlider = () => {

    const isMountedRef = useRef(null);

    const [state, setState] = useState({
        activePostId: 0,
        interval: null,
        posts: [
            {title:"Неотложная помощь", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.", isOpen: false, translationY: 0, hasToUpdate: false},
            {title:"Заболевания носа", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.", isOpen: false, translationY: 0, hasToUpdate: false},
            {title:"Заболевания уха", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.", isOpen: false, translationY: 0, hasToUpdate: false},
            {title:"Заболевания горла", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.", isOpen: false, translationY: 0, hasToUpdate: false}
        ],
        disableAnimations: false
    });


    let increase = 1;
    let delta = 5000;
    if (window.innerWidth > 660){
       increase = 2;
       delta = 10000;
    }

    const openPost = useCallback((ref, id)=>{
        if (state.posts[id].isOpen === false) {
            const offset = getElementOffset(ref.current);
            const translationY = offset.top;

            console.log(translationY);

            setState(prev => {
                const posts = prev.posts.slice();
                posts[id].translationY = translationY;
                return {
                    ...prev,
                    posts
                }
            })
        }else{
            setState(prev => {
                const posts = prev.posts.slice();
                posts[id].translationY = 0;
                posts[id].isOpen = false;
                return {
                    ...prev,
                    posts
                }
            })
        }
    },[]);

    let setSlideInterval = useCallback(()=>{
        const interval = setInterval(() => {
            if (isMountedRef.current) {
                setState(prevState => {
                    return {
                        ...prevState,
                        activePostId: prevState.activePostId === 3 ||  (prevState.activePostId === 2 && increase === 2) ?   0 : increase + prevState.activePostId
                    }
                })
            }else{
                clearInterval(interval);
            }
        }, delta);
        return interval;
    },[]);


    useEffect(() => {
        isMountedRef.current = true;
        setState(prevState => {
            if (isMountedRef.current) {
                return {
                    ...prevState,
                    interval: setSlideInterval()
                }
            }
        });
        return () => isMountedRef.current = false;
    }, [setSlideInterval]);



    const { id } = useParams();
    const location = useLocation().pathname;
    useEffect(()=>{
        if (location.includes("/post")){
            if (id >= 0 && id <= 3){
                setState(prev => {
                    const posts = prev.posts.slice();
                    posts[id].isOpen = true;
                    posts[id].hasToUpdate = true;
                    clearInterval(prev.interval);
                    return{
                        ...prev,
                        posts,
                        activePostId: id
                    }
                })
            }
        };
    },[location]);

    const rendPosts = state.posts.map((element, number)=>(
        <Post index = {number} title={element.title} text={element.text} key={number} isOpen={element.isOpen} id={number} openPost={openPost} translationY={element.translationY} hasToUpdate={element.hasToUpdate} disAnim={state.disableAnimations}/>
    ));
    let postWrapCls;
    if (window.innerWidth < 660) {
         postWrapCls = [classes.PostWrap];
    }else{
         postWrapCls = [classes.PostWrapBig];
    }


    let dots = [0, 0, 0, 0];
    dots[state.activePostId] = 1;
    if (increase === 1){
        dots = dots.map((dot, number) => (
            dot === 0 ?
                <div className={classes.Dot} key={number}/> :
                <div className={classes.Dot + " " + classes.open} key={number}/>
        ));
    }else{
        dots = dots.map((dot, number) => (
            number%2 ===0?
                dot === 0 ?
                    <div style = {{width: "35px"}} className={classes.Dot} key={number}/> :
                    <div style = {{width: "35px"}} className={classes.Dot + " " + classes.open} key={number}/>
                :null
        ));
    }

    if (state.activePostId == 0) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.first);
        }else{
            postWrapCls.push(classes.first);

        }
    } else if (state.activePostId == 1) {
        if (window.innerWidth < 660) {
            console.log(1);
            postWrapCls.push(classes.second);
        }else{
            postWrapCls.push(classes.first);
        }
    } else if (state.activePostId == 2) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.third);
        }else{
            postWrapCls.push(classes.thirdBig);
        }

    } else if (state.activePostId == 3) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.fourth);
        }else{
            postWrapCls.push(classes.thirdBig);
        }

    }

    if (state.disableAnimations){
        postWrapCls.push(classes.disAnim);
    }
    
    const width = getWindowDimensions().width;

    return (
        <div className={classes.PostsSlider}>
            <Swipeable onSwipeLeft={()=>{
                clearInterval(state.interval);
                setState(prevState => {
                    return{
                        ...prevState,
                        activePostId: prevState.activePostId === 3 ?3 : (prevState.activePostId === 2 && increase === 2)   ?2 : increase + prevState.activePostId,
                        interval: setSlideInterval()
                    }
                })
             
            }} onSwipeRight={()=>{
                clearInterval(state.interval);
                setState(prevState => {
                    return{
                        ...prevState,
                        activePostId: prevState.activePostId === 0 ||  (prevState.activePostId === 1 && increase === 2)  ? 0  :  prevState.activePostId - increase,
                        interval: setSlideInterval()
                    }
                })
            }}>
                <div className={postWrapCls.join(" ")}>
                    {rendPosts}
                </div>
            </Swipeable>
            <div className={classes.Dots}>
                {dots}
            </div>

        </div>

    );
};

export default PostsSlider;