import React, {useRef, useState} from 'react';
import classes from "./Banner.module.scss"
import {NavLink} from "react-router-dom";
import Ask from "../../AskForm/Ask"


const Banner = () => {
    const [state, setState] = useState({
        isOpen: false
    });

    let BannerStyles =[classes.Banner]
    if (window.innerWidth > 660){
        if (window.innerWidth > 1400) {
            BannerStyles = [classes.Banner]
            BannerStyles.push(classes.LargeImage)
        }else{
            BannerStyles = [classes.Banner]
            BannerStyles.push(classes.BannerImage)
        }
    }else if (window.innerWidth < 660){
        BannerStyles = [classes.Banner]
    }


    let CloserClasses = [classes.Closer]
    if (state.isOpen === true){
        CloserClasses.push(classes.CloserOpened)
    }else{
        CloserClasses.push(classes.CloserClosed)
    }

    const OpenAsk = (() =>{
        setState((prev)=>{
            return{
                ...prev,
                isOpen: !prev.isOpen
            }
        })
    })



    return (
        <>
            <Ask OpenAsk={OpenAsk} openned = {state.isOpen} />
            <div onClick={OpenAsk} className={CloserClasses.join(" ")}/>
            <div className={BannerStyles.join(" ")}>
                <div className={classes.Title + " " + classes.small}>
                    Лор врач
                </div>
                <div className={classes.Title}>
                    <p>
                        Кот Вячеслав
                    </p>
                    <p>
                        Федорович
                    </p>
                </div>
                    <button onClick={OpenAsk} style={{marginBottom: "10px"}}>
                        <p>
                        Задайте вопрос
                        </p>
                    </button>
            </div>

        </>
    );
};

export default Banner;