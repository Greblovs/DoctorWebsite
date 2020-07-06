import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import classes from "./Post.module.scss";
import {NavLink} from "react-router-dom";
import ScrollingContext from "../../hoc/ScrollingContext";

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


const Post = ({index, title, text, fullText, someAdditor, isPost, notSimple}) => {
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

    const changeScrolling = useContext(ScrollingContext);

    let postCls = [classes.Post];
    let buttonCls = [classes.Button];

    let tabClss = [[classes.Tab, classes.firstColor],[classes.Tab, classes.secondColor],[classes.Tab, classes.thirdColor],[classes.Tab, classes.fourthColor],[classes.Tab, classes.fifthColor]];

    let textCls = [classes.Text];

    if (!isPost) {
        if (window.innerWidth < 660) {
            postCls = [classes.Post];
        }
        if (window.innerWidth >= 660) {
            if (window.innerWidth > 1400) {
                postCls.push(classes.PostFLoated)
            } else {
                postCls.push(classes.Fullscreen);
            }
        }
    }

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
                    changeScrolling();
                    setTimeout(() => {
                        setState((prev) => {
                            changeScrolling();
                            return {
                                ...prev,
                                fullyOpen: true
                            }
                        })
                    }, 500)
                }
                setTimeout(() => {
                    setState((prev) => {
                        changeScrolling();
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
        if (notSimple){
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

    if (notSimple){
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



    let marg = index * 50;
    let widthWindow = window.innerWidth
    marg = marg + "vw";

    let styles = ()=>(!isPost ? {
        float: widthWindow < 660 || (window.innerWidth >= 660 && index % 2 === 0) ? "left" : null,
        marginLeft: widthWindow >= 660 ? marg : null,
        marginTop: (window.innerWidth >= 660 && (index % 2 === 0 && index === 2 || index === 3)) ? "-310px" : null,
        width: window.innerWidth >= 660 ? "50vw" : "100vw"
    } : {})

    const postWrapCls = [classes.PostWrap];
    if (isPost){
        postWrapCls.push(classes.margin)
    }

    return (
        <div style={styles()} className={postWrapCls.join(" ")}>
            <div style={!isPost && window.innerWidth>1400 && index%2 ===0? {marginLeft: marginLetPost}:window.innerWidth>1400 && index%2 ===1? {marginLeft: "10px"}:null}>
                <div className={postCls.join(" ")} ref={postRef} style={state.translation}>
                    <div className={classes.Title}>
                        {title}
                    </div>
                    <div className={textCls.join(" ")}>
                        {!notSimple? fullText: text}
                    </div>
                    {notSimple ?
                        <>
                            <div className={tabClss[0].join(" ")} onClick={()=>{tabClick(0)}}>
                                <div className={classes.Title}>
                                    Заболевание
                                </div>
                                <div className={classes.Text}>
                                    Боль в горле – самая частая жалоба в кабинете ЛОР врача. Большинство пациентов с порога безапелляционно называют и ее причину: «Доктор, у меня ангина!»
                                </div>
                            </div>
                            <div className={tabClss[1].join(" ")} onClick={()=>{tabClick(1)}}>
                                <div className={classes.Title}>
                                    Классификация
                                </div>
                                <div className={classes.Text}>
                                    Путаница при использовании термина «ангина» встречается очень часто даже среди врачей, не говоря уже о пациентах. Она возникает по причине существования достаточно большого количества классификаций, используемых на свое усмотрение врачами разных специальностей, родоначальниками различных медицинских школ отоларингологии, терапевтов, инфекционистов, международными медицинскими ассоциациями.
                                </div>
                            </div>
                            <div className={tabClss[2].join(" ")} onClick={()=>{tabClick(2)}}>
                                <div className={classes.Title}>
                                    Практика
                                </div>
                                <div className={classes.Text}>
                                    В поликлинической практике ЛОР врача, жалобу на острую боль в горле указывают две трети всех, пришедших на прием, пациентов (66%). При этом, в 80% случаев, жалоба связана с заболеваниями только слизистой оболочки глотки, боковых валиков глотки, надгортанника, слизистой мягкого неба, слизистой носоглотки и т.д.
                                </div>
                            </div>
                            <div className={tabClss[3].join(" ")} onClick={()=>{tabClick(3)}}>
                                <div className={classes.Title}>
                                    Важно
                                </div>
                                <div className={classes.Text}>
                                    Учитывая вышесказанное, крайне важно как для самого пациента, так и для всех врачей, в первую очередь смежных с ЛОР специальностей, четко отличать «настоящую» бактериальную ангину от схожего «как две капли воды» по многим признакам, но противоположного по сути и серьезности осложнений хронического тонзиллита, острого фарингита и других заболеваний ротоглотки.
                                </div>
                            </div>
                            <div className={tabClss[4].join(" ")} onClick={()=>{tabClick(4)}}>
                                <div className={classes.Title}>
                                    Рекомендации
                                </div>
                                <div className={classes.Text}>
                                    Обобщая, сформулирую практический совет/рекомендации:
                                    1. Если общее состояние, при заболевании, не было нарушено с первых дней, а боль в горле Вам удалось устранить самостоятельно в домашних условиях за 3-4 дня то, очевидно, вы перенесли ОРВИ (острый вирусный фарингит с вероятностью 95%). Вам следует посетить ЛОР врача в плановом порядке, для обнаружения и предупреждения возможных осложнений, постановки правильного диагноза и назначения эффективного лечения, профилактики (особенно это касается детей). Здесь все зависит от личного отношения к своему здоровью: насколько Вы его цените или можете позволить себе бережно к нему относиться.
                                    2. Если же заболевание начинается с высокой температуры, острой боли в горле, болезненности шейных лимфоузлов, видны белые налеты на миндалинах – это повод заподозрить тяжелую форму бактериальной инфекции в ротоглотке (с наибольшей вероятностью «ангину») и незамедлительно обратиться на консультацию к ЛОР врачу, что бы значительно сократить сроки лечения и количество возможных осложнений, в том числе и обезопасить своих, еще не подвергшихся инфицированию близких.

                                    Будьте здоровы. Умейте ценить данное Вам природой и родителями здоровье.
                                </div>
                            </div>
                        </>
                        : null}
                    <button onClick={openPost} className={buttonCls.join(" ")}>
                        {state.isOpen ? notSimple ? "X" : "закрыть" : "Читать дальше"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default React.memo(Post, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen && prevProps.translationY === nextProps.translationY && prevProps.title === nextProps.title;
});