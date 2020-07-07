import React from 'react';
import classes from "./PopularPost.module.scss"
import Heading from "../Heading/Heading";
import Post from "../../Post/Post";
import {NavLink} from "react-router-dom";

const PopularPost = () => {

    let posts = [
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
            },{
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

    if (window.innerWidth < 700){
        posts = posts.slice(0,1)
    }else if (window.innerWidth < 1100){
        posts = posts.slice(0,2)
    }else if (window.innerWidth < 1600){
        posts = posts.slice(0,3)
    }

        const rendPosts = posts.map((element, index) => {
        return (
            <Post index = {index} title={element.title} text={element.text} key={index} someAdditor={()=>{}} notSimple = {true}/>
        )
    });

    return (
        <>
            <Heading text={"Популярные статьи"}/>
            <div className={classes.PostsWrapper}>
            {rendPosts}
            </div>
            <NavLink to={"/Posts"} exact={false}>
                <button className={classes.MoreButton}>Больше статей</button>
            </NavLink>
        </>
    )
};

export default PopularPost;