export type PersType = {
    name:string
}

let InitialState={
     Pers:[ {name:"Andrey"},
            {name:"Anna"},
            {name:"Alekcey"}
        ] as Array<PersType>
    }

type InitialStateType = typeof InitialState
type ActionsType = '';

const SidebarReducer = (State = InitialState,action:ActionsType):InitialStateType =>{
        
    return State;
}

export default SidebarReducer;