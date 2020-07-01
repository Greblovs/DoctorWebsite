import React, {useCallback, useRef} from "react";
import classes from "./Ask.module.scss"




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
            <form >
                <input placeholder={"Тема вопроса"} className = {classes.HeaderInput} type={"text"}/>
                <input placeholder={"Ваше имя"} className={classes.Name} type={"text"}/>
                <input placeholder={"Возраст"} className={classes.Age} type = {"number"} />
                <textarea  placeholder={"Ваш вопрос"} className={classes.TextArea}/>
                <input onClick={props.OpenAsk} value={"Задать Вопрос"} type = {"submit"} className={classes.Button}/>
            </form>
        </div>
    )
}

export default Ask;