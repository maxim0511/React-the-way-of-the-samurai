import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Redux/ReduxStore";
import s from "./Sidebar.module.css";
import SidebarFriends from "./SidebarFriends/SidebarFriends";


const Sidebar:React.FC = (props) => {
    const SidebarName = useSelector((State:AppStateType)=>State.SidebarName.Pers)
    let SF = SidebarName.map (s => <SidebarFriends name={s.name} key={s.name}/>)     
    return (
        <div className={s.Sidebar}>
                Friends
            <div className={s.circle}>
                <div className={s.circleOne}></div>
                <div className={s.circleTwo}></div>
                <div className={s.circleThree}></div>
            </div>
            <div className={s.SF}>
                {SF} 
            </div>    
        </div>
    )
}

export default Sidebar 