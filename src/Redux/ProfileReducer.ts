import { ProfileAPI } from './../API/profile-API';
import { Dispatch } from "react";
import { FormAction, stopSubmit } from "redux-form";
import {resultCodeEnum } from "../API/API";
import { PostsDataType,PhotosType, Profiletype } from "../Types/types";
import { AppStateType, BaseThunkType, InferActionsType } from "./ReduxStore";


let InitialState= {
  PostsData : [
    {id:1, message:"Привет ", likecount:"15 лайков" , repostcount:"2 репоста"},
  ]as Array <PostsDataType>,
  Profile:null as Profiletype | null,
  status:"" ,
  TextNewPost:'',
};

export type InitialStateType = typeof InitialState

export type ActionsType = InferActionsType<typeof actions>

const ProfileReducer = (State = InitialState,action:ActionsType):InitialStateType =>  {
    switch(action.type) {
        case 'ADD_POST': {
            let newpost = {
                id:3,
                message:action.TextNewPost,
                likecount:'0 лайков',
                repostcount:'0 репостов'
              }
              return {
                ...State,
                PostsData:[...State.PostsData, newpost],
                TextNewPost:'',
              };
            }  
        case 'SET_USER_PROFILE':{
          return {...State, Profile:action.Profile}
        }
        case 'SET_STATUS' : {
          return {...State, status:action.status}
        }
        case 'SAVE_PHOTO_SUCCESS' : {
          return {...State, Profile: {...State.Profile, photos:action.photos} as Profiletype}
        }
        case 'DELETE_POST': 
            return {...State, PostsData:State.PostsData.filter(p => p.id !== action.postId)}
        default:    
            return State;
        
    } 
}
export const actions = {
   addPostActionCreator: (TextNewPost:string) => ({type:'ADD_POST',TextNewPost} as const) ,
   SetUserProfile: (Profile:Profiletype) => ({type:'SET_USER_PROFILE', Profile} as const) ,
   SetStatus: (status:string) => ({type:'SET_STATUS',status} as const)  ,
   deletePost: (postId:number) => ({type:'DELETE_POST',postId} as const)  ,
   savePhotoSuccess: (photos:PhotosType) => ({type:'SAVE_PHOTO_SUCCESS',photos} as const)
}

  type DispatchType = Dispatch<ActionsType>;
  type getStateType = () => AppStateType;
  type ThunkType =  BaseThunkType<ActionsType | FormAction>

  export const getUserProfile = (userId:number):ThunkType=>async (dispatch,getState) => {
        let data= await ProfileAPI.getProfile(userId)
            dispatch(actions.SetUserProfile(data));
  }  
export const getStatus = (userId:number):ThunkType => async(dispatch)=> {
    let StatusData=await ProfileAPI.getStatus(userId)
      dispatch(actions.SetStatus(StatusData))
}
export const updateStatus = (status:string):ThunkType => async(dispatch) => {
    let StatusDataUpdate = await ProfileAPI.updateStatus(status)
      if (StatusDataUpdate.resultCode === resultCodeEnum.Succes) {
          dispatch(actions.SetStatus(status))
      }
}
export const savePhoto = (file:File):ThunkType => async(dispatch) => {
  let SavePhotoData = await ProfileAPI.savePhoto(file)
    if (SavePhotoData.resultCode === resultCodeEnum.Succes) {
        dispatch(actions.savePhotoSuccess(SavePhotoData.data.photos))
    }
}
export const saveProfile = (Profile:Profiletype):ThunkType => async(dispatch, getState) => {
  const userId =getState().auth.id;
  let SaveProfileData = await ProfileAPI.saveProfile(Profile)
    if (SaveProfileData.resultCode === resultCodeEnum.Succes) {
        dispatch(getUserProfile(userId))
    } else {
      dispatch(stopSubmit('EditProfile' , {_error:SaveProfileData.messages[0]}));
      return Promise.reject(SaveProfileData.messages[0]);
    }
}
export default ProfileReducer