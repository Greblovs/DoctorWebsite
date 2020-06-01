import React, {Component} from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";
import PopularPost from "./PopularPost/PopularPost";
import Meetings from "./Register/Meetings";
import Discussion from "./Discussion/Discussion";

 export default class MainPage extends Component{
     render() {

         return(
            <>
                <Banner/>
                <PostsSlider/>
                <Meetings/>
                <PopularPost/>
                <Discussion/>
            </>
         )
     }
 }