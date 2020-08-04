import classes from "./post.module.scss"
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/post/';


const Posts = (props) =>{
    const [state, setState] = useState({
        id: props.id,
        title: props.title,
        text: props.text,
        illnes: props.illnes,
        classif: props.classif,
        practicy: props.practicy,
        important: props.important,
        recomendations: props.recomendations
    })
    function editPost(){

        axios.put(API + DEFAULT_QUERY+state.id.toString(), {
            title: document.getElementById('title').value.trim(),
            text: document.getElementById('text').value.trim(),
            disease: document.getElementById('illness').value.trim(),
            classification: document.getElementById('classif').value.trim(),
            practice: document.getElementById('practice').value.trim(),
            important: document.getElementById('important').value.trim(),
            recommendation: document.getElementById('recommendation').value.trim()


        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);


            })
            .catch(function (error) {

                console.log(error.response.data.error.errors);

            });}

    function addPost(){

        axios.post(API + DEFAULT_QUERY, {
            title: document.getElementById('title').value.trim(),
            text: document.getElementById('text').value.trim(),
            disease: document.getElementById('illness').value.trim(),
            classification: document.getElementById('classif').value.trim(),
            practice: document.getElementById('practice').value.trim(),
            important: document.getElementById('important').value.trim(),
            recommendation: document.getElementById('recommendation').value.trim()

        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);


            })
            .catch(function (error) {

                console.log(error.response.data.error.errors);

            });}
    function deletePost(){
        axios.delete(API + DEFAULT_QUERY+state.id.toString())
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
            })
            .catch((err=>
                console.log(err.response.data.error.errors)))
    }

    const titleRef = useRef();
    const textRef = useRef();
    const illnesRef = useRef();
    const clasifRef = useRef();
    const practicyRef = useRef();
    const importantRef = useRef();
    const recomendatiosRef = useRef();

    const titleChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                title: titleRef.current.value
            }
        })
    },[]);

    const textChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                text: textRef.current.value
            }
        })
    },[]);

    const ilnessChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                illnes: textRef.current.illnesRef
            }
        })
    },[]);
    const classifyChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                classif: clasifRef.current.value
            }
        })
    },[]);

    const practicyChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                practicy: practicyRef.current.value
            }
        })
    },[]);

    const importantChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                important: importantRef.current.illnesRef
            }
        })
    },[]);
    const recomendationChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                recomendations: recomendatiosRef.current.illnesRef
            }
        })
    },[]);


    return(
        <div>
            <form className={classes.postForm}>
                <p className={classes.titleWriting}>Название</p>
                <textarea className={classes.title} ref={titleRef}  value={state.title} id = "title"  onChange={titleChange} />
                <p className={classes.titleWriting}>Заглавный текст</p>
                <textarea className={classes.textArea} ref={textRef}  value={state.text} id = "text"  onChange={textChange} />
                <p className={classes.titleWriting}>Описание болезни</p>
                <textarea className={classes.textArea} ref={illnesRef}  value={state.illnes} id = "illness"  onChange={ilnessChange} />
                <p className={classes.titleWriting}>Классификация</p>
                <textarea className={classes.textArea} ref={clasifRef}  value={state.classif} id = "classif"  onChange={classifyChange} />
                <p className={classes.titleWriting}>Практика</p>
                <textarea className={classes.textArea} ref={practicyRef}  value={state.practicy} id = "practice"  onChange={practicyChange} />
                <p className={classes.titleWriting}>Важное</p>
                <textarea className={classes.textArea} ref={importantRef}  value={state.important} id = "important"  onChange={importantChange} />
                <p className={classes.titleWriting}>Рекомендации</p>
                <textarea className={classes.textArea}  ref={recomendatiosRef}  value={state.recomendations} id = "recommendation"  onChange={recomendationChange} />
                <input className={classes.Button} onClick={editPost} value={"Изменить"} className={classes.Button} type = {"submit"}  />
                <input value = {"удалить"} onClick={deletePost} type={"submit"} className={classes.deleteButton}/>
            </form>
        </div>
        )
    }

export default Posts;
