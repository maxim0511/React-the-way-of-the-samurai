import React from "react";
import s from "./Message.module.css";

type PropsType = {
    id:number
    messages:string
}

const Message:React.FC<PropsType> = (props) =>{
    return (
        <div className={s.Dialog}>      
            <div>{props.messages}   </div>       
        </div>  
    )
}

export default Message;