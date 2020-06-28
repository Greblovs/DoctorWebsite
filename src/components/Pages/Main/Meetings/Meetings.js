import React from 'react';
import classes from "./Meetings.module.scss"
import Heading from "../Heading/Heading";

const Meetings = () => {

    const text = "Во время консультации детского/взрослого ЛОР врача, наряду с визуальным осмотром, проводится более полное обследование ЛОР-органов. Современные методики обследования ЛОР-органов помогают ЛОР врачу определить точный диагноз и составить наиболее эффективную и безопасную схему лечения с учетом всех индивидуальных особенностей.";

    return (
        <div className={classes.Wrapper}>
            <Heading text={"Консультации"}/>

            <div className={classes.topText}>
                {text}
            </div>
            <button style={window.innerWidth>1400? {width: "300px"} : {width: "calc(100% - 60px)"}  } className={classes.Button} >Узнать больше</button>
        </div>
    )
}

export default Meetings;