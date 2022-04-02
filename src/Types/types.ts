export type PostsDataType = {
    id : number,
    message:string,
    likecount:string,
    repostcount:string,
  }
  
export  type ContactsType = {
    github:string,
    vk:string,
    facebook:string,
    instagram:string,
    twitter:string,
    website:string,
    youtube:string,
    mainLink:string
  }
  export type PhotosType = {
    small:string |null,
    large:string | null,
  }
 export type Profiletype = {
    id:number,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName : string,
    contacts : ContactsType,
    photos : PhotosType,
    aboutMe:string
  }
  export type UsersType = {
    id:number,
    name:string,
    status:string,
    followed:boolean
    photos:PhotosType
}