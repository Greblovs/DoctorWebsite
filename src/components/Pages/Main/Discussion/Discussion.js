import React from "react";
import classes from "./Discussion.module.scss"

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

        }]

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
                index %2 == 0?

                    <div className={classes.QuestionL} key = {index}>
                        <div className={classes.Main}>
                            <div className={classes.Title}>

                                {shortTitle}
                            </div>
                            <div className={classes.Date}>
                                <strong>Дата:</strong>
                                {element.date}
                            </div>
                            <div className={classes.TextShort}>{shortText}</div>
                        </div>
                        <div className={classes.Arrow}>
                            <div className={classes.ArrowHandler}>
                                <div className={classes.UpperL}></div>
                                <div className={classes.LowerL}></div>
                            </div>
                        </div>
                    </div>
                    :<div className={classes.QuestionR} key = {index}>
                        <div className={classes.Arrow}>
                            <div className={classes.ArrowHandler}>
                                <div className={classes.UpperR}></div>
                                <div className={classes.LowerR}></div>
                            </div>
                        </div>
                        <div className={classes.Main}>
                            <div className={classes.Title}>

                                {shortTitle}
                            </div>
                            <div className={classes.Date}>
                                <strong>Дата:</strong>
                                {element.date}
                            </div>
                            <div className={classes.TextShort}>{shortText}</div>
                        </div>

                    </div>

                : null
        )
    })

    return(
        <>
            <div className={classes.Wrap}>
                <p>Популярные вопросы</p>
            </div>
            <div className={classes.Post}>
            </div>
            <div className={classes.CommentWrapper}>
                {content}
            </div>


        </>
    )
}
export default Discussion