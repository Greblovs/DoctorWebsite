import React, {useCallback, useState} from 'react';
import classes from "./Botter.module.scss";
import TrackVisibility  from "react-on-screen";






const Botter = ((props) => {
    const [state, setState] = useState({

    });


    return (
            <div  className={classes.Botter}>
                <div className={classes.Wrapper}>
                    <p className={classes.name}>Кот Вячеслав Федорович</p>
                    <p className={classes.status}>Лор врач</p>
                    <p className={classes.info}>(067) 5065206  (8.00 — 20.00)</p>
                    <p className={classes.info}>example@example.com</p>
                </div>
                <div className={classes.CircleWhatsAp}/>
                <div className={classes.CirclePhone}/>
                <div className={classes.rights}>
                    <p className={classes.rightsWriting}>All rights reserved</p>
                </div>

            </div>

    );
});


export default Botter;