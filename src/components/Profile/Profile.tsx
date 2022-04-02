import React from "react";
import { Profiletype } from "../../Types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  Profile:Profiletype | null,
  status:string,
  updateStatus: (status: string) => void,
  savePhoto: (file: File) => void
  isOwner: boolean
  saveProfile: (profile: Profiletype) => Promise<any>
}

const Profile:React.FC<PropsType> = (props) => {
    return (
      <div >
        <ProfileInfo Profile={props.Profile} status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                saveProfile={props.saveProfile}
                />  
        <MyPostsContainer />
      </div>
    )
}

export default Profile;