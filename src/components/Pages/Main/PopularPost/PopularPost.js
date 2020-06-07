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
        }];

    const rendPosts = posts.map((element, index) => {
        return (
            <Post title={element.title} text={element.text} key={index} openPost={()=>{}}/>
        )
    });

    return (
        <>
            <Heading text={"Популярные статьи"}/>

            {rendPosts}

            <button className={classes.MoreButton}>Больше статей</button>

        </>
    )
};

export default PopularPost;