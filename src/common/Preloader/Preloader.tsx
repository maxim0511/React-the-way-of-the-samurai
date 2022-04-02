import React from "react";
import s from "./Preloader.module.css"
import Preloaderimg from '../../assets/images/Preloader.svg'

let Preloader = () => {
    return (
    <div >
        <img src={Preloaderimg} className={s.img} alt={'Loading'} key={'Loading'}/> 
    </div>  
    )
}
export default Preloader;