import React, {Component, useEffect, useState} from "react";
import classes from "./Questions.module.scss"
import axios from 'axios';

const API = 'http://localhost:3001/api';
const DEFAULT_QUERY = '/questions';


const Questions = () => {

    const [state, setState] = useState({
        questions: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {

        setState((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        });

        axios.get(API + DEFAULT_QUERY)
            .then(result => setState((prev)=>{
                return {
                    ...prev,
                    questions: result.data.data,
                    isLoading: false
                }
            }))
            .catch(error => setState((prev)=>{
                return {
                    ...prev,
                    error,
                    isLoading: false
                }
            }));
    }, []);

    return (
        <>
            <div className={classes.QuestionTitle}>
            </div>
            {state.questions.map((element, index) => {
                let shortText = element.text.slice(0, 60);
                if (element.text.length > 50) {
                    shortText = shortText + "...";
                }
                let shortTitle = element.title.slice(0, 15);
                if (element.title.length > 15) {
                    shortTitle = shortTitle + "...";
                }

                return (
                    element.public ?
                        index % 2 === 0 ?

                            <div className={classes.QuestionL} key={index}>
                                <div className={classes.Main}>
                                    <div className={classes.Title}>

                                        {shortTitle}
                                    </div>
                                    <div className={classes.Date}>
                                        <strong>Дата:</strong>
                                        {element.createdAt}
                                    </div>
                                    <div className={classes.TextShort}>{shortText}</div>
                                </div>
                                <div className={classes.Arrow}>
                                    <div className={classes.ArrowHandler}>
                                        <div className={classes.UpperL}/>
                                        <div className={classes.LowerL}/>
                                    </div>
                                </div>
                            </div>
                            : <div className={classes.QuestionR} key={index}>
                                <div className={classes.Arrow}>
                                    <div className={classes.ArrowHandler}>
                                        <div className={classes.UpperR}/>
                                        <div className={classes.LowerR}/>
                                    </div>
                                </div>
                                <div className={classes.Main}>
                                    <div className={classes.Title}>

                                        {shortTitle}
                                    </div>
                                    <div className={classes.Date}>
                                        <strong>Дата:</strong>
                                        {element.createdAt}
                                    </div>
                                    <div className={classes.TextShort}>{shortText}</div>
                                </div>

                            </div>

                        : null
                )
            })
            }
        </>
    );
};

export default Questions;