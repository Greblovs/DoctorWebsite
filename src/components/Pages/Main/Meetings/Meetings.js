import React from 'react';
import classes from "./Meetings.module.scss"
import Heading from "../Heading/Heading";

const Meetings = () => {

    const text = "Во время консультации детского/взрослого ЛОР врача, наряду с визуальным осмотром, проводится более полное обследование ЛОР-органов. Современные методики обследования ЛОР-органов помогают ЛОР врачу определить точный диагноз и составить наиболее эффективную и безопасную схему лечения с учетом всех индивидуальных особенностей.";

    return (
        <>
            <Heading text={"Консультации"}/>

            <div className={classes.topText}>
                {text}
            </div>
            <button className={classes.Button}>Узнать больше</button>
        </>
    )
}

export default Meetings;