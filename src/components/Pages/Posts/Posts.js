import React, {useCallback, useRef, useState} from "react";
import classes from "./posts.module.scss"
import Post from "./../Post/Post";
import {NavLink} from "react-router-dom";

const Posts = () => {

    const row = 1;

    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1
    });

    const posts = [
        {
            title: "Ангина",
            text: "Большинство пациентов заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Акустическая Травма",
            text: "Так ли это безвредно — слушать громкую музыку, заслонившись от окружающей действительности плотной пеленой громких звуков?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Почему болят уши",
            text: "Наиболее частым и грозным осложнением респираторных инфекций у детей (и взрослых) бывает острый стредний отит (воспаление среднего уха).",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        }
    ];

    const searchInputCls = [classes.SearchInput];

    let searchedPosts = [];
    if (state.searchValue === ""){
        searchedPosts = posts
    }else{
        for (let i = 0; i < posts.length; i++){
            if (posts[i].title.toUpperCase().includes(state.searchValue.toUpperCase())){
                searchedPosts.push(posts[i]);
            }
        }
        if (searchedPosts.length === 0){
            searchedPosts = posts
            searchInputCls.push(classes.error);
        }
    }

    const length = searchedPosts.length;
    searchedPosts = searchedPosts.slice(0,Math.min(row*state.showedRows, length));


    searchedPosts  =  searchedPosts.map((element , index) =>{
        return(
            <Post title={element.title} text={element.text} key={index} someAdditor={()=>{}} isPost = {true} notSimple = {true}/>
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
                            <div className={classes.Circle}/>
                            <div className={classes.Line}/>
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