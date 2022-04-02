import React from "react"
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import s from './FormControls.module.css'


type FormControlPropsType = {
    meta:WrappedFieldMetaProps
}

const FormControlling:React.FC<FormControlPropsType> = ({meta:{touched,error},children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : '') }>
            <div>
                 {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea:React.FC<WrappedFieldProps> = (props) => {
    const {input,meta,...restProps} = props
    return <FormControlling {...props}><textarea {...input} {...restProps}/></FormControlling>
}
export const Input:React.FC<WrappedFieldProps>  = (props) => {
    const {input,meta,...restProps} = props
    return <FormControlling {...props}><input {...input} {...restProps}/></FormControlling>
}
