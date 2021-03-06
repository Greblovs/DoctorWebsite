import classes from "./adminQuestions.module.scss";
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/question/';


const Question = (props) =>{
    const inpRef = useRef();
    const [state, setState] = useState({
        id: props.id,
        text: props.answer,

    })
    function addAnswer(e){
        e.preventDefault();
        axios.put(API + DEFAULT_QUERY+state.id.toString(), {
            title: props.title,
            age: props.age,
            name: props.name,
            text: props.text,
            answer: inpRef.current.value

        })
            .then(function (response) {
                alert(response.data.message);

            })
            .catch(function (error) {
                alert(error.message);

            });}
    function deleteQuestion(e){
        e.preventDefault();
        axios.delete(API + DEFAULT_QUERY+state.id.toString())
            .then(function (response) {
            //alert(response.data.message);
            window.location.reload();
        })
            .catch(err=>
                alert(err.message));

    }

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
                <p style={window.innerWidth > 1000?{marginLeft: "50px"}: null} className={classes.subTexts}> Возраст:  {props.age}</p>
            </div>
            <p>{props.text}</p>
            <form >
                <textarea ref={inpRef}   value={state.text} id = "text" className={classes.Answer} onChange={input} />
                <input  value={"Ответить"} onClick={addAnswer} className={classes.Button} type = {"submit"}  />
                <input value = {"удалить"} onClick={deleteQuestion} type={"submit"} className={classes.deleteButton}/>
            </form>
        </div>
    )
}

export default Question
