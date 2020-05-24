import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./PostsSlider.module.scss"
import {Swipeable} from "react-touch";
import Post from "./Post/Post";

const PostsSlider = () => {

    const [state, setState] = useState({
        activePostId: 0,
        interval: null
    });

    const posts = [
        {title:"Неотложная помощь", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."},
        {title:"Заболевания носа", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."},
        {title:"Заболевания уха", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."},
        {title:"Заболевания горла", text:"Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."}

    ];

    const rendPosts = posts.map((element, number)=>(
        <Post title={element.title} text={element.text} key={number}/>
    ));

    const isMountedRef = useRef(null);

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
        }, 5000)
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

    const postWrapCls = [classes.PostWrap];

    let dots = [0, 0, 0, 0];
    dots[state.activePostId] = 1;
    dots = dots.map((dot, number) => (
        dot === 0 ?
            <div className={classes.Dot} key={number}/> :
            <div className={classes.Dot + " " + classes.open} key={number}/>
    ));
    if (state.activePostId === 0) {
        postWrapCls.push(classes.first);
    } else if (state.activePostId === 1) {
        postWrapCls.push(classes.second);
    } else if (state.activePostId === 2) {
        postWrapCls.push(classes.third);
    } else if (state.activePostId === 3) {
        postWrapCls.push(classes.fourth);
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