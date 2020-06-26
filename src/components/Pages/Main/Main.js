import React from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";
import PopularPost from "./PopularPost/PopularPost";
import Meetings from "./Meetings/Meetings";
import Discussion from "./Discussion/Discussion";

const Main = () => {

    return (
        <>
            <Banner/>
            <PostsSlider/>
            <Meetings/>
            <PopularPost/>
            <Discussion/>
        </>
    );
};

export default Main;