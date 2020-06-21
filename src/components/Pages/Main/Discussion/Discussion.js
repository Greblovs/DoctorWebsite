import React from "react";
import classes from "./Discussion.module.scss"
import Heading from "../Heading/Heading";



const Discussion = ()=>{
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
            title: "Виталя хуесос",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            text: "Добрый вечер все кто читает это, ответственно заявляю что я заебался пределывать дизайн",

        }, {
            date: "12/12/12",
            public: true,
            title: "Как записаться на прием",
            age: 22,
            name: "Сергей",
            backTrace: "example@example.com",
            text: "Заебался переделывать дизайн",

        }];

    const content = discuss.map((element, index)=>{
        var  shortText = element.text.slice(0,60);
        if (element.text.length >50){
            shortText = shortText + "...";
        }
        var shortTitle = element.title.slice(0,15);
        if (element.title.length >15){
            shortTitle = shortTitle + "...";
        }

        return(
            element.public?
                < div key = {index}>
                    <div>
                        <div className={classes.Decoration}/>
                        <div className={classes.Circle}/>
                        <div className={classes.Question}/>
                    </div>
                    <div>
                        <div className={classes.DecorationL}/>
                        <div className={classes.CircleL}/>
                        <div className={classes.QuestionL}/>
                    </div>
                </div>
                : null  
        )
    })



    return(
        <>
            <Heading text={"Популярные вопросы"}/>

            <div className={classes.CommentWrapper}>
                {content}
            </div>


        </>
    )
}
export default Discussion