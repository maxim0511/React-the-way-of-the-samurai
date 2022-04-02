import { securityAPI } from './../API/security-API';
import { authAPI } from './../API/auth-API';
import { Dispatch } from "react";
import { FormAction, stopSubmit } from "redux-form";
import {  resultCodeEnum } from "../API/API";
import { AppStateType, BaseThunkType, InferActionsType } from "./ReduxStore";


let InitialState= {
    id:0 as number | 0 ,
    email:null as string | null,
    login:null  as string | null,
    isAuth:false ,
    captchaUrl:null as string | null
}
export type InitialStateType = typeof  InitialState
type ActionsType = InferActionsType<typeof actions>
const authReducer = (State=InitialState,action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SET_USERS_DATA' : 
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...State,
                ...action.data,
            }
        

        default:    
            return State;
        
    } 
}
export const actions = {
 SetAuthUsersData :(id:number|0,email:string|null,login:string|null,isAuth:boolean) => ({type:'SET_USERS_DATA',data: {id,email,login,isAuth}} as const),
 getCaptchaUrlSuccess :(captchaUrl:string) => ({type:'GET_CAPTCHA_URL_SUCCESS',data: {captchaUrl} } as const)
}
type DispatchType = Dispatch<ActionsType>;
type getStateType = () => AppStateType;
type ThunkType =BaseThunkType<ActionsType | FormAction>

export const getAuthUsersData = ():ThunkType => async (dispatch,getState)=> {
        let meData=await authAPI.me()
            if (meData.resultCode === resultCodeEnum.Succes) {
                let {id,email,login}=meData.data
                dispatch(actions.SetAuthUsersData(id,email,login,true));
            }
}

export const login = (email:string,password:string,rememberMe:boolean,captcha:null | string):ThunkType =>async (dispatch) =>{
       let loginData= await authAPI.login(email,password,rememberMe,captcha)
            if (loginData.resultCode === resultCodeEnum.Succes) {
                dispatch(getAuthUsersData())
            } else {
                if (loginData.resultCode === resultCodeEnum.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl());
                }
                let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Ошибка';
                dispatch(stopSubmit('Login' , {_error:message}));
            }
}

export const logout = ():ThunkType=> async (dispatch) =>{
        let response =await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(actions.SetAuthUsersData(0,null,null,false));
            }
}
export const getCaptchaUrl = ():ThunkType=> async (dispatch,getState) =>{
    let CaptchaUrlData =await securityAPI.getCaptchaUrl()
    const captchaUrl = CaptchaUrlData.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

}
export default authReducer;