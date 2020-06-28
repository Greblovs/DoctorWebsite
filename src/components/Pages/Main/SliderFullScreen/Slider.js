import React, {useState} from "react"
import  classes from "./Slider.module.scss"


const Slider = () =>{
    const [state, setState] = useState({
        activePostId: 0,
        interval: null,
        isPostOpen: false,
        posts: [
            {
                title: "Неотложная помощь",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."
            },
            {
                title: "Заболевания носа",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."
            },
            {
                title: "Заболевания уха",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."
            },
            {
                title: "Заболевания горла",
                text: "Если у Вас неотложная ситуация, Вам нужен совет ЛОР врача или рекомендации как поступить в той или иной ситуации."
            }
        ],
    });

    const posts = state.posts.map((element, number) => (
        <div className={classes.Post}  key={number}>
            <div className={classes.Title}>
                {element.title}
            </div>
            <div className={classes.Text}>
                {element.text}
            </div>
            <button  className={classes.Button}>
                Читать дальше
            </button>
        </div>
    ));


    return(
        <div className={classes.PostWrapper}>
            {posts}
        </div>
    )
}

export default Slider;