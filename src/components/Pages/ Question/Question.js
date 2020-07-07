import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import classes from "./Question.module.scss";
import ScrollingContext from "../../hoc/ScrollingContext";

function getElementOffset(element) {

    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top + window.pageYOffset - de.clientTop;
    const left = box.left + window.pageXOffset - de.clientLeft;
    return {top: top, left: left};
}

const Question = ({shortTitle, text, answer, isQuestion}) => {

    const [state, setState] = useState({
        isOpen: false,
        fullyOpen: false,
        canOpen: true,
        translation: {transform: "translate3d(0,0,0)"}
    });

    const questionRef = useRef();

    const changeScrolling = useContext(ScrollingContext);

    const openQuestion = useCallback(() => {
        const offset = getElementOffset(questionRef.current);
        const top = offset.top;
        const left = offset.left;
        setState((prev) => {
            if (prev.canOpen) {
                let translation = {transform: `translate3d(${-offset.left + 10}px,${-offset.top}px,0)`};
                let fullyOpen = prev.fullyOpen;
                if (prev.isOpen) {
                    translation = {};
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

    const questionCls = [classes.Question];
    if (state.isOpen) {
        questionCls.push(classes.open)
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

    return (
        <div style={!isQuestion && window.innerWidth>660? {display:"inline-block"}:{display: "block"}} className={wrapClasses.join(" ")}>
            <div className={questionCls.join(" ")} ref={questionRef} style={state.translation}>
                <div className={classes.Title}>
                    {shortTitle}
                </div>
                <div className={classes.Text}>
                    <div>{state.isOpen ? text : null}</div>
                    <div>{state.isOpen ? answer : null}</div>
                </div>
                <button className={classes.Button} onClick={openQuestion}>
                    Читать дальше
                </button>
            </div>
        </div>
    );
};

export default Question;