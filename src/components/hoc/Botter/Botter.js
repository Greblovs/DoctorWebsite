import React, {useCallback, useState} from 'react';
import classes from "./Botter.module.scss";






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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2842.624934838815!2d-123.2816329845101!3d44.56378057910075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c040b9ea50bb43%3A0xa6fff1dc01f7b49f!2z0KPQvdC40LLQtdGA0YHQuNGC0LXRgiDRiNGC0LDRgtCwINCe0YDQtdCz0L7QvQ!5e0!3m2!1sru!2sus!4v1593252032617!5m2!1sru!2sus"/>
                </div>
            </div>

    );
});


export default Botter;