import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./Questions.module.scss"
import axios from 'axios';
import Post from "../Post/Post";
import Question from "../ Question/Question";

const API = 'http://localhost:3001/api';
const DEFAULT_QUERY = '/questions';


const Questions = () => {

    // const [state, setState] = useState({
    //     questions: [],
    //     isLoading: false,
    //     error: null,
    // });
    //
    // useEffect(() => {
    //
    //     setState((prev) => {
    //         return {
    //             ...prev,
    //             isLoading: true
    //         }
    //     });
    //
    //     axios.get(API + DEFAULT_QUERY)
    //         .then(result  => setState((prev)=>{
    //             return {
    //                 ...prev,
    //                 questions: result.data.data,
    //                 isLoading: false
    //             }
    //         }))
    //         .catch(error => setState((prev)=>{
    //             return {
    //                 ...prev,
    //                 error,
    //                 isLoading: false
    //             }
    //         }));
    // }, []);

    const row = 1;

    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1
    });

    const searchRef = useRef();

    const questions = [{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"
    },{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"
    },{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"
    },{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"
    },{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"
    }];

    const searchInputCls = [classes.SearchInput];
    let searchedQuestions = [];
    if (state.searchValue === ""){
        searchedQuestions = questions
    }else{
        for (let i = 0; i < questions.length; i++){
            if (questions[i].title.toUpperCase().includes(state.searchValue.toUpperCase())){
                searchedQuestions.push(questions[i]);
            }
        }
        if (searchedQuestions.length === 0){
            searchedQuestions = questions;
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
            <Question index = {index} key={index} shortTitle={shortTitle} text={element.text} answer={element.answer}/>
        )
    });

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