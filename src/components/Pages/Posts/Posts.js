import React, {useCallback, useEffect, useRef, useState} from "react";
import classes from "./posts.module.scss"
import Post from "./../Post/Post";
import {NavLink} from "react-router-dom";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/posts';



const Posts = () => {

    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1,
        posts: [],
        isLoading: false,
        error: null,
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
        }));}

    useEffect(() => {

        setState((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        });

    }, []);
    const row = 5;


    const searchInputCls = [classes.SearchInput];

    let searchedPosts = [];
    if (state.searchValue === ""){
        searchedPosts = state.posts
    }else{
        for (let i = 0; i < state.posts.length; i++){
            if (state.posts[i].title.toUpperCase().includes(state.searchValue.toUpperCase())){
                searchedPosts.push(state.posts[i]);
            }
        }
        if (searchedPosts.length === 0){
            searchedPosts = state.posts
            searchInputCls.push(classes.error);
        }
    }

    const length = searchedPosts.length;
    searchedPosts = searchedPosts.slice(0,Math.min(row*state.showedRows, length));


    searchedPosts  =  searchedPosts.map((element , index) =>{
        return(
            <Post title={element.title} text={element.text} key={index} someAdditor={()=>{}} isPost = {true} notSimple = {true} illnes={element.disease} classif={element.classification} practicy ={element.practice} important = {element.important} recomendations = {element.recommendation} />
        )
    });

    const searchRef = useRef();

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

    return(
        <div className={classes.PageWrap}>
            <div className={classes.SearchBarWrap}>
                <div className={classes.SearchBar}>
                    <input className={searchInputCls.join(" ")} ref={searchRef} onChange={search}/>
                    <div className={classes.SearchButton}>
                        <div className={classes.LensWrap}>
                            <div className={classes.Line}/>
                            <div className={classes.Circle}/>
                        </div>
                    </div>
                </div>
            </div>
            {searchedPosts}
            {length <= row * state.showedRows ? <></> :
                <div className={classes.MoreButtonWrap}>
                    <div className={classes.MoreButton} onClick={showMoreRows}>
                        Показать больше
                    </div>
                </div>
            }
        </div>
    )
};

export default Posts;