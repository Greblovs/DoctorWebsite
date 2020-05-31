import React, {Component} from "react";
import Banner from "./Banner/Banner";
import PostsSlider from "./PostsSlider/PostsSlider";

 export default class MainPage extends Component{
     render() {

         return(
            <>
                <Banner/>
                <PostsSlider/>
            </>
         )
     }
 }