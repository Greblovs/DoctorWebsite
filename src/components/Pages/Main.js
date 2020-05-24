import React, {Component} from "react";
import Banner from "../../components/Banner/Banner";
import PostsSlider from "../../components/PostsSlider/PostsSlider";

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