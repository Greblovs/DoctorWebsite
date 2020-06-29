import React from "react";
import classes from "./Discussion.module.scss"
import Heading from "../Heading/Heading";
import Question from "../../ Question/Question";


const Discussion = () => {
    const discuss = [{
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Добрый вечер Вечеслав Федорович где можно попасть к вам на консультацию. Спасибо",

    }, {
        date: "12/12/12",
        public: true,
        title: "Как записаться на прием",
        age: 22,
        name: "Сергей",
        backTrace: "example@example.com",
        text: "Заебался переделывать дизайн",

    }];

    const content = discuss.map((element, index) => {
        var shortText = element.text.slice(0, 60);
        if (element.text.length > 50) {
            shortText = shortText + "...";
        }
        var shortTitle = element.title.slice(0, 30);
        if (element.title.length > 30) {
            shortTitle = shortTitle + "...";
        }

        return (
            element.public ?
                < Question index = {index} key={index} shortTitle={shortTitle}/>
                : null
        )
    })
    let marginHeader = (window.innerWidth-1400)/2
    return (

        <>
            <Heading marginL = {marginHeader}  style = {{float: "left"}} text={"Популярные вопросы"}/>
            <div style={{textAlign: "center"}} className={classes.CommentWrapper}>
                {content}
                <button     className={classes.MoreButton}>Больше вопросов</button>
            </div>

        </>
    )
}
export default Discussion