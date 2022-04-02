import { usersAPI } from './../API/users-API';

import { Dispatch } from "react";
import { UsersType } from "../Types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsType } from "./ReduxStore";
import { ResponseType } from '../API/API';

let InitialState ={
    users : [] as Array <UsersType>,
    pageSize:10 ,
    totalUsersCount:0 ,
    currentPage:1 ,
    isFetching:false,
    followingInProgress:[] as Array<number>, //array of users id ,
    filter:{
        term:'',
        friend:null as null|boolean
    }
}
type InitialStateType = typeof InitialState;
export type FilterType = typeof InitialState.filter;

type ActionsType = InferActionsType<typeof actions>;

const UsersReducer = (State=InitialState,action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'FolloW': 
            return {
                ...State,
                users:updateObjectInArray(State.users,action.usersId, "id", {follow:true})
            }

        ;
        case 'UnFolloW':     
            return {
                ...State,
                users:updateObjectInArray(State.users,action.usersId, "id", {follow:false})
            }
        ;
        case 'Set_Users' : 
            return{...State,users: action.users}
        ;
        case 'Set_Current_Page' : 
            return {...State, currentPage: action.currentPage}
        ;
        case 'Set_Total_Users_Count' : 
            return {...State, totalUsersCount: action.count}
        ;
        case 'TOGGLE_IS_FETCHING' : 
            return {...State, isFetching: action.isFetching}
        ;
        case 'SET_FILTER' :
            return {...State,filter:action.payload}
        ;
        case 'TOGGLE_FOLLOWING_IN_PROGRESS' : 
            return {
                ...State,
                 followingInProgress:action.isFetching
                ? [...State.followingInProgress, action.usersId]
                : State.followingInProgress.filter(id => id != action.usersId)
                }
        ;
        default:
            return State
    }
}

export const actions = {
    FollowSuccess: (usersId:number) => {
        return{
             type:'FolloW',
             usersId
        }      as const
    },
     UnFollowSuccess: (usersId:number) => {
        return{
             type:'UnFolloW',
             usersId
        }     as const
    },
     SetUsersAC : (users:Array<UsersType>) => {
        return {
            type:'Set_Users',
            users
        }   as const
    },
     SetCurrentPage : (currentPage:number) => {
        return {
            type:'Set_Current_Page',
            currentPage
        }   as const
    },
     SetTotalUsersCountAC : (totalUsersCount:number) => {
        return {
            type:'Set_Total_Users_Count',
            count:totalUsersCount
        }   as const
    },
     ToggleIsFetchingAC : (isFetching:boolean) => {
        return {
            type:'TOGGLE_IS_FETCHING',
            isFetching
        }   as const
    },
     TogglefollowingInProgress : (isFetching:boolean, usersId:number) => {
        return {
            type:'TOGGLE_FOLLOWING_IN_PROGRESS',
            isFetching, usersId
        }   as const
    },
    SetFilterAC:(filter:FilterType)=>{
        return {
            type:'SET_FILTER',
            payload:filter
        } as const
    }
}

type ThunkType = BaseThunkType<ActionsType> 

export const getUsers =(currentPage:number,pageSize:number,filter:FilterType):ThunkType=> async (dispatch) =>{ 
    dispatch(actions.ToggleIsFetchingAC(true));
    dispatch(actions.SetCurrentPage(currentPage));
    dispatch(actions.SetFilterAC(filter));

    let data = await usersAPI.getUsers(currentPage,pageSize,filter.term,filter.friend)
        dispatch(actions.ToggleIsFetchingAC(false));
        dispatch(actions.SetUsersAC(data.items));
        dispatch(actions.SetTotalUsersCountAC(data.totalCount));
}

const _FollowUnfollowFlow = async(dispatch:Dispatch<ActionsType>,
                                    userId:number,
                                    APIMethod:(userId:number)=>Promise<ResponseType>,
                                    actionCreator:(userId:number)=>ActionsType) => {
    dispatch(actions.TogglefollowingInProgress(true, userId));
    let response = await APIMethod(userId);
        if (response.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
    dispatch(actions.TogglefollowingInProgress(false, userId));  
}

export const  Follow=(userId: number): ThunkType =>async (dispatch)=>{
     await _FollowUnfollowFlow(dispatch, userId, usersAPI.Follow, actions.FollowSuccess);
}   
export const  UnFollow=(userId: number): ThunkType =>async (dispatch)=>{
     await _FollowUnfollowFlow(dispatch, userId, usersAPI.UnFollow, actions.UnFollowSuccess);
}    

export default UsersReducer