import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../../common/ContorlsForm/FormControls";
import { login } from "../../Redux/authReducer";
import { FieldValidatorType, maxLengthCreator, required } from "../../utils/validators/validators";
import s from '../../common/ContorlsForm/FormControls.module.css'
import { AppStateType } from "../../Redux/ReduxStore";

const Login:React.FC = (props) => {
    const isAuth = useSelector((State:AppStateType)=>State.auth.isAuth);
    const captchaUrl=useSelector((State:AppStateType)=>State.auth.captchaUrl);
    const dispatch = useDispatch();
    const onSubmit = (formData:LoginFormValuesType)=>{
        dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captcha ))
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
    <div>
        <h1>Login</h1>
        <div>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    </div>
    )
}



type LoginFormValuesType = {
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string
}
const maxLength30:FieldValidatorType = maxLengthCreator(30);

type LoginOwnProps = {
    captchaUrl:string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginOwnProps> & LoginOwnProps> = ({handleSubmit,error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder="Email" name={'email'} component={Input} validate={[required,maxLength30]}/>
            </div>
            <div>
                <Field placeholder="password" type={'password'} name={'password'} component={Input} validate={[required,maxLength30]}/>
            </div>
            <div>
                <Field type={'checkbox'}  name={'rememberMe'} component={Input}/>Запомнить меня
            </div>
            {captchaUrl && <img src={captchaUrl} className={s.captcha} alt='captcha' key={'captcha'}/>}
            {captchaUrl && <Field placeholder="Captcha" validate={[required]} name={'captcha'} component={Input} className={s.captchaInput}/>}
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                 <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType,LoginOwnProps>({form:'Login'})(LoginForm)
 

export default Login