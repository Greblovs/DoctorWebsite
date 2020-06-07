import React from 'react';
import classes from "./PopularPost.module.scss"

const PopularPost = () => {
    const posts = [
        {
            title: "Ангина",
            subTitle: "Большинство пациентов безаплеляционно заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        }]
    const rendPosts   =  posts.map((element , index) =>{
        return(
            <div className={classes.Post}  key={index} >
                <div>
                    <p className={classes.Title}>{element.title}</p>
                </div>
                <div className={classes.MainText}>
                    <p>
                        {element.subTitle}
                    </p>
                </div>
                <div className={classes.Button}>Подробнее</div>
            </div>
        )
    })
    return (
        <>
            <div className={classes.Wrap}>
                <p>Популярные статьи</p>
            </div>

            <div className={classes.PostWrap}>

                {rendPosts}

            </div>

        </>
    )
}

export default  PopularPost;