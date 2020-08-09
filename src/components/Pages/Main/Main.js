import React from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";
import PopularPost from "./PopularPost/PopularPost";
import Meetings from "./Meetings/Meetings";
import Discussion from "./Discussion/Discussion";
import Maps from "./Maps/Maps"
import classes from "./Main.module.scss"


const Main = () => {
    return (
        <>
            <Banner/>
            <div className={classes.PageWrap}>
                <PostsSlider/>
                <Meetings/>
                < PopularPost />
                <Discussion  />
                <Maps/>
            </div>
        </>
    );
};

export default Main;