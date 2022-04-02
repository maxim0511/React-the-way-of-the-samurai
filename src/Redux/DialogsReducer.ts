import { InferActionsType } from "./ReduxStore";

export type DialogsdataType = {
  id :number,
  name:string
}
export type MessagesDataType = {
  id :number,
  messages:string
}


let InitialState= {
  DialogsData : [
    { id:1 , name:'Makcim'},
    { id:2, name:'Anna',},
    { id:3, name:'Andrey'},
    { id:4 , name:'Alekcey'},
    { id:5, name:'Vladimir'},
    { id:6 , name:'Dmitriy'},
  ] as Array <DialogsdataType>,
  MessagesData : [
    {   id:1 , messages:"Привет"  },
    {   id:2, messages:"Как дела?"   },
    {   id:3, messages:"Чем занимаешься?"  },
  ] as Array <MessagesDataType>,
  TextNewMessage:''
};

export type InitialStateType = typeof InitialState
export type ActionsType = InferActionsType<typeof actions>

const DialogsReducer = (State = InitialState,action:ActionsType):InitialStateType =>{
  switch (action.type) {
    case 'ADD_MESSAGE' : 
                  let newmessage = {
                      id:4,
                      messages:action.TextNewMessage,
                  }
                  return {
                      ...State,
                      MessagesData: [...State.MessagesData, newmessage],
                  };
         default:    
                 return State;
  }
}  

export const actions = {
 addMessageActionCreator : (TextNewMessage:string) => ({type:'ADD_MESSAGE',TextNewMessage})
}


export default DialogsReducer
