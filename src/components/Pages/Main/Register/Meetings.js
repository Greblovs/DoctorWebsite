import React from 'react';
import classes from "./Meetings.module.scss"

const Meetings = () => {
    return (
        <>
            <div className={classes.Wrap}>
                <p>Консультации</p>
            </div>
            <div className={classes.RegisterDiv}>

                <div className={classes.topText}>
                    Во время консультации детского/взрослого ЛОР врача, наряду с визуальным осмотром,
                    проводится более полное обследование ЛОР-органов. Современные методики
                    обследования ЛОР-органов помогают ЛОР врачу определить точный диагноз и
                    составить наиболее эффективную и безопасную схему лечения с учетом всех индивидуальных особенностей.
                </div>
                <button className={classes.Button}>Узнать больше</button>
            </div>
        </>
    )
}

export default  Meetings;