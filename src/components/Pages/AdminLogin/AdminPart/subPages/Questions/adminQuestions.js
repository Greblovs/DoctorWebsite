import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./adminQuestions.module.scss"
import axios from 'axios';
import Question from "./adminQuestion";
const API = 'http://localhost:3001/api';
const DEFAULT_QUERY = '/questions';


const AdminQuestions = () =>{

    const [state, setState] = useState({
        questions: [],
    })


    axios.get(API + DEFAULT_QUERY)
        .then(result  => setState((prev)=>{
            return {
                ...prev,
                questions: result.data.data,
                isLoading: false
            }
        }))
        .catch(error => setState((prev)=>{
            return {
                ...prev,
                error,
                isLoading: false
            }
        }));

    useEffect(() => {

        setState((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        });

        axios.get(API + DEFAULT_QUERY)
            .then(result  => setState((prev)=>{
                return {
                    ...prev,
                    questions: result.data.data,
                    isLoading: false
                }
            }))
            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
    }, []);

  const  questionParse =  state.questions.map((element, index)=>{
      return(
          <>
            <Question title = {element.title} name = {element.name} text = {element.text} answer = {element.answer} age ={element.age}/>
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