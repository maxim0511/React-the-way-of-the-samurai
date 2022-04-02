import React from "react";
import s from "./Users.module.css";
import UserPhoto from '../../assets/images/ImgAvatar.png'
import { NavLink } from "react-router-dom";
import { UsersType } from "../../Types/types";

type propsType = {
    user:UsersType
    followingInProgress:Array<number>,
    UnFollow:(userId:number)=>void,
    Follow:(userId:number)=>void,
}

let User:React.FC<propsType> =({user,followingInProgress,UnFollow,Follow}) => {
    return ( <div  className={s.div}>
                                <span>
                                    <div>
                                        <NavLink to={'/Profile/' + user.id} >
                                            <img className={s.img} src={user.photos.small != null ? user.photos.small: UserPhoto } alt='Avatar User'/>
                                        </NavLink>
                                    </div>
                                    <div>
                                        {user.followed? 
                                                <button 
                                                disabled={followingInProgress.some (id => id === user.id)} 
                                                onClick={()=>{UnFollow( user.id)}}
                                            >Удалить из друзей</button>
                                            :<button 
                                                disabled={followingInProgress.some (id => id === user.id)} 
                                                onClick={()=>{Follow( user.id)}}
                                            >Добавить в друзья</button>}
                                    </div>
                                </span>
                                <span className={s.span}>
                                    <span>
                                        <div className={s.name}>{user.name}</div>
                                        <div>{user.status}</div>
                                    </span>
                                    <span className={s.location}>
                                        <div>{'u.location.country'}</div>
                                        <div>{'u.location.city'}</div>
                                    </span>
                                </span>
                            </div>)
                    
}

export default User;