import {  useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Users from './Users';
import Preloader from "../../common/Preloader/Preloader";
import {GetIsFetching} from "../../Redux/UsersSelectors";
import { getUsers } from "../../Redux/UsersReducer";
import { AppStateType } from "../../Redux/ReduxStore";

type PropsUserPage = {
    pageTitle:string
}
type QueryParamsType = { term?: string; page?: string; friend?: string }
const UserPage:React.FC<PropsUserPage> = (props)=>{
    const isFetching = useSelector(GetIsFetching);
    const dispatch = useDispatch();
    const filter=useSelector((State:AppStateType)=>State.UsersPage.filter);
    const pageSize = useSelector((State:AppStateType)=>State.UsersPage.pageSize);
    const currentPage = useSelector((State:AppStateType)=>State.UsersPage.currentPage)
    useEffect(()=>{
        dispatch(getUsers(currentPage,pageSize,filter))
    },[])
    return <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? 
                <Preloader/>
            : 
                <Users/>
            }      
        </>
}
export default UserPage
