import React, {Component} from "react";

import axios from 'axios';

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/auth';

class AuthenticatedComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:undefined
        }
    }
    componentDidMount(){
        const jwt = localStorage.getItem('cool-jwt');
        if(!jwt){
            console.log('no jwt');
            this.props.history.push('/components/Pages/AdminLogin/AdminLogin');
        }
        axios.get(API + DEFAULT_QUERY, {headers :{
            Authorization : `Bearer ${jwt}`}}).then(res=>this.setState({
            user: res.data
        })).catch(err=>
        {
            console.log(err.message);
            localStorage.removeItem('cool-jwt');
            this.props.history.push('/components/Pages/AdminLogin/AdminLogin');
        })
    }
    render(){
        if(this.state.user == undefined){
            return(
                <div><h1>Loading...</h1></div>
            )
        }
        return(
            <div>{this.props.children}</div>
        )
    }
}

export default AuthenticatedComponent;