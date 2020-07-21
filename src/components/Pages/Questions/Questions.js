import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./Questions.module.scss"
import axios from 'axios';
import Post from "../Post/Post";
import Question from "../ Question/Question";

const API = 'http://localhost:3002/api/question';
const DEFAULT_QUERY = '/questions';


const Questions = () => {




    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1,
        questions: [],
        isLoading: false,

        error: null,
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

    const row = 10;


    const searchRef = useRef();



    const searchInputCls = [classes.SearchInput];
    let searchedQuestions = [];
    if (state.searchValue === ""){
        searchedQuestions = state.questions
    }else{
        for (let i = 0; i < state.questions.length; i++){
            if (state.questions[i].title.toUpperCase().includes(state.searchValue.toUpperCase())){
                searchedQuestions.push(state.questions[i]);
            }
        }
        if (searchedQuestions.length === 0){
            searchedQuestions = state.questions;
            searchInputCls.push(classes.error);
        }
    }

    const length = searchedQuestions.length;
    searchedQuestions = searchedQuestions.slice(0,Math.min(row*state.showedRows, length));


    searchedQuestions  =  searchedQuestions.map((element , index) =>{
        let shortTitle = element.title.slice(0, 30);
        if (element.title.length > 30) {
            shortTitle = shortTitle + "...";
        }
        return(
            <Question index = {index} key={index} age = {element.age} name = {element.name} shortTitle={shortTitle} text={element.text} answer={element.answer} isQuestion={true}/>
        )
    });



    alert(searchedQuestions)

    const search = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                searchValue: searchRef.current.value
            }
        })
    },[]);

    const showMoreRows = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                showedRows: prev.showedRows + 1
            }
        })
    },[]);

    return (
        <div className={classes.PageWrap}>
            <div className={classes.SearchBarWrap}>
                <div className={classes.SearchBar}>
                    <input className={searchInputCls.join(" ")} ref={searchRef} onChange={search}/>
                    <div className={classes.SearchButton}>
                        <div className={classes.LensWrap}>
                            <div className={classes.Circle}/>
                            <div className={classes.Line}/>
                        </div>
                    </div>
                </div>
            </div>
            {searchedQuestions}
            {length <= row * state.showedRows ? <></> :
                <div className={classes.MoreButtonWrap}>
                    <div className={classes.MoreButton} onClick={showMoreRows}>
                        Показать больше
                    </div>
                </div>
            }
        </div>
    );
};

export default Questions;