import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input, Textarea } from "../../../common/ContorlsForm/FormControls";
import { Profiletype } from "../../../Types/types";
import s from "./ProfileInfo.module.css";

type PropsType = {
    Profile:Profiletype
}

const ProfileDataForm:React.FC<InjectedFormProps<Profiletype,PropsType>&PropsType> = ({handleSubmit,error,Profile}) => {
    return (
        <form  onSubmit={handleSubmit}>
            <div><button >Сохранить</button></div>
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
        <div><b>Имя</b>- <Field component={Input} placeholder={'Имя'} name={'fullName'} className={s.input_redact}/></div>
        <div><b>Обо мне</b>- <Field component={Textarea} placeholder={'Обо мне'} name={'aboutMe'} className={s.input_redact}/></div>
      <div><b>Контакты</b>- {Object.keys(Profile.contacts).map(key=>{
                return <div className={s.Contacts} key={key}>
                        <b>{key}:<Field component={Input} placeholder={key} name={'contacts.' + key} className={s.input_redact}/></b>
                    </div>
        })}</div>  
        <div><b>Ищу Работу</b>- <Field component={Input} type={'checkbox'} name={'lookingForAJob'} /></div>
            <div><b>Описание Работы</b>- 
            <Field component={Textarea} placeholder={'Описание работы'} name={'lookingForAJobDescription'} className={s.input_redact}/>
            </div>
    </form> 
    )
}
const ProfileDataFormReduxForm = reduxForm<Profiletype,PropsType> ({
    form:'EditProfile'
})(ProfileDataForm)
export default ProfileDataFormReduxForm;