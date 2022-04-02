import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../common/Paginator/Paginator";
import { FilterType } from "../../Redux/UsersReducer";
import { GetCurrentPage, GetFollowingInProgress, GetPageSize, GetTotalUsersCount, GetUsers, GetUsersFilter } from "../../Redux/UsersSelectors";
import User from "./User";
import UsersSearchForm from "./UserSearchForm";
import {getUsers,Follow,UnFollow} from "../../Redux/UsersReducer";
import { useHistory } from "react-router";
import * as queryString from 'querystring';

type queryType = {term?:string,friend?:string,page?:string}

let Users:React.FC =(props) => {
    const users=useSelector(GetUsers)
    const pageSize = useSelector(GetPageSize)
    const totalUsersCount = useSelector(GetTotalUsersCount);
    const currentPage = useSelector(GetCurrentPage);
    const filter = useSelector(GetUsersFilter);
    const followingInProgress = useSelector(GetFollowingInProgress);

    const dispatch=useDispatch();
    const onPageChanged = (PageNumber:number) => {
        dispatch(getUsers(PageNumber, pageSize,filter));
    }
    const onFilterChanged=(filter:FilterType)=>{
        dispatch(getUsers(1, pageSize,filter));
    }
    const follow = (userId:number) => {
        dispatch(Follow(userId))
    }
    const unFollow = (userId:number) => {
        dispatch(UnFollow(userId))
    }
    const history=useHistory()
    useEffect(()=>{
        const query:queryType={};
        if(!!filter.term)query.term=filter.term
        if(filter.friend !== null)query.friend=String(filter.friend)
        if(currentPage !== 1)query.page=String(currentPage)
        history.push({
                pathname:'/users',
                search:queryString.stringify(query),
        })
    },[filter,currentPage])
    return <div>
                    <UsersSearchForm onFilterChanged={onFilterChanged}/>
                   <div>
                    {
                        users.map(
                            u=> <User user={u} followingInProgress={followingInProgress} 
                                UnFollow={unFollow}
                                Follow={follow}
                                key={u.id}/> 
                            )
                    }
                    </div>
                    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                        totalUsersCount={totalUsersCount} pageSize={pageSize} />
                </div>
}


export default Users;