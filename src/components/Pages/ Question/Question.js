import React, {useCallback, useRef, useState} from 'react';
import classes from "./Question.module.scss";

function getElementOffset(element) {

    const de = document.documentElement;
    const box = element.getBoundingClientRect();
    const top = box.top + window.pageYOffset - de.clientTop;
    const left = box.left + window.pageXOffset - de.clientLeft;
    return {top: top, left: left};
}

const Question = ({shortTitle, text, answer}) => {

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
        console.log(top, "top,", left, "left");
        setState((prev) => {
            if (prev.canOpen) {
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
                    }, 0)
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
    if (window.innerWidth>=660){
        if (window.innerWidth>=1400){
            wrapClasses.push(classes.desktopQuestion)
        }else{
            wrapClasses.push(classes.tabletQuestion)
        }
    }else{
        wrapClasses.push(classes.smartQuestion)
    }

    return (
        <div style={window.innerWidth>660? {display:"inline-block"}:{display: "block"}} className={wrapClasses.join(" ")}>
            <div className={questionCls.join(" ")} ref={questionRef} style={state.translation}>
                <div className={classes.Title}>
                    {shortTitle}
                </div>
                <div className={classes.Text}>
                    <div>{text}</div>
                    <div>{answer}</div>
                </div>
                <button className={classes.Button} onClick={openQuestion}>
                    Читать дальше
                </button>
            </div>
        </div>
    );
};

export default Question;