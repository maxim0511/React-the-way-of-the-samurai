import { PostsDataType, Profiletype } from "../Types/types";
import ProfileReducer, { actions } from "./ProfileReducer";

let InitialState= {
  PostsData : [
    {id:1, message:"Привет ", likecount:"15 лайков" , repostcount:"2 репоста"},
    {id:2, message:"Пока", likecount:"20 лайков" , repostcount:"5 репостов"},
  ]as Array <PostsDataType>,
  Profile:null as Profiletype | null,
  status:"" ,
  TextNewPost:'',
  };

test('new post added', () => {
    //1.Исходные данные
    let action =actions.addPostActionCreator('it-kamasutra');
      //2. action
    let newState =ProfileReducer(InitialState,action)
    //3.Ожидание
    expect(newState.PostsData.length).toBe(3) ;
});
test('Удаление поста', () => {
    //1.Исходные данные
    let action =actions.deletePost(1);
      //2. action
    let newState =ProfileReducer(InitialState,action)
    //3.Ожидание
    expect(newState.PostsData.length).toBe(1) ;
});