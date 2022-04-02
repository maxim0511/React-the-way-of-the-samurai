import React from "react";
import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import Avatar from "../../../assets/images/ImgAvatar.png"

type PropsType = {
    id:number,
    name:string
}

const DialogItem:React.FC<PropsType> = (props) =>{
    return (
        <div className={s.Dialog}>
             <img src={Avatar} alt="Avatar" key={'AvatarDialogPers'}/>
             <br/>
            <NavLink to={"/Dialogs/" + props.id} >{props.name}</NavLink>     
        </div>
    )
}

export default DialogItem;