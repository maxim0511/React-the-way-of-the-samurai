import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router";
import AddMessageFormRedux, { ValueMessageType } from "./DialogsForm/DialogsForm";
import { DialogsdataType, MessagesDataType } from "../../Redux/DialogsReducer";

type PropsType = {
    isAuth:boolean,
    TextNewMessage:string
    DialogsData:Array<DialogsdataType>,
    MessagesData:Array<MessagesDataType>
}
type DispType = {
    addMessageActionCreator:(TextNewMessage:string)=>void
}

type AllProps = PropsType  & DispType 

const Dialogs:React.FC<AllProps> = (props) =>{
    let DialogsElemets = 
    props.DialogsData.map(d =><DialogItem name={d.name} key={d.id} id={d.id} />);
    let MessageElemets =
    props.MessagesData.map (m => <Message messages={m.messages} key={m.id} id={m.id} />)

    let addNewMessage = (values:ValueMessageType) =>{
        props.addMessageActionCreator(values.TextNewMessage)
    }    
    if (!props.isAuth) return <Redirect to={'/Login'}/>;    

    return  (
        <div className={s.Dialogs}>
            <div className={s.DialogsItems}>
                {DialogsElemets}  
            </div>
            <div className={s.messages}>       
                {MessageElemets}                              
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
};

export default Dialogs;