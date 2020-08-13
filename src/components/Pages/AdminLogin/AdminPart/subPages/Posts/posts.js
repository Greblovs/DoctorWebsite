import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./post.module.scss"
import Post from "./post"
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/posts';



const Posts = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState({
        postEdit : 0,
        searchValue: "",
        showedRows: 1,
        posts  :[],
        isLoading: false

    })
    if(!state.isLoading){
        axios.get(API + DEFAULT_QUERY)
            .then(result  => setState((prev)=>{
                return {
                    ...prev,
                    posts: result.data.data,
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



    const AddForm = useCallback(()=>{


        setState((prev) => {
            return {
                ...prev,
                postEdit: 1
            }
        })

    },[])

    let postEditElement  = null;
    if (state.postEdit ===1){
        postEditElement =   <>
                                <p className={classes.warning}>Пожалуйста, закончите форматирование этой статью и нажмите кнопку изменить перед добавлением новой</p>
                                <Post key={""} title = {""}  text={""} illnes={""} classif={""} practicy ={""} important = {""} recomendations = {""}/>
                            </>
    }

    const postsArray = state.posts.map((element, index)=>{
        return(
            <>
                <Post edit ="true" key={index} id = {element.id} title = {element.title}  text={element.text} illnes={element.disease} classif={element.classification} practicy ={element.practice} important = {element.important} recomendations = {element.recommendation} />
            </>
        )
    })
    return(
        <>
            <div onClick={AddForm} className={classes.addButton}>Добавить статью</div>
            {postEditElement}
            {postsArray}
        </>
    )

}

export default Posts;