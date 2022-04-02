import { getAuthUsersData } from "./authReducer";
import { BaseThunkType, InferActionsType } from "./ReduxStore";

let InitialState = {
    initialized:true,
}
export type InitialStateType = typeof  InitialState
type ActionsType = InferActionsType<typeof actions>
const appReducer = (State=InitialState,action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCES' : {
            return {
                ...State,
                initialized:true,
            }
        }
        default:    
            return State;
        
    } 
}


export const actions = {
    initializedSuccess :() => ({type:'INITIALIZED_SUCCES'} as const)
}
type ThunkType = BaseThunkType<ActionsType>

export const initializeApp = () => (dispatch:any) =>{
    let promise = dispatch(getAuthUsersData());
    Promise.all([promise])
        .then ( () =>{
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;