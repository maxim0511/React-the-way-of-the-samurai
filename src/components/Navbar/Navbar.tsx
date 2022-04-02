import React from 'react';
import s from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
    return (
      <nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" onClick={()=>{document.title='Profile'}} activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Dialogs" onClick={()=>{document.title='Dialogs'}} activeClassName={s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Chat" onClick={()=>{document.title='Chat'}} activeClassName={s.active}>Chat</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/News" onClick={()=>{document.title='News'}} activeClassName={s.active}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Music" onClick={()=>{document.title='Music'}} activeClassName={s.active}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Settings" onClick={()=>{document.title='Settings'}} activeClassName={s.active}>Settings</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Users" onClick={()=>{document.title='Users'}} activeClassName={s.active}>Users</NavLink>
        </div>
        <div className={s.itemFriends}>
            <Sidebar/>
        </div>
     </nav>
    )
}

export default Navbar