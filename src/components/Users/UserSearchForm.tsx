import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Redux/ReduxStore";
import { FilterType } from "../../Redux/UsersReducer";
import { GetUsersFilter } from "../../Redux/UsersSelectors";

const userFormSearchValidate=(values:any) => {
    const errors = {};
    return errors
}
type PropsType = {
    onFilterChanged:(term:FilterType)=>void
}

const UsersSearchForm:React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(GetUsersFilter)
    const submit = (values:any, { setSubmitting }:{setSubmitting:(isSubmitting:boolean)=>void}): void => {
        const filter:FilterType = {
            term:values.term,
            friend:values.friend == "null" ? null : values.friend == "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }
    return <div>
        <Formik enableReinitialize initialValues={{ term:filter.term, friend:filter.friend }} validate={userFormSearchValidate} onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                         <option value="null">Все</option>
                         <option value="true">Друзья</option>
                         <option value="false">Все,кроме друзей</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Найти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})
export default UsersSearchForm