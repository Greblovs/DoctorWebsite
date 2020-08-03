import React, {useState} from 'react';
import classes from "./PopularPost.module.scss"
import Heading from "../Heading/Heading";
import Post from "../../Post/Post";
import {NavLink} from "react-router-dom";
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/posts';
const PopularPost = () => {

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

    if (window.innerWidth < 700){
        state.posts = state.posts.slice(0,1)
    }else if (window.innerWidth < 1100){
        state.posts = state.posts.slice(0,2)
    }else if (window.innerWidth < 1600){
        state.posts = state.posts.slice(0,3)
    }

        const rendPosts = state.posts.map((element, index) => {
        return (
            <Post index = {index} title={element.title} text={element.text} key={index} someAdditor={()=>{}} notSimple = {true} illnes={element.disease} classif={element.classification} practicy ={element.practice} important = {element.important} recomendations = {element.recommendation}/>
        )
    });

    return (
        <>
            <Heading text={"Популярные статьи"}/>
            <div className={classes.PostsWrapper}>
            {rendPosts}
            </div>
            <NavLink to={"/Posts"} exact={false}>
                <button className={classes.MoreButton}>Больше статей</button>
            </NavLink>
        </>
    )
};

export default PopularPost;