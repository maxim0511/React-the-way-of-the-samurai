import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import s from '../Dialogs.module.css'
import { Textarea } from "../../../common/ContorlsForm/FormControls";
import { FieldValidatorType, maxLengthCreator, required } from "../../../utils/validators/validators";

export type ValueMessageType = {
    TextNewMessage:string
}

const maxLength50:FieldValidatorType = maxLengthCreator(50);

const AddMessageForm:React.FC<InjectedFormProps<ValueMessageType,{}>> = ({handleSubmit}) => {
    return(
        <form onSubmit={handleSubmit} className={s.form}>
            <Field component={Textarea} name={'TextNewMessage'}  validate={[required,maxLength50]} className={s.textarea} />    
             <button className={s.button}>Отправить сообщение</button>
        </form> 
    )
} 
const AddMessageFormRedux= reduxForm<ValueMessageType,{}>({
    form:'dialogAddMessageForm'
})(AddMessageForm);

export default AddMessageFormRedux;