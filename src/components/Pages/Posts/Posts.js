import React, {Component} from "react";

import classes from  "./post.module.scss"



export default class Posts extends Component{


    posts = [
        {
            title: "Ангина",
            subTitle: "Большинство пациентов безаплеляционно заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Акустическая Травма",
            subTitle: "Так ли это безвредно — слушать громкую музыку, заслонившись от окружающей действительности плотной пеленой громких звуков?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Почему болят уши",
            subTitle: "Наиболее частым и грозным осложнением респираторных инфекций у детей (и взрослых) бывает острый стредний отит (воспаление среднего уха).",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        }
        ];

    posts  =  this.posts.map((element , index) =>{
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

    render() {
        return(
            <>
                {this.posts}
            </>
        )
    }
}