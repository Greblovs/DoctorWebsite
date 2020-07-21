import React, {useCallback, useRef, useState} from "react";
import classes from "./Ask.module.scss"
import axios from 'axios';

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/question';

 function addQuestion(){

     axios.post(API + DEFAULT_QUERY, {
        title: document.getElementById('title').value.trim(),
        age: document.getElementById('age').value.trim(),
        name: document.getElementById('name').value.trim(),
        text: document.getElementById('text').value.trim(),
         answer: null

    })
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);


        })
        .catch(function (error) {

            console.log(error.response.data.error.errors);

        });

}
const Ask = (props)=>{
    const [state, setState] = useState({
        titleValue: false,
        nameValue: false,
        ageValue: false,
        textValue: false
    });
    let AskWidth = 800
    if (window.innerWidth<820){
        AskWidth = window.innerWidth-40;
    }
    let  marginLeftAsk = (window.innerWidth -AskWidth)/2;


    let classesWrapper = [classes.FormWrapper]
    if (props.openned ===true){
        classesWrapper.push(classes.ASkOpened)
    }else{
        classesWrapper.push(classes.AskClosed)
    }

    let marginTopAsk = (window.innerHeight - 510)/2
    if (marginTopAsk<0) {
        marginTopAsk = 0
    }
    const title = useRef();
    const name = useRef();
    const age = useRef();
    const text = useRef();



    const titleUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                titleValue: title.current.value.length >40? false: title.current.value !== ""
            }
        })
    },[]);

    const ageUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                ageValue: age.current.value.length >3? false: age.current.value !== ""
            }
        })
    },[]);

    const nameUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                nameValue: name.current.value.length >40? false: name.current.value !== ""
            }
        })
    },[]);

    const textUpdate = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                textValue: text.current.value.length >1000? false: text.current.value !== ""
            }
        })
    },[]);

    let headerClasses = [classes.HeaderInput]
    let ageClasses = [classes.Age]
    let nameClasses = [classes.Name]
    let textClasses = [classes.TextArea]

    if (state.titleValue === false){
        headerClasses.push(classes.Highlight)
    }
    if (state.textValue === false){
        textClasses.push(classes.Highlight)
    }
    if (state.ageValue === false){
        ageClasses.push(classes.Highlight)
    }
    if (state.nameValue === false){
        nameClasses.push(classes.Highlight)
    }
    const check = (state.textValue && state.titleValue && state.nameValue && state.ageValue)
    const validation = (event)=>{
        if (check === false){
            event.preventDefault()
            alert("wrong inputs")
        }else{
            addQuestion()
            props.OpenAsk();
        }
    }




    return(
        <div className={classesWrapper.join(" ")} style= {{marginLeft: marginLeftAsk, marginTop: marginTopAsk }}>

            <form className={classes.Form} onSubmit={validation}>
                <div className={classes.Header}>Задайте Вопрос</div>
                <input id = "title" placeholder={"Тема вопроса"} className = {headerClasses.join(" ")} type={"text"} ref={title} onChange={titleUpdate}/>
                <input id = "name" placeholder={"Ваше имя"} className={nameClasses.join(" ")} type={"text"} ref={name} onChange={nameUpdate}/>
                <input id = "age" placeholder={"Возраст"} className={ageClasses.join(" ")} type = {"number"} ref={age} onChange={ageUpdate} />
                <textarea id = "text" placeholder={"Ваш вопрос"} className={textClasses.join(" ")} ref={text} onChange={textUpdate}/>
                <input  value={"Задать Вопрос"} className={classes.Button} type = {"submit"} />
            </form>
        </div>
    )
}

export default Ask;