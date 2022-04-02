import { Dispatch } from "redux";
import { chatAPI, ChatMessageType, StatusType } from "../API/chat-api";
import { BaseThunkType, InferActionsType } from "./ReduxStore";
import {v1} from 'uuid';

type ChatIdType = ChatMessageType & {id:string}
let InitialState= {
    messages:[] as ChatIdType[],
    status:'pending' as StatusType
}
export type InitialStateType = typeof  InitialState
type ActionsType = InferActionsType<typeof actions>

const chatReducer = (State=InitialState,action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'MESSAGES':
            return {
                ...State,
                messages:[...State.messages, ...action.payload.messages.map(m=>({...m,id:v1()}))].filter((m,index,array)=>index>=array.length - 100)
            }
        case 'STATUS':
            return {
                ...State,
                status:action.payload.status
            }
        default:    
            return State;
        
    } 
}
export const actions = {
    setMessages:(messages:ChatMessageType[])=>({type:'MESSAGES',payload:{messages}}as const),
    setStatus:(status:StatusType)=>({type:'STATUS',payload:{status}} as const)
}


type ThunkType =BaseThunkType<ActionsType>

let _NewMessage:((messages:ChatMessageType[])=>void) | null=null 
const NewMessageCreator = (dispatch:Dispatch)=>{
    if (_NewMessage == null) {
        _NewMessage=(messages)=>{
            dispatch(actions.setMessages(messages))
        }
    } 
    return _NewMessage
}

let _StatusHandler:((status:StatusType)=>void) | null=null 
const StatusHandlerCreator = (dispatch:Dispatch)=>{
    if (_StatusHandler == null) {
        _StatusHandler=(status)=>{
            dispatch(actions.setStatus(status))
        }
    } 
    return _StatusHandler
}
export const startMessages=():ThunkType=>async(dispatch)=>{
    chatAPI.start()
    chatAPI.subcribe('messages-received',NewMessageCreator(dispatch))
    chatAPI.subcribe('status-changed',StatusHandlerCreator(dispatch))
}
export const stopMessages=():ThunkType=>async(dispatch)=>{
    chatAPI.unsubcribe('messages-received',NewMessageCreator(dispatch))
    chatAPI.unsubcribe('status-changed',StatusHandlerCreator(dispatch));
    chatAPI.stop()
}
export const SendMessage=(message:string):ThunkType=>async(dispatch)=>{
    chatAPI.sendMessage(message)
}
export default chatReducer;