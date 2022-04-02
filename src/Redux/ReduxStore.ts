import { ThunkAction } from 'redux-thunk';
import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import ProfileReducer from "./ProfileReducer";
import DialogsReducer from "./DialogsReducer";
import SidebarReducer from "./SidebarReducer";
import UsersReducer from "./UsersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
import chatReducer from './chatReducer';

let Reducers = combineReducers({
    ProfilePage:ProfileReducer,
    DialogsPage:DialogsReducer,
    UsersPage:UsersReducer,
    SidebarName:SidebarReducer,
    auth: authReducer,
    app: appReducer,
    chatPage:chatReducer,
    form:formReducer
});

type ReducersType = typeof Reducers;


export type AppStateType = ReturnType<ReducersType>

type PropertiesType<T> = T extends {[key:string]:infer U}?U : never
export type InferActionsType<T extends {[key:string]:(...args:any[])=>any}>  =ReturnType<PropertiesType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,AppStateType,unknown, A>

//@ts-ignore
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const Store = createStore(Reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

 //@ts-ignore
window.Store= Store

export default Store;