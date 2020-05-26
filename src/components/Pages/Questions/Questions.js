import React, {Component} from "react";
import classes from "./Questions.module.scss"


export default class Questions extends Component{
    state = {
        questions: [{
            public: true,
            title: "Ухо",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            textShort: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию.Спасибо",
            text: null,
        },{
            public: true,
            title: "Ухо",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            textShort: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию.Спасибо",
            text: null,
        }, {
            public: true,
            title: "Ухо",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            textShort: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию.Спасибо",
            text: null,
        },{
            public: false,
            title: "Ухо",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            textShort: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию.Спасибо",
            text: null,
        }]
    }

    content = this.state.questions.map((element, index)=>{
        return(
            element.public?
            < div className = {classes.Question} key = {index}>
                <div className={classes.SubTittle}>
                    <p className = {classes.QuestionTitle}>{element.title}</p>
                </div>
                <div className={classes.ShortInfo}>
                    <strong>Имя:</strong>
                    <p> {element.name}</p>
                    <strong>Возраст:</strong>
                    <p>{element.age}</p>
                </div>
                <div className={classes.ShortText}>
                    <div className={classes.wrapper}>
                        <p>{element.textShort}</p>
                    </div>
                </div>
                <button className={classes.Button}>
                    Просмотреть диалог
                </button>
            </div>
                : null
        )
    })


    render() {
        return(
            <>
                <div className={classes.tittle}>
                    <p>Вопросы - Ответы</p>
                    <button className={classes.ButtonWrite}>Задайте Вопрос</button>
                </div>
                {this.content}
            </>
        )
    }
}