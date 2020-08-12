import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import classes from "./slider.module.scss"
import Slider from "./Slider"
import axios from "axios";
const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/postsSlider';


const Sliders = () =>{
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
                console.log(result.data.data.length)
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
    if (state.postEdit ===1 && state.posts.length<4){
        postEditElement =   <>
            <p className={classes.warning}>Пожалуйста, закончите форматирование этой статью и нажмите кнопку изменить перед добавлением новой</p>
            <Slider edit = "false" key={""} title = {""}  text={""}  />
        </>
    }

    const postsArray = state.posts.map((element, index)=>{
        return(
            <>
                <Slider edit ="true" key={index} id = {element.id} title = {element.title} text={element.alltext}    />
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

export default Sliders;