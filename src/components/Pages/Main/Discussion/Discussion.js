import React from "react";
import classes from "./Discussion.module.scss"
import Heading from "../Heading/Heading";
import Question from "../../ Question/Question";
import {NavLink} from "react-router-dom";


const Discussion = () => {
    let questions = [{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"

    }, {
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Заебался переделывать дизайн",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"

    },{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"

    }, {
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Заебался переделывать дизайн",
        answer: "Дурак, посмотри, на главной странице сайта все написано!"

    }];

    if (window.innerWidth < 700){
        questions = questions.slice(0,1)
    }else if (window.innerWidth < 1100){
        questions = questions.slice(0,2)
    }else if (window.innerWidth < 1600){
        questions = questions.slice(0,3)
    }

    questions = questions.map((element, index) => {
        let shortTitle = element.title.slice(0, 30);
        if (element.title.length > 30) {
            shortTitle = shortTitle + "...";
        }

        return (
            element.public ?
                < Question index = {index} key={index} shortTitle={shortTitle} text={element.text} answer={element.answer}/>
                : null
        )
    })

    return (

        <>
            <Heading text={"Популярные вопросы"}/>
                <div className={classes.PostsWrapper}>
                    {questions}
                </div>
                <NavLink to={"/Questions"} exact={false}>
                    <button  className={classes.MoreButton}>Больше вопросов</button>
                </NavLink>
        </>
    )
}
export default Discussion