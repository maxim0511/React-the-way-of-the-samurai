import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../../common/ContorlsForm/FormControls";
import { PostsDataType } from "../../../Types/types";
import { required,maxLengthCreator, FieldValidatorType } from "../../../utils/validators/validators";
import s from "./MyPosts.module.css";
import Post from "./Posts/Post";

type PropsType = {
    PostsData:Array<PostsDataType>,
    AddPost:(TextNewPost:string)=>void,
}

const  maxLength10:FieldValidatorType = maxLengthCreator(10)
const MyPosts:React.FC<PropsType> = React.memo(props =>{
    let PostsElemets =
      props.PostsData.map (p =><Post message={p.message} likecount={p.likecount} repostcount={p.repostcount}/>);
      let OnAddPost = (values:ValueAddPostType) => {
            props.AddPost(values.TextNewPost);
      }
        return (
            <div>
                <div className={s.AddPost}>
                    <AddMessageFormRedux onSubmit={OnAddPost}/>
                </div>
                <div className={s.content}>
                   {PostsElemets}            
                </div>
            </div>
        )
})
type ValueAddPostType = {
    TextNewPost:string
}
const AddPostForm:React.FC<InjectedFormProps<ValueAddPostType,{}>> = ({handleSubmit}) => {
    return (
      <form onSubmit={handleSubmit} className={s.form}>
          <div>
              <Field component={Textarea} name={'TextNewPost'} validate={[required,maxLength10]} className={s.AddPostInput}/>
          </div>
          <div>
              <button className={s.button} >Добавить пост</button>
          </div>
      </form>
   )
}

const AddMessageFormRedux= reduxForm<ValueAddPostType,{}>({
  form:'ProfileAddPostForm'
})(AddPostForm);

export default MyPosts