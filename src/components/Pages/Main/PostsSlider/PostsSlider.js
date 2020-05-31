import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./PostsSlider.module.scss"
import {Swipeable} from "react-touch";
import Post from "./Post/Post";
import { useParams, useLocation } from 'react-router-dom';

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
                        activePostId: prevState.activePostId === 3 ? 0 : ++prevState.activePostId
                    }
                })
            }else{
                clearInterval(interval);
            }
        }, 5000);
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
        <Post title={element.title} text={element.text} key={number} isOpen={element.isOpen} id={number} openPost={openPost} translationY={element.translationY} hasToUpdate={element.hasToUpdate} disAnim={state.disableAnimations}/>
    ));

    const postWrapCls = [classes.PostWrap];

    let dots = [0, 0, 0, 0];
    dots[state.activePostId] = 1;
    dots = dots.map((dot, number) => (
        dot === 0 ?
            <div className={classes.Dot} key={number}/> :
            <div className={classes.Dot + " " + classes.open} key={number}/>
    ));

    if (state.activePostId == 0) {
        postWrapCls.push(classes.first);
    } else if (state.activePostId == 1) {
        postWrapCls.push(classes.second);
    } else if (state.activePostId == 2) {
        postWrapCls.push(classes.third);
    } else if (state.activePostId == 3) {
        postWrapCls.push(classes.fourth);
    }


    if (state.disableAnimations){
        postWrapCls.push(classes.disAnim);
    }

    return (
        <div className={classes.PostsSlider}>
            <Swipeable onSwipeLeft={()=>{
                clearInterval(state.interval);
                setState(prevState => {
                    return{
                        ...prevState,
                        activePostId: prevState.activePostId === 3 ? 3 : ++prevState.activePostId,
                        interval: setSlideInterval()
                    }
                })
            }} onSwipeRight={()=>{
                clearInterval(state.interval);
                setState(prevState => {
                    return{
                        ...prevState,
                        activePostId: prevState.activePostId === 0 ? 0 : --prevState.activePostId,
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