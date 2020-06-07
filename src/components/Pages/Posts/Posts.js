import React from "react";
import classes from  "./post.module.scss"
import Post from "./Post/Post";

const Posts = () => {


    let posts = [
        {
            title: "Ангина",
            text: "Большинство пациентов заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Акустическая Травма",
            text: "Так ли это безвредно — слушать громкую музыку, заслонившись от окружающей действительности плотной пеленой громких звуков?",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        },
        {
            title: "Почему болят уши",
            text: "Наиболее частым и грозным осложнением респираторных инфекций у детей (и взрослых) бывает острый стредний отит (воспаление среднего уха).",
            paragraphs : [
                {first : "sadf"},
                {second : "dsfdsf"},
                {third : "dsfdf"}
            ]
        }
    ];

    posts  =  posts.map((element , index) =>{
        return(
            <Post title={element.title} text={element.text} key={index} openPost={()=>{}}/>
        )
    });

    return(
        <>
            {posts}
        </>
    )
};

export default Posts;