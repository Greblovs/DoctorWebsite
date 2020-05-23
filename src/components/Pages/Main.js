import React, {Component} from "react";
import Layout from "../../components/hoc/Layout/Layout";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import PostsSlider from "../../components/PostsSlider/PostsSlider";

 export default class MainPage extends Component{
     render() {

         return(
            <>
                <Header/>
                <Layout>
                    <Banner/>
                    <PostsSlider/>
                </Layout>
            </>
         )
     }
 }