import React, {useCallback, useRef} from "react";
import classes from "./Ask.module.scss"
import axios from 'axios';

const API = 'http://localhost:3001/api';
const DEFAULT_QUERY = '/question';

 function addQuestion(){
     axios.post(API + DEFAULT_QUERY, {
        title: document.getElementById('title').value.trim(),
        age: document.getElementById('age').value.trim(),
        name: document.getElementById('name').value.trim(),
        text: document.getElementById('text').value.trim(),
        questionId: null,
        public:true,
        email : "example@example.com"

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

    return(
        <div className={classesWrapper.join(" ")} style= {{marginLeft: marginLeftAsk, marginTop: marginTopAsk }}>
            <div className={classes.Header}>Задайте Вопрос</div>
            <form onSubmit={addQuestion}>
                <input id = "title" placeholder={"Тема вопроса"} className = {classes.HeaderInput} type={"text"}/>
                <input id = "name" placeholder={"Ваше имя"} className={classes.Name} type={"text"}/>
                <input id = "age" placeholder={"Возраст"} className={classes.Age} type = {"number"} />
                <textarea id = "text" placeholder={"Ваш вопрос"} className={classes.TextArea}/>
                <input onClick={props.OpenAsk} value={"Задать Вопрос"} type = {"submit"} className={classes.Button}/>
            </form>
        </div>
    )
}

export default Ask;