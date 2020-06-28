import React from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";
import PopularPost from "./PopularPost/PopularPost";
import Meetings from "./Meetings/Meetings";
import Discussion from "./Discussion/Discussion";
import PostFullSceen from "./SliderFullScreen/Slider"

const Main = () => {
    let slider = ()=>(
        <PostsSlider></PostsSlider>
    )
    if (window.innerWidth>1900) {
        slider = () => (
            <PostFullSceen></PostFullSceen>
        )
    }
    return (
        <>
            <Banner/>
            {slider()}
            <Meetings/>
            <PopularPost/>
            <Discussion />
        </>
    );
};

export default Main;