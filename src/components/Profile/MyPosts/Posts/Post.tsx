import React  from "react";
import s from "./Post.module.css";
import Avatar from '../../../../assets/images/ImgAvatar.png'

type PropsType = {
    message:string,
    likecount:string,
    repostcount:string
}

const Post:React.FC<PropsType> =(props) => {
    return (
        <div className={s.item}>
            <div className={s.message}>
                <img src={Avatar} alt="AvatarPerson"/>
            </div>
            <div>
                 <span>{props.message}</span><br/>
                {props.likecount} {props.repostcount}
            </div>
        </div>
    )
}

export default Post;