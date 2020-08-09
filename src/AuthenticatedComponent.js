import React, {Component, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from 'axios';
import AdminLogin from "./components/Pages/AdminLogin/AdminLogin";

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/auth';

class AuthenticatedComponent extends Component{
    state = {
        redirect: false,
        isLoading:false
    }

    login=()=>{
        
        axios.post(API + DEFAULT_QUERY, {
            email: document.getElementById('login').value.trim(),
            password: document.getElementById('password').value.trim(),


        })
            .then(function (response) {
                console.log(response.data.token);
                localStorage.setItem('cool-jwt', response.data.token);
                this.setState(()=>{
                        return {
                            isLoading: true
                        }}
                )



            })
            .catch(function (error) {
                console.log(error.response);
                this.setState(()=>{
                        return {
                            isLoading: false
                        }}
                )

            });}

    refresh = ()=> {
        this.setState(()=>{
            return(
                {
                    redirect: true,
                }
            )
        })
    }


    constructor(props) {
        super(props);
        this.state={
            user:undefined
        }
    }
    componentDidMount(){
        if(this.state.isLoading==true){
        const jwt = localStorage.getItem('cool-jwt');
        if(!jwt){
            console.log('no jwt')
            this.props.history.push("/admin")
            //написть переход в вход !
        }
        else{
        axios.get(API + DEFAULT_QUERY, {headers :{
            authorization : `Bearer ${jwt}`}}).then(res=>this.setState({
            user: res.data
         }))
            .catch(err=>
        {
            console.log(err.message);
            localStorage.removeItem('cool-jwt');
        })}}
    }
    render(){
        if(this.state.user == undefined){
            return(
                <AdminLogin login = {this.login} refresh = {this.refresh}  />
            )
        }else {
            return (
                <div>{this.props.children}</div>
            )
        }
    }
}

export default withRouter(AuthenticatedComponent);