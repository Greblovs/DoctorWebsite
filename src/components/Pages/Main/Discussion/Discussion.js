import React, {useState} from "react";
import classes from "./Discussion.module.scss"
import Heading from "../Heading/Heading";
import Question from "../../ Question/Question";
import {NavLink} from "react-router-dom";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/questions';

const Discussion = () => {
    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1,
        questions: [],
        isLoading: false,
        error: null,
    })
    if(!state.isLoading){
        axios.get(API + DEFAULT_QUERY)
            .then(result  => setState((prev)=>{
                return {
                    ...prev,
                    questions: result.data.data,
                    isLoading: true
                }
            }))
            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
}
    if (window.innerWidth < 700){
        state.questions = state.questions.slice(0,1)
    }else if (window.innerWidth < 1100){
        state.questions = state.questions.slice(0,2)
    }else if (window.innerWidth < 1600){
        state.questions = state.questions.slice(0,3)
    }

    let parserdQuestions = null;
    if (state.isLoading == true) {
        parserdQuestions = state.questions.map((element, index) => {
            let shortTitle = element.title.slice(0, 30);
            if (element.title.length > 30) {
                shortTitle = shortTitle + "...";
            }

            return (
                < Question index={index} key={index} shortTitle={shortTitle} text={element.text}
                           answer={element.answer}/>

            )
        })
   }
    return (

        <>
            <Heading text={"Популярные вопросы"}/>

            <div className={classes.PostsWrapper}>
                {parserdQuestions}
            </div>
            <NavLink to={"/Questions"} exact={false}>
                <button  className={classes.MoreButton}>Больше вопросов</button>
            </NavLink>
        </>
    )
}
export default Discussion