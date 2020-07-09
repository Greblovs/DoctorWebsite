import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import classes from "./Question.module.scss";
import ScrollingContext from "../../hoc/ScrollingContext";

function getElementOffset(element) {
    const box = element.getBoundingClientRect();
    const top = box.top;
    const left = box.left;
    return {top: top, left: left};
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

const Question = ({shortTitle, text, answer, isQuestion, name, age}) => {

    const [state, setState] = useState({
        isOpen: false,
        fullyOpen: false,
        canOpen: true,
        translation: {transform: "translate3d(0,0,0)"}
    });

    const questionRef = useRef();

    const openQuestion = useCallback(() => {
        const offset = getElementOffset(questionRef.current);
        const top = offset.top;
        const left = offset.left;
        setState((prev) => {
            if (prev.canOpen) {
                changeScrolling();
                let translation = {transform: `translate3d(${-offset.left + 10}px,${-offset.top}px,0)`};
                let fullyOpen = prev.fullyOpen;
                if (prev.isOpen) {
                    translation = {};
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

    const questionCls = [classes.Question];
    const buttonCls = [classes.Button];
    if (state.isOpen) {
        questionCls.push(classes.open)
        buttonCls.push(classes.plus);
    }
    if (state.fullyOpen) {
        questionCls.push(classes.fullyOpen)
    }
    if (state.canOpen === false) {
        questionCls.push(classes.recentlyClosed);
    }

    let wrapClasses = [classes.QuestionWrap]

    useEffect(()=>{
        let vh = window.innerHeight * 0.01;
        questionRef.current.style.setProperty('--vh', `${vh}px`);
    });

    name = "Имя: " + name
    age = "Возраст: " + age + " лет"

    return (
        <div style={!isQuestion && window.innerWidth>660? {display:"inline-block"}:{display: "block"}} className={wrapClasses.join(" ")}>
            <div className={questionCls.join(" ")} ref={questionRef} style={state.translation}>
                <div style={state.isOpen? {fontSize: "26px"}: null } className={classes.Title}>
                    {shortTitle}
                </div>
                <div className={classes.Text}>
                    <div className={classes.Filler}>{state.isOpen ? "Вопрос    ": null}</div>
                    <div className={classes.SubTitle}>
                        <div>{state.isOpen ? name : null}</div>
                        <div >{state.isOpen ? age: null}</div>
                    </div>
                    <div className={classes.quest}>{state.isOpen ? text : null}</div>
                    <div className={classes.Answer}>
                        <div className={classes.Filler}>{state.isOpen ? "Ответ     ": null}</div>
                        <div className={classes.answ}>{state.isOpen ? answer : null}</div>
                        <div className={classes.Sub}>{state.isOpen ? "Кот Вячеслав Федоровичь": null}</div>
                    </div>
                </div>
                <button className={buttonCls.join(" ")} onClick={openQuestion}>
                    {!state.isOpen ? "Читать дальше" : "X"}
                </button>
            </div>
        </div>
    );
};

export default Question;