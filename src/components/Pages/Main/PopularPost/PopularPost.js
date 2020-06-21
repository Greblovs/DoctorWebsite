import React from 'react';
import classes from "./PopularPost.module.scss"
import Heading from "../Heading/Heading";
import Post from "../Post/Post";

const PopularPost = () => {

    const posts = [
        {
            title: "Ангина",
            // text: "Большинство пациентов безаплеляционно заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            text: "Большинство пациентов заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
            paragraphs: [
                {first: "sadf"},
                {second: "dsfdsf"},
                {third: "dsfdf"}
            ]
        },
            {
                title: "Ангина",
                // text: "Большинство пациентов безаплеляционно заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
                text: "Большинство пациентов заявляют: 'Доктор у меня ангина'. Но так ли однозначна причина боли?",
                paragraphs: [
                    {first: "sadf"},
                    {second: "dsfdsf"},
                    {third: "dsfdf"}
                ]
            }];


    const rendPosts = posts.map((element, index) => {
        return (
            <Post index = {index} title={element.title} text={element.text} key={index} openPost={()=>{}}/>
        )
    });

    return (
        window.innerWidth > 660?
        <>
            <Heading text={"Популярные статьи"}/>
            {rendPosts}
            <button className={classes.MoreButton}>Больше статей</button>
        </>
        :
        <>
            <Heading text={"Популярные статьи"}/>
            <Post index = {0} title={posts[0].title} text={posts[0].text}  openPost={()=>{}}></Post>
            <button className={classes.MoreButton}>Больше статей</button>
        </>
    )
};

export default PopularPost;