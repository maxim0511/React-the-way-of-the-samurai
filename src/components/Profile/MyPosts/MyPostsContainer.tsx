import React, { Dispatch } from "react";
import {actions, ActionsType} from "../../../Redux/ProfileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../Redux/ReduxStore";
import { PostsDataType } from "../../../Types/types";

type mapStateToPropsType = {
  PostsData:Array<PostsDataType>,
  TextNewPost:string
}

const mapStateToPropsProfile =(state:AppStateType):mapStateToPropsType=>{
  return{
      PostsData: state.ProfilePage.PostsData,
      TextNewPost: state.ProfilePage.TextNewPost
  }
}

const mapDispatchToPropsProfile =(dispatch:Dispatch<ActionsType>)=>{
  return{
    AddPost:(TextNewPost:string) => {
        dispatch(actions.addPostActionCreator(TextNewPost));
    }
  }
}

const MyPostsContainer=connect(mapStateToPropsProfile,mapDispatchToPropsProfile)(MyPosts)

export default MyPostsContainer;