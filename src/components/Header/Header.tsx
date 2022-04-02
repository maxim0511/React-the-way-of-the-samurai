import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../Redux/authReducer';
import { AppStateType } from '../../Redux/ReduxStore';
import s from"./Header.module.css";


const Header:React.FC = (props) => {
    const isAuth = useSelector((State:AppStateType)=>State.auth.isAuth)
    const login = useSelector((State:AppStateType)=>State.auth.login);
    const dispatch = useDispatch();
    const Logout = ()=>{
        dispatch(logout())
    }
    return (
    <header className={s.header}>
        <div className={s.LoginBlock}>
                {isAuth ? 
                <div>
                        <div className={s.login}>
                            {login} 
                            <button onClick={Logout} className={s.button}>Выйти</button>
                        </div>
                </div>
                    :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
    )
}

export default Header