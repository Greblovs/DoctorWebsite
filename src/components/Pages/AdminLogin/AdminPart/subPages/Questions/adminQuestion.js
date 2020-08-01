import classes from "./adminQuestions.module.scss";
import React, {useCallback, useRef, useState} from "react";



const Question = (props) =>{
    const inpRef = useRef();
    const [state, setState] = useState({
        text: props.answer
    })
    const input = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                text: inpRef.current.value
            }
        })
    },[]);

    return(

        <div className={classes.wrapper}>
            <p className={classes.title}>{props.title}</p>
            <div>
                <p className={classes.subTexts}>{props.name}</p>
                <p style={window.innerWidth > 1000?{marginLeft: "50px"}: null} className={classes.subTexts}>Возраст:  {props.age}</p>
            </div>
            <p>{props.text}</p>
            <form>
                <textarea ref={inpRef}   value={state.text} id = "text" className={classes.Answer} onChange={input} />
                <input  value={"Ответить"} className={classes.Button} type = {"submit"}  />
                <input value = {"удалить"} type={"submit"} className={classes.deleteButton}/>
            </form>
        </div>
    )
}

export default Question
