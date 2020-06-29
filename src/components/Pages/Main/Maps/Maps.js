import React from "react";
import classes from "./Maps.module.scss"
import Heading from "../Heading/Heading"


const Maps = ()=>{
    let marginHeader = (window.innerWidth-1400)/2
    return(
        <>
            <Heading marginL={window.innerWidth>=1400?marginHeader: 0} text={"Где нас найти?"}/>
            <div style = {window.innerWidth>=660? window.innerWidth>=1000? window.innerWidth>=1400? {maxWidth: "1200px"}:{maxWidth: "1000px"}:{maxWidth: "660px"}:null}   className={classes.MapsWrapper}>

                <div className={window.innerWidth>=660? classes.Map:null}>
                    <div   className={window.innerWidth>=660? window.innerWidth>=1000? window.innerWidth>=1400? classes.textDesktop : classes.textTablet: classes.Text:null}>
                        <p className={classes.Addressline}>клиника Медиком на Печерске</p>
                        <p className={classes.topText}>ул. Василия Тютюнника (Анри Барбюса) 37/1</p>
                    </div>
                    <iframe className={window.innerWidth < 660 ? classes.MapMobile : window.innerWidth < 1000 ? classes.MapTablet : window.innerWidth < 1400 ? classes.MapSmallDesktop : classes.Desktop}  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.0722774827427!2d30.524143315696826!3d50.42112497947142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf17a719f6c1%3A0xe3ecc9cf01b85338!2z0JbQmiAi0J_RgNC10YHRgtC40LYg0KXQvtC70Lsi!5e0!3m2!1sru!2sus!4v1593388287509!5m2!1sru!2sus"/>
                </div>
                <div style={{paddingTop : "20px"}} className={window.innerWidth>=660? classes.Map:null}>
                    <div  className={window.innerWidth>=660? window.innerWidth>=1000? window.innerWidth>=1400? classes.textDesktop : classes.textTablet: classes.Text:null}>
                        <p className={classes.Addressline}>клиника Медиком на Оболони</p>
                        <p className={classes.topText}>ул. Героев Сталинграда 6-Д37/1</p>
                    </div>
                    <iframe className={window.innerWidth < 660 ? classes.MapMobile : window.innerWidth < 1000 ? classes.MapTablet : window.innerWidth < 1400 ? classes.MapSmallDesktop : classes.Desktop} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.0722774827427!2d30.524143315696826!3d50.42112497947142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf17a719f6c1%3A0xe3ecc9cf01b85338!2z0JbQmiAi0J_RgNC10YHRgtC40LYg0KXQvtC70Lsi!5e0!3m2!1sru!2sus!4v1593388287509!5m2!1sru!2sus"/>
                </div>

            </div>
        </>
    )
}

export default Maps;