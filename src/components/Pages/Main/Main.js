import React from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";
import PopularPost from "./PopularPost/PopularPost";
import Meetings from "./Meetings/Meetings";
import Discussion from "./Discussion/Discussion";
import PostFullSceen from "./SliderFullScreen/Slider"
import Maps from "./Maps/Maps"

const Main = () => {
    let slider = ()=>(
        <PostsSlider/>
    )
    if (window.innerWidth>1900) {
        slider = () => (
            <PostFullSceen/>
        )
    }
    return (
        <>
            <Banner/>
            {slider()}
            <Meetings/>
            < PopularPost />
            <Discussion  />
            <Maps/>
        </>
    );
};

export default Main;