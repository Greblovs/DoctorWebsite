import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./PostsSlider.module.scss"
import {Swipeable} from "react-touch";
import Post from "../../Post/Post";
import {useParams, useLocation} from 'react-router-dom';
import {getWindowDimensions} from '../../../../scripts/SupportScripts'


const PostsSlider = () => {



    const isMountedRef = useRef(null);

    const [state, setState] = useState({
        activePostId: 0,
        interval: null,
        isPostOpen: false,
        posts: [
            {
                title: "Неотложная помощь",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.",
                fullText: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации. К кому обратиться за квалифицированной медицинской помощью с ЛОР-проблемой в г.Киеве, какие необходимы обследования в той или иной ситуации, узнать как вызвать ЛОР-врача на дом, Вы сможете, позвонив по телефону 067-5065206 095-4655052 Обращаясь за советом или консультацией к врачу по телефону, необходимо понимать, что перечисленные по телефону симптомы не достаточно информативны, что бы установить точный диагноз и назначить адекватное лечение, но телефонная консультация поможет Вам сориентироваться в сложившейся ситуации и, не теряя времени, приступить к решению проблемы, в наиболее оптимальном направлении."
            },
            {
                title: "Заболевания носа",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.",
                fullText: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации. к кому обратиться за квалифицированной медицинской помощью с ЛОР-проблемой в г.Киеве, какие необходимы обследования в той или иной ситуации, узнать как вызвать ЛОР-врача на дом, Вы сможете, позвонив по телефону 067-5065206 095-4655052 Обращаясь за советом или консультацией к врачу по телефону, необходимо понимать, что перечисленные по телефону симптомы не достаточно информативны, что бы установить точный диагноз и назначить адекватное лечение, но телефонная консультация поможет Вам сориентироваться в сложившейся ситуации и, не теряя времени, приступить к решению проблемы, в наиболее оптимальном направлении."
            },
            {
                title: "Заболевания уха",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.",
                fullText: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации. к кому обратиться за квалифицированной медицинской помощью с ЛОР-проблемой в г.Киеве, какие необходимы обследования в той или иной ситуации, узнать как вызвать ЛОР-врача на дом, Вы сможете, позвонив по телефону 067-5065206 095-4655052 Обращаясь за советом или консультацией к врачу по телефону, необходимо понимать, что перечисленные по телефону симптомы не достаточно информативны, что бы установить точный диагноз и назначить адекватное лечение, но телефонная консультация поможет Вам сориентироваться в сложившейся ситуации и, не теряя времени, приступить к решению проблемы, в наиболее оптимальном направлении."
            },
            {
                title: "Заболевания горла",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации.",
                fullText: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации. к кому обратиться за квалифицированной медицинской помощью с ЛОР-проблемой в г.Киеве, какие необходимы обследования в той или иной ситуации, узнать как вызвать ЛОР-врача на дом, Вы сможете, позвонив по телефону 067-5065206 095-4655052 Обращаясь за советом или консультацией к врачу по телефону, необходимо понимать, что перечисленные по телефону симптомы не достаточно информативны, что бы установить точный диагноз и назначить адекватное лечение, но телефонная консультация поможет Вам сориентироваться в сложившейся ситуации и, не теряя времени, приступить к решению проблемы, в наиболее оптимальном направлении."
            }
        ],
        disableAnimations: false
    });

    const changeSlideInterval = useCallback(()=>{
        if (!state.isPostOpen){
            setState((prev)=>{
                clearInterval(prev.interval);
                return{
                    ...prev,
                    interval: null,
                }
            })
        }else{
            setState((prev)=>{
                return{
                    ...prev,
                    interval: setSlideInterval(),
                    isPostOpen: false
                }
            })
        }
    },[]);

    let increase = 1;
    let delta = 5000;
    if (window.innerWidth >= 660) {
        increase = 2;
        delta = 10000;
    }

    let setSlideInterval = useCallback(() => {
        const interval = setInterval(() => {
            if (isMountedRef.current) {
                setState(prevState => {
                    return {
                        ...prevState,
                        activePostId: prevState.activePostId === 3 || (prevState.activePostId === 2 && increase === 2) ? 0 : increase + prevState.activePostId
                    }
                })
            } else {
                clearInterval(interval);
            }
        }, delta);
        return interval;
    }, []);


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

    const rendPosts = state.posts.map((element, number) => {

        return (
            <Post index={number} title={element.title} text={element.text} fullText={element.fullText} key={number} isOpen={element.isOpen}
                  someAdditor={changeSlideInterval} id={number}/>
        )
    });
    let postWrapCls;
    if (window.innerWidth < 660) {
        postWrapCls = [classes.PostWrap];
    } else {
        postWrapCls = [classes.PostWrapBig];
    }

    let dots = [0, 0, 0, 0];

    if (increase === 1) {
        dots[state.activePostId] = 1;
        dots = dots.map((dot, number) => (
            dot === 0 ?
                <div className={classes.Dot} key={number}/> :
                <div className={classes.Dot + " " + classes.open} key={number}/>
        ));
    } else {
        if (state.activePostId === 1){
            state.activePostId = 0
        }else if (state.activePostId === 3){
            state.activePostId = 2
        }
        dots[state.activePostId] = 1;
        dots = dots.map((dot, number) => (
            number % 2 === 0 ?
                dot === 0 ?
                    <div style={{width: "35px"}} className={classes.Dot} key={number}/> :
                    <div style={{width: "35px"}} className={classes.Dot + " " + classes.open} key={number}/>
                : null
        ));
    }

    if (state.activePostId == 0) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.first);
        } else {
            postWrapCls.push(classes.first);

        }
    } else if (state.activePostId == 1) {
        if (window.innerWidth < 660) {

            postWrapCls.push(classes.second);
        } else {
            postWrapCls.push(classes.first);
        }
    } else if (state.activePostId == 2) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.third);
        } else {
            postWrapCls.push(classes.thirdBig);
        }

    } else if (state.activePostId == 3) {
        if (window.innerWidth < 660) {
            postWrapCls.push(classes.fourth);
        } else {
            postWrapCls.push(classes.thirdBig);
        }

    }

    if (state.disableAnimations) {
        postWrapCls.push(classes.disAnim);
    }

    let width = getWindowDimensions().width;

    return (
        <div className={classes.PostsSlider}>
            <Swipeable onSwipeLeft={() => {
                clearInterval(state.interval);
                setState(prevState => {
                    return {
                        ...prevState,
                        activePostId: prevState.activePostId === 3 ? 3 : (prevState.activePostId === 2 && increase === 2) ? 2 : increase + prevState.activePostId,
                        interval: setSlideInterval()
                    }
                })

            }} onSwipeRight={() => {
                clearInterval(state.interval);
                setState(prevState => {
                    return {
                        ...prevState,
                        activePostId: prevState.activePostId === 0 || (prevState.activePostId === 1 && increase === 2) ? 0 : prevState.activePostId - increase,
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