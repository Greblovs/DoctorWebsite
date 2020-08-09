import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./adminQuestions.module.scss"
import axios from 'axios';
import Question from "./adminQuestion";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/questions';


const AdminQuestions = () =>{

    const [state, setState] = useState({
        questions: [],
        isLoading : false
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

    useEffect(() => {

        setState((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        });


    }, []);

  const  questionParse =  state.questions.slice(0).reverse().map((element, index)=>{
      return(
          <>
            <Question id={element.id} title = {element.title} name = {element.name} text = {element.text} answer = {element.answer} age ={element.age}/>
          </>
      )
    });

    return(
        <>
            {questionParse}
        </>
    )
};

export default AdminQuestions