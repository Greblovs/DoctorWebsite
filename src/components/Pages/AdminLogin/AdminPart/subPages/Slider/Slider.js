import classes from "./slider.module.scss"
import React, {useCallback, useRef, useState} from "react";
import axios from "axios";

const API = 'http://localhost:3002/api';
const DEFAULT_QUERY = '/postSlider/';


const Slider = (props) =>{
    const [state, setState] = useState({

        id: props.id,
        title: props.title,
        text: props.text,
        edit:props.edit
    })
    function editPost(e){
        e.preventDefault();
        if(state.edit=="false"){
            axios.post(API + DEFAULT_QUERY, {
                title: titleRef.current.value,
                alltext: textRef.current.value,


            })
                .then(function (response) {
                    //alert(response.data.message);
                    window.location.reload();

                })
                .catch(function (error) {
                    alert(error.message);
                });
        }
        else{
            axios.put(API + DEFAULT_QUERY+state.id.toString(), {
                title: titleRef.current.value,
                alltext: textRef.current.value,

            })
                .then(function (response) {
                    alert(response.data.message)

                })
                .catch(function (error) {
                    alert(error.message);
                });
        }
    }

    function deletePost(e){
        e.preventDefault();
        if(state.edit!="false"){
            axios.delete(API + DEFAULT_QUERY+state.id.toString())
                .then(function (response) {
                   // alert(response.data.message);
                    window.location.reload();
                })
                .catch(err=>
                        alert(err.message)
                    )}
        else window.location.reload();
    }

    const titleRef = useRef();
    const textRef = useRef();


    const titleChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                title: titleRef.current.value
            }
        })
    },[]);

    const textChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                text: textRef.current.value
            }
        })
    },[]);


    return(
        <div>
            <form className={classes.postForm}>
                <p className={classes.titleWriting}>Название</p>
                <textarea className={classes.title} ref={titleRef}  value={state.title}   onChange={titleChange} />
                <p className={classes.titleWriting}>Заглавный текст</p>
                <textarea className={classes.textArea} ref={textRef}  value={state.text}  onChange={textChange} />
                <input className={classes.Button} onClick={editPost} value={"Изменить"} className={classes.Button} type = {"submit"}  />
                <input value = {"удалить"} onClick={deletePost} type={"submit"} className={classes.deleteButton}/>
            </form>
        </div>
    )
}

export default Slider;
