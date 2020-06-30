import React from 'react';
import classes from "./PopularPost.module.scss"
import Heading from "../Heading/Heading";
import Post from "../../Post/Post";

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

    let marginHeader = (window.innerWidth-1400)/2;
    let marginButton = (window.innerWidth-1300)/2;
    const rendPosts = posts.map((element, index) => {
        return (
            <Post index = {index} title={element.title} text={element.text} key={index} someAdditor={()=>{}}/>
        )
    });

    return (
        window.innerWidth >= 660?
        <>
            <Heading marginL = {marginHeader} text={"Популярные статьи"}/>
            {rendPosts}
            <button style={window.innerWidth>1300 && marginButton>20? {marginLeft: marginButton}: null} className={classes.MoreButton}>Больше статей</button>
        </>
        :
        <>
            <Heading text={"Популярные статьи"}/>
            <Post index = {0} title={posts[0].title} text={posts[0].text}  someAdditor={() => {}}/>
            <button   className={classes.MoreButton}>Больше статей</button>
        </>
    )
};

export default PopularPost;