import React, {useCallback, useRef, useState} from "react";
import classes from "./posts.module.scss"
import Post from "./../Post/Post";
import {NavLink} from "react-router-dom";





const Posts = () => {

    const row = 5;

    const [state, setState] = useState({
        searchValue: "",
        showedRows: 1,
        posts  :[
            {
                title: "Ангина",
                text: "Большинство пациентов заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
                paragraphs:[
                    "Боль в горле – самая частая жалоба в кабинете ЛОР врача. Большинство пациентов с порога безапелляционно называют и ее причину: «Доктор, у меня ангина!»",
                    "Путаница при использовании термина «ангина» встречается очень часто даже среди врачей, не говоря уже о пациентах. Она возникает по причине существования достаточно большого количества классификаций, используемых на свое усмотрение врачами разных специальностей, родоначальниками различных медицинских школ отоларингологии, терапевтов, инфекционистов, международными медицинскими ассоциациями.",
                    "В поликлинической практике ЛОР врача, жалобу на острую боль в горле указывают две трети всех, пришедших на прием, пациентов (66%). При этом, в 80% случаев, жалоба связана с заболеваниями только слизистой оболочки глотки, боковых валиков глотки, надгортанника, слизистой мягкого неба, слизистой носоглотки и т.д.",
                    "Учитывая вышесказанное, крайне важно как для самого пациента, так и для всех врачей, в первую очередь смежных с ЛОР специальностей, четко отличать «настоящую» бактериальную ангину от схожего «как две капли воды» по многим признакам, но противоположного по сути и серьезности осложнений хронического тонзиллита, острого фарингита и других заболеваний ротоглотки.",
                    "Обобщая, сформулирую практический совет/рекомендации:"+ "\n" + "1. Если общее состояние, при заболевании, не было нарушено с первых дней, а боль в горле Вам удалось устранить самостоятельно в домашних условиях за 3-4 дня то, очевидно, вы перенесли ОРВИ (острый вирусный фарингит с вероятностью 95%). Вам следует посетить ЛОР врача в плановом порядке, для обнаружения и предупреждения возможных осложнений, постановки правильного диагноза и назначения эффективного лечения, профилактики (особенно это касается детей). Здесь все зависит от личного отношения к своему здоровью: насколько Вы его цените или можете позволить себе бережно к нему относиться." + "\n" +  "2. Если же заболевание начинается с высокой температуры, острой боли в горле, болезненности шейных лимфоузлов, видны белые налеты на миндалинах – это повод заподозрить тяжелую форму бактериальной инфекции в ротоглотке (с наибольшей вероятностью «ангину») и незамедлительно обратиться на консультацию к ЛОР врачу, что бы значительно сократить сроки лечения и количество возможных осложнений, в том числе и обезопасить своих, еще не подвергшихся инфицированию близких.Будьте здоровы. Умейте ценить данное Вам природой и родителями здоровье."
                ]
            }
        ]
    });



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
            <Post title={element.title} text={element.text} key={index} someAdditor={()=>{}} isPost = {true} notSimple = {true} illnes={element.paragraphs[0]} classif={element.paragraphs[1]} practicy ={element.paragraphs[2]} important = {element.paragraphs[3]} recomendations = {element.paragraphs[4]} />
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