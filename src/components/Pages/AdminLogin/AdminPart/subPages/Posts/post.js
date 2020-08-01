import classes from "./post.module.scss"
import React, {useCallback, useRef, useState} from "react";



const Posts = (props) =>{
    const [state, setState] = useState({
        title: props.title,
        text: props.text,
        illnes: props.illnes,
        classif: props.classif,
        practicy: props.practicy,
        important: props.important,
        recomendations: props.recomendations
    })
    const titleRef = useRef();
    const textRef = useRef();
    const illnesRef = useRef();
    const clasifRef = useRef();
    const practicyRef = useRef();
    const importantRef = useRef();
    const recomendatiosRef = useRef();

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

    const ilnessChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                illnes: textRef.current.illnesRef
            }
        })
    },[]);
    const classifyChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                classif: clasifRef.current.value
            }
        })
    },[]);

    const practicyChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                practicy: practicyRef.current.value
            }
        })
    },[]);

    const importantChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                important: importantRef.current.illnesRef
            }
        })
    },[]);
    const recomendationChange = useCallback(()=>{
        setState((prev)=>{
            return{
                ...prev,
                recomendations: recomendatiosRef.current.illnesRef
            }
        })
    },[]);


    return(
        <div>
            <form className={classes.postForm}>
                <p className={classes.titleWriting}>Название</p>
                <textarea className={classes.title} ref={titleRef}  value={state.title} id = "text"  onChange={titleChange} />
                <p className={classes.titleWriting}>Заглавный текст</p>
                <textarea className={classes.textArea} ref={textRef}  value={state.text} id = "text"  onChange={textChange} />
                <p className={classes.titleWriting}>Описание болезни</p>
                <textarea className={classes.textArea} ref={illnesRef}  value={state.illnes} id = "text"  onChange={ilnessChange} />
                <p className={classes.titleWriting}>Классификация</p>
                <textarea className={classes.textArea} ref={clasifRef}  value={state.classif} id = "text"  onChange={classifyChange} />
                <p className={classes.titleWriting}>Практика</p>
                <textarea className={classes.textArea} ref={practicyRef}  value={state.practicy} id = "text"  onChange={practicyChange} />
                <p className={classes.titleWriting}>Важное</p>
                <textarea className={classes.textArea} ref={importantRef}  value={state.important} id = "text"  onChange={importantChange} />
                <p className={classes.titleWriting}>Рекомендации</p>
                <textarea className={classes.textArea}  ref={recomendatiosRef}  value={state.recomendations} id = "text"  onChange={recomendationChange} />
                <input className={classes.Button}  value={"Изменить"} className={classes.Button} type = {"submit"}  />
                <input value = {"удалить"} type={"submit"} className={classes.deleteButton}/>
            </form>
        </div>
        )
    }

export default Posts;
