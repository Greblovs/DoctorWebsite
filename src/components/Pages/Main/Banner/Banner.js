import React from 'react';
import classes from "./Banner.module.scss"


const Banner = () => {
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

    return (
        <>
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
                <button>
                    <p>
                    Задайте вопрос
                    </p>
                </button>
            </div>

        </>
    );
};

export default Banner;