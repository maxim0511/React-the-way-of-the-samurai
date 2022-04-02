
import {actions, DialogsdataType, MessagesDataType} from "../../Redux/DialogsReducer"
import { connect } from "react-redux";
import { withAuthRedirect } from "../Hoc/WithAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../Redux/ReduxStore";
import Dialogs from "./Dialogs";
import React from "react";

type mapStateToPropsType = {
    DialogsData:Array<DialogsdataType>,
   MessagesData:Array<MessagesDataType>,
   TextNewMessage:string,
}

let mapStateToProps=(State:AppStateType):mapStateToPropsType=>{
    return {
        DialogsData:State.DialogsPage.DialogsData,
        MessagesData:State.DialogsPage.MessagesData,
        TextNewMessage:State.DialogsPage.TextNewMessage
    }
}

export default compose<React.ComponentType>(
    connect( mapStateToProps,{addMessageActionCreator:actions.addMessageActionCreator}),
    withAuthRedirect)(Dialogs)